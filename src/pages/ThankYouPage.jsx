import { ArrowRight, CheckCircle2 } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import Seo from '@/components/seo/Seo'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { thankYouPage } from '@/data/pages'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/thank-you/']
const art = [
  { type: 'oranges', className: 'left-[6%] top-[14%] w-20 sm:w-24' },
  { type: 'cherries', className: 'right-[8%] top-[10%] w-16 sm:w-20' },
  { type: 'pistachios', className: 'bottom-[12%] left-[12%] hidden w-20 sm:block' },
  { type: 'mangoes', className: 'bottom-[14%] right-[10%] w-16 sm:w-24' },
]

// Thank-you page (Section 16), shown after an enquiry is sent. Not indexed.
export default function ThankYouPage() {
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} noindex />
      <section className="relative overflow-hidden">
        {art.map((item, i) => (
          <div key={item.type} aria-hidden="true" className={`absolute ${item.className}`}>
            <div className="animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
              <ProduceArt type={item.type} className="h-auto w-full" />
            </div>
          </div>
        ))}
        <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-leaf-light text-leaf-dark ring-8 ring-leaf-light/50">
            <CheckCircle2 aria-hidden="true" className="h-10 w-10" />
          </span>
          <h1 className="mt-8 text-h1 font-bold lg:text-h1-lg">{route.h1}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{thankYouPage.body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {thankYouPage.ctas.map((cta, i) => (
              <Button key={cta.to} to={cta.to} variant={i === 0 ? 'primary' : 'secondary'} icon={i === 0 ? ArrowRight : undefined}>
                {cta.label}
              </Button>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
