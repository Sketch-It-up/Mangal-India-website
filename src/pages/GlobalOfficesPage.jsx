import { Building2, Landmark, Mail, MapPin, Phone } from 'lucide-react'
import CtaBand from '@/components/page/CtaBand'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { globalOffices, headOffice, officesPage } from '@/data/company'
import { routeByPath } from '@/data/routes'
import { site } from '@/data/site'

const route = routeByPath['/global-network/global-offices/']

const accents = ['bg-gold', 'bg-leaf', 'bg-tangerine']

// Global Offices: intro → the three overseas offices → head office in Pune → CTA.
export default function GlobalOfficesPage() {
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero
        route={route}
        tone="forest"
        eyebrow="Global Offices"
        intro={officesPage.intro}
        ctas={[officesPage.cta, officesPage.secondaryCta]}
      />

      <section className="py-14 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow={`${globalOffices.length} offices abroad`} title={officesPage.officesHeading} />
          <ul className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {globalOffices.map((office, i) => (
              <Reveal as="li" key={office.id} delay={i * 0.08}>
                <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-card sm:rounded-[1.75rem] sm:p-8">
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${accents[i % accents.length]}`} />
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-light text-leaf-dark sm:h-14 sm:w-14">
                    <Landmark aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7" />
                  </span>
                  <p className="mt-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-leaf-dark sm:mt-6">
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                    {office.country}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-bold text-forest">{office.city}</h3>
                  <p className="mt-3 flex items-start gap-2 font-semibold text-ink">
                    <Building2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-ink-muted" />
                    {office.company}
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-muted">{office.text}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sage py-14 sm:py-20 lg:py-24">
        <Container>
          <Reveal className="grid gap-8 overflow-hidden sm:gap-10 rounded-[1.75rem] bg-forest p-6 text-white shadow-lift sm:rounded-[2rem] sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-12">
            <div>
              <Badge tone="light-gold">{headOffice.label}</Badge>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">{officesPage.headOfficeHeading}</h2>
              <p className="mt-3 font-display text-2xl italic text-gold">
                {headOffice.city}, {headOffice.country}
              </p>
            </div>
            <dl className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-sm font-semibold text-white">Address</dt>
                  <dd className="mt-1 leading-relaxed text-white/75">{headOffice.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm font-semibold text-white">Email</dt>
                  <dd className="mt-1 break-words text-white/75">
                    <a href={`mailto:${headOffice.email}`} className="hover:text-white hover:underline">
                      {headOffice.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-sm font-semibold text-white">Phone</dt>
                  <dd className="mt-1 text-white/75">
                    <a href={`tel:${headOffice.phone.replace(/\s+/g, '')}`} className="hover:text-white hover:underline">
                      {headOffice.phone}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>

      <CtaBand heading={site.tagline} ctas={[officesPage.cta, officesPage.secondaryCta]} art={['dates', 'apples']} />
    </>
  )
}
