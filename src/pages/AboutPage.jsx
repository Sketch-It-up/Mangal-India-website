import { Link } from 'react-router-dom'
import { ArrowRight, Store, Warehouse } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import StatsBand from '@/components/home/StatsBand'
import IndiaMap from '@/components/map/IndiaMap'
import CountryChips from '@/components/page/CountryChips'
import CtaBand from '@/components/page/CtaBand'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import MediaPlaceholder from '@/components/ui/MediaPlaceholder'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Tbc from '@/components/ui/Tbc'
import { continentCount, dryFruitCountries, freshFruitCountries, sourcingCountries } from '@/data/countries'
import { founder } from '@/data/founder'
import { wholesaleOutlets } from '@/data/network'
import { aboutPage } from '@/data/pages'
import { allProducts } from '@/data/products'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/about/']

// About (Section 6): opening statement → numbers → who we are → range → sourcing →
// India network → leadership → exports and Dubai.
export default function AboutPage() {
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero
        route={route}
        eyebrow="About Mangal India"
        intro={aboutPage.intro}
        overlap
        visual={
          <div className="relative">
            <MediaPlaceholder
              label="Mangal India team inspecting a container of premium fruit (use real photography)."
              tone="forest"
              className="aspect-[5/4] rounded-[2rem] shadow-lift"
            />
            <div aria-hidden="true" className="absolute -left-6 -top-6 w-24 animate-float rounded-full bg-white p-3 shadow-lift sm:w-28">
              <ProduceArt type="oranges" />
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-6 -right-4 w-24 animate-float rounded-full bg-white p-3 shadow-lift sm:w-28"
              style={{ animationDelay: '1.5s' }}
            >
              <ProduceArt type="pistachios" />
            </div>
          </div>
        }
      />
      <StatsBand heading={null} />

      {/* Who we are + A premium range */}
      <section className="py-24 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Our story" title={aboutPage.whoWeAre.heading} />
            <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">{aboutPage.whoWeAre.text}</p>
            <MediaPlaceholder
              label="Wholesale market outlet stocked with imported fruit (use real photography)."
              icon={Store}
              className="mt-10 aspect-[16/9] rounded-2xl"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Our range" title={aboutPage.range.heading} />
            <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">{aboutPage.range.text}</p>
            <ul className="mt-10 grid grid-cols-4 gap-3 sm:grid-cols-5">
              {allProducts.map((product) => (
                <li key={product.slug}>
                  <Link
                    to={product.category === 'fresh' ? '/products/fresh-fruits/' : '/products/dry-fruits/'}
                    className="group flex flex-col items-center gap-1.5 rounded-2xl bg-white p-2.5 text-center shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <ProduceArt type={product.slug} className="h-auto w-full transition-transform group-hover:scale-110" />
                    <span className="text-[11px] font-semibold leading-tight text-forest">{product.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/products/"
                  className="flex h-full flex-col items-center justify-center gap-1 rounded-2xl bg-forest p-2.5 text-center text-white transition hover:-translate-y-0.5 hover:bg-forest-dark"
                >
                  <span className="font-display text-xl font-bold text-gold">16+</span>
                  <span className="text-[11px] font-semibold leading-tight">All products</span>
                </Link>
              </li>
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Global sourcing */}
      <section className="bg-sage py-24 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Global sourcing" title={aboutPage.sourcing.heading} intro={aboutPage.sourcing.text} />
            <div className="mt-8 space-y-6">
              <CountryChips label="Fresh fruits" countries={freshFruitCountries} />
              <CountryChips label="Dry fruits" countries={dryFruitCountries} />
            </div>
            <Button to="/global-network/" variant="secondary" icon={ArrowRight} className="mt-10">
              Explore the Global Map
            </Button>
          </div>
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2rem] bg-forest p-10 text-white shadow-lift">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-leaf/15 blur-2xl" />
              <dl className="relative grid grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <dt className="text-sm font-semibold text-white/70">Countries</dt>
                  <dd className="order-first font-display text-stat font-bold text-gold">{sourcingCountries.length}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-semibold text-white/70">Continents</dt>
                  <dd className="order-first font-display text-stat font-bold text-gold">{continentCount}</dd>
                </div>
              </dl>
              <p className="relative mt-8 border-t border-white/10 pt-6 font-display text-2xl italic text-white">One trusted partner.</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Deep roots in India */}
      <section className="overflow-hidden py-24 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-last lg:order-first">
            <div aria-hidden="true" className="absolute inset-10 rounded-full bg-leaf-light blur-3xl" />
            <IndiaMap className="relative mx-auto max-w-[460px]" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="India network" title={aboutPage.india.heading} intro={aboutPage.india.text} />
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {wholesaleOutlets.map((city) => (
                <li key={city.id} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 font-display text-lg font-semibold text-forest shadow-card">
                  <span aria-hidden="true" className="h-3 w-3 rounded-full bg-forest ring-4 ring-leaf/30" />
                  {city.name}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-3 rounded-xl bg-forest px-4 py-3 text-sm text-white/80">
              <Warehouse aria-hidden="true" className="h-5 w-5 text-leaf" />
              <span>
                <span className="mr-1.5 font-display text-2xl font-bold text-gold">10+</span> distribution centres
              </span>
            </p>
            <Button to="/global-network/india-distribution/" variant="secondary" icon={ArrowRight} className="mt-8">
              View the India Network
            </Button>
          </div>
        </Container>
      </section>

      {/* Our leadership */}
      <section className="bg-sage py-24 lg:py-28">
        <Container>
          <Reveal className="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-white p-6 shadow-card sm:p-10 md:grid-cols-[minmax(0,280px)_1fr] lg:gap-14 lg:p-12">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-3xl bg-gradient-to-br from-forest-600 to-forest">
              {founder.portrait ? (
                <img src={founder.portrait} alt={`Portrait of ${founder.name}, ${founder.title} of Mangal India.`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="font-display text-7xl font-bold text-gold/90">SW</span>
                  <Tbc label="professional portrait" tone="dark" />
                </div>
              )}
            </div>
            <div>
              <SectionHeading eyebrow="Leadership" title={aboutPage.leadership.heading} />
              <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">{aboutPage.leadership.text}</p>
              <p className="mt-6 font-display text-xl font-semibold text-forest">{founder.name}</p>
              <p className="text-sm text-ink-muted">{founder.title}</p>
              <Button to={aboutPage.leadership.cta.to} icon={ArrowRight} className="mt-8">
                {aboutPage.leadership.cta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand heading={aboutPage.world.heading} text={aboutPage.world.text} ctas={aboutPage.world.ctas} art={['rice', 'mangoes']} />
    </>
  )
}
