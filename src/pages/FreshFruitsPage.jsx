import ProductCategoryPage from './ProductCategoryPage'
import { freshFruitCountries } from '@/data/countries'
import { freshFruitsPage } from '@/data/pages'
import { freshFruits } from '@/data/products'
import { routeByPath } from '@/data/routes'

const related = [
  { label: 'Global Network', to: '/global-network/' },
  { label: 'India Distribution Network', to: '/global-network/india-distribution/' },
  { label: 'Indian Wholesale Buyers', to: '/trade-with-us/indian-wholesale-buyers/' },
  { label: 'Dry Fruits', to: '/products/dry-fruits/' },
]

export default function FreshFruitsPage() {
  return (
    <ProductCategoryPage
      route={routeByPath['/products/fresh-fruits/']}
      tone="fresh"
      eyebrow="Fresh Fruits"
      content={freshFruitsPage}
      products={freshFruits}
      countries={freshFruitCountries}
      countriesLabel={`Sourced from ${freshFruitCountries.length} countries`}
      gridHeading="Our nine premium fresh fruits"
      related={related}
    />
  )
}
