import { useEffect, useId, useMemo } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo'
import { Globe, Store } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import { indiaFeature, useWorldFeatures } from '@/lib/geo'
import { india, sourcingCountries } from '@/data/countries'

const SIZE = 440
const countryByIso = Object.fromEntries(sourcingCountries.map((c) => [c.isoNumeric, c]))

// `depth` is how far (px) the item drifts with the pointer: larger reads as closer to the viewer.
const floating = [
  { type: 'oranges', className: 'right-[6%] top-[-2%] w-[22%]', delay: '0s', depth: 26 },
  { type: 'apples', className: 'left-[2%] top-[6%] w-[20%]', delay: '1.2s', depth: 20 },
  { type: 'mangoes', className: 'right-[-4%] top-[44%] w-[21%]', delay: '2.1s', depth: 30 },
  { type: 'kiwi', className: 'bottom-[2%] right-[16%] w-[19%]', delay: '0.6s', depth: 16 },
  { type: 'cherries', className: 'bottom-[14%] left-[-3%] w-[19%]', delay: '1.7s', depth: 24 },
  { type: 'almonds', className: 'left-[-5%] top-[38%] w-[17%]', delay: '2.6s', depth: 14 },
]

// Positioning and the pointer drift live on the outer element; the inner one keeps the CSS float,
// so the two transforms never fight.
function FloatingProduce({ item, pointerX, pointerY }) {
  const x = useTransform(pointerX, (v) => v * item.depth)
  const y = useTransform(pointerY, (v) => v * item.depth)

  return (
    <motion.div aria-hidden="true" className={`absolute aspect-square ${item.className}`} style={{ x, y }}>
      <div
        className="h-full w-full animate-float rounded-full bg-white p-[3%] shadow-lift ring-1 ring-forest/5"
        style={{ animationDelay: item.delay }}
      >
        <ProduceArt type={item.type} className="h-full w-full" />
      </div>
    </motion.div>
  )
}

// Hero illustration: a globe centred on India with great-circle trade arcs from the
// sourcing countries visible on this hemisphere, framed by floating produce.
export default function HeroVisual() {
  const features = useWorldFeatures()
  const reduceMotion = useReducedMotion()
  const oceanId = `ocean-${useId().replace(/:/g, '')}`

  // The produce drifts opposite the mouse, relative to the viewport centre (-1 to 1).
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, { stiffness: 80, damping: 20 })
  const pointerY = useSpring(rawY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    if (reduceMotion) return
    const onMove = (event) => {
      if (event.pointerType !== 'mouse') return
      rawX.set(-((event.clientX / window.innerWidth) * 2 - 1))
      rawY.set(-((event.clientY / window.innerHeight) * 2 - 1))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduceMotion, rawX, rawY])

  const globe = useMemo(() => {
    const projection = geoOrthographic()
      .rotate([-60, -18])
      .scale(SIZE / 2 - 6)
      .translate([SIZE / 2, SIZE / 2])
      .clipAngle(90)
    const path = geoPath(projection)
    return {
      path,
      graticule: path(geoGraticule10()),
      india: path(indiaFeature),
      arcs: sourcingCountries
        .map((c) => ({ id: c.id, fresh: c.sources.includes('fresh'), d: path({ type: 'LineString', coordinates: [c.coordinates, india.coordinates] }) }))
        .filter((arc) => arc.d),
    }
  }, [])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[520px]">
      <div aria-hidden="true" className="absolute inset-[4%] rounded-full bg-gradient-to-br from-leaf-light via-sage to-gold-light" />
      <div
        aria-hidden="true"
        className="absolute inset-[1%] animate-[spin_90s_linear_infinite] rounded-full border-2 border-dashed border-forest/15"
      />

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-[12%] h-[76%] w-[76%] drop-shadow-2xl" aria-hidden="true">
        <defs>
          <radialGradient id={oceanId} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#2E6B3D" />
            <stop offset="100%" stopColor="#123A20" />
          </radialGradient>
        </defs>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 6} fill={`url(#${oceanId})`} />
        <path d={globe.graticule} fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="0.8" />
        {features?.map((f) => {
          const country = countryByIso[f.id]
          const fill = country ? (country.sources.includes('fresh') ? '#8BC34A' : '#F28C28') : '#3A7A4A'
          return <path key={f.id} d={globe.path(f)} fill={fill} stroke="#123A20" strokeWidth="0.5" />
        })}
        {features && <path d={globe.india} fill="#C62839" stroke="#FF8A95" strokeOpacity="0.6" strokeWidth="0.8" />}
        {features &&
          globe.arcs.map((arc, i) => (
            <motion.path
              key={arc.id}
              d={arc.d}
              fill="none"
              stroke={arc.fresh ? '#D4F5A8' : '#FFD08A'}
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 6} fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
        <ellipse cx={SIZE * 0.36} cy={SIZE * 0.26} rx={SIZE * 0.18} ry={SIZE * 0.1} fill="#fff" opacity="0.07" />
      </svg>

      {floating.map((item) => (
        <FloatingProduce key={item.type} item={item} pointerX={pointerX} pointerY={pointerY} />
      ))}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-[-2%] left-[14%] flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lift backdrop-blur"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf-light text-leaf-dark">
          <Globe aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-lg font-bold text-forest">12 countries</span>
          <span className="block text-xs text-ink-muted">Six continents of sourcing</span>
        </span>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute right-[-2%] top-[22%] hidden items-center gap-2.5 rounded-2xl bg-forest px-3.5 py-2.5 text-white shadow-lift sm:flex"
      >
        <Store aria-hidden="true" className="h-4 w-4 text-gold" />
        <span className="text-xs font-semibold leading-tight">
          Exporting to Dubai
          <span className="block font-normal text-white/70">Own premium retail shop</span>
        </span>
      </motion.div>
    </div>
  )
}
