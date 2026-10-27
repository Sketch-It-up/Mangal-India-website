import { ArrowRight } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

// Background, blob and eyebrow colours per tone. `fresh`, `dry` and `gold` (exports) are the
// colourful category headers from the Section 12 "Product category" template.
const tones = {
  light: { bg: 'bg-cream', blobs: ['bg-leaf-light/80', 'bg-gold-light'], eyebrow: 'text-leaf-dark', dark: false },
  fresh: { bg: 'bg-leaf-light', blobs: ['bg-white/70', 'bg-leaf/25'], eyebrow: 'text-leaf-dark', dark: false },
  dry: { bg: 'bg-tangerine-light', blobs: ['bg-white/70', 'bg-tangerine/20'], eyebrow: 'text-tangerine-dark', dark: false },
  gold: { bg: 'bg-gold-light', blobs: ['bg-white/70', 'bg-gold/25'], eyebrow: 'text-gold-dark', dark: false },
  forest: { bg: 'bg-forest', blobs: ['bg-leaf/15', 'bg-gold/10'], eyebrow: 'text-gold', dark: true },
}

// Inner-page header: breadcrumbs, eyebrow, the page's single H1, intro and CTAs,
// with an optional visual on the right. `children` renders below the text column.
// `overlap` leaves room for a card (e.g. StatsBand) that overlaps the bottom edge;
// `tight` trims the bottom space when the page body continues straight on.
export default function PageHero({ route, eyebrow, intro, ctas = [], tone = 'light', visual, overlap = false, tight = false, className, children }) {
  const style = tones[tone]
  const dark = style.dark

  return (
    <section className={cn('relative overflow-hidden', style.bg, className)}>
      <div aria-hidden="true" className={cn('absolute -right-24 -top-32 h-96 w-96 rounded-full blur-3xl', style.blobs[0])} />
      <div aria-hidden="true" className={cn('absolute -bottom-40 left-1/4 h-80 w-80 rounded-full blur-3xl', style.blobs[1])} />

      <Container
        className={cn(
          'relative grid items-center gap-12 pt-8 lg:gap-16',
          visual && 'lg:grid-cols-12',
          overlap ? 'pb-32 sm:pb-36 lg:pb-40' : tight ? 'pb-12 sm:pb-14' : 'pb-16 sm:pb-20 lg:pb-24',
        )}
      >
        <div className={cn(visual ? 'lg:col-span-7' : 'max-w-4xl')}>
          <Breadcrumbs path={route.path} tone={dark ? 'dark' : 'light'} />
          {eyebrow && (
            <p className={cn('mt-10 text-xs font-semibold uppercase tracking-[0.2em]', style.eyebrow)}>{eyebrow}</p>
          )}
          <h1
            className={cn(
              'text-h1 font-bold lg:text-[3.25rem] lg:leading-[1.08] xl:text-h1-lg',
              eyebrow ? 'mt-4' : 'mt-10',
              dark ? 'text-white' : 'text-forest',
            )}
          >
            {route.h1}
          </h1>
          {intro && (
            <p className={cn('mt-6 max-w-2xl text-lg leading-relaxed', dark ? 'text-white/75' : 'text-ink-muted')}>{intro}</p>
          )}
          {ctas.length > 0 && (
            <div className="mt-9 flex flex-wrap gap-3">
              {ctas.map((cta, i) => (
                <Button
                  key={cta.label}
                  to={cta.to}
                  href={cta.href}
                  icon={i === 0 ? ArrowRight : undefined}
                  variant={i === 0 ? (dark ? 'accent' : 'primary') : dark ? 'secondary-light' : 'secondary'}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
          {children}
        </div>

        {visual && (
          <Reveal className="relative lg:col-span-5" y={16}>
            {visual}
          </Reveal>
        )}
      </Container>
    </section>
  )
}
