import ProduceArt from '@/components/art/ProduceArt'
import EnquiryChecklist from '@/components/page/EnquiryChecklist'
import PageHero from '@/components/page/PageHero'
import RelatedLinks from '@/components/page/RelatedLinks'
import Seo from '@/components/seo/Seo'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { riceEnquiryChecklist, riceVarieties } from '@/data/exports'
import { ricePage } from '@/data/pages'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/exports/rice/']

const related = [
  { label: 'All Exports', to: '/exports/' },
  { label: 'International Buyers', to: '/trade-with-us/international-buyers/' },
  { label: 'Mangoes & Vegetables', to: '/exports/mangoes-and-vegetables/' },
  { label: 'Contact', to: '/contact/' },
]

// Chips floating around the hero illustration.
const heroChips = [
  { label: 'Basmati', className: 'left-0 top-[12%]' },
  { label: '1121', className: 'right-[2%] top-[22%]' },
  { label: 'Sona Masoori', className: 'bottom-[14%] left-[4%]' },
  { label: 'Non-basmati', className: 'bottom-[6%] right-0' },
]

// Rice (Section 9): intro → varieties → what to include → CTA.
export default function RicePage() {
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero
        route={route}
        tone="gold"
        eyebrow="Rice Export"
        intro={ricePage.intro}
        ctas={[ricePage.cta, ricePage.secondaryCta]}
        visual={
          <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div className="absolute inset-[10%] rounded-full bg-gold/25" />
            <div className="absolute inset-[18%] flex items-center justify-center rounded-full bg-white shadow-lift">
              <ProduceArt type="rice" className="h-[72%] w-[72%]" />
            </div>
            {heroChips.map((chip, i) => (
              <div key={chip.label} className={cn('absolute', chip.className)}>
                <span
                  className="block animate-float rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white shadow-lift"
                  style={{ animationDelay: `${i * 0.8}s` }}
                >
                  {chip.label}
                </span>
              </div>
            ))}
          </div>
        }
      />

      {/* Varieties */}
      <section className="py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow={`${riceVarieties.length - 1} varieties and more`} title="Varieties" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {riceVarieties.map((variety, i) => {
              const onRequest = i === riceVarieties.length - 1
              return (
                <Reveal as="li" key={variety.name} delay={i * 0.06}>
                  <div
                    className={cn(
                      'flex h-full flex-col rounded-2xl p-6',
                      onRequest ? 'border-2 border-dashed border-forest/20 bg-transparent' : 'bg-white shadow-card',
                    )}
                  >
                    <span aria-hidden="true" className={cn('h-1.5 w-10 rounded-full', onRequest ? 'bg-forest/20' : 'bg-gold')} />
                    <h3 className="mt-5 font-display text-2xl font-bold text-forest">{variety.name}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{variety.note}</p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </Container>
      </section>

      <section className="pb-24 lg:pb-28">
        <Container className="grid gap-6 lg:grid-cols-3">
          <EnquiryChecklist heading={ricePage.checklistHeading} items={riceEnquiryChecklist} cta={ricePage.cta} className="lg:col-span-2" />
          <RelatedLinks links={related} />
        </Container>
      </section>
    </>
  )
}
