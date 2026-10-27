import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

const tones = {
  leaf: 'from-leaf-light to-cream text-leaf-dark',
  tangerine: 'from-tangerine-light to-cream text-tangerine-dark',
  pomegranate: 'from-pomegranate-light to-cream text-pomegranate-dark',
  gold: 'from-gold-light to-cream text-gold-dark',
  forest: 'from-forest-800 to-forest text-white/70',
}

// Stand-in for photography that has not been supplied yet (build doc Section 17, item 5).
export default function MediaPlaceholder({ label, tone = 'leaf', icon: Icon = ImageIcon, className }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br',
        tones[tone],
        className,
      )}
    >
      <Icon aria-hidden="true" className="h-10 w-10 opacity-70" strokeWidth={1.5} />
      <span className="px-4 text-center text-xs font-medium opacity-80">{label}</span>
    </div>
  )
}
