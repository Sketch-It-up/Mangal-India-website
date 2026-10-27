// The 12 sourcing countries (Sections 2, 8 and 11).
// `isoNumeric` matches world-atlas TopoJSON ids, used by the world map.
// `coordinates` are [longitude, latitude] anchor points for map arcs.

export const sourcingCountries = [
  { id: 'turkey', name: 'Turkey', isoNumeric: '792', sources: ['fresh'], continent: 'Europe', coordinates: [35.2, 39.0] },
  { id: 'south-africa', name: 'South Africa', isoNumeric: '710', sources: ['fresh'], continent: 'Africa', coordinates: [24.7, -29.0] },
  { id: 'new-zealand', name: 'New Zealand', isoNumeric: '554', sources: ['fresh'], continent: 'Oceania', coordinates: [172.5, -41.5] },
  { id: 'china', name: 'China', isoNumeric: '156', sources: ['fresh'], continent: 'Asia', coordinates: [104.2, 35.9] },
  { id: 'italy', name: 'Italy', isoNumeric: '380', sources: ['fresh'], continent: 'Europe', coordinates: [12.6, 42.8] },
  { id: 'usa', name: 'USA', isoNumeric: '840', sources: ['fresh'], continent: 'North America', coordinates: [-98.6, 39.8] },
  { id: 'chile', name: 'Chile', isoNumeric: '152', sources: ['fresh', 'dry'], continent: 'South America', coordinates: [-71.5, -35.7] },
  { id: 'poland', name: 'Poland', isoNumeric: '616', sources: ['fresh'], continent: 'Europe', coordinates: [19.1, 51.9] },
  { id: 'afghanistan', name: 'Afghanistan', isoNumeric: '004', sources: ['dry'], continent: 'Asia', coordinates: [67.7, 33.9] },
  { id: 'oman', name: 'Oman', isoNumeric: '512', sources: ['dry'], continent: 'Asia', coordinates: [57.0, 21.5] },
  { id: 'iraq', name: 'Iraq', isoNumeric: '368', sources: ['dry'], continent: 'Asia', coordinates: [43.7, 33.2] },
  {
    id: 'uae',
    name: 'Dubai (UAE)',
    isoNumeric: '784',
    sources: ['dry'],
    continent: 'Asia',
    coordinates: [55.27, 25.2],
    role: 'Sourcing hub and first export destination',
  },
]

export const india = { id: 'india', name: 'India', isoNumeric: '356', coordinates: [78.9, 22.5] }

export const sourceLabel = (country) => {
  const fresh = country.sources.includes('fresh')
  const dry = country.sources.includes('dry')
  if (fresh && dry) return 'Fresh and dry fruits'
  return fresh ? 'Fresh fruits' : 'Dry fruits'
}

export const freshFruitCountries = sourcingCountries.filter((c) => c.sources.includes('fresh'))
export const dryFruitCountries = sourcingCountries.filter((c) => c.sources.includes('dry'))
export const continentCount = new Set(sourcingCountries.map((c) => c.continent)).size
