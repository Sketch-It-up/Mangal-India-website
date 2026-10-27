import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import { cn } from '@/lib/cn'
import { breadcrumbSchema } from '@/lib/schema'
import { routeByPath } from '@/data/routes'

// Builds the trail from the URL: /exports/rice/ → Home › Exports › Rice.
// Segments without a page of their own (e.g. /trade-with-us/) render as plain text.
const sectionLabels = { '/trade-with-us/': 'Trade With Us' }

export default function Breadcrumbs({ path, tone = 'light' }) {
  const dark = tone === 'dark'
  const segments = path.split('/').filter(Boolean)
  const crumbs = [{ path: '/', name: 'Home' }]
  segments.forEach((_, index) => {
    const crumbPath = `/${segments.slice(0, index + 1).join('/')}/`
    const name = routeByPath[crumbPath]?.name ?? sectionLabels[crumbPath]
    if (name) crumbs.push({ path: crumbPath, name, linkable: Boolean(routeByPath[crumbPath]) })
  })

  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm', dark ? 'text-white/65' : 'text-ink-muted')}>
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 opacity-60" />}
              {last ? (
                <span aria-current="page" className={cn('font-medium', dark ? 'text-white' : 'text-forest')}>
                  {crumb.name}
                </span>
              ) : crumb.linkable === false ? (
                <span>{crumb.name}</span>
              ) : (
                <Link to={crumb.path} className={cn('hover:underline', dark ? 'hover:text-white' : 'hover:text-forest')}>
                  {crumb.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
