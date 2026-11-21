import { Link } from 'react-router-dom'
import { ArrowRight, Check, Warehouse, Tractor } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import RouteMap from '@/components/map/RouteMap'
import EnquiryChecklist from '@/components/page/EnquiryChecklist'
import ProductCard from '@/components/sections/ProductCard'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { exportsGrower, exportsPage } from '@/data/pages'
import { spiceExports } from '@/data/products'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/exports/']

// Exports (Section 9): intro + route map → export range → spices & coffee → Dubai distribution center → how to enquire.
export default function ExportsPage() {
  const page = exportsPage

  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero
        route={route}
        tone="forest"
        eyebrow="Exports"
        intro={page.intro}
        ctas={[page.cta, page.secondaryCta]}
        visual={<RouteMap label="Fruits · Vegetables · Rice · Wholesale Distribution" />}
      />

      {/* Our export range */}
      <section className="py-14 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="From India" title={page.rangeHeading} />
          <ul className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {page.range.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.08}>
                <Link
                  to={item.to}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    <img
                      src={`/images/products/${item.slug}.jpg`}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl font-semibold text-forest">{item.title}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-ink-muted">{item.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-leaf-dark">
                      Learn more
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Spices & Coffee: kept apart from the fresh fruit and vegetables */}
      <section className="pb-14 sm:pb-20 lg:pb-24">
        <Container>
          <SectionHeading eyebrow="From India" title={page.spices.heading} intro={page.spices.text} />
          <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:gap-8">
            {spiceExports.map((product, i) => (
              <Reveal as="li" key={product.slug} delay={i * 0.06}>
                <ProductCard product={product} compact />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Grower-exporter: our own farms + the fresh-produce list */}
      <section className="bg-sage py-14 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-gold">
              <Tractor aria-hidden="true" className="h-6 w-6" />
            </span>
            <SectionHeading className="mt-6" eyebrow={exportsGrower.eyebrow} title={exportsGrower.heading} intro={exportsGrower.text} />
            <Button to={exportsGrower.cta.to} icon={ArrowRight} className="mt-7 w-full sm:mt-8 sm:w-auto">
              {exportsGrower.cta.label}
            </Button>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-card">
              <img
                src="/images/farm/field-05.jpg"
                alt="A worker tending rows of young plants on one of Mangal India's own farms."
                width="1600"
                height="900"
                loading="lazy"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-5 sm:p-9">
              <h3 className="font-display text-2xl font-bold text-forest">{exportsGrower.produceHeading}</h3>
              <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
                {exportsGrower.produce.map((item) => (
                  <li key={item} className="flex min-w-0 items-center gap-2 rounded-xl bg-sage px-3 py-2.5 text-sm font-medium text-ink sm:gap-3 sm:px-4 sm:py-3 sm:text-base">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-white sm:h-6 sm:w-6">
                      <Check aria-hidden="true" className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Dubai distribution center + how to enquire */}
      <section className="py-14 sm:py-20 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Link
              to="/exports/dubai-wholesale-distribution/"
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-gold p-7 text-forest-dark transition hover:-translate-y-1 hover:shadow-lift sm:p-9"
            >
              <div aria-hidden="true" className="absolute -bottom-10 -right-6 flex w-48 gap-2 opacity-90">
                <ProduceArt type="dates" className="h-auto w-1/2" />
                <ProduceArt type="oranges" className="h-auto w-1/2" />
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-gold">
                  <Warehouse aria-hidden="true" className="h-6 w-6" />
                </span>
                <Badge tone="forest" className="bg-white/60">
                  Set to open
                </Badge>
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold sm:text-3xl">{page.shop.heading}</h2>
              <p className="relative mt-3 max-w-md text-[17px] leading-relaxed text-forest-dark/85">{page.shop.text}</p>
              <span className="relative mt-auto inline-flex items-center gap-2 pt-8 font-semibold">
                {page.secondaryCta.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <EnquiryChecklist heading={page.enquire.heading} text={page.enquire.text} cta={page.cta} className="h-full" />
          </Reveal>
        </Container>
      </section>
    </>
  )
}
