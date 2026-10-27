import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import Container from '@/components/ui/Container'
import Tbc from '@/components/ui/Tbc'
import { site } from '@/data/site'
import { footerNav, legalNav } from '@/data/nav'

const contactRows = [
  { icon: Mail, value: site.contact.email, confirm: 'official email', href: (v) => `mailto:${v}` },
  { icon: Phone, value: site.contact.phone, confirm: 'phone / WhatsApp', href: (v) => `tel:${v.replace(/\s+/g, '')}` },
  { icon: MapPin, value: site.contact.address, confirm: 'registered office address' },
]

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)] lg:gap-8">
        <div className="max-w-xs sm:col-span-2 lg:col-span-1">
          <Logo tone="light" size="lg" />
          <p className="mt-6 font-display text-xl italic text-gold">{site.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Importer and exporter of premium fresh and dry fruits.
          </p>
        </div>

        {footerNav.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">{column.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">Contact</h2>
          <ul className="mt-4 space-y-3">
            {contactRows.map(({ icon: Icon, value, confirm, href }) => (
              <li key={confirm} className="flex items-start gap-2.5 text-sm text-white/70">
                <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                {value ? (
                  href ? (
                    <a href={href(value)} className="hover:text-white">
                      {value}
                    </a>
                  ) : (
                    <span>{value}</span>
                  )
                ) : (
                  <Tbc label={confirm} tone="dark" />
                )}
              </li>
            ))}
          </ul>
          <Link
            to="/contact/"
            className="mt-6 inline-block text-sm font-semibold text-gold underline-offset-4 hover:underline"
          >
            Send a business enquiry&nbsp;→
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.copyright}</p>
          <ul className="flex gap-5">
            {legalNav.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  )
}
