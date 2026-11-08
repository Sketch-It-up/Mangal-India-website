import { motion } from 'framer-motion'
import ProduceArt from '@/components/art/ProduceArt'
import { cn } from '@/lib/cn'

// Where the floating cut-outs sit around the photo (percent of the stage).
const spots = ['left-[-3%] top-[4%] w-[24%]', 'right-[-2%] top-[8%] w-[20%]', 'bottom-[4%] right-[2%] w-[22%]']

const ease = [0.16, 1, 0.3, 1]
// Leaving variants reset only after the slide transition, so a slide never empties mid-swipe.
const reset = { delay: 0.9, duration: 0 }

const glowIn = {
  hidden: { opacity: 0, scale: 0.8, transition: reset },
  show: { opacity: 1, scale: 1, transition: { duration: 1, ease } },
}
const photoIn = {
  hidden: { opacity: 0, scale: 1.14, transition: reset },
  show: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 1.3, ease } },
}
const cutoutIn = (i) => ({
  hidden: { opacity: 0, scale: 0.4, rotate: -20, transition: reset },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { delay: 0.45 + i * 0.12, type: 'spring', stiffness: 160, damping: 14 } },
})
const chipIn = {
  hidden: { opacity: 0, x: -24, transition: reset },
  show: { opacity: 1, x: 0, transition: { delay: 0.85, duration: 0.7, ease } },
}

// Product slide visual: a studio photo whose white backdrop melts into a soft white spotlight,
// with cut-outs floating around it at different depths and a frosted fact chip.
export default function HeroProduceStage({ active, photo, cutouts = [], chip, chipIcon: ChipIcon }) {
  return (
    <motion.div initial="hidden" animate={active ? 'show' : 'hidden'} className="relative h-full w-full">
      <div aria-hidden="true" className="absolute inset-[1%] animate-[spin_120s_linear_infinite] rounded-full border border-dashed border-forest/20" />
      <motion.div
        aria-hidden="true"
        variants={glowIn}
        className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,#fff_60%,rgba(255,255,255,0.6)_82%,rgba(255,255,255,0)_100%)]"
      />

      {/* The photo's white backdrop fades out at the edges, so only the produce and its shadow show.
          It floats up and down on its own layer, so the float never fights the entrance animation. */}
      <div aria-hidden="true" className="absolute inset-x-[-8%] top-1/2 aspect-[4/3] -translate-y-1/2">
        <div className="h-full w-full animate-hover-float">
          <motion.img
            src={photo}
            alt=""
            variants={photoIn}
            fetchpriority="low"
            className="h-full w-full object-cover [-webkit-mask-image:radial-gradient(closest-side,#000_68%,transparent_100%)] [mask-image:radial-gradient(closest-side,#000_68%,transparent_100%)]"
          />
        </div>
      </div>

      {cutouts.map((type, i) => (
        <div key={type} aria-hidden="true" className={cn('absolute', spots[i])}>
          <motion.div variants={cutoutIn(i)}>
            <div className="animate-float" style={{ animationDelay: `${i * 0.9}s` }}>
              <ProduceArt type={type} loading="eager" className="h-auto w-full drop-shadow-[0_18px_20px_rgba(30,77,43,0.28)]" />
            </div>
          </motion.div>
        </div>
      ))}

      {chip && (
        <motion.div
          variants={chipIn}
          className="absolute bottom-[8%] left-[-4%] hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-lift backdrop-blur-md sm:flex"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-gold">
            {ChipIcon && <ChipIcon aria-hidden="true" className="h-5 w-5" />}
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold text-forest">{chip.title}</span>
            <span className="block text-xs text-ink-muted">{chip.text}</span>
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
