import { forms } from '@/data/forms'
import { trackEvent } from './analytics'

// Where enquiries are sent. Defaults to the bundled serverless endpoint (api/enquiry.js);
// set VITE_ENQUIRY_ENDPOINT to use another backend or form service.
const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT || '/api/enquiry'

// In local development there is no /api server, so submissions are logged and accepted
// unless an endpoint has been configured explicitly.
const simulate = import.meta.env.DEV && !import.meta.env.VITE_ENQUIRY_ENDPOINT

export async function submitEnquiry(type, values) {
  const payload = { type, ...values, page: window.location.pathname }

  if (simulate) {
    console.info('[enquiry] development mode, not sent:', payload)
    await new Promise((resolve) => setTimeout(resolve, 600))
  } else {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      const error = new Error('Enquiry failed')
      error.fieldErrors = body.errors
      throw error
    }
  }

  // Section 13: GA4 generate_lead with form type and product.
  const product = values.product ?? (Array.isArray(values.products) ? values.products.join(', ') : values.products)
  trackEvent('generate_lead', { form_type: forms[type].code, enquiry_type: type, product })
}
