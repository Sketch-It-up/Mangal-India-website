// Runs after `vite build`. For every route in the sitemap it writes dist/<path>/index.html
// with that page's own title, meta description, Open Graph tags and robots/canonical tags,
// so search engines and link previews see correct metadata without running JavaScript.
// Also writes robots.txt, sitemap.xml (once site.url is set) and a 404.html.

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { routes } from '../src/data/routes.js'
import { site } from '../src/data/site.js'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const template = await readFile(join(dist, 'index.html'), 'utf8')

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const absolute = (path) => (site.url ? new URL(path, site.url).href : null)

function render({ path, title, description, noindex }) {
  const url = absolute(path)
  const tags = [
    `<meta name="description" content="${escape(description)}" data-rh="true" />`,
    noindex && `<meta name="robots" content="noindex, follow" data-rh="true" />`,
    url && `<link rel="canonical" href="${url}" data-rh="true" />`,
    `<meta property="og:type" content="website" data-rh="true" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" data-rh="true" />`,
    `<meta property="og:title" content="${escape(title)}" data-rh="true" />`,
    `<meta property="og:description" content="${escape(description)}" data-rh="true" />`,
    url && `<meta property="og:url" content="${url}" data-rh="true" />`,
  ]
    .filter(Boolean)
    .join('\n    ')

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description"[^>]*\/>/, tags)
}

// Launch QA (Section 18): titles ≤ 60 characters, descriptions ≤ 155.
for (const route of routes) {
  if (route.title.length > 60) console.warn(`postbuild: title over 60 characters on ${route.path}`)
  if (route.description.length > 155) console.warn(`postbuild: description over 155 characters on ${route.path}`)
  const file = join(dist, route.path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, render(route))
}

// Unknown URLs: hosts serve this with a real 404 status; the app then shows the not-found page.
await writeFile(
  join(dist, '404.html'),
  render({ path: '/404/', title: `Page not found | ${site.name}`, description: 'This page could not be found.', noindex: true }),
)

const indexable = routes.filter((route) => !route.noindex)
// No Disallow for /thank-you/: crawlers must be able to fetch it to see its noindex tag.
const robots = ['User-agent: *', 'Allow: /']
if (site.url) {
  robots.push('', `Sitemap: ${absolute('/sitemap.xml')}`)
  const today = new Date().toISOString().slice(0, 10)
  const urls = indexable.map((route) => `  <url><loc>${absolute(route.path)}</loc><lastmod>${today}</lastmod></url>`)
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  )
}
await writeFile(join(dist, 'robots.txt'), `${robots.join('\n')}\n`)

console.log(
  `postbuild: ${routes.length} page files, 404.html, robots.txt` +
    (site.url ? ', sitemap.xml' : ' (no sitemap.xml: set site.url in src/data/site.js)'),
)
