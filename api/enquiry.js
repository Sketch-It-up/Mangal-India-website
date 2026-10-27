// Enquiry endpoint (Section 13, Processing), as a Vercel serverless function at /api/enquiry.
// Validates with the same rules as the browser, rate-limits, emails the responsible team,
// acknowledges the sender and forwards to an optional webhook (CRM or storage).
//
// Environment variables (see .env.example):
//   RESEND_API_KEY, ENQUIRY_FROM           email delivery through Resend (resend.com)
//   ENQUIRY_TO_DOMESTIC, _EXPORT, _SOURCING, _MARKETING, _GENERAL   team inboxes per form
//   ENQUIRY_TO_DEFAULT                     fallback inbox for any form without its own
//   ENQUIRY_WEBHOOK_URL                    optional: receives every enquiry as JSON

import { formCopy, forms, validateEnquiry } from '../src/data/forms.js'

const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }
const hits = new Map() // per-instance and best effort; use a shared store for strict limits

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT.max
}

const inboxFor = (routing) => process.env[`ENQUIRY_TO_${routing.toUpperCase()}`] || process.env.ENQUIRY_TO_DEFAULT

function summary(form, values) {
  const lines = form.fields
    .filter((field) => values[field.name]?.length)
    .map((field) => `${field.label}: ${[].concat(values[field.name]).join(', ')}`)
  return [`Enquiry type: ${form.label} (form ${form.code})`, ...lines, `Sent from: ${values.page || '/'}`].join('\n')
}

async function sendEmail({ to, subject, text, replyTo }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.ENQUIRY_FROM, to, subject, text, reply_to: replyTo }),
  })
  if (!response.ok) throw new Error(`Email failed: ${response.status}`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = (req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) return res.status(429).json({ error: 'Too many enquiries. Please try again later.' })

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}
  } catch {
    return res.status(400).json({ error: 'Invalid request.' })
  }
  const form = forms[body.type]
  if (!form) return res.status(400).json({ error: 'Unknown enquiry type.' })

  // Keep only the fields this form defines.
  const values = Object.fromEntries(form.fields.map((field) => [field.name, body[field.name] ?? '']))
  values.consent = body.consent === true
  values.page = typeof body.page === 'string' ? body.page.slice(0, 200) : '/'

  const errors = validateEnquiry(body.type, values)
  if (Object.keys(errors).length) return res.status(422).json({ errors })

  const emailReady = process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM
  const inbox = inboxFor(form.routing)
  const webhook = process.env.ENQUIRY_WEBHOOK_URL
  if (!(emailReady && inbox) && !webhook) {
    console.error('Enquiry endpoint is not configured: set email or webhook variables.')
    return res.status(503).json({ error: 'Enquiries are temporarily unavailable.' })
  }

  const text = summary(form, values)
  const record = { ...values, type: body.type, form: form.code, routing: form.routing, receivedAt: new Date().toISOString() }

  try {
    const tasks = []
    if (emailReady && inbox) {
      tasks.push(sendEmail({ to: inbox, subject: `New ${form.label.toLowerCase()} enquiry: ${values.name}`, text, replyTo: values.email }))
    }
    if (webhook) {
      tasks.push(
        fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) }).then((r) => {
          if (!r.ok) throw new Error(`Webhook failed: ${r.status}`)
        }),
      )
    }
    await Promise.all(tasks)
  } catch (error) {
    console.error(error)
    return res.status(502).json({ error: 'We couldn’t send your enquiry.' })
  }

  // Acknowledge the sender. Best effort: the team already has the enquiry, so a failure here
  // must not show an error (the visitor would resubmit and create duplicates).
  if (emailReady) {
    const acknowledgement = `${formCopy.success}\n\n${text}`
    await sendEmail({ to: values.email, subject: 'Your enquiry has reached Mangal India', text: acknowledgement }).catch((error) =>
      console.error('Acknowledgement failed:', error),
    )
  }

  return res.status(200).json({ ok: true })
}
