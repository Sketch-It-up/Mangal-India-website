import { motion } from 'framer-motion'

// Gentle fade-up when the element scrolls into view.
// MotionConfig reducedMotion="user" (main.jsx) drops the movement for reduced-motion users.
export default function Reveal({ as = 'div', delay = 0, y = 24, className, children }) {
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
