import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import useReducedMotion from '../hooks/useReducedMotion'
import SplitHeading from './SplitHeading'
import Img from './Img'

const TAGS = [
  { t: '578 components', s: 'Hand-assembled movement', pos: 'left-0 top-[14%] md:-left-6', d: '0s' },
  { t: '16 pistons', s: 'W16 engine in miniature', pos: 'right-0 top-[30%] md:-right-8', d: '1s' },
  { t: '30° tourbillon', s: 'One-minute flying cage', pos: 'left-2 bottom-[18%] md:-left-10', d: '2s', hide: true },
  { t: '60 hour reserve', s: 'Manual winding', pos: 'right-2 bottom-[8%] md:-right-4', d: '1.5s' },
]

export default function Masterpiece() {
  const root = useRef(null)
  const img = useRef(null)
  const frame = useRef(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.reveal-img', {
        clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut',
        scrollTrigger: { trigger: '.reveal-img', start: 'top 80%', once: true },
      })
      gsap.fromTo('.parallax-img', { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.from('.m-tag', {
        opacity: 0, scale: 0.9, duration: 1, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: '.reveal-img', start: 'top 55%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const onMove = (e) => {
    if (reduced || !matchMedia('(hover:hover)').matches) return
    const r = frame.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    img.current.style.transformOrigin = `${x}% ${y}%`
    img.current.style.transform = 'scale(1.7)'
  }
  const onLeave = () => { if (img.current) img.current.style.transform = 'scale(1)' }

  return (
    <section id="collection" ref={root} className="relative overflow-hidden bg-void px-6 py-28 md:px-10 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 animate-pulseGlow rounded-full bg-[radial-gradient(circle,rgba(7,91,255,.38),transparent_62%)]" />
      <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] animate-pulseGlow rounded-full bg-[radial-gradient(circle,rgba(22,139,255,.25),transparent_65%)] [animation-delay:2s]" />

      <div className="relative mx-auto max-w-[1300px]">
        <SplitHeading lines={['MORE THAN A WATCH.', 'A MASTERPIECE OF ENGINEERING.']}
          className="mx-auto max-w-4xl text-center font-display text-[clamp(2rem,5vw,4.4rem)] font-medium leading-[1.05] tracking-[.02em] chrome-text" />

        <div className="relative mx-auto mt-16 max-w-[560px] md:mt-20">
          <div ref={frame} onPointerMove={onMove} onPointerLeave={onLeave}
               className="reveal-img crystal relative aspect-[910/936] cursor-zoom-in rounded-sm">
            <div className="parallax-img absolute -inset-[8%]">
              <Img src="img/watch-angle.webp" alt="Three-quarter view of the blue sapphire Bugatti Chiron Tourbillon, showing the W16 engine movement and tourbillon"
                   w={910} h={936} className="h-full w-full" imgRef={img}
                   imgClassName="!transition-transform !duration-[600ms] ease-out will-change-transform" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
          </div>

          {TAGS.map((t) => (
            <div key={t.t} style={{ animationDelay: t.d }} className={`m-tag crystal absolute ${t.pos} animate-floaty rounded-sm px-4 py-3 ${t.hide ? 'max-md:hidden' : ''}`}>
              <p className="text-sm font-medium tracking-wide text-white">{t.t}</p>
              <p className="mt-0.5 text-[.65rem] tracking-[.12em] text-silver/80">{t.s}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl gap-10 md:mt-28 md:grid-cols-[1fr_auto_1fr] md:gap-12">
          <p className="font-display text-xl leading-[1.55] text-silver md:text-2xl">
            A hypercar is a promise made in metal: every part earns its place, and nothing is hidden.
          </p>
          <div aria-hidden="true" className="hidden w-px bg-gradient-to-b from-transparent via-electric to-transparent md:block" />
          <p className="text-sm leading-[1.9] text-muted md:text-base">
            Here that promise is shrunk to the wrist. A miniature W16 sits in a sapphire case, its pistons driven by the same
            hand-wound movement that keeps time. The tourbillon below it turns once a minute. It is an engine you can see working,
            built with a watchmaker’s patience.
          </p>
        </div>
      </div>
    </section>
  )
}
