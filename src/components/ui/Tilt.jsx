import { motion, useReducedMotion, useSpring } from 'framer-motion'

// Tilts its content a few degrees toward the mouse. Mouse only: touch and pen input,
// and reduced-motion users, get a flat card.
export default function Tilt({ max = 6, className, children }) {
  const reduceMotion = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 220, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 220, damping: 18 })

  const onPointerMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 2 * max)
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 2 * max)
  }
  const onPointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  )
}
