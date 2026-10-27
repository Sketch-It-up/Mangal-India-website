import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import CtaBand from '@/components/page/CtaBand'
import PageHero from '@/components/page/PageHero'
import ProductCard from '@/components/sections/ProductCard'
import JsonLd from '@/components/seo/JsonLd'
import Seo from '@/components/seo/Seo'
import Button from '@/components/ui/Button'
import Carousel from '@/components/ui/Carousel'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { itemListSchema } from '@/lib/schema'
import { dryFruitCountries, freshFruitCountries } from '@/data/countries'
import { productsPage } from '@/data/pages'
import { dryFruits, exportItems, freshFruits } from '@/data/products'
import { routeByPath } from '@/data/routes'
import { site } from '@/data/site'

const route = routeByPath['/products/']

const mosaic = [
  { type: 'apples', bg: 'bg-leaf-light' },
  { type: 'almonds', bg: 'bg-tangerine-light' },
  { type: 'rice', bg: 'bg-gold-light' },
  { type: 'pistachios', bg: 'bg-tangerine-light' },
  { type: 'cherries', bg: 'bg-white' },
  { type: 'kiwi', bg: 'bg-leaf-light' },
  { type: 'mangoes', bg: 'bg-gold-light' },
  { type: 'dragon-fruit', bg: 'bg-leaf-light' },
  { type: 'dates', bg: 'bg-tangerine-light' },
]

const categoryStyle = {
  fresh: { bg: 'bg-leaf-light', text: 'text-leaf-dark', art: ['oranges', 'apples', 'kiwi'], count: `${freshFruits.length} fresh fruits` },
  dry: { bg: 'bg-tangerine-light', text: 'text-tangerine-dark', art: ['walnuts', 'almonds', 'dates'], count: `${dryFruits.length} dry fruits` },
  export: { bg: 'bg-gold-light', text: 'text-gold-dark', art: ['vegetables', 'rice', 'mangoes'], count: 'From India' },
}

const sections = [
  {
    id: 'fresh',
    title: 'Fresh Fruits',
    meta: `${freshFruits.length} products · sourced from ${freshFruitCountries.length} countries`,
    items: freshFruits,
    cta: { label: 'Explore Fresh Fruits', to: '/products/fresh-fruits/' },
    carousel: true,
  },
  {
    id: 'dry',
    title: 'Dry Fruits',
    meta: `${dryFruits.length} products · sourced from ${dryFruitCountries.length} countries`,
    items: dryFruits,
    cta: { label: 'Explore Dry Fruits', to: '/products/dry-fruits/' },
  },
  {
    id: 'export',
    title: 'Export Range',
    meta: 'Rice, mangoes and fresh vegetables from India',
    items: exportItems,
    cta: { label: 'Explore Exports', to: '/exports/' },
  },
]

// Products (Section 7): intro → category overview → fresh → dry → export range → CTA.
export default function ProductsPage() {
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <JsonLd data={itemListSchema('Product categories', productsPage.categories)} />
      <PageHero
        route={route}
        eyebrow="Products"
        intro={productsPage.intro}
        ctas={[productsPage.cta, productsPage.secondaryCta]}
        visual={
          <ul aria-hidden="true" className="mx-auto grid max-w-md grid-cols-3 gap-3 sm:gap-4">
            {mosaic.map((tile, i) => (
              <li
                key={tile.type}
                className={cn('flex aspect-square items-center justify-center rounded-2xl shadow-card', tile.bg, i % 2 === 1 && 'translate-y-4')}
              >
                <ProduceArt type={tile.type} className="h-[70%] w-[70%]" />
              </li>
            ))}
          </ul>
        }
      />

      {/* Category overview */}
      <section className="pb-8 pt-4">
        <Container>
          <h2 className="sr-only">Product categories</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {productsPage.categories.map((category, i) => {
              const style = categoryStyle[category.id]
              return (
                <Reveal as="li" key={category.id} delay={i * 0.08}>
                  <Link
                    to={category.to}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className={cn('relative flex h-44 items-end justify-center gap-2 px-6 pb-4', style.bg)}>
                      {style.art.map((type, j) => (
                        <ProduceArt
                          key={type}
                          type={type}
                          className={cn('h-auto transition-transform duration-500 group-hover:-translate-y-1', j === 1 ? 'w-28' : 'w-20')}
                        />
                      ))}
                      <span className={cn('absolute left-5 top-4 text-xs font-semibold uppercase tracking-[0.16em]', style.text)}>
                        {style.count}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-2xl font-semibold text-forest">{category.name}</h3>
                      <p className="mt-2 flex-1 leading-relaxed text-ink-muted">{category.products}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-leaf-dark">
                        Explore {category.name}
                        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </ul>
        </Container>
      </section>

      {sections.map((section, i) => (
        <section key={section.id} id={section.id} className={cn('scroll-mt-24 py-20 lg:py-24', i % 2 === 0 && 'bg-sage')}>
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading title={section.title} intro={section.meta} />
              <Button to={section.cta.to} variant="secondary" icon={ArrowRight} className="shrink-0 self-start sm:self-end">
                {section.cta.label}
              </Button>
            </div>
            {section.carousel ? (
              <Carousel
                className="mt-10"
                label={`${section.title} carousel`}
                items={section.items}
                renderItem={(product) => <ProductCard product={product} />}
              />
            ) : (
              <ul className={cn('mt-10 grid gap-6 sm:grid-cols-2', section.items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
                {section.items.map((product, j) => (
                  <Reveal as="li" key={product.slug} delay={j * 0.06}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </ul>
            )}
          </Container>
        </section>
      ))}

      <CtaBand heading={site.tagline} ctas={[productsPage.cta, productsPage.secondaryCta]} art={['kiwi', 'walnuts']} />
    </>
  )
}
