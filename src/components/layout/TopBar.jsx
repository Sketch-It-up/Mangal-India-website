import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Container from '@/components/ui/Container'
import { site } from '@/data/site'

const { location, hours, phone, email } = site.contact

// Thin strip above the navbar with location, hours and direct contact. It scrolls away;
// the header below it stays sticky. Hours hide below lg, location below sm.
export default function TopBar() {
  return (
    <div className="border-b border-forest/10 bg-cream-dark/60 text-[13px]">
      <Container className="flex h-10 items-center justify-between gap-4">
        <ul className="hidden min-w-0 items-center gap-6 sm:flex">
          <li className="flex items-center gap-2 whitespace-nowrap font-medium text-ink">
            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-tangerine" />
            {location}
          </li>
          <li className="hidden min-w-0 items-center gap-2 text-ink-muted lg:flex">
            <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-tangerine" />
            <span className="truncate">{hours}</span>
          </li>
        </ul>
        <ul className="flex w-full items-center justify-between gap-6 sm:w-auto sm:justify-end">
          <li>
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 whitespace-nowrap font-medium text-ink hover:text-leaf-dark">
              <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-tangerine" />
              {phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${email}`} className="flex items-center gap-2 whitespace-nowrap text-ink-muted hover:text-leaf-dark">
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-tangerine" />
              {email}
            </a>
          </li>
        </ul>
      </Container>
    </div>
  )
}
