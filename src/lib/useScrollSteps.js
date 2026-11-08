import { useEffect, useRef } from 'react'

const GESTURE_GAP = 180 // ms of quiet that ends a wheel gesture
const WHEEL_THRESHOLD = 24 // px of wheel travel before a gesture counts
const SWIPE_THRESHOLD = 40 // px of finger travel before a swipe counts

const wheelDelta = (event) => event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)

// Mouse-wheel and vertical-swipe stepping for a full-screen slideshow at the top of the page.
// It only takes over while the page sits at the very top, the section fits the viewport and
// there is a slide to move to in that direction; otherwise scrolling stays native, so the
// first gesture past the last slide (or before the first) scrolls the page as usual.
// One gesture moves one slide: the rest of that gesture (trackpad inertia, a spun wheel) is
// absorbed, so momentum never skips slides or flings the page past the last one.
// Wheel events are caught in the capture phase and, when taken, stopped there, so a smooth-scroll
// library listening further along (Lenis) never sees them.
// `options`: { canStep(dir), onStep(dir), lockMs } where dir is 1 (down/next) or -1 (up/previous).
export default function useScrollSteps(ref, options) {
  const opts = useRef(options)
  opts.current = options

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    let lockUntil = 0
    const wheel = { last: 0, abs: 0, mine: false, stepped: false, sum: 0 }
    let touch = null

    const engaged = (target) =>
      el.contains(target) && window.scrollY <= 2 && el.getBoundingClientRect().bottom <= window.innerHeight + 2
    const step = (dir) => {
      lockUntil = performance.now() + opts.current.lockMs
      opts.current.onStep(dir)
    }

    const onWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      const dy = wheelDelta(event)
      if (!dy) return
      const now = performance.now()
      const abs = Math.abs(dy)
      // A pause, or a sudden jump in speed once the transition has finished, starts a new gesture.
      const fresh = now - wheel.last > GESTURE_GAP || (now > lockUntil && abs > wheel.abs * 1.6 + 4)
      wheel.last = now
      wheel.abs = abs
      if (fresh) {
        wheel.mine = engaged(event.target) && opts.current.canStep(Math.sign(dy))
        wheel.stepped = false
        wheel.sum = 0
      }
      if (!wheel.mine) return
      event.preventDefault()
      event.stopPropagation()
      if (wheel.stepped || now < lockUntil) return
      wheel.sum += dy
      if (Math.abs(wheel.sum) >= WHEEL_THRESHOLD) {
        wheel.stepped = true
        step(Math.sign(wheel.sum))
      }
    }

    const onTouchStart = (event) => {
      const t = event.touches[0]
      touch = event.touches.length === 1 && engaged(event.target) ? { x: t.clientX, y: t.clientY, dir: 0, stepped: false } : null
    }

    const onTouchMove = (event) => {
      if (!touch) return
      const t = event.touches[0]
      const dx = t.clientX - touch.x
      const dy = t.clientY - touch.y
      if (!touch.dir) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
        // Horizontal swipes belong to the slider itself.
        const dir = dy < 0 ? 1 : -1
        if (Math.abs(dx) > Math.abs(dy) || !opts.current.canStep(dir)) {
          touch = null
          return
        }
        touch.dir = dir
      }
      if (event.cancelable) event.preventDefault()
      if (!touch.stepped && Math.abs(dy) > SWIPE_THRESHOLD && performance.now() > lockUntil) {
        touch.stepped = true
        step(touch.dir)
      }
    }

    const onTouchEnd = () => {
      touch = null
    }

    window.addEventListener('wheel', onWheel, { capture: true, passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [ref])
}
