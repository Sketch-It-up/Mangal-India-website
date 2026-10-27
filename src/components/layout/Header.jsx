import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Logo from './Logo'
import NavDropdown from './NavDropdown'
import MobileMenu from './MobileMenu'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { enquiryCta, primaryNav } from '@/data/nav'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,box-shadow] duration-300',
        scrolled ? 'bg-white/90 shadow-header backdrop-blur-md' : 'bg-cream',
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center">
            {primaryNav.map((group) => (
              <li key={group.label}>
                <NavDropdown group={group} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button to={enquiryCta.to} size="sm" className="hidden lg:inline-flex">
            {enquiryCta.label}
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-forest hover:bg-forest/5 lg:hidden"
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </Container>

      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </header>
  )
}
