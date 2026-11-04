import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import useReducedMotion from '../hooks/useReducedMotion'
import SplitHeading from './SplitHeading'
import Img from './Img'

const CARDS = [
  {
    label: 'W16 · 16 pistons', title: 'Miniature engine',
    src: 'img/engine-macro.webp', w: 936, h: 600, alt: 'Macro view of the miniature W16 engine inside the watch, with the red Bugatti badge',
    text: 'A working recreation of the Bugatti W16. The pistons and crankshaft turn on demand from a pusher on the case, powered by the watch’s own movement.',
  },
  {
    label: 'One-minute cage · 30° incline', title: 'Tourbillon',
    src: 'img/tourbillon-tall.webp', w: 646, h: 806, alt: 'Close-up of the inclined flying tourbillon',
    text: 'The flying tourbillon completes a turn every sixty seconds, tilted to sit beneath the engine like a gauge on a dashboard.',
  },
  {
    label: 'Sapphire crystal case', title: 'Sapphire architecture',
    src: 'img/watch-sapphire.webp', w: 752, h: 912, alt: 'The transparent blue sapphire case of the watch',
    text: 'A case cut from sapphire crystal exposes every angle of the movement, which floats on shock absorbers in the manner of a car’s suspension.',
  },
]

export default function Engineering() {
  const root = useRef(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.eng-card').forEach((el, i) => {
        gsap.from(el, { yPercent: 14 + i * 4, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
        gsap.to(el.querySelector('.eng-img'), { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="engineering" ref={root} className="relative overflow-hidden bg-void px-6 py-28 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0"><hr className="hairline" /></div>
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[560px] w-[560px] animate-pulseGlow rounded-full bg-[radial-gradient(circle,rgba(7,91,255,.3),transparent_65%)]" />
      <div className="relative mx-auto max-w-[1400px]">
        <SplitHeading lines={['THE HEART', 'OF PERFORMANCE.']} className="font-display text-[clamp(2.2rem,5.4vw,5rem)] font-medium leading-none tracking-[.03em] chrome-text" />

        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <article key={c.title} className={`eng-card group crystal rounded-sm ${i === 1 ? 'lg:mt-16' : ''}`}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className="eng-img absolute -inset-x-0 -inset-y-[9%]">
                  <Img src={c.src} alt={c.alt} w={c.w} h={c.h} className="h-full w-full" imgClassName="scale-100 transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-110" />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
                <span className="crystal absolute left-4 top-4 rounded-full px-3 py-1.5 text-[.6rem] tracking-[.2em] text-silver">{c.label}</span>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-display text-2xl text-white md:text-3xl">{c.title}</h3>
                <hr className="hairline my-4 origin-left scale-x-50 transition-transform duration-700 group-hover:scale-x-100" />
                <p className="text-sm leading-[1.8] text-muted">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
