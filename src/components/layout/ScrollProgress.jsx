import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

// Thin reading-progress bar pinned above the header.
export default function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-leaf-dark via-leaf to-gold"
      style={{ scaleX: reduceMotion ? scrollYProgress : smooth }}
    />
  )
}
