// GA4, loaded only after the visitor accepts analytics cookies (Section 16: consent where required).
// Nothing loads, and no banner shows, until VITE_GA4_ID is set.

export const gaId = import.meta.env.VITE_GA4_ID
const STORAGE_KEY = 'mi-analytics-consent'

export function getConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY) // 'granted' | 'denied' | null
  } catch {
    return null
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage blocked: the choice applies to this visit only.
  }
  if (value === 'granted') loadAnalytics()
}

let loaded = false

export function loadAnalytics() {
  if (loaded || !gaId) return
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // Page views are sent manually: the current page here, later navigations from Layout.
  window.gtag('config', gaId, { anonymize_ip: true, send_page_view: false })
  trackPageViewNow(window.location.pathname)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)
}

export function trackEvent(name, params) {
  if (loaded) window.gtag('event', name, params)
}

export function trackPageView(path) {
  if (loaded) trackPageViewNow(path)
}

function trackPageViewNow(path) {
  window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
}
