import TradePage from './TradePage'
import { internationalBuyersPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'

const related = [
  { label: 'Exports', to: '/exports/' },
  { label: 'Rice', to: '/exports/rice/' },
  { label: 'Mangoes & Vegetables', to: '/exports/mangoes-and-vegetables/' },
  { label: 'Contact', to: '/contact/' },
]

export default function InternationalBuyersPage() {
  return <TradePage route={routeByPath['/trade-with-us/international-buyers/']} content={internationalBuyersPage} formType="international-buyer" related={related} />
}
