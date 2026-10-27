import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Container from '@/components/ui/Container'
import Tbc from '@/components/ui/Tbc'
import { privacyPolicy, termsOfUse } from '@/data/pages'
import { routeByPath } from '@/data/routes'
import { site } from '@/data/site'

// Draft legal pages (Section 16). They must be reviewed by a qualified lawyer, including
// obligations under India's Digital Personal Data Protection Act, 2023, before launch.
const content = {
  '/privacy-policy/': (
    <p>
      {privacyPolicy}{' '}
      {site.contact.privacyEmail ? (
        <a href={`mailto:${site.contact.privacyEmail}`}>{site.contact.privacyEmail}</a>
      ) : (
        <Tbc label="privacy email" />
      )}
      . <Tbc label="retention period and grievance contact" />
    </p>
  ),
  '/terms-of-use/': (
    <p>
      {termsOfUse} <Tbc label="jurisdiction wording" />
    </p>
  ),
}

export default function LegalPage({ path }) {
  const route = routeByPath[path]
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero route={route} eyebrow="Legal" tight />
      <section className="pb-24 lg:pb-28">
        <Container>
          <div className="max-w-3xl rounded-[1.75rem] bg-white p-7 text-lg leading-[1.8] text-ink shadow-card sm:p-10 [&_a]:font-semibold [&_a]:text-leaf-dark [&_a]:underline">
            {content[path]}
            <p className="mt-8 border-t border-forest/10 pt-6 text-sm text-ink-muted">{site.copyright}</p>
          </div>
        </Container>
      </section>
    </>
  )
}
