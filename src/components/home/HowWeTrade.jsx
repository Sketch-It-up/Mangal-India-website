import { useEffect, useRef } from 'react'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { getLenis } from '@/lib/smoothScroll'
import { howWeTrade } from '@/data/home'

// The pinned sequence needs room for the whole section, and users who prefer less motion
// get the plain timeline instead.
const PIN_QUERY = '(min-width: 768px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'
const FOREST = '#1E4D2B'

// Section 8 — how we trade, as a five-step timeline. On larger screens the section pins
// while scrolling and the steps light up one by one (GSAP ScrollTrigger, loaded on demand).
export default function HowWeTrade() {
  const sectionRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let matchMedia
    let stopLenis

    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelled || !sectionRef.current) return
      gsap.registerPlugin(ScrollTrigger)

      // Lenis moves the page itself, so ScrollTrigger has to be told on every scroll.
      const lenis = getLenis()
      if (lenis) {
        const update = () => ScrollTrigger.update()
        lenis.on('scroll', update)
        stopLenis = () => lenis.off('scroll', update)
      }

      matchMedia = gsap.matchMedia()
      matchMedia.add(PIN_QUERY, () => {
        const select = gsap.utils.selector(sectionRef.current)
        const circles = select('[data-step-circle]')
        const bodies = select('[data-step-body]')
        const last = circles.length - 1

        gsap.set(bodies.slice(1), { opacity: 0.35 })

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top+=80', // below the 80px sticky header
            end: '+=120%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        })

        // The line reaches the centre of step n at time n; each step lights up just before.
        timeline.fromTo(select('[data-progress]'), { scaleX: 0 }, { scaleX: 1, duration: last })
        circles.slice(1).forEach((circle, i) => {
          const at = i + 1 - 0.25
          timeline.to(circle, { backgroundColor: FOREST, color: '#fff', scale: 1.12, duration: 0.25, ease: 'power2.out' }, at)
          timeline.to(bodies[i + 1], { opacity: 1, duration: 0.25 }, at)
        })
        timeline.to({}, { duration: 0.5 }) // short hold on the last step
      })
    })()

    return () => {
      cancelled = true
      stopLenis?.()
      matchMedia?.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:flex md:min-h-[calc(100vh-5rem)] md:items-center lg:py-28">
      <Container>
        <SectionHeading align="center" eyebrow="How We Trade" title={howWeTrade.heading} />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          <span
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-7 hidden border-t-2 border-dashed border-forest/20 md:block"
          />
          <span
            aria-hidden="true"
            data-progress
            className="absolute left-[10%] right-[10%] top-[27px] hidden h-[3px] origin-left scale-x-0 rounded-full bg-forest md:block motion-reduce:hidden"
          />
          {howWeTrade.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span
                data-step-circle
                className={cn(
                  'relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-forest font-display text-xl font-bold',
                  i === 0 ? 'bg-forest text-white' : 'bg-cream text-forest',
                )}
              >
                {i + 1}
              </span>
              <div data-step-body className="md:mt-5">
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
