import { ArrowRight, Check, ClipboardList } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { cn } from '@/lib/cn'

// "What to include in your enquiry" card: the checklist (or a short paragraph)
// followed by the page's enquiry button (optional).
export default function EnquiryChecklist({ heading, items, text, cta, columns = 2, className }) {
  return (
    <Card className={cn('relative overflow-hidden p-7 sm:p-9', className)}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-leaf via-gold to-tangerine" />
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-light text-leaf-dark">
        <ClipboardList aria-hidden="true" className="h-6 w-6" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-bold text-forest sm:text-3xl">{heading}</h2>
      {text && <p className="mt-3 text-[17px] leading-relaxed text-ink-muted">{text}</p>}
      {items && (
        <ul className={cn('mt-6 grid gap-3', columns === 2 && 'sm:grid-cols-2')}>
          {items.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-xl bg-sage px-4 py-3 font-medium text-ink">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
      {cta && (
        <Button to={cta.to} icon={ArrowRight} className="mt-8">
          {cta.label}
        </Button>
      )}
    </Card>
  )
}
