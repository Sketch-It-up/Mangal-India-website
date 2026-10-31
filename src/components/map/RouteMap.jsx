import { useId, useMemo, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { geoGraticule10, geoMercator, geoPath } from 'd3-geo'
import { cn } from '@/lib/cn'
import { arcBetween, indiaFeature, useWorldFeatures } from '@/lib/geo'
import { india, sourcingCountries } from '@/data/countries'
import { mapColors } from './palette'

const WIDTH = 560
const HEIGHT = 400
const dubai = sourcingCountries.find((c) => c.id === 'uae')

// Regional crop of the world map: the export route from India to Dubai, with a
// gold shipment dot travelling the arc. Illustrative of direction, not a literal route.
export default function RouteMap({ label, className }) {
  const features = useWorldFeatures()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()
  const glowId = `route-glow-${useId().replace(/:/g, '')}`

  const geo = useMemo(() => {
    const projection = geoMercator().fitExtent(
      [
        [24, 24],
        [WIDTH - 24, HEIGHT - 24],
      ],
      { type: 'MultiPoint', coordinates: [[38, 2], [96, 38]] },
    )
    const path = geoPath(projection)
    const indiaPoint = projection(india.coordinates)
    const dubaiPoint = projection(dubai.coordinates)
    return {
      path,
      graticule: path(geoGraticule10()),
      india: path(indiaFeature),
      indiaPoint,
      dubaiPoint,
      route: arcBetween(indiaPoint, dubaiPoint, -0.32),
    }
  }, [])

  const land = useMemo(() => features?.map((f) => ({ id: f.id, d: geo.path(f) })), [features, geo])
  const drawn = inView || reduceMotion
  const pct = ([x, y]) => ({ left: `${(x / WIDTH) * 100}%`, top: `${(y / HEIGHT) * 100}%` })

  return (
    <div ref={ref} className={cn('relative overflow-hidden rounded-3xl border border-forest/10 bg-cream-light shadow-lift', className)}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="block h-auto w-full" role="img" aria-label="Map showing Mangal India’s export route from India to Dubai">
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={geo.graticule} fill="none" stroke={mapColors.india} strokeOpacity="0.07" strokeWidth="0.8" />
        {land?.map((shape) => (
          <path key={shape.id} d={shape.d} fill={shape.id === '784' ? mapColors.goldLand : mapColors.land} stroke={mapColors.landBorder} strokeWidth="0.8" />
        ))}
        <path d={geo.india} fill={mapColors.india} stroke={mapColors.indiaRing} strokeOpacity="0.9" strokeWidth="1.2" filter={`url(#${glowId})`} />

        <motion.path
          d={geo.route.d}
          fill="none"
          stroke={mapColors.gold}
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={drawn ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.4, delay: 0.3, ease: 'easeInOut' }}
        />
        {drawn && !reduceMotion && (
          <g>
            <circle r="9" fill={mapColors.gold} opacity="0.25" />
            <circle r="4.5" fill={mapColors.gold} stroke={mapColors.ink} strokeWidth="1.5" />
            <animateMotion dur="3.2s" begin="1.7s" repeatCount="indefinite" path={geo.route.d} />
          </g>
        )}

        <g transform={`translate(${geo.dubaiPoint[0]} ${geo.dubaiPoint[1]})`}>
          <circle r="9" fill="none" stroke={mapColors.gold} strokeWidth="2" className="origin-center animate-pulse-ring [transform-box:fill-box]" />
          <circle r="8" fill={mapColors.ink} stroke={mapColors.gold} strokeWidth="3" />
          <circle r="3" fill={mapColors.indiaRing} />
        </g>
        <circle cx={geo.indiaPoint[0]} cy={geo.indiaPoint[1]} r="5" fill="#fff" stroke={mapColors.ink} strokeWidth="1.5" />
      </svg>

      <span className="absolute -translate-x-1/2 translate-y-4 font-display text-lg font-bold text-forest" style={pct(geo.indiaPoint)}>
        India
      </span>
      <span className="absolute -translate-x-1/2 -translate-y-[calc(100%+16px)] font-display text-lg font-bold text-gold-dark" style={pct(geo.dubaiPoint)}>
        Dubai
      </span>
      {label && (
        <div className="absolute -translate-x-[70%] translate-y-12" style={pct(geo.route.mid)}>
          <motion.span
            className="block whitespace-nowrap rounded-lg border border-gold/60 bg-white/90 px-3 py-1.5 text-xs font-medium text-gold-dark shadow-card backdrop-blur"
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={drawn ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1.5 }}
          >
            {label}
          </motion.span>
        </div>
      )}
    </div>
  )
}
