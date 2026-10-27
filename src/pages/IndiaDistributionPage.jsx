import { MapPin, Warehouse } from 'lucide-react'
import IndiaMap from '@/components/map/IndiaMap'
import CtaBand from '@/components/page/CtaBand'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { customerCities, distributionCentres, wholesaleOutlets } from '@/data/network'
import { indiaDistributionPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/global-network/india-distribution/']

// India Distribution Network (Section 8): intro + map → four outlets → distribution
// centres → customer cities → buyer enquiry.
export default function IndiaDistributionPage() {
  const page = indiaDistributionPage

  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero
        route={route}
        eyebrow="India Distribution"
        intro={page.intro}
        ctas={[page.cta, page.secondaryCta]}
        visual={
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-6 rounded-full bg-white/80 blur-3xl" />
            <IndiaMap className="relative mx-auto max-w-[480px]" />
            <ul className="relative mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-3 w-3 rounded-full bg-forest" />
                Wholesale market outlet
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-3 w-3 rounded-full border-[2.5px] border-tangerine-dark bg-white" />
                Customer city
              </li>
            </ul>
          </div>
        }
      />

      {/* Four wholesale market outlets */}
      <section className="bg-forest py-20 text-white lg:py-24">
        <Container>
          <SectionHeading tone="dark" eyebrow={`${wholesaleOutlets.length} outlets`} title="Wholesale market outlets" />
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {wholesaleOutlets.map((city, i) => (
              <Reveal as="li" key={city.id} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-gold/40 hover:bg-white/10 sm:p-7">
                  <span aria-hidden="true" className="font-display text-sm font-semibold tracking-[0.2em] text-white/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-8 flex h-11 w-11 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                    <MapPin aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">{city.name}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Distribution centres + customer cities */}
      <section className="py-20 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-gold-light p-8 sm:p-10">
            <div aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gold/30 blur-2xl" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-gold">
              <Warehouse aria-hidden="true" className="h-7 w-7" />
            </span>
            <h2 className="relative mt-6 font-display text-2xl font-bold text-forest sm:text-3xl">
              <span className="block text-stat">{distributionCentres}</span>
              {page.centres.heading.replace(distributionCentres, '').trim()}
            </h2>
            <p className="relative mt-4 text-[17px] leading-relaxed text-ink-muted">{page.centres.text}</p>
          </Reveal>

          <Reveal delay={0.08} className="rounded-[2rem] bg-sage p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-forest sm:text-3xl">Pan-India customers</h2>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {customerCities.map((city) => (
                <li key={city.id} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 font-medium text-ink shadow-sm">
                  <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full border-[2.5px] border-tangerine-dark" />
                  {city.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBand heading={page.buy.heading} text={page.buy.text} ctas={[page.cta, page.secondaryCta]} art={['apples', 'almonds']} />
    </>
  )
}
