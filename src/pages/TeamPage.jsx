import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CtaBand from '@/components/page/CtaBand'
import PageHero from '@/components/page/PageHero'
import Seo from '@/components/seo/Seo'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { team, teamPage } from '@/data/company'
import { routeByPath } from '@/data/routes'

const route = routeByPath['/about/our-team/']

const initials = (name) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

// Our Team: intro → leadership grid (portrait, or initials until a photo is supplied) → CTA.
export default function TeamPage() {
  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} />
      <PageHero route={route} eyebrow="Our Team" intro={teamPage.intro} ctas={[teamPage.cta, teamPage.secondaryCta]} />

      <section className="bg-sage py-14 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Leadership" title={teamPage.heading} />
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-5 lg:gap-4 xl:gap-6">
            {team.map((member, i) => (
              <Reveal as="li" key={member.name} delay={i * 0.06} className={cn(i === 0 && 'col-span-2 lg:col-span-1')}>
                <article
                  className={cn(
                    'group flex h-full overflow-hidden rounded-3xl bg-white shadow-card sm:rounded-[1.75rem]',
                    i === 0 ? 'flex-row lg:flex-col' : 'flex-col',
                  )}
                >
                  <div
                    className={cn(
                      'relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-forest-600 to-forest',
                      i === 0 && 'w-[42%] shrink-0 lg:w-auto',
                    )}
                  >
                    {member.portrait ? (
                      <img
                        src={member.portrait}
                        alt={`Portrait of ${member.name}, ${member.title} of Mangal India.`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span aria-hidden="true" className="font-display text-7xl font-bold text-gold/90">
                          {initials(member.name)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={cn('flex min-w-0 flex-1 flex-col', i === 0 ? 'justify-center p-5 sm:p-6 lg:justify-start lg:p-4 xl:p-5' : 'p-4 sm:p-6 lg:p-4 xl:p-5')}>
                    <p className="text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-leaf-dark sm:text-xs sm:tracking-[0.16em] lg:text-[11px] lg:tracking-[0.12em]">{member.title}</p>
                    <h3 className={cn('mt-1.5 font-display font-semibold leading-tight text-forest sm:mt-2 sm:text-2xl lg:text-lg xl:text-xl', i === 0 ? 'text-2xl' : 'text-lg')}>
                      {member.name}
                    </h3>
                    <p className={cn('mt-1 text-[13px] leading-snug text-ink-muted sm:text-sm', i !== 0 && !member.credential && 'flex-1')}>{member.role}</p>
                    {member.credential && (
                      <p className={cn('mt-2 border-t border-forest/10 pt-2 text-[13px] font-semibold leading-snug text-forest sm:text-sm', i !== 0 && 'flex-1')}>
                        {member.credential}
                      </p>
                    )}
                    {member.to && (
                      <Link to={member.to} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-leaf-dark hover:underline lg:mt-4 lg:text-[13px]">
                        Read the Founder’s Message
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand heading="Work with our team." ctas={[teamPage.cta, teamPage.secondaryCta]} art={['kiwi', 'almonds']} />
    </>
  )
}
