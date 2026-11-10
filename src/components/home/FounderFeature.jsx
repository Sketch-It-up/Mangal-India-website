import { ArrowRight, Quote } from 'lucide-react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Tbc from '@/components/ui/Tbc'
import { founder } from '@/data/founder'
import { founderFeature } from '@/data/home'

// Section 6B — founder's vision: pull-quote left, portrait right (portrait first on mobile).
// The portrait sits in a rounded card over an offset green panel, with a frosted name plate.
export default function FounderFeature() {
  return (
    <section className="bg-white pb-24 pt-14 lg:pb-28 lg:pt-16">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative mx-auto aspect-[3/4] w-full max-w-[22rem] lg:order-2 lg:col-span-5 lg:max-w-[25rem]">
          <div aria-hidden="true" className="absolute -left-5 -top-5 h-28 w-28 bg-[radial-gradient(#F5B83D_1.5px,transparent_1.5px)] [background-size:14px_14px] sm:-left-8 sm:-top-8" />
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-gradient-to-br from-leaf to-forest sm:translate-x-6 sm:translate-y-6" />

          <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-600 to-forest shadow-lift">
            {founder.portrait ? (
              <img
                src={founder.portrait}
                alt={`Portrait of ${founder.name}, ${founder.title} of Mangal India.`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-display text-8xl font-bold text-gold/90">SW</span>
              </div>
            )}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-forest-900/80 to-transparent" />
            <div aria-hidden="true" className="absolute inset-3 rounded-[1.5rem] border border-white/25" />

            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-white backdrop-blur-md">
              <span aria-hidden="true" className="mb-2 block h-1 w-8 rounded-full bg-gold" />
              <p className="font-display text-xl font-semibold">{founder.name}</p>
              <p className="text-sm text-white/75">{founder.title}</p>
            </div>
          </div>

          {!founder.portrait && <Tbc label="professional portrait" className="absolute -bottom-2 right-0" />}
        </Reveal>

        <div className="lg:order-1 lg:col-span-7">
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
