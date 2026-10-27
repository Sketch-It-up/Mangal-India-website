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
    <section className="py-24 lg:py-28">
      <Container className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col justify-center pb-6 md:col-span-2 lg:col-span-1 lg:pb-0 lg:pr-6">
          <SectionHeading eyebrow="Why Mangal India" title={whyUs.heading} />
        </div>
        {whyUs.points.map((point, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={point.title} delay={i * 0.06}>
              <Card interactive className="h-full p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-light text-leaf-dark">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-forest">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{point.text}</p>
              </Card>
            </Reveal>
          )
        })}
      </Container>
    </section>
  )
}
