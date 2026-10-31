import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BadgeCheck, CalendarCheck, Container as ContainerIcon, Globe, Sparkles, Sprout } from 'lucide-react'
import HeroVisual from './HeroVisual'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/data/site'

const trustIcons = [Globe, Sprout, BadgeCheck, CalendarCheck, ContainerIcon]

// The two colour blobs drift at different speeds as the page scrolls, for a sense of depth.
function Backdrop() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const leafY = useTransform(scrollY, [0, 700], [0, -90])
  const goldY = useTransform(scrollY, [0, 700], [0, 70])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={reduceMotion ? undefined : { y: leafY }} className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-leaf-light/70 blur-3xl" />
      <motion.div style={reduceMotion ? undefined : { y: goldY }} className="absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-gold-light/80 blur-3xl" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" preserveAspectRatio="none" viewBox="0 0 1200 800">
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M-50 ${120 + i * 70} C 250 ${60 + i * 70}, 450 ${200 + i * 70}, 700 ${130 + i * 70} S 1100 ${80 + i * 70}, 1260 ${150 + i * 70}`}
            fill="none"
            stroke="#1E4D2B"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
  )
}

// Section 1 — Hero. H1 and sub-text are the client's exact wording.
export default function HeroSection() {
  const { hero } = site

  return (
    <section className="relative overflow-hidden">
      <Backdrop />
      <Container className="relative grid items-center gap-14 pb-32 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:pb-40 lg:pt-14">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest shadow-sm backdrop-blur">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-tangerine" />
              {hero.eyebrow.join(' · ')}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-h1 font-bold text-forest sm:text-[50px] sm:leading-[1.08] lg:text-[54px] xl:text-h1-lg">
              <span className="mb-1 block font-medium italic text-leaf-dark">Mangal India:</span>{' '}
              The Leading Importer and Exporter of{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Premium</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 16"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full text-gold"
                >
                  <path d="M3 11C50 4 120 3 197 8" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>{' '}
              Fresh &amp; Dry Fruits.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{hero.subtext}</p>
          </Reveal>

          <Reveal delay={0.18} className="mt-9 flex flex-wrap gap-3">
            <Button to="/contact/" size="lg" icon={ArrowRight}>
              Start a Trade Enquiry
            </Button>
            <Button to="/global-network/" size="lg" variant="secondary" icon={Globe} iconPosition="left">
              Explore Our Global Map
            </Button>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3" aria-label="Why buyers choose Mangal India">
              {hero.trustLine.map((item, i) => {
                const Icon = trustIcons[i]
                return (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium text-forest">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-leaf-light text-leaf-dark">
                      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                )
              })}
            </ul>
            <p className="mt-8 flex items-center gap-3 font-display text-xl font-semibold italic text-forest">
              <span aria-hidden="true" className="h-px w-10 bg-forest/30" />
              {site.tagline}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}
