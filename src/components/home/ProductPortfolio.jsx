import { useState } from 'react'
import { Apple, ArrowRight, LayoutGrid, Nut, Ship } from 'lucide-react'
import ProductCard from '@/components/sections/ProductCard'
import Button from '@/components/ui/Button'
import Carousel from '@/components/ui/Carousel'
import Chip from '@/components/ui/Chip'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { dryFruits, exportItems, exportRange, freshFruits } from '@/data/products'
import { portfolio } from '@/data/home'

const filters = [
  { id: 'all', label: 'All Products', icon: LayoutGrid, items: [...freshFruits, ...dryFruits, ...exportItems] },
  { id: 'fresh', label: 'Fresh Fruits', icon: Apple, items: freshFruits },
  { id: 'dry', label: 'Dry Fruits', icon: Nut, items: dryFruits },
  { id: 'export', label: 'Export Range', icon: Ship, items: exportItems },
]

const summary = [
  { label: 'Fresh Fruits', items: freshFruits.map((p) => p.name) },
  { label: 'Dry Fruits', items: dryFruits.map((p) => p.name) },
  { label: 'Export Range', items: exportRange },
]

// Section 4 — product portfolio with category filter and carousel.
export default function ProductPortfolio() {
  const [filterId, setFilterId] = useState('all')
  const filter = filters.find((f) => f.id === filterId)

  return (
    <section className="py-24 lg:py-28">
      <Container>
        <SectionHeading eyebrow="Our Range" title={portfolio.heading} intro={portfolio.intro} />
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter products">
          {filters.map((f) => (
            <Chip key={f.id} icon={f.icon} active={filterId === f.id} onClick={() => setFilterId(f.id)}>
              {f.label}
              <span className="text-xs opacity-60">{f.items.length}</span>
            </Chip>
          ))}
        </div>

        <Carousel
          key={filterId}
          className="mt-10"
          label={`${filter.label} carousel`}
          items={filter.items}
          renderItem={(product) => <ProductCard product={product} />}
        />

        <dl className="mt-12 grid gap-4 rounded-2xl border border-forest/10 bg-white/60 p-6 text-sm md:grid-cols-3">
          {summary.map((row) => (
            <div key={row.label}>
              <dt className="font-semibold text-forest">{row.label}</dt>
              <dd className="mt-1 text-ink-muted">{row.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          {portfolio.ctas.map((cta) => (
            <Button key={cta.to} to={cta.to} variant="secondary" icon={ArrowRight}>
              {cta.label}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  )
}
