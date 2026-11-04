import { useLayoutEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { gsap, scrollToId } from '../lib/scroll'
import useReducedMotion from '../hooks/useReducedMotion'
import Particles from './Particles'
import { asset } from '../lib/asset'

export default function Hero({ ready }) {
  const root = useRef(null)
  const reduced = useReducedMotion()

  // One orchestrated entrance, played when the loader lifts.
  useLayoutEffect(() => {
    if (reduced || !ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero-img', { scale: 1.18, duration: 2.6, ease: 'power3.out' }, 0)
        .from('.hero-img-wrap', { opacity: 0, duration: 1.6 }, 0)
        .from('.hero-word', { yPercent: 115, duration: 1.3, stagger: 0.12 }, 0.5)
        .from('.hero-fade', { opacity: 0, y: 24, duration: 1, stagger: 0.12 }, 1.1)
    }, root)
    return () => ctx.revert()
  }, [ready, reduced])

  // Subtle pointer parallax on the watch.
  useLayoutEffect(() => {
    if (reduced) return
    const el = root.current
    const img = el.querySelector('.hero-img-wrap')
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      gsap.to(img, { x, y, duration: 1.2, ease: 'power3.out' })
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [reduced])

  return (
    <section id="home" ref={root} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-void pb-16 pt-28 lg:items-center lg:pb-0">
      {/* The watch is the focus: your frame, shifted right, feathered into the dark on the left */}
      <div className="hero-img-wrap absolute inset-0 -z-10 lg:left-[8%]"
           style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 38%)', maskImage: 'linear-gradient(90deg, transparent 0%, #000 38%)' }}>
        <img
          src={asset('img/hero.webp')} alt="Blue sapphire Bugatti Chiron Tourbillon watch in front of a blue Bugatti Chiron"
          width="1280" height="720" fetchpriority="high"
          className="hero-img h-full w-full object-cover object-[50%_40%] max-lg:object-[52%_30%]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_45%,transparent_30%,rgba(3,5,10,.75)_85%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-void via-void/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-void/90 to-transparent" />
      <Particles />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 md:px-10">
        <h1 className="font-display text-[clamp(2.6rem,6.2vw,6rem)] font-medium leading-[.95] tracking-[.02em] chrome-text max-lg:max-w-[12ch]">
          {['ENGINEERING', 'BEYOND TIME.'].map((w) => (
            <span key={w} className="block overflow-hidden pb-[.1em]"><span className="hero-word block">{w}</span></span>
          ))}
        </h1>
        <p className="hero-fade mt-6 max-w-sm text-sm leading-relaxed tracking-[.08em] text-silver/90 md:text-base">
          Where Automotive Excellence Meets Haute Horlogerie.
        </p>
        <div className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn btn-primary" onClick={() => scrollToId('collection')}>Explore the masterpiece</button>
          <button type="button" className="btn btn-glass" onClick={() => scrollToId('engineering')}>Discover the engineering</button>
        </div>
      </div>

      <button type="button" aria-label="Scroll to the story" onClick={() => scrollToId('story')}
              className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-silver/70 transition-colors hover:text-white lg:flex">
        <span className="label !tracking-[.4em]">Scroll</span>
        <span className="relative h-8 w-px bg-white/20"><span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 animate-scrollDot rounded-full bg-electric" /></span>
        <ChevronDown size={14} />
      </button>
    </section>
  )
}
