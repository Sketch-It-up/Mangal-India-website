import { ArrowRight } from 'lucide-react'
import WorldMap from '@/components/map/WorldMap'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { dryFruitCountries, freshFruitCountries } from '@/data/countries'
import { mapSection } from '@/data/home'

const lists = [
  { title: 'Fresh-fruit sourcing countries', countries: freshFruitCountries, dot: 'bg-leaf-dark' },
  { title: 'Dry-fruit sourcing countries', countries: dryFruitCountries, dot: 'bg-tangerine' },
]

// Section 3 — world map on a light sage band.
export default function WorldMapSection() {
  return (
    <section className="bg-sage py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Global Network" title={mapSection.heading} intro={mapSection.intro} />
          <Button to={mapSection.cta.to} icon={ArrowRight} className="shrink-0 self-start lg:self-end">
            {mapSection.cta.label}
          </Button>
        </div>

        <Reveal className="mt-12">
          <WorldMap />
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {lists.map((list) => (
            <div key={list.title} className="rounded-2xl border border-forest/10 bg-white p-6 shadow-card">
              <h3 className="flex items-center gap-2.5 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-forest">
                <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${list.dot}`} />
                {list.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {list.countries.map((country) => (
                  <li key={country.id} className="rounded-full bg-sage px-3 py-1.5 text-sm text-ink">
                    {country.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
