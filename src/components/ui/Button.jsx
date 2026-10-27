import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

// Section 12 button spec (48px high, 6px radius, 2px hover lift) in the green theme.
// `accent` (gold) is the primary action on dark green bands.
const base =
  'inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary: 'bg-forest text-white shadow-sm hover:bg-forest-dark hover:shadow-lift focus-visible:ring-forest',
  accent: 'bg-gold text-forest-dark shadow-sm hover:bg-[#f7c55f] hover:shadow-lift focus-visible:ring-gold focus-visible:ring-offset-forest',
  secondary: 'border-2 border-forest text-forest hover:bg-forest hover:text-white focus-visible:ring-forest',
  'secondary-light':
    'border-2 border-white/80 text-white hover:bg-white hover:text-forest focus-visible:ring-white focus-visible:ring-offset-forest',
  ghost: 'text-forest hover:bg-forest/5 focus-visible:ring-forest',
}

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const icon = Icon && <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
  const content = (
    <>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
