import { cn } from '@/lib/cn'

const dots = {
  fresh: 'bg-leaf',
  dry: 'bg-tangerine',
  both: 'bg-[linear-gradient(180deg,#8BC34A_50%,#F28C28_50%)]',
}

const kind = (country) => (country.sources.length > 1 ? 'both' : country.sources[0])

// Sourcing-country chips, coloured like the world map (green fresh, orange dry, split for both).
export default function CountryChips({ countries, label, className }) {
  return (
    <div className={className}>
      {label && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">{label}</p>}
      <ul className="flex flex-wrap gap-2">
        {countries.map((country) => (
          <li
            key={country.id}
            className="inline-flex items-center gap-2 rounded-xl border border-forest/10 bg-white px-3.5 py-2 text-sm font-medium text-ink shadow-sm"
          >
            <span aria-hidden="true" className={cn('h-2.5 w-2.5 rounded-full', dots[kind(country)])} />
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
