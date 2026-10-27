import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { geoEqualEarth, geoGraticule10, geoPath } from 'd3-geo'
import { Hand, MousePointerClick, ZoomOut } from 'lucide-react'
import Counter from '@/components/ui/Counter'
import MapLegend from './MapLegend'
import { cn } from '@/lib/cn'
import { arcBetween, indiaFeature, useWorldFeatures } from '@/lib/geo'
import { continentCount, india, sourceLabel, sourcingCountries } from '@/data/countries'
import { customerCities, wholesaleOutlets } from '@/data/network'

const WIDTH = 1000
const COLORS = {
  fresh: '#8BC34A',
  dry: '#F28C28',
  india: '#C62839',
  gold: '#F5B83D',
  land: '#1D4A2B',
  border: '#0F2E19',
}

const countryByIso = Object.fromEntries(sourcingCountries.map((c) => [c.isoNumeric, c]))
const dubai = sourcingCountries.find((c) => c.id === 'uae')

const onActivateKey = (handler) => (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handler()
  }
}

// Section 11: the signature world map. Only Mangal India's countries glow; arcs carry
// trade into India and a gold arc carries Indian produce out to Dubai. Arcs are
// illustrative of trade direction, not literal shipping routes.
export default function WorldMap({ className }) {
  const features = useWorldFeatures()
  const wrapperRef = useRef(null)
  const inView = useInView(wrapperRef, { once: true, margin: '-120px' })
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(null)
  const [zoomed, setZoomed] = useState(false)
  const uid = useId().replace(/:/g, '')
  const splitId = `split-${uid}`
  const glowId = `glow-${uid}`
  const arrowId = `arrow-${uid}`

  const geo = useMemo(() => {
    if (!features) return null
    // Fit to the width; the height follows the land extent so there's no empty ocean band.
    const collection = { type: 'FeatureCollection', features }
    const projection = geoEqualEarth().fitWidth(WIDTH, collection)
    const path = geoPath(projection)
    const height = Math.ceil(path.bounds(collection)[1][1]) + 4
    const indiaPoint = projection(india.coordinates)
    const [[x0, y0], [x1, y1]] = path.bounds(indiaFeature)
    const k = Math.min(WIDTH / (x1 - x0), height / (y1 - y0)) * 0.82
    const cx = (x0 + x1) / 2
    const cy = (y0 + y1) / 2

    return {
      height,
      graticule: path(geoGraticule10()),
      shapes: features.map((f) => ({ id: f.id, d: path(f), country: countryByIso[f.id] })),
      india: path(indiaFeature),
      indiaPoint,
      anchors: Object.fromEntries(sourcingCountries.map((c) => [c.id, projection(c.coordinates)])),
      inbound: sourcingCountries.map((c) => ({
        country: c,
        ...arcBetween(projection(c.coordinates), indiaPoint, c.id === 'uae' ? 0.5 : 0.28),
      })),
      outbound: arcBetween(indiaPoint, projection(dubai.coordinates), -0.6),
      outlets: wholesaleOutlets.map((city) => ({ ...city, point: projection(city.coordinates) })),
      customers: customerCities.map((city) => ({ ...city, point: projection(city.coordinates) })),
      zoom: { k, tx: WIDTH / 2 - k * cx, ty: height / 2 - k * cy },
    }
  }, [features])

  // On narrow screens the map pans horizontally; start it centred on India.
  const scrollRef = useRef(null)
  useEffect(() => {
    const el = scrollRef.current
    if (!geo || !el || el.scrollWidth <= el.clientWidth) return
    el.scrollLeft = (geo.indiaPoint[0] / WIDTH) * el.scrollWidth - el.clientWidth / 2
  }, [geo])

  const fillFor = (country) => {
    const fresh = country.sources.includes('fresh')
    const dry = country.sources.includes('dry')
    if (fresh && dry) return `url(#${splitId})`
    return fresh ? COLORS.fresh : COLORS.dry
  }

  const activeCountry = sourcingCountries.find((c) => c.id === active)
  const k = zoomed && geo ? geo.zoom.k : 1
  const drawn = inView || reduceMotion
  const arcTransition = (i) => ({ duration: 1.1, delay: 0.3 + i * 0.12, ease: 'easeInOut' })
  const outboundDelay = 0.3 + sourcingCountries.length * 0.12 + 0.4
  const pct = ([x, y]) => ({ left: `${(x / WIDTH) * 100}%`, top: `${(y / geo.height) * 100}%` })

  const toggleZoom = () => {
    setActive(null)
    setZoomed((value) => !value)
  }

  const countryHandlers = (id) => ({
    onMouseEnter: () => setActive(id),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(id),
    onBlur: () => setActive(null),
    onClick: (event) => {
      event.stopPropagation()
      setActive(id)
    },
  })

  return (
    <div ref={wrapperRef} className={cn('relative overflow-hidden rounded-3xl border border-white/10 bg-forest-900', className)}>
      <div ref={scrollRef} className="overflow-x-auto overscroll-x-contain [scrollbar-width:thin]">
        <div className="relative min-w-[760px]">
          {!geo ? (
            <div className="aspect-[2/1] w-full animate-pulse bg-forest/40" aria-label="Loading map" />
          ) : (
            <svg
              viewBox={`0 0 ${WIDTH} ${geo.height}`}
              className="block h-auto w-full"
              role="group"
              aria-label="World map of Mangal India's 12 sourcing countries, India and the export route to Dubai"
              onClick={() => setActive(null)}
            >
              <defs>
                <linearGradient id={splitId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor={COLORS.fresh} />
                  <stop offset="50%" stopColor={COLORS.dry} />
                </linearGradient>
                <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker id={arrowId} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M0 0L10 5L0 10z" fill={COLORS.gold} />
                </marker>
              </defs>

              <g
                style={{
                  transform: `matrix(${k},0,0,${k},${zoomed ? geo.zoom.tx : 0},${zoomed ? geo.zoom.ty : 0})`,
                  transformBox: 'view-box',
                  transformOrigin: '0 0',
                  transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <path d={geo.graticule} fill="none" stroke="#fff" strokeOpacity="0.06" strokeWidth={0.6 / k} />

                {geo.shapes.map((shape) =>
                  shape.country ? (
                    <path
                      key={shape.id}
                      d={shape.d}
                      fill={fillFor(shape.country)}
                      stroke={COLORS.border}
                      strokeWidth={0.6 / k}
                      tabIndex={zoomed ? -1 : 0}
                      role="button"
                      aria-label={`${shape.country.name}: ${sourceLabel(shape.country)}`}
                      className={cn(
                        'cursor-pointer outline-none transition-[filter,opacity] duration-200 focus-visible:brightness-125',
                        active && active !== shape.country.id && 'opacity-60',
                        active === shape.country.id && 'brightness-125',
                      )}
                      {...countryHandlers(shape.country.id)}
                    />
                  ) : (
                    <path key={shape.id} d={shape.d} fill={COLORS.land} stroke={COLORS.border} strokeWidth={0.5 / k} />
                  ),
                )}

                <path
                  d={geo.india}
                  fill={COLORS.india}
                  stroke="#FF8A95"
                  strokeOpacity="0.5"
                  strokeWidth={0.8 / k}
                  filter={`url(#${glowId})`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={zoomed}
                  aria-label={zoomed ? 'India network view. Activate to return to the world view.' : 'India, home market. Activate to zoom to the India network.'}
                  className="cursor-pointer outline-none focus-visible:brightness-125"
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleZoom()
                  }}
                  onKeyDown={onActivateKey(toggleZoom)}
                />

                {/* Inbound arcs: trade flowing into India */}
                <g className={cn('pointer-events-none transition-opacity duration-500', zoomed && 'opacity-0')}>
                  {geo.inbound.map(({ country, d }, i) => {
                    const color = country.sources.includes('fresh') ? COLORS.fresh : COLORS.dry
                    return (
                      <g key={country.id}>
                        <motion.path
                          d={d}
                          fill="none"
                          stroke={color}
                          strokeWidth="1.4"
                          strokeOpacity="0.55"
                          strokeLinecap="round"
                          initial={reduceMotion ? false : { pathLength: 0 }}
                          animate={drawn ? { pathLength: 1 } : undefined}
                          transition={arcTransition(i)}
                        />
                        <motion.path
                          d={d}
                          fill="none"
                          stroke="#fff"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeDasharray="2 10"
                          className="animate-dash-flow"
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={drawn ? { opacity: 0.55 } : undefined}
                          transition={{ duration: 0.6, delay: arcTransition(i).delay + 1 }}
                        />
                        <circle cx={geo.anchors[country.id][0]} cy={geo.anchors[country.id][1]} r="2.2" fill="#fff" opacity="0.9" />
                      </g>
                    )
                  })}

                  {/* Outbound arc: India → Dubai */}
                  <motion.path
                    d={geo.outbound.d}
                    fill="none"
                    stroke={COLORS.gold}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    markerEnd={`url(#${arrowId})`}
                    initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={drawn ? { pathLength: 1, opacity: 1 } : undefined}
                    transition={{ duration: 0.9, delay: outboundDelay, ease: 'easeOut' }}
                  />
                </g>

                {/* Dubai marker: gold ring with pulsing halo */}
                <g
                  transform={`translate(${geo.anchors.uae[0]} ${geo.anchors.uae[1]}) scale(${1 / k})`}
                  className={cn('transition-opacity duration-500', zoomed ? 'opacity-0' : 'cursor-pointer')}
                  tabIndex={zoomed ? -1 : 0}
                  role="button"
                  aria-label={`${dubai.name}: ${sourceLabel(dubai)}. ${dubai.role}.`}
                  {...countryHandlers('uae')}
                >
                  <circle r="7" fill="none" stroke={COLORS.gold} strokeWidth="1.5" className="origin-center animate-pulse-ring [transform-box:fill-box]" />
                  <circle r="6" fill={COLORS.border} stroke={COLORS.gold} strokeWidth="2.5" />
                  <circle r="2.2" fill={COLORS.gold} />
                </g>

                {/* India network: outlet dots and customer-city rings */}
                <g className="pointer-events-none">
                  {geo.customers.map((city) => (
                    <g key={city.id} transform={`translate(${city.point[0]} ${city.point[1]})`}>
                      <circle r={zoomed ? 4.5 / k : 1.5} fill="none" stroke="#fff" strokeWidth={zoomed ? 1.5 / k : 0.6} />
                      <text
                        x={(city.label.dx * 0.8) / k}
                        y={(city.label.dy * 0.8) / k}
                        textAnchor={city.label.anchor}
                        fontSize={10 / k}
                        fill="#fff"
                        className={cn('font-sans transition-opacity duration-300', zoomed ? 'opacity-90 delay-500' : 'opacity-0')}
                      >
                        {city.name}
                      </text>
                    </g>
                  ))}
                  {geo.outlets.map((city) => (
                    <g key={city.id} transform={`translate(${city.point[0]} ${city.point[1]})`}>
                      <circle r={zoomed ? 5 / k : 1.8} fill={COLORS.gold} stroke={COLORS.border} strokeWidth={zoomed ? 1.2 / k : 0.4} />
                      <text
                        x={(city.label.dx * 0.8) / k}
                        y={(city.label.dy * 0.8) / k}
                        textAnchor={city.label.anchor}
                        fontSize={11 / k}
                        fontWeight="700"
                        fill="#fff"
                        className={cn('font-sans transition-opacity duration-300', zoomed ? 'opacity-100 delay-500' : 'opacity-0')}
                      >
                        {city.name}
                      </text>
                    </g>
                  ))}
                </g>
              </g>
            </svg>
          )}

          {/* Dubai and export-route labels */}
          {geo && (
            <div className={cn('pointer-events-none transition-opacity duration-500', zoomed ? 'opacity-0' : 'opacity-100')}>
              <motion.div
                className="absolute -translate-x-full -translate-y-[150%] pr-3"
                style={pct(geo.anchors.uae)}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={drawn ? { opacity: 1 } : undefined}
                transition={{ delay: outboundDelay }}
              >
                <span className="whitespace-nowrap rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold text-forest-dark shadow-lift">
                  Dubai — sourcing hub and first export destination
                </span>
              </motion.div>
              {/* Positioning lives on the outer div: framer's inline transform would override translate classes. */}
              <div className="absolute -translate-x-full translate-y-6 pr-4" style={pct(geo.outbound.mid)}>
                <motion.span
                  className="block whitespace-nowrap rounded-lg border border-gold/50 bg-forest-900/90 px-2.5 py-1.5 text-[11px] font-medium text-gold backdrop-blur"
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={drawn ? { opacity: 1, y: 0 } : undefined}
                  transition={{ delay: outboundDelay + 0.6 }}
                >
                  Rice · Mangoes · Vegetables · Premium Retail Shop
                </motion.span>
              </div>
            </div>
          )}

          {/* Country tooltip */}
          <AnimatePresence>
            {geo && activeCountry && !zoomed && (
              <motion.div
                key={activeCountry.id}
                role="status"
                className="pointer-events-none absolute z-10"
                style={pct(geo.anchors[activeCountry.id])}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div className="-translate-x-1/2 -translate-y-[calc(100%+14px)] whitespace-nowrap rounded-xl bg-white px-3.5 py-2.5 text-left shadow-lift">
                  <p className="font-display text-base font-semibold text-forest">{activeCountry.name}</p>
                  <p className="text-xs font-medium text-ink-muted">{sourceLabel(activeCountry)}</p>
                  {activeCountry.role && <p className="mt-0.5 text-xs font-semibold text-gold-dark">{activeCountry.role}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Counter overlay (top-left) */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/10 bg-forest/80 px-4 py-3 text-white shadow-lift backdrop-blur-md sm:left-6 sm:top-6">
        {zoomed ? (
          <p className="text-sm font-semibold">
            <span className="font-display text-2xl font-bold text-gold">4</span> outlets ·{' '}
            <span className="font-display text-2xl font-bold text-gold">10+</span> distribution centres
          </p>
        ) : (
          <p className="text-sm font-semibold">
            <Counter value={sourcingCountries.length} className="font-display text-2xl font-bold text-gold" /> countries ·{' '}
            <Counter value={continentCount} className="font-display text-2xl font-bold text-gold" /> continents
          </p>
        )}
      </div>

      {zoomed && (
        <button
          type="button"
          onClick={toggleZoom}
          className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest shadow-lift transition hover:bg-gold sm:right-6 sm:top-6"
        >
          <ZoomOut aria-hidden="true" className="h-4 w-4" />
          Back to world view
        </button>
      )}

      {/* Legend bar */}
      <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <MapLegend />
        <p className="flex shrink-0 items-center gap-2 text-xs text-white/55">
          <MousePointerClick aria-hidden="true" className="hidden h-4 w-4 sm:block" />
          <Hand aria-hidden="true" className="h-4 w-4 sm:hidden" />
          <span className="sm:hidden">Swipe to explore · tap a country · tap India to zoom</span>
          <span className="hidden sm:inline">
            {zoomed ? 'Click India again to return to the world view' : 'Hover a country for details · click India to zoom in'}
          </span>
        </p>
      </div>
    </div>
  )
}
