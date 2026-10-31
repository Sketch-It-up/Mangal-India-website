import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { setLenis } from '@/lib/smoothScroll'

// Inertial smooth scrolling for wheel and trackpad. Skipped for reduced-motion users,
// who keep native scrolling. Touch devices scroll natively (Lenis only smooths the wheel).
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: true })
    setLenis(lenis)
    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return null
}
