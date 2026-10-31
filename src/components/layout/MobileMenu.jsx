import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, X } from 'lucide-react'
import Logo from './Logo'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { getLenis } from '@/lib/smoothScroll'
import { enquiryCta, primaryNav } from '@/data/nav'

// Section 4: on mobile the enquiry button lives in the menu sheet, pinned to its bottom.
export default function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)
  const closeRef = useRef(null)

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

  return (
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
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-cream shadow-lift"
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
                        className="flex w-full items-center justify-between py-4 text-left font-display text-lg font-semibold text-forest"
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
                                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium',
                                      isActive ? 'bg-white text-forest shadow-card' : 'text-ink hover:bg-white/70',
                                    )
                                  }
                                >
                                  <Icon aria-hidden="true" className="h-4 w-4 text-leaf-dark" />
                                  {item.label}
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

            <div className="border-t border-forest/5 bg-white p-4 sm:px-6">
              <Button to={enquiryCta.to} icon={ArrowRight} className="w-full">
                {enquiryCta.label}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
