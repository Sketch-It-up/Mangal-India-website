import { Plane } from 'lucide-react'
import RouteMap from '@/components/map/RouteMap'
import EnquiryChecklist from '@/components/page/EnquiryChecklist'
import PageHero from '@/components/page/PageHero'
import RelatedLinks from '@/components/page/RelatedLinks'
import Seo from '@/components/seo/Seo'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { airExport } from '@/data/exports'
import { airExportPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/exports/mangoes-and-vegetables/']

const products = [
  { slug: 'mangoes', heading: 'Mangoes', text: airExport.mangoes },
  { slug: 'vegetables', heading: 'Fresh vegetables', text: airExport.vegetables },
]

const related = [
  { label: 'All Exports', to: '/exports/' },
  { label: 'Dubai Retail Shop', to: '/exports/dubai-retail-shop/' },
  { label: 'International Buyers', to: '/trade-with-us/international-buyers/' },
  { label: 'Contact', to: '/contact/' },
]

// Mangoes & Fresh Vegetables (Section 9): intro + air route → mangoes → vegetables →
// what to include → CTA.
export default function AirExportPage() {
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero
        route={route}
        tone="gold"
        eyebrow="Air Export"
        intro={airExportPage.intro}
        ctas={[airExportPage.cta, airExportPage.secondaryCta]}
        visual={<RouteMap label="Mangoes · Fresh vegetables · By air" />}
      />

      <section className="py-20 lg:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <article className="group grid h-full items-center gap-6 overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-card sm:grid-cols-[180px_1fr] sm:p-8">
                <div className="mx-auto aspect-[4/3] w-full max-w-xs overflow-hidden rounded-2xl bg-white">
                  <img
                    src={`/images/products/${product.slug}.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">
                    <Plane aria-hidden="true" className="h-3.5 w-3.5" /> By air
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-forest">{product.heading}</h2>
                  <p className="mt-3 text-[17px] leading-relaxed text-ink-muted">{product.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="pb-24 lg:pb-28">
        <Container className="grid gap-6 lg:grid-cols-3">
          <EnquiryChecklist
            heading={airExportPage.checklistHeading}
            items={airExport.checklist}
            cta={airExportPage.cta}
            className="lg:col-span-2"
          />
          <RelatedLinks links={related} />
        </Container>
      </section>
    </>
  )
}
