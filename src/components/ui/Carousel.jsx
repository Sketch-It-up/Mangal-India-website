import { useId } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Keyboard, Navigation } from 'swiper/modules'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import 'swiper/css'

const defaultBreakpoints = {
  640: { slidesPerView: 2.2 },
  1024: { slidesPerView: 3.2 },
  1280: { slidesPerView: 4 },
}

const arrowClasses =
  'flex h-11 w-11 items-center justify-center rounded-full border border-forest/10 bg-white text-forest shadow-card transition hover:border-forest/30 hover:shadow-lift disabled:opacity-40 [&.swiper-button-disabled]:opacity-40'

// Horizontal slider for product cards, logo strips and hero slides.
export default function Carousel({
  items,
  renderItem,
  getKey = (item, index) => item.slug ?? item.id ?? index,
  label,
  slidesPerView = 1.15,
  breakpoints = defaultBreakpoints,
  spaceBetween = 20,
  autoplay = false,
  showArrows = true,
  className,
}) {
  const id = useId().replace(/:/g, '')
  const reduceMotion = useReducedMotion()

  return (
    <div className={cn('relative', className)} role="region" aria-roledescription="carousel" aria-label={label}>
      <Swiper
        modules={[A11y, Autoplay, Keyboard, Navigation]}
        navigation={showArrows ? { prevEl: `.prev-${id}`, nextEl: `.next-${id}` } : false}
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={autoplay && !reduceMotion ? { delay: 4500, pauseOnMouseEnter: true, disableOnInteraction: false } : false}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        className="!overflow-visible sm:!overflow-hidden"
      >
        {items.map((item, index) => (
          <SwiperSlide key={getKey(item, index)} className="!h-auto pb-2">
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {showArrows && (
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className={cn(`prev-${id}`, arrowClasses)} aria-label="Previous slides">
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button type="button" className={cn(`next-${id}`, arrowClasses)} aria-label="Next slides">
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}
