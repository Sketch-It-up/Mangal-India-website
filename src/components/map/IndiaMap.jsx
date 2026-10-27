import { useId, useMemo } from 'react'
import { motion } from 'framer-motion'
import { geoMercator, geoPath } from 'd3-geo'
import { cn } from '@/lib/cn'
import { indiaFeature } from '@/lib/geo'
import { customerCities, wholesaleOutlets } from '@/data/network'

const WIDTH = 420
const HEIGHT = 470

// India outline (official boundaries) with the four wholesale outlets and five customer cities.
export default function IndiaMap({ className }) {
  const uid = useId().replace(/:/g, '')
  const clipId = `india-clip-${uid}`
  const dotsId = `india-dots-${uid}`
  const shadowId = `india-shadow-${uid}`

  const geo = useMemo(() => {
    // Extra room on the left for west-coast labels (Ahmedabad, Mumbai, Kochi).
    const projection = geoMercator().fitExtent(
      [
        [64, 16],
        [WIDTH - 16, HEIGHT - 16],
      ],
      indiaFeature,
    )
    const place = (city) => ({ ...city, point: projection(city.coordinates) })
    return {
      outline: geoPath(projection)(indiaFeature),
      outlets: wholesaleOutlets.map(place),
      customers: customerCities.map(place),
    }
  }, [])

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="Map of India marking Mumbai, Chennai, Delhi and Bengaluru wholesale outlets and customer cities Ahmedabad, Pune, Kochi, Kolkata and Jaipur."
    >
      <defs>
        <clipPath id={clipId}>
          <path d={geo.outline} />
        </clipPath>
        <pattern id={dotsId} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="#1E4D2B" opacity="0.13" />
        </pattern>
        <filter id={shadowId} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1E4D2B" floodOpacity="0.18" />
        </filter>
      </defs>

      <path d={geo.outline} fill="#fff" filter={`url(#${shadowId})`} />
      <rect width={WIDTH} height={HEIGHT} fill={`url(#${dotsId})`} clipPath={`url(#${clipId})`} />
      <path d={geo.outline} fill="none" stroke="#1E4D2B" strokeOpacity="0.35" strokeWidth="1.4" strokeLinejoin="round" />

      {geo.customers.map((city, i) => (
        <motion.g
          key={city.id}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
          style={{ originX: `${city.point[0]}px`, originY: `${city.point[1]}px` }}
        >
          <circle cx={city.point[0]} cy={city.point[1]} r="5.5" fill="#fff" stroke="#A4530A" strokeWidth="2.5" />
          <text
            x={city.point[0] + city.label.dx}
            y={city.point[1] + city.label.dy}
            textAnchor={city.label.anchor}
            className="fill-ink-muted font-sans text-[12px] font-medium"
          >
            {city.name}
          </text>
        </motion.g>
      ))}

      {geo.outlets.map((city, i) => (
        <motion.g
          key={city.id}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
          style={{ originX: `${city.point[0]}px`, originY: `${city.point[1]}px` }}
        >
          <circle
            cx={city.point[0]}
            cy={city.point[1]}
            r="8"
            fill="#8BC34A"
            className="origin-center animate-pulse-ring [transform-box:fill-box]"
          />
          <circle cx={city.point[0]} cy={city.point[1]} r="7" fill="#1E4D2B" stroke="#fff" strokeWidth="2.5" />
          <text
            x={city.point[0] + city.label.dx}
            y={city.point[1] + city.label.dy}
            textAnchor={city.label.anchor}
            className="fill-forest font-sans text-[13px] font-bold"
          >
            {city.name}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}
