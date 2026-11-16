import { ArrowRight } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'

const positions = ['left-[4%] top-[14%]', 'bottom-[10%] right-[5%]']

// Closing call to action for inner pages: a deep-green card with two floating
// illustrations. The first CTA is the page's primary action.
export default function CtaBand({ heading, text, ctas, art = ['cherries', 'mangoes'] }) {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-forest px-5 py-12 text-center sm:rounded-[2rem] sm:px-12 sm:py-16 lg:py-20">
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf/10 blur-3xl" />
          {art.map((type, i) => (
            <div
              key={type}
              aria-hidden="true"
              className={`absolute hidden w-24 animate-float opacity-90 lg:block lg:w-28 ${positions[i]}`}
              style={{ animationDelay: `${i * 1.2}s` }}
            >
              <ProduceArt type={type} className="h-auto w-full" />
            </div>
          ))}
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{heading}</h2>
            {text && <p className="mt-4 text-base leading-relaxed text-white/75 sm:mt-5 sm:text-lg">{text}</p>}
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:justify-center">
              {ctas.map((cta, i) => (
                <Button
                  key={cta.label}
                  to={cta.to}
                  variant={i === 0 ? 'accent' : 'secondary-light'}
                  size="lg"
                  icon={i === 0 ? ArrowRight : undefined}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
