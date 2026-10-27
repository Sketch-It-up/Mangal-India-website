import { ArrowRight, Quote } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Tbc from '@/components/ui/Tbc'
import { founder } from '@/data/founder'
import { founderFeature } from '@/data/home'

// Section 6B — founder's vision: portrait left, pull-quote right.
export default function FounderFeature() {
  return (
    <section className="bg-sage py-24 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-600 to-forest shadow-lift">
            {founder.portrait ? (
              <img src={founder.portrait} alt={`Portrait of ${founder.name}, ${founder.title} of Mangal India.`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="font-display text-8xl font-bold text-gold/90">SW</span>
                <Tbc label="professional portrait" tone="dark" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-dark/90 to-transparent p-6 pt-16">
              <p className="font-display text-xl font-semibold text-white">{founder.name}</p>
              <p className="text-sm text-white/75">{founder.title}</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute -right-6 -top-6 w-24 animate-float rounded-full bg-white p-3 shadow-lift sm:w-28">
            <ProduceArt type="pears" />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-dark">Founder’s Vision</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-forest sm:text-4xl">{founderFeature.heading}</h2>
          <figure className="mt-8">
            <Quote aria-hidden="true" className="h-12 w-12 text-leaf" strokeWidth={1.5} />
            <blockquote className="mt-4 font-display text-3xl font-medium italic leading-snug text-forest sm:text-4xl lg:text-[44px]">
              {founderFeature.quote}
            </blockquote>
            <figcaption className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">{founderFeature.byline}</figcaption>
          </figure>
          <Button to={founderFeature.cta.to} icon={ArrowRight} className="mt-8">
            {founderFeature.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
