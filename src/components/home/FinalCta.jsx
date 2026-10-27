import { ArrowRight } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { finalCta } from '@/data/home'

const decorations = [
  { type: 'cherries', className: 'left-[4%] top-[12%] w-20 sm:w-28', delay: '0s' },
  { type: 'oranges', className: 'bottom-[8%] left-[10%] hidden w-24 sm:block', delay: '1.4s' },
  { type: 'mangoes', className: 'right-[5%] top-[10%] w-20 sm:w-28', delay: '0.8s' },
  { type: 'pistachios', className: 'bottom-[10%] right-[9%] hidden w-24 sm:block', delay: '2s' },
]

// Section 10 — final statement.
export default function FinalCta() {
  return (
    <section className="py-24 lg:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-20 text-center sm:px-12 lg:py-24">
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf/10 blur-3xl" />
          {decorations.map((item) => (
            <div key={item.type} aria-hidden="true" className={`absolute animate-float opacity-90 ${item.className}`} style={{ animationDelay: item.delay }}>
              <ProduceArt type={item.type} className="h-auto w-full" />
            </div>
          ))}
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              <span className="whitespace-nowrap">Harvests in.</span>{' '}
              <span className="whitespace-nowrap italic text-gold">Horizons out.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{finalCta.text}</p>
            <Button to={finalCta.cta.to} variant="accent" size="lg" icon={ArrowRight} className="mt-10">
              {finalCta.cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
