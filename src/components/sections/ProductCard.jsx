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
// `compact` (product category pages): on phones the card becomes a row with a thumbnail on the
// left, so a long product list stays scannable; from `sm` up it is the standard card.
export default function ProductCard({ product, compact = false }) {
  const style = categoryStyle[product.category]
  const enquiryHref = `/contact/?product=${product.slug}`

  return (
    <Tilt className="h-full">
      <Card interactive className={cn('group flex h-full p-3', compact ? 'gap-4 sm:flex-col sm:gap-0' : 'flex-col')}>
        <div
          className={cn(
            'relative flex items-center justify-center overflow-hidden rounded-xl',
            compact ? 'h-[104px] w-[104px] shrink-0 sm:aspect-[4/3] sm:h-auto sm:w-full' : 'aspect-[4/3]',
            style.bg,
          )}
        >
          <span aria-hidden="true" className="absolute aspect-square h-[82%] rounded-full bg-white/60" />
          {product.image ? (
            <img src={product.image} alt={product.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <ProduceArt
              type={product.art}
              title={product.alt}
              className="relative h-[72%] w-[72%] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110"
            />
          )}
          <Badge tone={style.tone} icon={style.icon} className={cn('absolute left-3 top-3 bg-white/95 shadow-sm', compact && 'hidden sm:inline-flex')}>
            {style.badge}
          </Badge>
        </div>
        <div className={cn('flex min-w-0 flex-1 flex-col', compact ? 'py-0.5 pr-1 sm:px-2 sm:pb-2 sm:pt-4' : 'px-2 pb-2 pt-4')}>
          <h3 className={cn('font-display font-semibold text-forest', compact ? 'text-lg sm:text-xl' : 'text-xl')}>{product.name}</h3>
          <p className={cn('flex-1 text-sm leading-relaxed text-ink-muted', compact ? 'mt-1 sm:mt-1.5' : 'mt-1.5')}>{product.line}</p>
          {(product.origins || product.varieties) && (
            <dl className="mt-3 space-y-1.5 border-t border-forest/10 pt-3 text-xs leading-relaxed">
              {product.origins && (
                <div>
                  <dt className="inline font-semibold text-forest">Origin: </dt>
                  <dd className="inline text-ink-muted">{product.origins.join(', ')}</dd>
                </div>
              )}
              {product.varieties && (
                <div>
                  <dt className="inline font-semibold text-forest">Varieties: </dt>
                  <dd className="inline text-ink-muted">{product.varieties.join(', ')}</dd>
                </div>
              )}
            </dl>
          )}
          <div className={cn('flex items-center justify-between gap-3', compact ? 'mt-3 sm:mt-4' : 'mt-4')}>
            <Link to={enquiryHref} className="text-sm font-semibold text-leaf-dark underline-offset-4 hover:underline">
              {style.cta}
            </Link>
            <Link
              to={enquiryHref}
              aria-label={`${style.cta}: ${product.name}`}
              className={cn(
                'h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-white transition group-hover:bg-leaf-dark',
                compact ? 'hidden sm:flex' : 'flex',
              )}
            >
              <Plus aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Card>
    </Tilt>
  )
}
