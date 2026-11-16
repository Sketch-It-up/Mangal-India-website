import { BadgeCheck, MapPin, Ship, Sprout, Tractor } from 'lucide-react'
import CtaBand from '@/components/page/CtaBand'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { farmMedia, farmingPage, farms } from '@/data/company'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/farming-venture/']

const whyIcons = [Sprout, BadgeCheck, Ship]

// Farming Venture: grower-exporter intro + headline numbers → the two live farms → why → CTA.
export default function FarmingVenturePage() {
  const page = farmingPage

  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero
        route={route}
        tone="fresh"
        eyebrow="Farming Venture"
        intro={page.intro}
        ctas={[page.cta, page.secondaryCta]}
        visual={
          <img
            src={farmMedia.hero.src}
            alt={farmMedia.hero.alt}
            width="1600"
            height="900"
            className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-lift"
          />
        }
      />

      {/* Headline numbers */}
      <section className="pt-10 sm:pt-16 lg:pt-20">
        <Container>
          <dl className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {page.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-center gap-5 rounded-2xl p-5 shadow-card sm:p-6 ${i === 0 ? 'bg-forest text-white' : 'bg-white text-forest'}`}
              >
                <dd className={`shrink-0 font-display text-4xl font-bold sm:text-5xl ${i === 0 ? 'text-gold' : 'text-leaf-dark'}`}>{stat.value}</dd>
                <dt className={`order-last font-semibold leading-snug ${i === 0 ? 'text-white/85' : 'text-ink'}`}>{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* The two live farms */}
      <section className="py-14 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Live farms for exports" title={page.farmsHeading} intro={page.farmsIntro} />
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2">
            {farms.map((farm, i) => (
              <Reveal key={farm.id} delay={i * 0.08}>
                <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-card sm:rounded-[1.75rem] sm:p-9">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-leaf via-gold to-tangerine" />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-light text-leaf-dark">
                      <Tractor aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <Badge tone="leaf">Farm {i + 1}</Badge>
                    {farm.size && <Badge tone="gold">{farm.size}</Badge>}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-forest sm:text-3xl">{farm.name}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-ink-muted">
                    <MapPin aria-hidden="true" className="h-4 w-4 text-leaf-dark" />
                    {farm.location}
                  </p>
                  <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">{farm.text}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-leaf-dark">What we grow</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {farm.crops.map((crop) => (
                      <li key={crop} className="rounded-xl bg-sage px-3.5 py-2 text-sm font-medium text-ink">
                        {crop}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Field photos */}
      <section className="bg-forest py-20 text-white lg:py-24">
        <Container>
          <SectionHeading tone="dark" eyebrow="On the ground" title={farmMedia.photosHeading} intro={farmMedia.photosIntro} />
          <ul className="mt-8 columns-2 gap-3 sm:mt-10 sm:gap-4 lg:columns-3 lg:gap-6">
            {farmMedia.photos.map((photo) => (
              <li key={photo.src} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-6">
                <figure className="group relative overflow-hidden rounded-2xl bg-forest-dark">
                  <img src={photo.src} alt={photo.alt} loading="lazy" className="h-auto w-full transition-transform duration-500 group-hover:scale-105" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2.5 pt-10 text-[13px] font-semibold leading-snug text-white sm:px-4 sm:pb-3 sm:text-sm">
                    {photo.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Field videos */}
      <section className="py-14 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Video" title={farmMedia.videosHeading} intro={farmMedia.videosIntro} />
          <ul className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-5 lg:gap-5">
            {farmMedia.videos.map((video) => (
              <li key={video.src} className="w-[58%] shrink-0 snap-center overflow-hidden rounded-2xl bg-forest-dark shadow-card sm:w-auto">
                {/* #t=0.1 makes browsers show the first frame as the poster. */}
                <video
                  src={`${video.src}#t=0.1`}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`${video.label} from a Mangal India farm`}
                  className="aspect-[9/16] w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why we grow our own */}
      <section className="bg-sage py-14 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading align="center" eyebrow="Grower-exporter" title={page.why.heading} />
          <div className="mt-8 grid gap-3 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {page.why.points.map((point, i) => {
              const Icon = whyIcons[i]
              return (
                <Reveal key={point.title} delay={i * 0.08}>
                  <Card className="flex h-full items-start gap-4 p-5 sm:block sm:p-7">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-light text-leaf-dark sm:h-12 sm:w-12">
                      <Icon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-forest sm:mt-5 sm:text-2xl">{point.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-muted sm:mt-2 sm:text-base">{point.text}</p>
                    </div>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      <CtaBand heading="From our farms to your market." ctas={[page.cta, page.secondaryCta]} art={['vegetables', 'mangoes']} />
    </>
  )
}
