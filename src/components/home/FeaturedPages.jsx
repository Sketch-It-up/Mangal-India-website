import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { featuredPages } from '@/data/nav'

const styles = [
  { bar: 'bg-gold', iconBg: 'bg-gold-light text-gold-dark' },
  { bar: 'bg-leaf', iconBg: 'bg-leaf-light text-leaf-dark' },
  { bar: 'bg-tangerine', iconBg: 'bg-tangerine-light text-tangerine-dark' },
]

// Highlights the Global Offices, Our Team and Farming Venture pages (client request).
export default function FeaturedPages() {
  return (
    <section className="bg-sage py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading align="center" eyebrow="Inside Mangal India" title="Our offices, our team, our farms." />
        <div className="mt-8 grid gap-3 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {featuredPages.map((page, i) => {
            const style = styles[i]
            const Icon = page.icon
            return (
              <Reveal key={page.to} delay={i * 0.08}>
                <Card as={Link} to={page.to} interactive className="group relative flex h-full items-start gap-4 overflow-hidden p-5 pt-6 sm:flex-col sm:gap-0 sm:p-8">
                  <span aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-1.5', style.bar)} />
                  <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14', style.iconBg)}>
                    <Icon aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7" />
                  </span>
                  <Badge tone="gold" className="absolute right-4 top-5 sm:right-8 sm:top-10">
                    New
                  </Badge>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="pr-14 font-display text-xl font-semibold text-forest sm:mt-6 sm:pr-0 sm:text-2xl">{page.label}</h3>
                    <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-ink-muted sm:mt-3 sm:text-base">{page.text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-semibold text-leaf-dark sm:mt-8">
                      {page.cta}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
