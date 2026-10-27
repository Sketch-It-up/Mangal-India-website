import { cn } from '@/lib/cn'

// Rounded filter pill (category filters, sourcing-country chips).
// Renders a toggle button when `onClick` is given, otherwise a static label.
export default function Chip({ active = false, icon: Icon, onClick, className, children }) {
  const classes = cn(
    'inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors',
    active
      ? 'border-leaf-dark bg-leaf-light text-leaf-dark'
      : 'border-forest/10 bg-white text-ink hover:border-forest/25',
    className,
  )
  const content = (
    <>
      {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
      {children}
    </>
  )

  if (onClick) {
    return (
      <button type="button" aria-pressed={active} onClick={onClick} className={classes}>
        {content}
      </button>
    )
  }
  return <span className={classes}>{content}</span>
}
