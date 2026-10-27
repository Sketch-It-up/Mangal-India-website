import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import { cn } from '@/lib/cn'

// "Explore more" card of internal links (each page's "Internal linking" list in the build document).
export default function RelatedLinks({ links, heading = 'Explore more', className }) {
  return (
    <Card className={cn('flex flex-col p-7 sm:p-9', className)}>
      <h2 className="font-display text-2xl font-bold text-forest">{heading}</h2>
      <ul className="mt-5 flex-1 divide-y divide-forest/10">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="group flex items-center justify-between gap-3 py-3.5 font-medium text-ink hover:text-leaf-dark">
              {link.label}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 text-ink-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-leaf-dark"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}
