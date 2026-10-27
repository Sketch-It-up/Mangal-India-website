import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

// Mobile only: sticky "Start a Trade Enquiry" after the hero, hidden again near the footer.
export default function StickyEnquiryBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > 640
      const nearBottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 420
      setVisible(pastHero && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-forest/10 bg-white/95 p-3 shadow-header backdrop-blur-md lg:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'tween', duration: 0.25 }}
        >
          <Button to="/contact/" icon={ArrowRight} className="w-full">
            Start a Trade Enquiry
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
