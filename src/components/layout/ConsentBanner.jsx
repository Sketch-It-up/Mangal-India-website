import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import { gaId, getConsent, loadAnalytics, setConsent } from '@/lib/analytics'

// Analytics consent. Shown only when GA4 is configured (VITE_GA4_ID) and the visitor
// hasn't chosen yet; analytics load only after "Accept".
export default function ConsentBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!gaId) return
    const choice = getConsent()
    if (choice === 'granted') loadAnalytics()
    else if (!choice) setOpen(true)
  }, [])

  if (!open) return null

  const choose = (value) => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-forest/10 bg-white p-5 shadow-lift sm:flex sm:items-center sm:gap-5"
    >
      <Cookie aria-hidden="true" className="hidden h-8 w-8 shrink-0 text-leaf-dark sm:block" />
      <p className="text-sm leading-relaxed text-ink">
        We use cookies and analytics to understand how the website is used.{' '}
        <Link to="/privacy-policy/" className="font-semibold text-leaf-dark underline underline-offset-2">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="h-10 rounded-btn border-2 border-forest px-4 text-sm font-semibold text-forest hover:bg-forest/5"
        >
          Decline
        </button>
        <button type="button" onClick={() => choose('granted')} className="h-10 rounded-btn bg-forest px-4 text-sm font-semibold text-white hover:bg-forest-dark">
          Accept
        </button>
      </div>
    </div>
  )
}
