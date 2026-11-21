import { useLayoutEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Is any part of the element inside the viewport?
const isOnScreen = (el) => {
  const rect = el.getBoundingClientRect()
  return rect.bottom > 0 && rect.top < window.innerHeight && rect.width + rect.height > 0
}

// Counts up to `value` the first time it scrolls into view.
//
// The final number is the default at every step: it is what renders first, what reduced-motion
// users and browsers without IntersectionObserver see, and what the counter is forced to once the
// animation should have finished. So a missed in-view event, a throttled background tab or a
// stalled animation can never leave "0+" on screen.
export default function Counter({ value, prefix = '', suffix = '', duration = 1.6, className }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)

  // Layout effect: the reset to 0 happens before the browser paints, so the final number
  // never flashes before the count-up starts.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setDisplay(value)
      return undefined
    }

    let started = false
    let controls
    let fallback
    const finish = () => setDisplay(value)

    const start = () => {
      if (started) return
      started = true
      observer.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplay(Math.round(latest)),
        onComplete: finish,
      })
      // Safety net: timers still run when animation frames are paused (background tab).
      fallback = window.setTimeout(finish, duration * 1000 + 400)
    }

    // Backup for an IntersectionObserver that never reports (seen with smooth-scroll setups).
    const check = () => isOnScreen(el) && start()

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) start()
    })

    setDisplay(0)
    observer.observe(el)
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    // Already on screen at load (e.g. refresh part-way down the page): start straight away.
    check()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      controls?.stop()
      window.clearTimeout(fallback)
      // Leave the real number in place if the component is torn down mid-count (StrictMode, route change).
      setDisplay(value)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  )
}
