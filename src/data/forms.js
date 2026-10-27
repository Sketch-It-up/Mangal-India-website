// Enquiry forms (Section 13). Plain data with no imports: the server endpoint
// (api/enquiry.js) imports this file too, so client and server validate the same fields.

export const formCopy = {
  success: 'Thank you — your enquiry has reached the Mangal India team. We will review the details and get back to you shortly.',
  error: 'We couldn’t send your enquiry. Please check the highlighted fields and try again.',
  consent: 'I agree to Mangal India contacting me about this enquiry. See our Privacy Policy.',
}

const contact = [
  { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name', half: true },
  { name: 'company', label: 'Company', type: 'text', required: true, autoComplete: 'organization', half: true },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', half: true },
]

export const importProducts = [
  'Apples', 'Oranges', 'Mandarins', 'Kiwi', 'Dragon Fruit', 'Pears', 'Cherries', 'Plums', 'Nectarines',
  'Dates', 'Pistachios', 'Almonds', 'Walnuts', 'Other',
]

export const exportProducts = ['Basmati', '1121', 'Non-basmati', 'Sona Masoori', 'Other rice', 'Mangoes', 'Vegetables', 'Other']

// Keyed by enquiry type. `routing` is the desk each form goes to (Section 13, Processing).
export const forms = {
  'indian-buyer': {
    code: 'A',
    label: 'Indian wholesale buyer',
    routing: 'domestic',
    submitLabel: 'Submit Buyer Enquiry',
    fields: [
      ...contact,
      { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel', half: true },
      { name: 'products', label: 'Product(s)', type: 'checkboxes', required: true, options: importProducts },
      { name: 'quantity', label: 'Quantity & unit', type: 'text', required: true, half: true, placeholder: 'e.g. 2 containers, 500 cartons' },
      { name: 'city', label: 'Delivery city', type: 'text', required: true, half: true, autoComplete: 'address-level2' },
      { name: 'packaging', label: 'Packaging', type: 'text', half: true },
      { name: 'timing', label: 'Timing', type: 'text', half: true },
      { name: 'message', label: 'Message', type: 'textarea' },
    ],
  },
  'international-buyer': {
    code: 'B',
    label: 'International buyer',
    routing: 'export',
    submitLabel: 'Submit Export Enquiry',
    fields: [
      ...contact,
      { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel', half: true },
      { name: 'country', label: 'Country', type: 'text', required: true, half: true, autoComplete: 'country-name' },
      { name: 'product', label: 'Product', type: 'select', required: true, half: true, options: exportProducts },
      { name: 'packaging', label: 'Packaging', type: 'text', half: true },
      { name: 'quantity', label: 'Quantity', type: 'text', required: true, half: true },
      { name: 'destination', label: 'Destination port / airport', type: 'text', required: true, half: true },
      { name: 'window', label: 'Target shipment window', type: 'text', half: true },
      { name: 'documents', label: 'Documents required', type: 'text' },
      { name: 'message', label: 'Message', type: 'textarea' },
    ],
  },
  supplier: {
    code: 'C',
    label: 'International supplier',
    routing: 'sourcing',
    submitLabel: 'Submit Supplier Profile',
    fields: [
      ...contact,
      { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', half: true },
      { name: 'origin', label: 'Country of origin', type: 'text', required: true, half: true },
      { name: 'products', label: 'Products & varieties', type: 'text', required: true, half: true },
      { name: 'grades', label: 'Grades & packing', type: 'text', half: true },
      { name: 'season', label: 'Season', type: 'text', half: true },
      { name: 'volumes', label: 'Volumes', type: 'text', half: true },
      { name: 'credentials', label: 'Credentials', type: 'text', half: true, placeholder: 'Certifications you hold' },
      { name: 'website', label: 'Website / catalogue link', type: 'url', autoComplete: 'url' },
    ],
  },
  // "Other" has no field list in the build document; it uses the shared contact fields and a message.
  other: {
    code: 'O',
    label: 'Other',
    routing: 'general',
    submitLabel: 'Send Enquiry',
    fields: [
      ...contact,
      { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel', half: true },
      { name: 'message', label: 'Message', type: 'textarea', required: true },
    ],
  },
  'dubai-shop': {
    code: 'D',
    label: 'Dubai shop updates',
    routing: 'marketing',
    submitLabel: 'Get Shop Updates',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name', half: true },
      { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', half: true },
    ],
  },
}

// "I am an:" selector on the Contact page (Section 10).
export const contactTypes = ['indian-buyer', 'international-buyer', 'supplier', 'other']

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Shared validation. Returns { fieldName: message } for every invalid field.
export function validateEnquiry(type, values) {
  const form = forms[type]
  if (!form) return { form: 'Unknown enquiry type.' }
  const errors = {}
  for (const field of form.fields) {
    const value = values[field.name]
    const empty = Array.isArray(value) ? value.length === 0 : !String(value ?? '').trim()
    if (field.required && empty) errors[field.name] = field.options ? `Please choose ${field.label.toLowerCase()}.` : `Please enter your ${field.label.toLowerCase()}.`
    else if (!empty && String(value).length > 5000) errors[field.name] = 'This field is too long.'
    else if (!empty && field.type === 'email' && !EMAIL.test(String(value).trim())) errors[field.name] = 'Please enter a valid email address.'
    else if (!empty && field.type === 'select' && !field.options.includes(value)) errors[field.name] = 'Please choose an option.'
    else if (!empty && field.type === 'checkboxes' && !value.every((v) => field.options.includes(v))) errors[field.name] = 'Please choose from the list.'
  }
  if (values.consent !== true) errors.consent = 'Please confirm we may contact you about this enquiry.'
  return errors
}

