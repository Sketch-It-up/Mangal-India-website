import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const word = {
  hidden: { y: '115%' },
  shown: { y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
}

// Slides a heading up word by word the first time it scrolls into view.
// Assistive tech reads the plain text; reduced-motion users get the text as-is.
export default function RevealText({ text, delay = 0 }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return text

  const words = text.split(' ')

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        whileInView="shown"
        // Starts once the heading is a third of the way up the screen, so it plays where you are looking.
        viewport={{ once: true, margin: '0px 0px -33% 0px' }}
        transition={{ staggerChildren: 0.09, delayChildren: delay + 0.1 }}
      >
        {words.map((value, i) => (
          <Fragment key={i}>
            {/* Padding keeps descenders and italics from being clipped by the mask. */}
            <span className="inline-block overflow-hidden pb-[0.15em] align-bottom -mb-[0.15em]">
              <motion.span variants={word} className="inline-block">
                {value}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </motion.span>
    </>
  )
}
