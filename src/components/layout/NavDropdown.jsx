import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

// Desktop menu item: opens on hover or click, closes on Escape, outside click or navigation.
export default function NavDropdown({ group }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const closeTimer = useRef(null)
  const panelId = useId()
  const { pathname } = useLocation()
  const active = group.items.some((item) => pathname.startsWith(item.to))

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  const openNow = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div ref={containerRef} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'relative flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium transition-colors xl:px-4',
          active || open ? 'text-forest' : 'text-ink/75 hover:text-forest',
        )}
      >
        {group.label}
        <ChevronDown aria-hidden="true" className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
        {active && <span aria-hidden="true" className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-leaf-dark xl:inset-x-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <div id={panelId} className="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="rounded-2xl border border-forest/5 bg-white p-2 shadow-lift"
            >
              <ul>
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end
                        className={({ isActive }) =>
                          cn('flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-cream', isActive && 'bg-cream')
                        }
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-leaf-light text-leaf-dark">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-forest">{item.label}</span>
                          <span className="block text-xs text-ink-muted">{item.description}</span>
                        </span>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
