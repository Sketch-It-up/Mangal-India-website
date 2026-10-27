import { ChevronDown } from 'lucide-react'
import CtaBand from '@/components/page/CtaBand'
import PageHero from '@/components/page/PageHero'
import JsonLd from '@/components/seo/JsonLd'
import Seo from '@/components/seo/Seo'
import Container from '@/components/ui/Container'
import { faqSchema } from '@/lib/schema'
import { faqs } from '@/data/faq'
import { faqGroups } from '@/data/pages'
import { routeByPath } from '@/data/routes'
import { site } from '@/data/site'

const route = routeByPath['/faq/']
const slug = (title) => title.toLowerCase().replace(/[^a-z]+/g, '-')

// FAQs (Section 10): grouped questions as native disclosure widgets, plus FAQPage schema.
export default function FaqPage() {
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero route={route} eyebrow="FAQs" tight />

      <section className="pb-8">
        <Container className="grid items-start gap-10 lg:grid-cols-12">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:col-span-3">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faqGroups.map((group) => (
                <li key={group.title}>
                  <a
                    href={`#${slug(group.title)}`}
                    className="block rounded-xl border border-forest/10 bg-white px-4 py-2.5 text-sm font-semibold text-forest transition hover:border-leaf-dark hover:text-leaf-dark lg:border-transparent lg:bg-transparent"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12 lg:col-span-9">
            {faqGroups.map((group) => (
              <section key={group.title} id={slug(group.title)} className="scroll-mt-28" aria-labelledby={`${slug(group.title)}-heading`}>
                <h2 id={`${slug(group.title)}-heading`} className="font-display text-2xl font-bold text-forest sm:text-3xl">
                  {group.title}
                </h2>
                <div className="mt-5 space-y-3">
                  {group.questions.map((index) => (
                    <details key={faqs[index].q} className="group rounded-2xl border border-forest/10 bg-white shadow-sm open:shadow-card">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 font-semibold text-forest focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-leaf/30 [&::-webkit-details-marker]:hidden">
                        {faqs[index].q}
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage transition group-open:rotate-180 group-open:bg-leaf-light">
                          <ChevronDown aria-hidden="true" className="h-4 w-4" />
                        </span>
                      </summary>
                      <p className="px-6 pb-6 text-[17px] leading-relaxed text-ink-muted">{faqs[index].a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        heading={site.tagline}
        ctas={[
          { label: 'Start a Trade Enquiry', to: '/contact/' },
          { label: 'Contact', to: '/contact/?type=other' },
        ]}
        art={['kiwi', 'almonds']}
      />
    </>
  )
}
