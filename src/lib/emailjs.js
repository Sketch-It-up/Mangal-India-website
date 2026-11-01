import emailjs from '@emailjs/browser'
import { forms } from '@/data/forms'

// Demo-only delivery through EmailJS (emailjs.com), straight from the browser.
// These values are public by design (they end up in the page's JavaScript).
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
// Business owner's inbox. Use {{to_email}} as the template's "To Email", or leave this
// unset and hard-code the address in the template instead.
const toEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL

export const emailjsConfigured = Boolean(serviceId && templateId && publicKey)

const allFieldNames = [...new Set(Object.values(forms).flatMap((form) => form.fields.map((field) => field.name)))]

// Visitor-typed text goes into HTML, so escape it.
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export async function sendViaEmailJs(type, payload) {
  const form = forms[type]
  const details = form.fields
    .filter((field) => payload[field.name]?.length)
    .map((field) => `${field.label}: ${[].concat(payload[field.name]).join(', ')}`)
    .join('\n')

  // Same fields as an HTML table, for the template's unescaped {{{details_html}}} slot.
  const rows = form.fields
    .filter((field) => payload[field.name]?.length)
    .map(
      (field) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:bold;white-space:nowrap">${escapeHtml(field.label)}</td>` +
        `<td style="padding:6px 0">${escapeHtml([].concat(payload[field.name]).join(', ')).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('')
  const detailsHtml = `<table style="border-collapse:collapse;font-size:14px">${rows}</table>`

  // Every field is also sent under its own name ({{products}}, {{quantity}}, {{city}}, ...),
  // so a template can place any of them directly. Fields a form lacks are sent empty.
  const params = {
    ...Object.fromEntries(allFieldNames.map((name) => [name, [].concat(payload[name] ?? '').join(', ')])),
    to_email: toEmail,
    form_type: form.label,
    form_code: form.code,
    page: payload.page,
    details,
    details_html: detailsHtml,
  }
  if (import.meta.env.DEV) console.info('[emailjs] sending template params:', params)

  try {
    await emailjs.send(serviceId, templateId, params, { publicKey })
  } catch (error) {
    // EmailJS rejects with { status, text }, which tells you what is misconfigured.
    console.error('[emailjs] send failed:', error?.status, error?.text ?? error)
    throw error
  }
}
