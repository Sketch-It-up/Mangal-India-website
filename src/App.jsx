import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import { routes } from '@/data/routes'

// The homepage ships in the main bundle; every other page loads on demand.
const page = (load) => lazy(load)

const pages = {
  '/': HomePage,
  '/about/': page(() => import('@/pages/AboutPage')),
  '/about/founder-message/': page(() => import('@/pages/FounderMessagePage')),
  '/products/': page(() => import('@/pages/ProductsPage')),
  '/products/fresh-fruits/': page(() => import('@/pages/FreshFruitsPage')),
  '/products/dry-fruits/': page(() => import('@/pages/DryFruitsPage')),
  '/global-network/': page(() => import('@/pages/GlobalNetworkPage')),
  '/global-network/india-distribution/': page(() => import('@/pages/IndiaDistributionPage')),
  '/exports/': page(() => import('@/pages/ExportsPage')),
  '/exports/rice/': page(() => import('@/pages/RicePage')),
  '/exports/mangoes-and-vegetables/': page(() => import('@/pages/AirExportPage')),
  '/exports/dubai-retail-shop/': page(() => import('@/pages/DubaiShopPage')),
  '/trade-with-us/indian-wholesale-buyers/': page(() => import('@/pages/IndianBuyersPage')),
  '/trade-with-us/international-buyers/': page(() => import('@/pages/InternationalBuyersPage')),
  '/trade-with-us/suppliers/': page(() => import('@/pages/SuppliersPage')),
  '/contact/': page(() => import('@/pages/ContactPage')),
  '/faq/': page(() => import('@/pages/FaqPage')),
  '/thank-you/': page(() => import('@/pages/ThankYouPage')),
}

const LegalPage = page(() => import('@/pages/LegalPage'))
const NotFoundPage = page(() => import('@/pages/NotFoundPage'))
const StyleguidePage = page(() => import('@/pages/StyleguidePage'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route) => {
          const Page = pages[route.path]
          const element = Page ? <Page /> : <LegalPage path={route.path} />
          return <Route key={route.path} path={route.path} element={element} />
        })}
        {/* Design-system reference for the build team; not part of the public site. */}
        {import.meta.env.DEV && <Route path="/styleguide/" element={<StyleguidePage />} />}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
