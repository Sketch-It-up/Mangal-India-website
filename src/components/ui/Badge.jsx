import { cn } from '@/lib/cn'

const tones = {
  leaf: 'bg-leaf-light text-leaf-dark',
  tangerine: 'bg-tangerine-light text-tangerine-dark',
  pomegranate: 'bg-pomegranate-light text-pomegranate-dark',
  gold: 'bg-gold-light text-gold-dark',
  forest: 'bg-forest-100 text-forest',
  light: 'bg-white/10 text-white ring-1 ring-inset ring-white/20',
  'light-gold': 'bg-white/10 text-gold ring-1 ring-inset ring-gold/30',
}

// Small pill label, like "Top Match" / "In Stock" in the reference designs.
export default function Badge({ tone = 'leaf', icon: Icon, className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {Icon && <Icon aria-hidden="true" className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}
