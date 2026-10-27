import { Link } from 'react-router-dom'
import { ArrowRight, Store } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import RouteMap from '@/components/map/RouteMap'
import EnquiryChecklist from '@/components/page/EnquiryChecklist'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { exportsPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/exports/']

// Exports (Section 9): intro + route map → export range → Dubai shop → how to enquire.
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
        visual={<RouteMap label="Rice · Mangoes · Vegetables · Premium Retail Shop" />}
      />

      {/* Our export range */}
      <section className="py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="From India" title={page.rangeHeading} />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {page.range.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.08}>
                <Link
                  to={item.to}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center bg-gold-light">
                    <span aria-hidden="true" className="absolute aspect-square h-[80%] rounded-full bg-white/70" />
                    <ProduceArt type={item.slug} className="relative h-[62%] w-[62%] transition-transform duration-500 group-hover:scale-110" />
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

      {/* Dubai shop + how to enquire */}
      <section className="pb-24 lg:pb-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Link
              to="/exports/dubai-retail-shop/"
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-gold p-7 text-forest-dark transition hover:-translate-y-1 hover:shadow-lift sm:p-9"
            >
              <div aria-hidden="true" className="absolute -bottom-10 -right-6 flex w-48 gap-2 opacity-90">
                <ProduceArt type="dates" className="h-auto w-1/2" />
                <ProduceArt type="oranges" className="h-auto w-1/2" />
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-gold">
                  <Store aria-hidden="true" className="h-6 w-6" />
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
