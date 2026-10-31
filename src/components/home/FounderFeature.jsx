import { ArrowRight, Quote } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Tbc from '@/components/ui/Tbc'
import { founder } from '@/data/founder'
import { founderFeature } from '@/data/home'

// Section 6B — founder's vision: pull-quote left, portrait right (portrait first on mobile).
// The portrait is expected to be a background-removed PNG, so it stands on a backdrop instead of in a framed box.
export default function FounderFeature() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:order-2 lg:col-span-5 lg:max-w-md">
          {/* Stage for a background-removed portrait: a soft circle sits behind the founder, whose head breaks out above it. */}
          <div aria-hidden="true" className="absolute inset-x-[3%] bottom-0 aspect-square animate-[spin_90s_linear_infinite] rounded-full border-2 border-dashed border-forest/15" />
          <div aria-hidden="true" className="absolute inset-x-[7%] bottom-[4%] aspect-square rounded-full bg-gradient-to-br from-leaf-light via-sage to-gold-light" />

          <div className="absolute inset-0 [-webkit-mask-image:linear-gradient(to_bottom,#000_88%,transparent)] [mask-image:linear-gradient(to_bottom,#000_88%,transparent)]">
            {founder.portrait ? (
              <img
                src={founder.portrait}
                alt={`Portrait of ${founder.name}, ${founder.title} of Mangal India.`}
                className="absolute bottom-0 left-1/2 h-full max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_18px_28px_rgba(30,77,43,0.28)]"
              />
            ) : (
              <svg viewBox="0 0 300 360" aria-hidden="true" className="absolute bottom-0 left-1/2 h-[92%] -translate-x-1/2 drop-shadow-[0_18px_28px_rgba(30,77,43,0.28)]">
                <defs>
                  <linearGradient id="founder-silhouette" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3A6B47" />
                    <stop offset="100%" stopColor="#1E4D2B" />
                  </linearGradient>
                </defs>
                <circle cx="150" cy="105" r="62" fill="url(#founder-silhouette)" />
                <path d="M18 360C18 262 78 208 150 208s132 54 132 152z" fill="url(#founder-silhouette)" />
              </svg>
            )}
          </div>

          <div aria-hidden="true" className="absolute -left-3 top-[14%] w-20 animate-float rounded-full bg-white p-2.5 shadow-lift sm:-left-6 sm:w-24">
            <ProduceArt type="pears" />
          </div>
          <div aria-hidden="true" className="absolute -right-2 top-[44%] w-16 animate-float rounded-full bg-white p-2 shadow-lift [animation-delay:1.4s] sm:-right-5 sm:w-20">
            <ProduceArt type="almonds" />
          </div>

          <div className="absolute -bottom-5 left-0 rounded-2xl bg-white px-5 py-3.5 shadow-lift sm:-left-4">
            <span aria-hidden="true" className="mb-2 block h-1 w-8 rounded-full bg-gold" />
            <p className="font-display text-xl font-semibold text-forest">{founder.name}</p>
            <p className="text-sm text-ink-muted">{founder.title}</p>
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
