import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ConsentBanner from './ConsentBanner'
import { trackPageView } from '@/lib/analytics'

// Per-navigation effects: scroll to top (unless jumping to an anchor) and record a page view.
function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  useEffect(() => trackPageView(pathname), [pathname])
  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <RouteEffects />
      <Header />
      <main id="main" className="flex-1">
        {/* Pages are lazy-loaded (App.jsx); keep the space while one loads. */}
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  )
}
