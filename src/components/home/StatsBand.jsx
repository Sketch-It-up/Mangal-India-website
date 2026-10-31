import { CalendarCheck, Cherry, Container as ContainerIcon, Globe, Warehouse } from 'lucide-react'
import Container from '@/components/ui/Container'
import Counter from '@/components/ui/Counter'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { statsHeading } from '@/data/home'
import { stats } from '@/data/site'

const icons = [CalendarCheck, ContainerIcon, Cherry, Globe, Warehouse]

// Section 2 — numbers strip, overlapping the bottom edge of the hero.
// Inner pages pass `heading={null}`: the numbers show without the homepage heading row.
export default function StatsBand({ heading = statsHeading }) {
  return (
    <section aria-labelledby="stats-heading" className="relative z-10 -mt-20 lg:-mt-24">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-forest px-6 py-10 text-white shadow-lift sm:px-10 lg:px-12 lg:py-12">
          <svg aria-hidden="true" className="absolute -right-10 -top-10 h-64 w-64 text-white/[0.04]" viewBox="0 0 100 100">
            <path d="M50 5C75 20 90 45 85 70 75 90 50 95 30 85 10 70 15 40 50 5z" fill="currentColor" />
          </svg>
          {heading ? (
            <div className="relative flex flex-wrap items-end justify-between gap-4">
              <h2 id="stats-heading" className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {heading}
              </h2>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Premium · Great quality</p>
            </div>
          ) : (
            <h2 id="stats-heading" className="sr-only">
              Mangal India in numbers
            </h2>
          )}
          <dl className={cn('relative grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5 lg:gap-0', heading && 'mt-10')}>
            {stats.map((stat, i) => {
              const Icon = icons[i]
              return (
                <Reveal
                  key={stat.label}
                  delay={i * 0.08}
                  className={cn(
                    'flex flex-col',
                    i === stats.length - 1 && 'col-span-2 lg:col-span-1',
                    i > 0 && 'lg:border-l lg:border-white/10 lg:pl-6',
                    i < stats.length - 1 && 'lg:pr-6',
                  )}
                >
                  <dt className="order-2 mt-3 text-sm font-semibold text-white">{stat.label}</dt>
                  <dd className="order-1 flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4">
                    <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-leaf sm:flex">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <Counter value={stat.value} suffix={stat.suffix} className="font-display text-4xl font-bold leading-none tracking-tight sm:text-[2.5rem] xl:text-[3.25rem]" />
                  </dd>
                  <dd className="order-3 mt-1 text-sm leading-relaxed text-white/65">{stat.line}</dd>
                </Reveal>
              )
            })}
          </dl>
        </div>
      </Container>
    </section>
  )
}
