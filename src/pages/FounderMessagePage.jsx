import { ArrowRight, Quote } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Tbc from '@/components/ui/Tbc'
import { founder, founderMessage } from '@/data/founder'
import { founderPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/about/founder-message/']

// Founder's message (Section 6), published word for word. Editorial layout: portrait
// sticky on the left (desktop), message in a 680px reading column with 20px body text.
export default function FounderMessagePage() {
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero route={route} eyebrow="Founder’s Message" tight />

      <section className="pb-24 lg:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="relative mx-auto max-w-sm">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-600 to-forest shadow-lift">
                  {founder.portrait ? (
                    <img
                      src={founder.portrait}
                      alt={`Portrait of ${founder.name}, ${founder.title} of Mangal India.`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                      <span className="font-display text-8xl font-bold text-gold/90">SW</span>
                      <Tbc label="professional portrait" tone="dark" />
                    </div>
                  )}
                </div>
                <div aria-hidden="true" className="absolute -right-5 -top-5 w-20 animate-float rounded-full bg-white p-2.5 shadow-lift">
                  <ProduceArt type="apples" />
                </div>
                <div className="mt-6 border-l-4 border-leaf pl-4">
                  <p className="font-display text-2xl font-semibold text-forest">{founder.name}</p>
                  <p className="text-ink-muted">{founder.title}</p>
                </div>
              </div>
            </div>
          </aside>

          <article className="lg:col-span-8">
            <div className="max-w-[680px]">
              {founderMessage.map((section, i) => (
                <Reveal key={section.heading} as="section" className={i > 0 ? 'mt-14' : undefined}>
                  <p aria-hidden="true" className="font-display text-sm font-semibold tracking-[0.2em] text-leaf-dark">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-forest sm:text-[2.125rem]">{section.heading}</h2>
                  <div className="mt-6 space-y-5 text-lg leading-[1.75] text-ink sm:text-xl">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              ))}

              <Reveal as="figure" className="mt-16 rounded-[2rem] bg-sage px-7 py-10 sm:px-10">
                <Quote aria-hidden="true" className="h-10 w-10 text-pomegranate" strokeWidth={1.5} />
                <blockquote className="mt-4 font-display text-3xl font-semibold italic leading-snug text-pomegranate sm:text-4xl">
                  {founder.pullQuote}
                </blockquote>
              </Reveal>

              <div className="mt-12 border-t border-forest/10 pt-8">
                <p aria-hidden="true" className="font-display text-4xl italic text-forest/80">
                  {founder.name}
                </p>
                <div className="mt-4 text-[17px] leading-relaxed">
                  <p className="font-semibold text-forest">{founder.name}</p>
                  <p className="text-ink-muted">{founder.title}</p>
                  <p className="text-ink-muted">{founder.signOffCompany}</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {founderPage.ctas.map((cta, i) => (
                  <Button key={cta.label} to={cta.to} variant={i === 0 ? 'primary' : 'secondary'} icon={i === 0 ? ArrowRight : undefined}>
                    {cta.label}
                  </Button>
                ))}
              </div>
            </div>
          </article>
        </Container>
      </section>
    </>
  )
}
