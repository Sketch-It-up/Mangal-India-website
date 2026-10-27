import TradePage from './TradePage'
import { indianBuyersPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'

const related = [
  { label: 'Fresh Fruits', to: '/products/fresh-fruits/' },
  { label: 'Dry Fruits', to: '/products/dry-fruits/' },
  { label: 'India Distribution Network', to: '/global-network/india-distribution/' },
  { label: 'Contact', to: '/contact/' },
]

export default function IndianBuyersPage() {
  return <TradePage route={routeByPath['/trade-with-us/indian-wholesale-buyers/']} content={indianBuyersPage} formType="indian-buyer" related={related} />
}
