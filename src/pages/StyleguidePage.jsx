import { useState } from 'react'
import { Apple, ArrowRight, LayoutGrid, Nut, Ship, Sparkles, Star } from 'lucide-react'
import Seo from '@/components/seo/Seo'
import Logo from '@/components/layout/Logo'
import ProductCard from '@/components/sections/ProductCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Carousel from '@/components/ui/Carousel'
import Chip from '@/components/ui/Chip'
import Container from '@/components/ui/Container'
import Counter from '@/components/ui/Counter'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Tbc from '@/components/ui/Tbc'
import { allProducts } from '@/data/products'
import { stats } from '@/data/site'

const palette = [
  { name: 'Forest Green', hex: '#1E4D2B', className: 'bg-forest', use: 'Buttons, headings, dark bands, map' },
  { name: 'Leaf Green', hex: '#8BC34A', className: 'bg-leaf', use: 'Fresh-fruit highlights, icons on dark' },
  { name: 'Sage', hex: '#EEF2E6', className: 'bg-sage ring-1 ring-inset ring-forest/10', use: 'Alternating light sections' },
  { name: 'Tangerine', hex: '#F28C28', className: 'bg-tangerine', use: 'Dry-fruit highlights' },
  { name: 'Dubai Gold', hex: '#F5B83D', className: 'bg-gold', use: 'Export highlights, CTAs on dark' },
  { name: 'Pomegranate Red', hex: '#C62839', className: 'bg-pomegranate', use: 'India on the map, small accents' },
  { name: 'Warm Cream', hex: '#FBF8F1', className: 'bg-cream ring-1 ring-inset ring-forest/10', use: 'Page background' },
  { name: 'Ink', hex: '#18231C', className: 'bg-ink', use: 'Body copy' },
]

const filters = [
  { id: 'all', label: 'All Products', icon: LayoutGrid },
  { id: 'fresh', label: 'Fresh Fruits', icon: Apple },
  { id: 'dry', label: 'Dry Fruits', icon: Nut },
]

function Block({ title, children }) {
  return (
    <section className="border-t border-forest/10 py-14">
      <h2 className="mb-8 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">{title}</h2>
      {children}
    </section>
  )
}

// Internal reference page for the Part 1 design system (noindex, not in navigation).
export default function StyleguidePage() {
  const [filter, setFilter] = useState('all')
  const products = filter === 'all' ? allProducts : allProducts.filter((p) => p.category === filter)

  return (
    <>
      <Seo title="Design System | Mangal India" noindex />
      <Container className="py-16">
        <Badge tone="forest" icon={Sparkles}>
          Part 1 · Design system
        </Badge>
        <h1 className="mt-5 text-h1 font-bold lg:text-h1-lg">Mangal India design system</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Every building block the pages are assembled from. Colours, type and components follow Section 12 of the
          build document.
        </p>

        <Block title="Colour palette">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {palette.map((color) => (
              <Card key={color.hex} className="overflow-hidden">
                <div className={`h-24 ${color.className}`} />
                <div className="p-4">
                  <p className="font-semibold text-forest">{color.name}</p>
                  <p className="font-mono text-xs text-ink-muted">{color.hex}</p>
                  <p className="mt-2 text-sm text-ink-muted">{color.use}</p>
                </div>
              </Card>
            ))}
          </div>
        </Block>

        <Block title="Typography">
          <p className="text-h1 font-bold text-forest lg:text-h1-lg font-display">Harvests in. Horizons out.</p>
          <p className="mt-2 text-sm text-ink-muted">H1 · Fraunces Bold · 64/68 desktop, 38/44 mobile</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Section heading"
              accent="From the world’s orchards"
              title="Premium fruits. Premium dry fruits. Great quality."
              intro="Nine fresh fruits and four dry fruits, selected for premium quality and supplied to buyers who expect more."
            />
            <div className="space-y-4 text-[17px] leading-relaxed">
              <p>
                Body copy is Inter at 17–18px. Mangal India imports premium fruits and dry fruits from 12 countries across
                the world, brings them to Indian markets — and now exports premium Indian produce back out, beginning with
                Dubai.
              </p>
              <p className="text-ink-muted">Muted copy for supporting lines and captions.</p>
              <p>
                Links on light use{' '}
                <a href="#top" className="font-semibold text-leaf-dark underline underline-offset-4">
                  darker leaf
                </a>{' '}
                for AA contrast.
              </p>
            </div>
          </div>
        </Block>

        <Block title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button icon={ArrowRight}>Start a Trade Enquiry</Button>
            <Button variant="secondary">Explore Our Global Map</Button>
            <Button variant="ghost">Read More</Button>
            <Button size="sm">Small</Button>
            <Button size="lg" icon={ArrowRight}>
              Large
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-forest p-8">
            <Button variant="accent" icon={ArrowRight}>Accent on dark</Button>
            <Button variant="secondary-light">Secondary on dark</Button>
          </div>
        </Block>

        <Block title="Badges, chips and placeholders">
          <div className="flex flex-wrap gap-3">
            <Badge tone="tangerine" icon={Star}>
              Top Match
            </Badge>
            <Badge tone="leaf" icon={Apple}>
              Fresh fruit
            </Badge>
            <Badge tone="tangerine" icon={Nut}>
              Dry fruit
            </Badge>
            <Badge tone="gold" icon={Ship}>
              Export
            </Badge>
            <Badge tone="pomegranate">Premium</Badge>
            <Badge tone="forest">In Stock</Badge>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {filters.map((f) => (
              <Chip key={f.id} icon={f.icon} active={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </Chip>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            Missing client details render as <Tbc label="official email" /> so nothing slips through to launch.
          </p>
        </Block>

        <Block title="Product cards and carousel">
          <Carousel
            key={filter}
            label="Product range"
            items={products}
            renderItem={(product) => <ProductCard product={product} />}
          />
        </Block>
      </Container>

      <section className="bg-forest py-16 text-white">
        <Container>
          <SectionHeading tone="dark" eyebrow="Counters" title="A trading record that speaks for itself." />
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 0.08}
                className={index === stats.length - 1 ? 'col-span-2 lg:col-span-1' : undefined}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <Counter value={stat.value} suffix={stat.suffix} className="font-display text-5xl font-bold lg:text-stat" />
                  <p className="mt-3 border-t border-gold/50 pt-3 text-sm font-semibold">{stat.label}</p>
                  <p className="mt-1 text-sm text-white/65">{stat.line}</p>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="py-14">
        <Block title="Logo lock-up">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="flex items-center justify-center p-10">
              <Logo size="lg" />
            </Card>
            <div className="flex items-center justify-center rounded-2xl bg-forest p-10">
              <Logo tone="light" size="lg" />
            </div>
          </div>
        </Block>
      </Container>
    </>
  )
}
