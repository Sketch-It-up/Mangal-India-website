import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Building2, Globe, Mail, MapPin, MessageSquare, Phone, Sprout, Store } from 'lucide-react'
import EnquiryForm from '@/components/forms/EnquiryForm'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Tbc from '@/components/ui/Tbc'
import { cn } from '@/lib/cn'
import { prefillFromQuery } from '@/lib/enquiryPrefill'
import { contactTypes, forms } from '@/data/forms'
import { pathways } from '@/data/home'
import { contactPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'
import { site } from '@/data/site'

const route = routeByPath['/contact/']

const typeIcons = {
  'indian-buyer': Building2,
  'international-buyer': Globe,
  supplier: Sprout,
  other: MessageSquare,
  'dubai-shop': Store,
}

const direct = [
  { icon: Mail, label: 'Email', value: site.contact.email, confirm: 'official email', href: (v) => `mailto:${v}` },
  { icon: Phone, label: 'Phone / WhatsApp', value: site.contact.phone, confirm: 'phone', href: (v) => `tel:${v.replace(/\s+/g, '')}` },
  { icon: MapPin, label: 'Address', value: site.contact.address, confirm: 'office address' },
]

// Contact (Section 10): intro → enquiry-type selector → form → direct contact.
export default function ContactPage() {
  const [params] = useSearchParams()
  const prefill = prefillFromQuery(params)
  const [type, setType] = useState(prefill.type ?? contactTypes[0])
  // The Dubai updates sign-up joins the selector only when a link asks for it.
  const options = prefill.type === 'dubai-shop' ? [...contactTypes, 'dubai-shop'] : contactTypes

  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero route={route} eyebrow="Business Enquiry" intro={contactPage.intro} tight />

      <section className="pb-24 lg:pb-28">
        <Container className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <Card className="p-6 sm:p-10 lg:col-span-8">
            <fieldset>
              <legend className="font-display text-2xl font-bold text-forest">{contactPage.selectorLabel}</legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {options.map((option) => {
                  const Icon = typeIcons[option]
                  const checked = type === option
                  return (
                    <label
                      key={option}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 text-sm font-semibold transition',
                        'has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-leaf/30',
                        checked ? 'border-leaf-dark bg-leaf-light text-leaf-dark' : 'border-forest/10 bg-white text-ink hover:border-forest/25',
                      )}
                    >
                      <input type="radio" name="enquiry-type" value={option} checked={checked} onChange={() => setType(option)} className="sr-only" />
                      <span
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                          checked ? 'bg-leaf-dark text-white' : 'bg-sage text-forest',
                        )}
                      >
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      {forms[option].label}
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-8 border-t border-forest/10 pt-8">
              {/* Keyed by type so switching forms starts clean. */}
              <EnquiryForm key={type} type={type} initialValues={prefill.type === type ? prefill.values : undefined} />
            </div>
          </Card>

          <div className="space-y-6 lg:col-span-4">
            <Card className="p-7">
              <h2 className="font-display text-2xl font-bold text-forest">Direct contact</h2>
              <dl className="mt-6 space-y-5">
                {direct.map(({ icon: Icon, label, value, confirm, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-light text-leaf-dark">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-sm font-semibold text-forest">{label}</dt>
                      <dd className="mt-1 break-words text-ink-muted">
                        {value ? href ? <a href={href(value)} className="hover:text-leaf-dark hover:underline">{value}</a> : value : <Tbc label={confirm} />}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Card>

            <Card className="p-7">
              <h2 className="font-display text-2xl font-bold text-forest">Choose a Pathway</h2>
              <ul className="mt-4 divide-y divide-forest/10">
                {pathways.items.map((item) => (
                  <li key={item.cta.to}>
                    <Link to={item.cta.to} className="group flex items-center justify-between gap-3 py-3.5 font-medium text-ink hover:text-leaf-dark">
                      {item.audience}
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-ink-muted transition group-hover:text-leaf-dark" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}
