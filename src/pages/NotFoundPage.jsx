import { ArrowRight } from 'lucide-react'
import Seo from '@/components/seo/Seo'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found | Mangal India" noindex />
      <Container className="py-24 text-center sm:py-32">
        <p className="font-display text-stat font-bold text-leaf-dark">404</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">This page has gone out of season.</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/" icon={ArrowRight}>
            Back to home
          </Button>
          <Button to="/contact/" variant="secondary">
            Business Enquiry
          </Button>
        </div>
      </Container>
    </>
  )
}
