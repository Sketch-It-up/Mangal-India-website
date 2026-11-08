import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, EffectCreative, Keyboard, Parallax } from 'swiper/modules'
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Globe, Mouse, Nut, Plane, Sparkles, Sprout } from 'lucide-react'
import HeroProduceStage from './HeroProduceStage'
import HeroVisual from './HeroVisual'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { heroSlides } from '@/data/home'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { getLenis } from '@/lib/smoothScroll'
import useScrollSteps from '@/lib/useScrollSteps'
import 'swiper/css'
import 'swiper/css/effect-creative'

const SPEED = 850 // ms for the slide change

// Moving forward, the current slide hovers out to the left (drifting left, shrinking and fading
// back) while the next one slides in over it from the right; moving back plays it in reverse.
const creativeEffect = {
  prev: { translate: ['-30%', 0, -1], scale: 0.9, opacity: 0.35 },
  next: { translate: ['100%', 0, 0] },
}
const HEADER = 80 // px, the sticky header above the hero

const pad = (n) => String(n).padStart(2, '0')
const ease = [0.16, 1, 0.3, 1]
// Leaving variants reset only after the slide transition, so text never vanishes mid-swipe.
const reset = { delay: SPEED / 1000, duration: 0 }

const copyGroup = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } } }
const wordGroup = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } }
const rise = { hidden: { opacity: 0, y: 24, transition: reset }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }
const wordRise = { hidden: { y: '115%', transition: reset }, show: { y: '0%', transition: { duration: 0.85, ease } } }
const drawLine = { hidden: { pathLength: 0, transition: reset }, show: { pathLength: 1, transition: { delay: 0.75, duration: 0.8, ease } } }

// Per-slide colour fields. The brand slide is deep forest; product slides are light, so their
// white-backdrop studio photos melt into the white spotlight behind them.
const themes = {
  brand: {
    base: 'bg-forest-900',
    glows: ['right-[-6%] top-[-30%] h-[80%] w-[55%] bg-leaf/30', 'bottom-[-40%] left-[-12%] h-[70%] w-[50%] bg-gold/20'],
    word: '[-webkit-text-stroke:1.5px_rgba(255,255,255,0.09)]',
    lines: 'text-white/[0.07]',
  },
  fresh: {
    base: 'bg-gradient-to-br from-[#F5F9EF] via-[#EAF3DE] to-[#D9E9C6]',
    glows: ['right-[2%] top-[-25%] h-[90%] w-[45%] bg-white/90', 'bottom-[-35%] left-[-10%] h-[60%] w-[45%] bg-leaf/25'],
    word: '[-webkit-text-stroke:1.5px_rgba(30,77,43,0.11)]',
    lines: 'text-forest/[0.06]',
  },
  dry: {
    base: 'bg-gradient-to-br from-[#FDF7F0] via-[#FBEBDA] to-[#F4D9BC]',
    glows: ['right-[2%] top-[-25%] h-[90%] w-[45%] bg-white/90', 'bottom-[-35%] left-[-10%] h-[60%] w-[45%] bg-tangerine/20'],
    word: '[-webkit-text-stroke:1.5px_rgba(164,83,10,0.13)]',
    lines: 'text-tangerine-dark/[0.07]',
  },
  exports: {
    base: 'bg-gradient-to-br from-[#FDFAF1] via-[#FBF0D6] to-[#F3E0AE]',
    glows: ['right-[2%] top-[-25%] h-[90%] w-[45%] bg-white/90', 'bottom-[-35%] left-[-10%] h-[60%] w-[45%] bg-gold/30'],
    word: '[-webkit-text-stroke:1.5px_rgba(138,93,0,0.13)]',
    lines: 'text-gold-dark/[0.07]',
  },
}

const chipIcons = { fresh: Sprout, dry: Nut, exports: Plane }

// Splits a title at its italic accent, e.g. "Premium fresh fruits from | around the world."
const withAccent = (title, accent) => {
  const at = accent ? title.lastIndexOf(accent) : -1
  return at < 0 ? [{ text: title }] : [{ text: title.slice(0, at).trim() }, { text: accent, accent: true }]
}

const slides = [
  {
    id: 'brand',
    label: 'Mangal India',
    dark: true,
    eyebrow: site.hero.eyebrow,
    // The H1 is the client's exact wording; it stays on the first slide and is the page's only H1.
    title: [{ text: 'Mangal India:', lead: true }, { text: 'The Leading Entity in' }, { text: 'Premium', underline: true }, { text: 'Fresh & Dry Fruits.' }],
    text: site.hero.subtext,
    ctas: [
      { label: 'Start a Trade Enquiry', to: '/contact/' },
      { label: 'Explore Our Global Map', to: '/global-network/', icon: Globe },
    ],
    word: 'Global',
  },
  ...heroSlides.map((slide) => ({ ...slide, title: withAccent(slide.title, slide.accent) })),
]

// The faint flowing lines behind every slide, tinted per theme.
function Lines({ className }) {
  return (
    <svg aria-hidden="true" className={cn('absolute inset-0 h-full w-full', className)} preserveAspectRatio="none" viewBox="0 0 1200 800">
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M-50 ${120 + i * 70} C 250 ${60 + i * 70}, 450 ${200 + i * 70}, 700 ${130 + i * 70} S 1100 ${80 + i * 70}, 1260 ${150 + i * 70}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}

// Each word rises out of its own mask. Screen readers get the plain sentence instead.
function SlideTitle({ as: Tag, parts, dark }) {
  const words = (part) => part.text.split(' ')
  const word = (text, key) => (
    <span key={key} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] pr-[0.04em] align-top">
      <motion.span variants={wordRise} className="inline-block">
        {text}
      </motion.span>
    </span>
  )

  return (
    <Tag
      className={cn(
        'mt-3 text-[clamp(1.6rem,6.8vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.75rem] lg:mt-5 lg:text-[clamp(2.4rem,min(4.2vw,6.6vh),4.6rem)]',
        dark ? 'text-white' : 'text-forest',
      )}
    >
      <span className="sr-only">{parts.map((part) => part.text).join(' ')}</span>
      <motion.span aria-hidden="true" variants={wordGroup} className="block">
        {parts.map((part, p) => {
          if (part.lead) {
            return (
              <span key={p} className={cn('mb-1 block font-medium italic', dark ? 'text-leaf' : 'text-leaf-dark')}>
                {words(part).map((w, i) => [i > 0 && ' ', word(w, i)])}
              </span>
            )
          }
          if (part.underline) {
            return [
              <span key={p} className="relative inline-block">
                {word(part.text, 0)}
                <svg aria-hidden="true" viewBox="0 0 200 16" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full text-gold">
                  <motion.path variants={drawLine} d="M3 11C50 4 120 3 197 8" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>,
              ' ',
            ]
          }
          return (
            <span key={p} className={cn(part.accent && (dark ? 'italic text-leaf' : 'italic text-leaf-dark'))}>
              {words(part).map((w, i) => [i > 0 && ' ', word(w, i)])}{' '}
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}

function SlideCopy({ slide, index, active }) {
  const { dark, eyebrow, title, text, ctas } = slide
  return (
    <motion.div variants={copyGroup} initial="hidden" animate={active ? 'show' : 'hidden'}>
      <motion.p
        variants={rise}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur sm:text-[11px]',
          dark ? 'border-white/15 bg-white/10 text-white/90' : 'border-forest/10 bg-white/70 text-forest shadow-sm',
        )}
      >
        <Sparkles aria-hidden="true" className={cn('h-3.5 w-3.5 shrink-0', dark ? 'text-gold' : 'text-tangerine')} />
        {eyebrow.join(' | ')}
      </motion.p>
      <SlideTitle as={index === 0 ? 'h1' : 'h2'} parts={title} dark={dark} />
      <motion.p
        variants={rise}
        className={cn(
          'mt-3 line-clamp-2 max-w-xl text-[15px] leading-relaxed sm:mt-4 sm:line-clamp-3 sm:text-base lg:line-clamp-none lg:text-[17px]',
          dark ? 'text-white/75' : 'text-ink-muted',
        )}
      >
        {text}
      </motion.p>
      <motion.div variants={rise} className="mt-5 flex flex-wrap gap-3 sm:mt-6 lg:mt-7">
        <Button to={ctas[0].to} variant={dark ? 'accent' : 'primary'} icon={ArrowRight} className="lg:h-14 lg:px-8 lg:text-base">
          {ctas[0].label}
        </Button>
        <Button
          to={ctas[1].to}
          variant={dark ? 'secondary-light' : 'secondary'}
          icon={ctas[1].icon}
          iconPosition="left"
          className="hidden sm:inline-flex lg:h-14 lg:px-8 lg:text-base"
        >
          {ctas[1].label}
        </Button>
      </motion.div>
    </motion.div>
  )
}

function Slide({ slide, index, active }) {
  const theme = themes[slide.id]
  return (
    // Off-screen slides are inert, so keyboard focus never lands on a hidden button.
    <div
      inert={active ? undefined : ''}
      className={cn('relative flex min-h-[max(30rem,calc(100svh-5.5rem))] flex-col overflow-hidden', theme.base)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {theme.glows.map((glow) => (
          <div key={glow} className={cn('absolute rounded-full blur-[110px]', glow)} />
        ))}
        <Lines className={theme.lines} />
        <div data-swiper-parallax="-45%" className="absolute bottom-[6%] right-[-2%] hidden sm:block">
          <span
            className={cn(
              'select-none font-display text-[clamp(7rem,17vw,17rem)] font-bold uppercase leading-none tracking-tight text-transparent',
              theme.word,
            )}
          >
            {slide.word}
          </span>
        </div>
      </div>

      <Container className="relative flex flex-1 flex-col justify-center gap-4 pb-20 pt-5 sm:gap-5 sm:pb-24 sm:pt-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-24 lg:pt-6">
        <div data-swiper-parallax="-30%" className="order-first lg:order-last lg:col-span-6">
          <div className="relative mx-auto aspect-square h-[clamp(8rem,24svh,17rem)] lg:h-auto lg:w-[min(100%,calc(100svh-15rem),34rem)]">
            {slide.stage ? (
              <HeroProduceStage active={active} chipIcon={chipIcons[slide.id]} {...slide.stage} />
            ) : (
              <HeroVisual tone="dark" className="max-w-none" />
            )}
          </div>
        </div>
        <div data-swiper-parallax="-12%" data-swiper-parallax-opacity="0.2" className="lg:col-span-6">
          <SlideCopy slide={slide} index={index} active={active} />
        </div>
      </Container>
    </div>
  )
}

// Section 1 — Hero: a full-screen rounded panel of four slides (brand, fresh fruits, dry fruits,
// exports). While the page sits at the top, one wheel gesture or vertical swipe moves one slide;
// past the last slide (or before the first) the page scrolls as normal. Slides only change when the
// visitor scrolls, swipes, drags or uses the controls; there is no autoplay.
export default function HeroSection() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const swiperRef = useRef(null)
  const [active, setActive] = useState(0)
  const dark = slides[active].dark
  const last = slides.length - 1

  const go = (to) => {
    const swiper = swiperRef.current
    if (!swiper) return
    if (to === 'next') swiper.slideNext()
    else if (to === 'prev') swiper.slidePrev()
    else swiper.slideTo(to)
  }

  const skipHero = () => {
    const top = sectionRef.current.getBoundingClientRect().bottom + window.scrollY - HEADER
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(top)
    else window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  useScrollSteps(sectionRef, {
    canStep: (dir) => {
      const index = swiperRef.current?.activeIndex ?? 0
      return dir > 0 ? index < last : index > 0
    },
    onStep: (dir) => go(dir > 0 ? 'next' : 'prev'),
    lockMs: SPEED + 150,
  })

  const control = cn(
    'flex h-11 w-11 items-center justify-center rounded-full border transition disabled:pointer-events-none disabled:opacity-40',
    dark ? 'border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20' : 'border-forest/10 bg-white text-forest shadow-card hover:shadow-lift',
  )

  return (
    <section ref={sectionRef} className="relative px-2 pb-2 sm:px-3 lg:px-4" aria-roledescription="carousel" aria-label="Mangal India highlights">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-forest-900 lg:rounded-[2.25rem]">
        <Swiper
          modules={[A11y, EffectCreative, Keyboard, Parallax]}
          effect="creative"
          creativeEffect={creativeEffect}
          parallax={!reduceMotion}
          speed={reduceMotion ? 300 : SPEED}
          grabCursor
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{ itemRoleDescriptionMessage: 'slide', slideLabelMessage: '{{index}} of {{slidesLength}}' }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => setActive(swiper.activeIndex)}
          className="[&_.swiper-wrapper]:!ease-[cubic-bezier(0.65,0,0.35,1)]"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={slide.id} className="!h-auto">
              <Slide slide={slide} index={i} active={i === active} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controls float over the slides and follow the active slide's light or dark tone. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <Container className={cn('pointer-events-auto flex items-center gap-4 pb-5 transition-colors duration-500 sm:gap-6 lg:pb-6', dark ? 'text-white' : 'text-forest')}>
            <p aria-hidden="true" className="shrink-0 font-display tabular-nums">
              <span className="text-2xl font-bold sm:text-3xl">{pad(active + 1)}</span>
              <span className={cn('ml-1.5 text-base', dark ? 'text-white/60' : 'text-ink-muted')}>/ {pad(slides.length)}</span>
            </p>

            <div className="flex flex-1 gap-2 sm:gap-3">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show slide ${i + 1} of ${slides.length}: ${slide.label}`}
                  aria-current={i === active ? 'true' : undefined}
                  className="group min-w-0 flex-1 py-2 text-left"
                >
                  <span className={cn('block h-[3px] overflow-hidden rounded-full', dark ? 'bg-white/20' : 'bg-forest/10')}>
                    {/* The current slide and the ones before it are filled. */}
                    <span
                      className={cn(
                        'block h-full origin-left rounded-full transition-transform duration-700',
                        i <= active ? 'scale-x-100' : 'scale-x-0',
                        dark ? 'bg-gold' : 'bg-forest',
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      'mt-2 hidden truncate text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors md:block',
                      i === active ? '' : dark ? 'text-white/55 group-hover:text-white' : 'text-ink-muted group-hover:text-forest',
                    )}
                  >
                    {slide.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={skipHero}
                className={cn('mr-2 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] lg:flex', dark ? 'text-white/80 hover:text-white' : 'text-forest/80 hover:text-forest')}
                aria-label="Skip to the next section"
              >
                {active === last ? <ArrowDown aria-hidden="true" className="h-4 w-4 animate-bounce" /> : <Mouse aria-hidden="true" className="h-4 w-4 animate-bounce" />}
                {active === last ? 'Continue' : 'Scroll'}
              </button>
              <button type="button" onClick={() => go('prev')} disabled={active === 0} className={control} aria-label="Previous slide">
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => go('next')} disabled={active === last} className={control} aria-label="Next slide">
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
