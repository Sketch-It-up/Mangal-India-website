import { site } from '@/data/site'

// Structured data (Section 14). Types that need absolute URLs (WebSite, BreadcrumbList)
// return null until the domain is confirmed in site.url.

const absolute = (path) => (site.url ? new URL(path, site.url).href : undefined)
const clean = (object) => JSON.parse(JSON.stringify(object)) // drops undefined fields

export function organizationSchema() {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    alternateName: site.subtext,
    url: absolute('/'),
    logo: site.logo ? absolute(site.logo) : undefined,
    email: site.contact.email ?? undefined,
    telephone: site.contact.phone ?? undefined,
    sameAs: site.social.length ? site.social : undefined,
  })
}

export function websiteSchema() {
  if (!site.url) return null
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: absolute('/') }
}

export function breadcrumbSchema(crumbs) {
  if (!site.url) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.linkable === false ? undefined : absolute(crumb.path),
    })),
  }
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
}

export function itemListSchema(name, items) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.to ? absolute(item.to) : undefined,
    })),
  })
}
