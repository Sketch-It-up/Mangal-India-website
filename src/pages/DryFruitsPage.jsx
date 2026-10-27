import ProductCategoryPage from './ProductCategoryPage'
import { dryFruitCountries } from '@/data/countries'
import { dryFruitsPage } from '@/data/pages'
import { dryFruits } from '@/data/products'
import { routeByPath } from '@/data/routes'

const related = [
  { label: 'Global Network', to: '/global-network/' },
  { label: 'Indian Wholesale Buyers', to: '/trade-with-us/indian-wholesale-buyers/' },
  { label: 'International Buyers', to: '/trade-with-us/international-buyers/' },
  { label: 'Fresh Fruits', to: '/products/fresh-fruits/' },
]

export default function DryFruitsPage() {
  return (
    <ProductCategoryPage
      route={routeByPath['/products/dry-fruits/']}
      tone="dry"
      eyebrow="Dry Fruits"
      content={dryFruitsPage}
      products={dryFruits}
      countries={dryFruitCountries}
      countriesLabel={`Sourced from ${dryFruitCountries.length} countries`}
      gridHeading="Our four premium dry fruits"
      related={related}
    />
  )
}
