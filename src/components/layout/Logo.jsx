import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { site } from '@/data/site'

// Section 4 lock-up: "Mangal India" in Fraunces Bold, "Krishna Mohan Exports" beneath
// in small, widely tracked uppercase (~40% of line-1 height). No other wording.
export default function Logo({ tone = 'dark', size = 'md', className }) {
  const light = tone === 'light'

  return (
    <Link
      to="/"
      aria-label={`${site.name}, ${site.subtext}: home`}
      className={cn('inline-flex flex-col leading-none', className)}
    >
      <span
        className={cn(
          'font-display font-bold tracking-tight',
          size === 'lg' ? 'text-[32px]' : 'text-[24px] sm:text-[26px]',
          light ? 'text-white' : 'text-forest',
        )}
      >
        {site.name}
        <span aria-hidden="true" className="ml-0.5 inline-block h-[0.2em] w-[0.2em] rounded-full bg-pomegranate" />
      </span>
      <span
        className={cn(
          'mt-1.5 whitespace-nowrap font-sans font-semibold uppercase tracking-[0.26em]',
          size === 'lg' ? 'text-[12px]' : 'text-[10px]',
          light ? 'text-white/70' : 'text-ink-muted',
        )}
      >
        {site.subtext}
      </span>
    </Link>
  )
}
