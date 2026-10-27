import { cn } from '@/lib/cn'

export default function Card({ as: Tag = 'div', interactive = false, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-forest/5 bg-white shadow-card',
        interactive && 'transition duration-300 hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
