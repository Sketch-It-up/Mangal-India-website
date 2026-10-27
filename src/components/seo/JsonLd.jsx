import { Helmet } from 'react-helmet-async'

// Renders one or more schema.org objects as JSON-LD. Null entries are skipped.
export default function JsonLd({ data }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean)
  if (!items.length) return null
  return (
    <Helmet>
      {items.map((item) => (
        <script key={item['@type']} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  )
}
