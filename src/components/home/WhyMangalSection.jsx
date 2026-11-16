import { BadgeCheck, Container as ContainerIcon, Globe, LayoutGrid, MapPinned } from 'lucide-react'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { whyUs } from '@/data/home'

const icons = [Globe, BadgeCheck, LayoutGrid, ContainerIcon, MapPinned]

// Section 6 — why Mangal India.
export default function WhyMangalSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col justify-center pb-4 sm:pb-6 md:col-span-2 lg:col-span-1 lg:pb-0 lg:pr-6">
          <SectionHeading eyebrow="Why Mangal India" title={whyUs.heading} />
        </div>
        {whyUs.points.map((point, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={point.title} delay={i * 0.06}>
              <Card interactive className="flex h-full items-start gap-4 p-5 sm:block sm:p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-light text-leaf-dark sm:h-12 sm:w-12">
                  <Icon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-forest sm:mt-5 sm:text-2xl">{point.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-muted sm:mt-2 sm:text-base">{point.text}</p>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </Container>
    </section>
  )
}
