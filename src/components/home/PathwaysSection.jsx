import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Globe, Sprout } from 'lucide-react'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { pathways } from '@/data/home'

const styles = [
  { icon: Building2, bar: 'bg-leaf', iconBg: 'bg-leaf-light text-leaf-dark' },
  { icon: Globe, bar: 'bg-gold', iconBg: 'bg-gold-light text-gold-dark' },
  { icon: Sprout, bar: 'bg-tangerine', iconBg: 'bg-tangerine-light text-tangerine-dark' },
]

// Section 9 — three ways to work with us.
export default function PathwaysSection() {
  return (
    <section className="bg-sage py-24 lg:py-28">
      <Container>
        <SectionHeading align="center" eyebrow="Trade With Us" title={pathways.heading} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pathways.items.map((item, i) => {
            const style = styles[i]
            const Icon = style.icon
            return (
              <Reveal key={item.audience} delay={i * 0.08}>
                <Card as={Link} to={item.cta.to} interactive className="group relative flex h-full flex-col overflow-hidden p-8">
                  <span aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-1.5', style.bar)} />
                  <span className={cn('flex h-14 w-14 items-center justify-center rounded-2xl', style.iconBg)}>
                    <Icon aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-forest">{item.audience}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{item.text}</p>
                  <span className="mt-8 inline-flex items-center gap-2 font-semibold text-leaf-dark">
                    {item.cta.label}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
