import { ArrowRight, Warehouse } from 'lucide-react'
import IndiaMap from '@/components/map/IndiaMap'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { indiaNetwork } from '@/data/home'
import { customerCities, wholesaleOutlets } from '@/data/network'

// Section 5 — India network.
export default function IndiaNetworkSection() {
  return (
    <section className="overflow-hidden bg-sage py-24 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="India Network" title={indiaNetwork.heading} intro={indiaNetwork.text} />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Wholesale market outlets</h3>
              <ul className="mt-4 space-y-2.5">
                {wholesaleOutlets.map((city) => (
                  <li key={city.id} className="flex items-center gap-3 font-display text-lg font-semibold text-forest">
                    <span aria-hidden="true" className="h-3 w-3 rounded-full bg-forest ring-4 ring-leaf/30" />
                    {city.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Pan-India customers</h3>
              <ul className="mt-4 space-y-2.5">
                {customerCities.map((city) => (
                  <li key={city.id} className="flex items-center gap-3 text-[17px] font-medium text-ink">
                    <span aria-hidden="true" className="h-3 w-3 rounded-full border-[2.5px] border-tangerine-dark" />
                    {city.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-forest p-5 text-white">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-leaf">
              <Warehouse aria-hidden="true" className="h-6 w-6" />
            </span>
            <p className="text-sm text-white/80">
              <span className="mr-2 font-display text-3xl font-bold text-gold">10+</span>
              distribution centres across India
            </p>
          </div>

          <Button to={indiaNetwork.cta.to} icon={ArrowRight} className="mt-8">
            {indiaNetwork.cta.label}
          </Button>
        </div>

        <Reveal className="relative">
          <div aria-hidden="true" className="absolute inset-8 rounded-full bg-white/70 blur-3xl" />
          <IndiaMap className="relative mx-auto max-w-[520px]" />
          <ul className="relative mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-forest" />
              Wholesale market outlet
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-3 w-3 rounded-full border-[2.5px] border-tangerine-dark bg-white" />
              Customer city
            </li>
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
