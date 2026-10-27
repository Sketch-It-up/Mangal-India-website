import { cn } from '@/lib/cn'

// Visible marker for a [CONFIRM] item the client still has to supply.
// The launch checklist requires that none of these remain on the live site.
export default function Tbc({ label, tone = 'light', className }) {
  return (
    <span
      className={cn(
        'inline-block rounded border border-dashed border-current px-1.5 py-0.5 text-xs font-semibold',
        tone === 'dark' ? 'text-gold' : 'text-pomegranate',
        className,
      )}
    >
      [CONFIRM: {label}]
    </span>
  )
}
