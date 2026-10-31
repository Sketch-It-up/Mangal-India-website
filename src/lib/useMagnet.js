import { useEffect } from 'react'
import { animate, useMotionValue, useReducedMotion } from 'framer-motion'

const spring = { type: 'spring', stiffness: 260, damping: 18 }
const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value))

// Nudges the element toward the mouse while it hovers, then springs back. Uses the CSS
// `translate` property, so it composes with Tailwind's hover lift (`transform`) instead of
// replacing it. Mouse only, and off for reduced-motion users.
export function useMagnet(ref, { enabled = true, strength = 0.3, max = 10 } = {}) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled || reduceMotion) return

    const apply = () => {
      el.style.translate = `${x.get()}px ${y.get()}px`
    }
    const stopX = x.on('change', apply)
    const stopY = y.on('change', apply)

    const onMove = (event) => {
      if (event.pointerType !== 'mouse') return
      const rect = el.getBoundingClientRect()
      animate(x, clamp((event.clientX - (rect.left + rect.width / 2)) * strength, max), spring)
      animate(y, clamp((event.clientY - (rect.top + rect.height / 2)) * strength, max), spring)
    }
    const onLeave = () => {
      animate(x, 0, spring)
      animate(y, 0, spring)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      stopX()
      stopY()
      el.style.translate = ''
    }
  }, [ref, enabled, reduceMotion, strength, max, x, y])
}
