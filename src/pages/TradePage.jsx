import { useSearchParams } from 'react-router-dom'
import EnquiryForm from '@/components/forms/EnquiryForm'
import EnquiryChecklist from '@/components/page/EnquiryChecklist'
import PageHero from '@/components/page/PageHero'
import RelatedLinks from '@/components/page/RelatedLinks'
import Seo from '@/components/seo/Seo'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import { prefillFromQuery } from '@/lib/enquiryPrefill'
import { forms } from '@/data/forms'
import { howWeTrade } from '@/data/home'

// Section 12 "Enquiry page" template, shared by the three Trade With Us pages:
// reassurance and what happens next on the left, the form with clear labels on the right.
export default function TradePage({ route, content, formType, related }) {
  const [params] = useSearchParams()
  const prefill = prefillFromQuery(params)
  const form = forms[formType]

  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero
        route={route}
        eyebrow="Trade With Us"
        intro={content.intro}
        ctas={[{ label: `${form.submitLabel} (form below)`, href: '#enquiry-form' }, content.secondaryCta]}
        tight
      />

      <section className="pb-24 lg:pb-28">
        <Container className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-6 lg:col-span-5">
            <EnquiryChecklist heading={content.checklistHeading} items={content.checklist} columns={1} />
            <Card className="p-7 sm:p-9">
              <h2 className="font-display text-2xl font-bold text-forest">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {howWeTrade.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-forest font-display text-sm font-bold text-forest">
                      {i + 1}
                    </span>
                    <p className="pt-1 leading-relaxed text-ink-muted">
                      <span className="font-semibold text-forest">{step.title}</span>
                      {i === 0 ? ' — ' : ' '}
                      {step.text.charAt(0).toLowerCase() + step.text.slice(1)}
                    </p>
                  </li>
                ))}
              </ol>
            </Card>
            <RelatedLinks links={related} className="hidden lg:flex" />
          </div>

          <Card id="enquiry-form" className="scroll-mt-28 p-6 sm:p-10 lg:col-span-7">
            <h2 className="font-display text-3xl font-bold text-forest">{form.submitLabel}</h2>
            <EnquiryForm
              type={formType}
              initialValues={prefill.type === formType ? prefill.values : undefined}
              className="mt-8"
            />
          </Card>
          <RelatedLinks links={related} className="lg:hidden" />
        </Container>
      </section>
    </>
  )
}
