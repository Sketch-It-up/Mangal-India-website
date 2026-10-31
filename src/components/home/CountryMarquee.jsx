import { sourcingCountries } from '@/data/countries'

const dotFor = (country) => {
  const fresh = country.sources.includes('fresh')
  const dry = country.sources.includes('dry')
  if (fresh && dry) return 'bg-[linear-gradient(180deg,#8BC34A_50%,#F28C28_50%)]'
  return fresh ? 'bg-leaf' : 'bg-tangerine'
}

function Row({ hidden = false }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {sourcingCountries.map((country) => (
        <li key={country.id} className="flex items-center gap-3 whitespace-nowrap font-display text-xl font-semibold text-white/90">
          <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${dotFor(country)}`} />
          {country.name}
        </li>
      ))}
    </ul>
  )
}

// Slow-scrolling strip of the 12 sourcing countries. The row is repeated so the loop is
// seamless; the copy is hidden from assistive tech. Pauses on hover, and sits still
// (wrapped, centred) for reduced-motion users.
export default function CountryMarquee() {
  return (
    <section aria-label="Sourcing countries" className="overflow-hidden bg-forest-dark py-6">
      <div className="group flex w-max motion-reduce:hidden">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </div>
      <ul className="hidden flex-wrap justify-center gap-x-8 gap-y-3 px-4 motion-reduce:flex">
        {sourcingCountries.map((country) => (
          <li key={country.id} className="flex items-center gap-3 font-display text-lg font-semibold text-white/90">
            <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${dotFor(country)}`} />
            {country.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
