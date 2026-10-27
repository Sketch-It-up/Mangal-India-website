import { Helmet } from 'react-helmet-async'
import { site } from '@/data/site'

// Per-page <title>, meta description, canonical and Open Graph tags.
// Canonical/og:url are added once the domain is confirmed (site.url).
export default function Seo({ title, description, path = '/', noindex = false }) {
  const url = site.url ? new URL(path, site.url).href : null

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex, follow" />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
    </Helmet>
  )
}
