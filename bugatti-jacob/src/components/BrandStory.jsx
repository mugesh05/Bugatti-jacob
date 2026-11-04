import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import useReducedMotion from '../hooks/useReducedMotion'
import SplitHeading from './SplitHeading'
import Img from './Img'

export default function BrandStory() {
  const root = useRef(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-img', { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.from('.story-line', { scaleX: 0, transformOrigin: 'left', duration: 1.6, ease: 'power4.inOut', stagger: 0.2, scrollTrigger: { trigger: root.current, start: 'top 60%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} className="relative overflow-hidden bg-void px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="crystal relative aspect-[752/912] rounded-sm">
            <div className="story-img absolute -inset-y-[7%] inset-x-0">
              <Img src="img/watch-sapphire.webp" alt="The blue sapphire case seen from the side, with the engine movement inside" w={752} h={912} className="h-full w-full" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
          </div>
          <div aria-hidden="true" className="absolute -bottom-6 -right-6 h-40 w-40 border-b border-r border-electric/60" />
          <div aria-hidden="true" className="absolute -left-6 -top-6 h-40 w-40 border-l border-t border-electric/60" />
        </div>

        <div>
          <hr className="story-line hairline mb-10 max-w-[12rem]" />
          <SplitHeading lines={['WHERE TWO WORLDS', 'BECOME ONE.']} className="font-display text-[clamp(2.2rem,5vw,4.6rem)] font-medium leading-[1.02] tracking-[.02em] chrome-text" />
          <div className="mt-10 space-y-6 text-[.95rem] leading-[1.9] text-muted md:max-w-[34rem]">
            <p>
              Car engineers chase power without waste. Watchmakers chase precision without compromise. Both start from the same rule:
              if a part is not essential, it does not stay.
            </p>
            <p>
              In 2019 Bugatti and Jacob &amp; Co. signed a multi-year partnership to see what happens when those two disciplines
              share a bench. The first answer was a watch that carries an engine, and that keeps time while the engine runs.
            </p>
          </div>
          <hr className="story-line hairline my-10 max-w-md" />
          <p className="font-display text-2xl italic leading-snug text-silver md:text-3xl">The engine is the movement. The movement is the engine.</p>
        </div>
      </div>
    </section>
  )
}
