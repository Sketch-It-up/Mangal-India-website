import { ArrowDownLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import ProduceArt from '@/components/art/ProduceArt'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { importExport } from '@/data/home'

function ArtCluster({ types }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -bottom-4 -right-4 flex w-56 items-end sm:w-64">
      {types.map((type, i) => (
        <ProduceArt key={type} type={type} className={i === 1 ? 'z-10 -mx-6 w-[44%]' : 'w-[38%]'} />
      ))}
    </div>
  )
}

// Section 2B — import and export side by side.
export default function ImportExportSplit() {
  const { import: imp, export: exp } = importExport

  return (
    <section className="py-24 lg:py-28">
      <Container>
        <SectionHeading align="center" eyebrow="Import · Export" title={importExport.heading} />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-3xl bg-sage p-8 pb-48 sm:p-10 sm:pb-52 lg:pb-10">
            <Badge tone="leaf" icon={ArrowDownLeft}>
              {imp.tag}
            </Badge>
            <h3 className="mt-5 font-display text-4xl font-bold text-forest">{imp.label}</h3>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-muted lg:max-w-[58%]">{imp.text}</p>
            <Button to={imp.cta.to} icon={ArrowRight} className="mt-8">
              {imp.cta.label}
            </Button>
            <ArtCluster types={['apples', 'kiwi', 'almonds']} />
          </Reveal>

          <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl bg-forest p-8 pb-48 text-white sm:p-10 sm:pb-52 lg:pb-10">
            <Badge tone="light-gold" icon={ArrowUpRight}>
              {exp.tag}
            </Badge>
            <h3 className="mt-5 font-display text-4xl font-bold text-white">{exp.label}</h3>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-white/75 lg:max-w-[58%]">{exp.text}</p>
            <Button to={exp.cta.to} variant="accent" icon={ArrowRight} className="mt-8">
              {exp.cta.label}
            </Button>
            <ArtCluster types={['rice', 'mangoes', 'vegetables']} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
