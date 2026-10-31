import { Link } from 'react-router-dom'
import { Apple, Nut, Plus, Ship } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Tilt from '@/components/ui/Tilt'
import { cn } from '@/lib/cn'

const categoryStyle = {
  fresh: { badge: 'Fresh fruit', tone: 'leaf', icon: Apple, bg: 'bg-leaf-light', cta: 'Request Specifications' },
  dry: { badge: 'Dry fruit', tone: 'tangerine', icon: Nut, bg: 'bg-tangerine-light', cta: 'Request Specifications' },
  export: { badge: 'Export', tone: 'gold', icon: Ship, bg: 'bg-gold-light', cta: 'Send an Export Enquiry' },
}

// Product card (Section 12, "Product category" template): image, name, line, enquiry link.
// The enquiry link carries the product so the form is pre-filled (lib/enquiryPrefill.js).
// `product.image` (a real photo) replaces the illustration once photography is supplied.
export default function ProductCard({ product }) {
  const style = categoryStyle[product.category]
  const enquiryHref = `/contact/?product=${product.slug}`

  return (
    <Tilt className="h-full">
      <Card interactive className="group flex h-full flex-col p-3">
        <div className={cn('relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl', style.bg)}>
          <span aria-hidden="true" className="absolute aspect-square h-[82%] rounded-full bg-white/60" />
          {product.image ? (
            <img src={product.image} alt={product.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <ProduceArt
              type={product.slug}
              title={product.alt}
              className="relative h-[72%] w-[72%] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110"
            />
          )}
          <Badge tone={style.tone} icon={style.icon} className="absolute left-3 top-3 bg-white/95 shadow-sm">
            {style.badge}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 className="font-display text-xl font-semibold text-forest">{product.name}</h3>
          <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">{product.line}</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <Link to={enquiryHref} className="text-sm font-semibold text-leaf-dark underline-offset-4 hover:underline">
              {style.cta}
            </Link>
            <Link
              to={enquiryHref}
              aria-label={`${style.cta}: ${product.name}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-white transition group-hover:bg-leaf-dark"
            >
              <Plus aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Card>
    </Tilt>
  )
}
