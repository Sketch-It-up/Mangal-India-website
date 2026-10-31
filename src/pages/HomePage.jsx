import JsonLd from '@/components/seo/JsonLd'
import Seo from '@/components/seo/Seo'
import CountryMarquee from '@/components/home/CountryMarquee'
import ExportsDubaiSection from '@/components/home/ExportsDubaiSection'
import FinalCta from '@/components/home/FinalCta'
import FounderFeature from '@/components/home/FounderFeature'
import HeroSection from '@/components/home/HeroSection'
import HowWeTrade from '@/components/home/HowWeTrade'
import ImportExportSplit from '@/components/home/ImportExportSplit'
import IndiaNetworkSection from '@/components/home/IndiaNetworkSection'
import PathwaysSection from '@/components/home/PathwaysSection'
import ProductPortfolio from '@/components/home/ProductPortfolio'
import StatsBand from '@/components/home/StatsBand'
import StickyEnquiryBar from '@/components/home/StickyEnquiryBar'
import WhyMangalSection from '@/components/home/WhyMangalSection'
import WorldMapSection from '@/components/home/WorldMapSection'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/']

// Homepage sections in the publication order of Section 5.
export default function HomePage() {
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <HeroSection />
      <StatsBand />
      <ImportExportSplit />
      <FounderFeature />
      <WorldMapSection />
      <CountryMarquee />
      <ProductPortfolio />
      <IndiaNetworkSection />
      <WhyMangalSection />
      <ExportsDubaiSection />
      <HowWeTrade />
      <PathwaysSection />
      <FinalCta />
      <StickyEnquiryBar />
    </>
  )
}
