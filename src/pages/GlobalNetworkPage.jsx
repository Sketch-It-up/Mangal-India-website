import { Link } from 'react-router-dom'
import { ArrowRight, MapPinned, Plane } from 'lucide-react'
import WorldMap from '@/components/map/WorldMap'
import CtaBand from '@/components/page/CtaBand'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { continentCount, sourceLabel, sourcingCountries } from '@/data/countries'
import { globalNetworkPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'
import { site } from '@/data/site'

const route = routeByPath['/global-network/']

const swatches = {
  fresh: <span className="h-5 w-5 rounded-md bg-leaf" />,
  dry: <span className="h-5 w-5 rounded-md bg-tangerine" />,
  both: <span className="h-5 w-5 rounded-md bg-[linear-gradient(180deg,#8BC34A_50%,#F28C28_50%)]" />,
  india: <span className="h-5 w-5 rounded-md bg-pomegranate" />,
  dubai: <span className="h-5 w-5 rounded-full border-[3px] border-gold" />,
  arcs: (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M2 18Q12 2 22 14" fill="none" stroke="#8BC34A" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  ),
}

const kindOf = (country) => (country.sources.length > 1 ? 'both' : country.sources[0])
const cardAccent = { fresh: 'bg-leaf', dry: 'bg-tangerine', both: 'bg-[linear-gradient(90deg,#8BC34A_50%,#F28C28_50%)]' }

// Global Network (Section 8): map first, then the country list, where we supply,
// how to read the map and the CTA.
export default function GlobalNetworkPage() {
  const { supply, howToRead } = globalNetworkPage

  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero
        route={route}
        tone="forest"
        eyebrow="Global Network"
        intro={globalNetworkPage.intro}
        ctas={[globalNetworkPage.cta, globalNetworkPage.secondaryCta]}
        tight
      />
      <section className="bg-forest pb-20 lg:pb-24">
        <Container>
          <Reveal y={16}>
            <WorldMap />
          </Reveal>
        </Container>
      </section>

      {/* Where we source: full text list of countries and roles */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow={`${sourcingCountries.length} countries · ${continentCount} continents`} title={globalNetworkPage.sourceHeading} />
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <Link to="/products/fresh-fruits/" className="inline-flex items-center gap-1.5 text-leaf-dark hover:underline">
                Fresh Fruits <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link to="/products/dry-fruits/" className="inline-flex items-center gap-1.5 text-tangerine-dark hover:underline">
                Dry Fruits <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {sourcingCountries.map((country, i) => (
              <Reveal as="li" key={country.id} delay={(i % 4) * 0.05}>
                <div
                  className={cn(
                    'relative h-full overflow-hidden rounded-2xl border bg-white p-4 shadow-card sm:p-5',
                    country.role ? 'border-gold/60' : 'border-forest/5',
                  )}
                >
                  <span aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-1', cardAccent[kindOf(country)])} />
                  <p className="font-display text-lg font-semibold text-forest sm:text-xl">{country.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{sourceLabel(country)}</p>
                  <p className={cn('mt-3 text-xs font-semibold', country.role ? 'text-gold-dark' : 'text-ink-muted/80')}>
                    {country.role ?? (country.sources.length > 1 ? 'Sourcing country (both)' : 'Sourcing country')}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Where we supply */}
      <section className="bg-sage py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Into India · Out to Dubai" title={supply.heading} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <Link
                to="/global-network/india-distribution/"
                className="group flex h-full flex-col rounded-[1.75rem] bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pomegranate-light text-pomegranate">
                  <MapPinned aria-hidden="true" className="h-6 w-6" />
                </span>
                <p className="mt-6 flex-1 text-[17px] leading-relaxed text-ink">{supply.india}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-leaf-dark">
                  India Distribution Network
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-[1.75rem] bg-forest p-8 text-white shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-forest-dark">
                  <Plane aria-hidden="true" className="h-6 w-6" />
                </span>
                <p className="mt-6 flex-1 text-[17px] leading-relaxed text-white/85">{supply.abroad}</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-gold">
                  <Link to="/exports/" className="inline-flex items-center gap-2 hover:underline">
                    Exports <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link to="/exports/dubai-retail-shop/" className="inline-flex items-center gap-2 hover:underline">
                    Dubai Retail Shop <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How to read the map */}
      <section className="py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Map key" title={howToRead.heading} />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {howToRead.items.map((item) => (
              <li key={item.key} className="flex items-start gap-4 rounded-2xl border border-forest/10 bg-white p-5">
                <span aria-hidden="true" className="mt-0.5 flex shrink-0">
                  {swatches[item.key]}
                </span>
                <p className="leading-relaxed text-ink-muted">
                  <span className="font-semibold text-forest">{item.label}</span> — {item.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand heading={site.tagline} ctas={[globalNetworkPage.cta, globalNetworkPage.secondaryCta]} art={['oranges', 'dates']} />
    </>
  )
}
