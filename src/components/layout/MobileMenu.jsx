import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Mail, Phone, X } from 'lucide-react'
import Logo from './Logo'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { getLenis } from '@/lib/smoothScroll'
import { enquiryCta, primaryNav } from '@/data/nav'
import { site } from '@/data/site'

// Section 4: on mobile the enquiry button lives in the menu sheet, pinned to its bottom.
// The sheet is portalled to <body>: the sticky header gains a backdrop blur once the page
// scrolls, and a blurred ancestor would trap this fixed layer inside the header's 80px box.
export default function MobileMenu({ open, onClose }) {
  const { pathname } = useLocation()
  const [expanded, setExpanded] = useState(null)
  const closeRef = useRef(null)

  // Open on the section the visitor is already in.
  useEffect(() => {
    if (!open) return
    const current = primaryNav.find((group) => group.items.some((item) => pathname.startsWith(item.to)))
    setExpanded(current?.label ?? null)
  }, [open, pathname])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    getLenis()?.stop()
    closeRef.current?.focus()
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      getLenis()?.start()
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-forest/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 right-0 flex w-full flex-col bg-cream shadow-lift sm:max-w-sm"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-20 items-center justify-between border-b border-forest/5 px-4 sm:px-6">
              <Logo />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-forest hover:bg-forest/5"
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Mobile" data-lenis-prevent className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
              <ul className="space-y-1">
                {primaryNav.map((group) => {
                  const isOpen = expanded === group.label
                  const panelId = `mobile-${group.label.replace(/\s+/g, '-').toLowerCase()}`
                  return (
                    <li key={group.label} className="border-b border-forest/5 last:border-0">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setExpanded(isOpen ? null : group.label)}
                        className="flex min-h-[56px] w-full items-center justify-between py-3 text-left font-display text-xl font-semibold text-forest"
                      >
                        {group.label}
                        <ChevronDown aria-hidden="true" className={cn('h-5 w-5 transition-transform', isOpen && 'rotate-180')} />
                      </button>
                      {isOpen && (
                        <ul id={panelId} className="space-y-1 pb-4">
                          {group.items.map((item) => {
                            const Icon = item.icon
                            return (
                              <li key={item.to}>
                                <NavLink
                                  to={item.to}
                                  end
                                  className={({ isActive }) =>
                                    cn(
                                      'flex min-h-[52px] items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-medium',
                                      isActive ? 'bg-white text-forest shadow-card' : 'text-ink hover:bg-white/70',
                                    )
                                  }
                                >
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-leaf-light text-leaf-dark">
                                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="flex items-center gap-2 font-semibold text-forest">
                                      {item.label}
                                      {item.badge && (
                                        <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-forest-dark">
                                          {item.badge}
                                        </span>
                                      )}
                                    </span>
                                    <span className="block truncate text-xs font-normal text-ink-muted">{item.description}</span>
                                  </span>
                                </NavLink>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="border-t border-forest/5 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}
                  className="flex h-11 items-center justify-center gap-2 rounded-btn border border-forest/15 text-sm font-semibold text-forest"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-leaf-dark" />
                  Call us
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex h-11 items-center justify-center gap-2 rounded-btn border border-forest/15 text-sm font-semibold text-forest"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 text-leaf-dark" />
                  Email us
                </a>
              </div>
              <Button to={enquiryCta.to} icon={ArrowRight} className="w-full">
                {enquiryCta.label}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
