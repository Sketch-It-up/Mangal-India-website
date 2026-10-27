import { ArrowRight, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProduceArt from '@/components/art/ProduceArt'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { exportItems } from '@/data/products'
import { exportsDubai } from '@/data/home'

// Section 7 — exports and Dubai, gold on deep green.
export default function ExportsDubaiSection() {
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-white lg:py-28">
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-leaf/10 blur-3xl" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Exports &amp; Dubai</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            {exportsDubai.heading}
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-white/75">
            {exportsDubai.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button to={exportsDubai.ctas[0].to} variant="accent" icon={ArrowRight}>
              {exportsDubai.ctas[0].label}
            </Button>
            <Button to={exportsDubai.ctas[1].to} variant="secondary-light">
              {exportsDubai.ctas[1].label}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {exportItems.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.08}>
              <Link
                to={item.to}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-gold/40 hover:bg-white/10"
              >
                <span className="flex aspect-square w-full items-center justify-center rounded-xl bg-white/5">
                  <ProduceArt type={item.slug} className="h-3/4 w-3/4 transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="mt-4 font-display text-lg font-semibold text-white">{item.name}</span>
                <span className="mt-1 text-sm text-white/65">{item.line}</span>
              </Link>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <Link
              to="/exports/dubai-retail-shop/"
              className="group flex h-full flex-col justify-between rounded-2xl bg-gold p-5 text-forest-dark transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-gold">
                  <Store aria-hidden="true" className="h-6 w-6" />
                </span>
                <Badge tone="forest" className="mt-4 bg-white/60">
                  Set to open
                </Badge>
              </div>
              <div className="mt-6">
                <p className="font-display text-xl font-bold">Mangal India Dubai</p>
                <p className="mt-1 text-sm text-forest-dark/80">Premium fruits, vegetables and premium-quality dry fruits.</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                  See the shop <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
