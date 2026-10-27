import { useEffect, useState } from 'react'
import { geoArea } from 'd3-geo'
import { feature } from 'topojson-client'
import indiaGeo from '@/data/geo/india.json'

// India outline from Natural Earth's India point-of-view dataset (official boundaries).
// It is drawn over the world-atlas shapes, which use de facto boundaries.
export const indiaFeature = ensureClockwise(indiaGeo.features[0])

// d3-geo treats counter-clockwise rings as "everything except this shape".
function ensureClockwise(geoFeature) {
  if (geoArea(geoFeature) <= 2 * Math.PI) return geoFeature
  const { type, coordinates } = geoFeature.geometry
  const reverseRings = (polygon) => polygon.map((ring) => [...ring].reverse())
  return {
    ...geoFeature,
    geometry: {
      type,
      coordinates: type === 'Polygon' ? reverseRings(coordinates) : coordinates.map(reverseRings),
    },
  }
}

let worldPromise

// World country shapes (~108 KB), loaded once and only when a map needs them.
export function loadWorldFeatures() {
  worldPromise ??= import('world-atlas/countries-110m.json').then(({ default: topology }) => {
    const { features } = feature(topology, topology.objects.countries)
    return features.filter((f) => f.id !== '010') // drop Antarctica
  })
  return worldPromise
}

export function useWorldFeatures() {
  const [features, setFeatures] = useState(null)
  useEffect(() => {
    let active = true
    loadWorldFeatures().then((result) => active && setFeatures(result))
    return () => {
      active = false
    }
  }, [])
  return features
}

// Curved trade arc between two projected points. Positive `bend` curves above the
// straight line, negative below. Returns the path and its midpoint (for labels).
export function arcBetween([x1, y1], [x2, y2], bend = 0.3) {
  const dx = x2 - x1
  const dy = y2 - y1
  const length = Math.hypot(dx, dy) || 1
  let nx = -dy / length
  let ny = dx / length
  if (ny > 0) {
    nx = -nx
    ny = -ny
  }
  const cx = (x1 + x2) / 2 + nx * length * bend
  const cy = (y1 + y2) / 2 + ny * length * bend
  return {
    d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`,
    mid: [(x1 + 2 * cx + x2) / 4, (y1 + 2 * cy + y2) / 4],
  }
}
