import { cn } from '@/lib/cn'

const items = [
  { label: 'Fresh-fruit sourcing', swatch: <span className="h-3 w-3 rounded-sm bg-leaf-dark" /> },
  { label: 'Dry-fruit sourcing', swatch: <span className="h-3 w-3 rounded-sm bg-tangerine" /> },
  {
    label: 'Both (Chile)',
    swatch: <span className="h-3 w-3 rounded-sm bg-[linear-gradient(180deg,#3E7B22_50%,#F28C28_50%)]" />,
  },
  { label: 'India — home market', swatch: <span className="h-3 w-3 rounded-sm bg-forest ring-2 ring-gold" /> },
  {
    label: 'Dubai — sourcing hub and first export destination',
    swatch: <span className="h-3 w-3 rounded-full border-2 border-[#D4930D]" />,
  },
]

// Section 11: bottom legend bar with the five colour keys, always visible.
export default function MapLegend({ className }) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-ink-muted', className)}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span aria-hidden="true" className="flex">
            {item.swatch}
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  )
}
