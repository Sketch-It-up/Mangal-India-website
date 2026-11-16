import RevealText from './RevealText'
import { cn } from '@/lib/cn'

// Section title block. `accent` is the italic serif kicker above the title
// (the "Farm Fresh" / "From Our Farm" treatment from the reference designs).
export default function SectionHeading({
  eyebrow,
  accent,
  title,
  intro,
  as: Tag = 'h2',
  align = 'left',
  tone = 'light',
  className,
}) {
  const dark = tone === 'dark'

  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
            dark ? 'text-gold' : 'text-leaf-dark',
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          'font-display text-[1.75rem] font-bold leading-[1.15] sm:text-4xl sm:leading-tight lg:text-[44px] lg:leading-[1.1]',
          dark ? 'text-white' : 'text-forest',
        )}
      >
        {accent && (
          <span
            className={cn(
              'mb-1 block text-2xl font-medium italic sm:text-3xl',
              dark ? 'text-gold' : 'text-leaf-dark',
            )}
          >
            {accent}
          </span>
        )}
        {typeof title === 'string' ? <RevealText text={title} /> : title}
      </Tag>
      {intro && (
        <p className={cn('mt-3 text-base leading-relaxed sm:mt-4 sm:text-[17px]', dark ? 'text-white/75' : 'text-ink-muted')}>{intro}</p>
      )}
    </div>
  )
}
