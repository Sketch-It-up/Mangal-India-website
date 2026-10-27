import TradePage from './TradePage'
import { suppliersPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'

const related = [
  { label: 'Global Network', to: '/global-network/' },
  { label: 'Fresh Fruits', to: '/products/fresh-fruits/' },
  { label: 'Dry Fruits', to: '/products/dry-fruits/' },
  { label: 'Contact', to: '/contact/' },
]

export default function SuppliersPage() {
  return <TradePage route={routeByPath['/trade-with-us/suppliers/']} content={suppliersPage} formType="supplier" related={related} />
}
