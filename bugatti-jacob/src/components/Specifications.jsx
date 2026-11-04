import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BatteryCharging, Cog, Droplets, Gem, Ruler, Settings2, Timer, Watch, BadgeCheck, PencilLine } from 'lucide-react'
import { gsap } from '../lib/scroll'
import useReducedMotion from '../hooks/useReducedMotion'
import { HOTSPOTS, SPECS } from '../data/specs'
import SplitHeading from './SplitHeading'
import Counter from './Counter'
import Img from './Img'

const ICONS = { Cog, BatteryCharging, Gem, Ruler, Droplets, Watch, Timer, Settings2 }

export default function Specifications() {
  const root = useRef(null)
  const [active, setActive] = useState(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.spec-card', {
        opacity: 0, x: 48, duration: 1, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: '.spec-grid', start: 'top 80%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const hot = HOTSPOTS.find((h) => h.id === active)

  return (
    <section id="specifications" ref={root} className="relative bg-void px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <SplitHeading lines={['TECHNICAL', 'SPECIFICATIONS']} className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-medium leading-none tracking-[.03em] chrome-text" />
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
          Figures follow published data for the Jacob &amp; Co. Bugatti Chiron Tourbillon. Items tagged
          <span className="mx-1 inline-flex items-center gap-1 text-electric"><PencilLine size={12} /> Confirm</span>
          vary by variant. Edit them in <code className="text-silver">src/data/specs.js</code>.
        </p>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Left: sticky image with hotspots */}
          <div className="lg:sticky lg:top-24">
            <div className="crystal relative mx-auto aspect-[928/1120] max-w-[520px] rounded-sm">
              <Img src="img/watch-front.webp" alt="Front view of the watch with interactive hotspots" w={928} h={1120} className="absolute inset-0" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-void/10" />
              {HOTSPOTS.map((h) => (
                <button key={h.id} type="button" aria-label={`${h.title}: ${h.text}`}
                  onMouseEnter={() => setActive(h.id)} onFocus={() => setActive(h.id)}
                  onMouseLeave={() => setActive(null)} onBlur={() => setActive(null)}
                  onClick={() => setActive((a) => (a === h.id ? null : h.id))}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className="group absolute z-10 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center">
                  <span className={`absolute inset-0 rounded-full border border-electric/70 ${active === h.id ? 'scale-125 bg-electric/30' : 'animate-pulseGlow'} transition-transform duration-300`} />
                  <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_3px_#168BFF]" />
                </button>
              ))}
              <AnimatePresence>
                {hot && (
                  <motion.div key={hot.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.25 }}
                    className="crystal absolute inset-x-3 bottom-3 z-20 rounded-sm p-4" role="status">
                    <p className="text-sm font-medium text-white">{hot.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-silver/90">{hot.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="label mt-4 text-center">Hover or tap a hotspot</p>
          </div>

          {/* Right: spec cards */}
          <div className="spec-grid grid gap-4 sm:grid-cols-2">
            {SPECS.map((s) => {
              const Icon = ICONS[s.icon]
              const on = active === s.id
              return (
                <article key={s.id} className={`spec-card crystal rounded-sm p-6 transition-[border-color,box-shadow] duration-500 ${on ? '!border-electric shadow-[0_0_0_1px_#168BFF,0_0_60px_-10px_#168BFF]' : ''}`}>
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-electric/40 bg-electric/10 text-electric"><Icon size={20} strokeWidth={1.4} /></span>
                    <span className={`flex items-center gap-1 text-[.58rem] uppercase tracking-[.2em] ${s.status === 'verified' ? 'text-muted' : 'text-electric'}`}>
                      {s.status === 'verified' ? <><BadgeCheck size={12} /> Verified</> : <><PencilLine size={12} /> Confirm</>}
                    </span>
                  </div>
                  <h3 className="label mt-6">{s.label}</h3>
                  {s.counters && (
                    <div className="mt-2 flex flex-wrap gap-x-8 gap-y-2">
                      {s.counters.map((c) => (
                        <p key={c.label} className="font-display text-4xl font-medium text-white tabular-nums">
                          <Counter to={c.to} suffix={c.suffix} />
                          <span className="ml-2 font-sans text-xs font-light tracking-wide text-silver/80">{c.label}</span>
                        </p>
                      ))}
                    </div>
                  )}
                  {s.value && <p className="mt-2 text-base leading-snug text-white">{s.value}</p>}
                  {s.note && <p className="mt-3 text-xs leading-relaxed text-muted">{s.note}</p>}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
