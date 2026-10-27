import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { howWeTrade } from '@/data/home'

// Section 8 — how we trade, as a five-step timeline.
export default function HowWeTrade() {
  return (
    <section className="py-24 lg:py-28">
      <Container>
        <SectionHeading align="center" eyebrow="How We Trade" title={howWeTrade.heading} />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          <span
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-7 hidden border-t-2 border-dashed border-forest/20 md:block"
          />
          {howWeTrade.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span
                className={cn(
                  'relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-forest font-display text-xl font-bold',
                  i === 0 ? 'bg-forest text-white' : 'bg-cream text-forest',
                )}
              >
                {i + 1}
              </span>
              <div className="md:mt-5">
                <h3 className="font-display text-xl font-semibold text-forest">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
