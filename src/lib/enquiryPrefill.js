import { forms } from '@/data/forms'
import { allProducts } from '@/data/products'

const exportPrefill = {
  rice: {}, // the buyer picks the variety
  mangoes: { product: 'Mangoes' },
  vegetables: { product: 'Vegetables' },
}

// Reads ?product=<slug> and ?type=<enquiry type> from enquiry links
// (product cards, "Request Specifications", "Get Shop Updates") to pre-fill a form.
export function prefillFromQuery(params) {
  const slug = params.get('product')
  const requestedType = params.get('type')
  const importProduct = allProducts.find((p) => p.slug === slug)

  if (importProduct) return { type: 'indian-buyer', values: { products: [importProduct.name] } }
  if (slug in exportPrefill) return { type: 'international-buyer', values: exportPrefill[slug] }
  if (requestedType in forms) return { type: requestedType, values: {} }
  return { type: null, values: {} }
}
