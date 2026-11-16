import ProduceArt from '@/components/art/ProduceArt'
import CountryChips from '@/components/page/CountryChips'
import EnquiryChecklist from '@/components/page/EnquiryChecklist'
import PageHero from '@/components/page/PageHero'
import RelatedLinks from '@/components/page/RelatedLinks'
import ProductCard from '@/components/sections/ProductCard'
import JsonLd from '@/components/seo/JsonLd'
import Seo from '@/components/seo/Seo'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { itemListSchema } from '@/lib/schema'

// Hero arrangement positions: one large centre piece with the others around it.
const centre = 'left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2'
const orbits = {
  4: [centre, 'left-[2%] top-[6%] w-[30%]', 'right-[0%] top-[30%] w-[28%]', 'bottom-[2%] left-[8%] w-[30%]'],
  5: [centre, 'left-[2%] top-[8%] w-[28%]', 'right-[2%] top-[4%] w-[26%]', 'bottom-[4%] left-[6%] w-[26%]', 'bottom-[2%] right-[4%] w-[30%]'],
}

function HeroArrangement({ types, tint }) {
  const orbit = orbits[Math.min(types.length, 5)]
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[460px]">
      <div aria-hidden="true" className={cn('absolute inset-[12%] rounded-full', tint)} />
      <div aria-hidden="true" className="absolute inset-[20%] rounded-full bg-white/80 shadow-lift" />
      {types.slice(0, orbit.length).map((type, i) => (
        // Positioning stays on the outer div; the float animation's transform lives on the inner one.
        <div key={type} aria-hidden="true" className={cn('absolute', orbit[i])}>
          <div className="animate-float" style={{ animationDelay: `${i * 0.7}s` }}>
            <ProduceArt type={type} className="h-auto w-full drop-shadow-md" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Section 12 "Product category" template, shared by Fresh Fruits and Dry Fruits:
// colourful header → sourcing-country chips → product card grid → enquiry.
// `groups` (optional) splits the grid into titled sub-sections: [{ id, title, note, products }].
export default function ProductCategoryPage({ route, tone, eyebrow, content, products, groups, countries, countriesLabel, gridHeading, related }) {
  const sections = groups ?? [{ id: 'all', products }]

  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <JsonLd data={itemListSchema(route.name, products)} />
      <PageHero
        route={route}
        tone={tone}
        eyebrow={eyebrow}
        intro={content.intro}
        ctas={[content.cta, content.secondaryCta]}
        visual={<HeroArrangement types={products.map((p) => p.slug)} tint={tone === 'fresh' ? 'bg-leaf/20' : 'bg-tangerine/20'} />}
      >
        <CountryChips label={countriesLabel} countries={countries} className="mt-8 sm:mt-10" />
      </PageHero>

      <section className="py-14 sm:py-20 lg:py-24">
        <Container>
          <h2 className="sr-only">{gridHeading}</h2>
          <div className="space-y-12 sm:space-y-16">
            {sections.map((section) => (
              <div key={section.id}>
                {section.title && (
                  <div className="mb-5 sm:mb-8">
                    <h3 className="font-display text-2xl font-bold text-forest sm:text-3xl">{section.title}</h3>
                    {section.note && <p className="mt-2 text-ink-muted">{section.note}</p>}
                  </div>
                )}
                <ul className={cn('grid gap-3 sm:grid-cols-2 sm:gap-6 xl:gap-8', section.products.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
                  {section.products.map((product, i) => (
                    <Reveal as="li" key={product.slug} delay={(i % 3) * 0.06}>
                      <ProductCard product={product} compact />
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24 lg:pb-28">
        <Container className="grid gap-6 lg:grid-cols-3">
          <EnquiryChecklist heading={content.enquire.heading} text={content.enquire.text} cta={content.cta} className="lg:col-span-2" />
          <RelatedLinks links={related} />
        </Container>
      </section>
    </>
  )
}
