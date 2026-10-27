import { CalendarClock, MapPin } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import EnquiryForm from '@/components/forms/EnquiryForm'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Tbc from '@/components/ui/Tbc'
import { dubaiShop } from '@/data/exports'
import { dubaiShopPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'
import { site } from '@/data/site'

const route = routeByPath['/exports/dubai-retail-shop/']

const offerArt = [
  { types: ['cherries', 'oranges'], bg: 'bg-leaf-light' },
  { types: ['vegetables'], bg: 'bg-sage' },
  { types: ['pistachios', 'dates'], bg: 'bg-tangerine-light' },
]

// Illustrated shopfront standing in for renderings or photographs (Section 17, item 3).
function Shopfront() {
  return (
    <div className="relative mx-auto w-full max-w-md" role="img" aria-label="Premium fruit display in a modern retail shop (illustrative image).">
      <div className="overflow-hidden rounded-[2rem] bg-cream shadow-lift">
        <div className="bg-forest-dark px-6 py-4 text-center">
          <p className="font-display text-2xl font-bold text-white">
            {site.name}
            <span className="text-pomegranate">.</span>
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Dubai</p>
        </div>
        <div aria-hidden="true" className="h-8 bg-[repeating-linear-gradient(90deg,#F5B83D_0_28px,#1E4D2B_28px_56px)] [clip-path:polygon(0_0,100%_0,100%_60%,96%_100%,92%_60%,88%_100%,84%_60%,80%_100%,76%_60%,72%_100%,68%_60%,64%_100%,60%_60%,56%_100%,52%_60%,48%_100%,44%_60%,40%_100%,36%_60%,32%_100%,28%_60%,24%_100%,20%_60%,16%_100%,12%_60%,8%_100%,4%_60%,0_100%)]" />
        <div aria-hidden="true" className="grid grid-cols-3 gap-3 px-6 pb-6 pt-8">
          {['oranges', 'cherries', 'dates', 'kiwi', 'mangoes', 'pistachios'].map((type) => (
            <div key={type} className="flex aspect-square items-end justify-center rounded-xl bg-white p-2 shadow-sm">
              <ProduceArt type={type} className="h-auto w-[85%]" />
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="h-3 bg-forest" />
      </div>
      <Badge tone="gold" className="absolute -right-3 -top-3 px-4 py-1.5 text-sm shadow-lift">
        Set to open
      </Badge>
    </div>
  )
}

// Mangal India Dubai (Section 9): announcement → what you will find → why Dubai → updates sign-up.
export default function DubaiShopPage() {
  const page = dubaiShopPage

  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero
        route={route}
        tone="forest"
        eyebrow="Mangal India Dubai"
        intro={page.intro}
        ctas={[page.cta, page.secondaryCta]}
        visual={<Shopfront />}
      />

      {/* What you will find */}
      <section className="py-20 lg:py-24">
        <Container>
          <SectionHeading align="center" eyebrow="In store" title={page.offersHeading} />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {dubaiShop.offers.map((offer, i) => (
              <Reveal as="li" key={offer} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-[1.75rem] bg-white p-8 text-center shadow-card">
                  <div className={`flex h-36 w-36 items-center justify-center gap-1 rounded-full ${offerArt[i].bg}`}>
                    {offerArt[i].types.map((type) => (
                      <ProduceArt key={type} type={type} className={offerArt[i].types.length > 1 ? 'h-auto w-[42%]' : 'h-auto w-[66%]'} />
                    ))}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-forest">{offer}</h3>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why Dubai */}
      <section className="bg-sage py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our first export destination" title={page.why.heading} intro={page.why.text} />
          </div>
          <Reveal className="rounded-[1.75rem] bg-white p-7 shadow-card sm:p-9">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Address and opening details</h3>
            <dl className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-light text-gold-dark">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <dt className="font-semibold text-forest">Address</dt>
                  <dd className="mt-1 text-ink-muted">{dubaiShop.address ?? <Tbc label="shop address" />}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-light text-gold-dark">
                  <CalendarClock aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <dt className="font-semibold text-forest">Opening</dt>
                  <dd className="mt-1 text-ink-muted">{dubaiShop.openingDate ?? <Tbc label="opening date" />}</dd>
                </div>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Updates sign-up (Form D) */}
      <section id="updates" className="scroll-mt-24 py-20 lg:py-24">
        <Container>
          <div className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] bg-forest p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
            <div aria-hidden="true" className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{page.cta.label}</h2>
              <div className="mt-6 flex gap-3" aria-hidden="true">
                {['oranges', 'pistachios', 'cherries'].map((type) => (
                  <span key={type} className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                    <ProduceArt type={type} className="h-10 w-10" />
                  </span>
                ))}
              </div>
              <Button to={page.secondaryCta.to} variant="secondary-light" className="mt-8">
                {page.secondaryCta.label}
              </Button>
            </div>
            <div className="relative rounded-3xl bg-white p-6 sm:p-8">
              <EnquiryForm type="dubai-shop" inline />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
