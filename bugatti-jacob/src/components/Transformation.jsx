import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/scroll'
import useReducedMotion from '../hooks/useReducedMotion'
import { FRAME_COUNT } from '../hooks/useFrames'

/** `from` = first frame index (0-based) of each chapter in the supplied sequence. */
const CHAPTERS = [
  { from: 0,   title: 'The arrival',        text: 'A blue Chiron rolls into a dark showroom.' },
  { from: 18,  title: 'The approach',       text: 'The camera closes in on the car.' },
  { from: 40,  title: 'The W16 revealed',   text: 'The rear deck lifts. Sixteen cylinders, laid bare.' },
  { from: 60,  title: 'Disassembly',        text: 'Pistons, gears and rings drift apart in the dark.' },
  { from: 112, title: 'Transformation',     text: 'The parts gather inside a sapphire case.' },
  { from: 150, title: 'The reveal',         text: 'The finished watch turns to the light.' },
]
const chapterAt = (i) => CHAPTERS.reduce((acc, c, idx) => (i >= c.from ? idx : acc), 0)

export default function Transformation({ imgs }) {
  const section = useRef(null)
  const stage = useRef(null)
  const canvas = useRef(null)
  const bar = useRef(null)
  const last = useRef(0)
  const [chapter, setChapter] = useState(0)
  const reduced = useReducedMotion()

  const render = useCallback((i) => {
    const c = canvas.current
    if (!c) return
    last.current = i
    const list = imgs.current
    const ok = (im) => im && im.complete && im.naturalWidth
    let img = null
    for (let k = i; k >= 0 && !img; k--) if (ok(list[k])) img = list[k]
    for (let k = i + 1; k < list.length && !img; k++) if (ok(list[k])) img = list[k]
    if (!img) return
    const ctx = c.getContext('2d')
    const cw = c.width, ch = c.height
    // cover on landscape; on portrait keep the whole watch in view instead of cropping it
    const s = Math.max(cw / img.naturalWidth, Math.min(ch / img.naturalHeight, (1.85 * cw) / img.naturalWidth))
    const w = img.naturalWidth * s, h = img.naturalHeight * s
    ctx.fillStyle = '#03050A'
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
  }, [imgs])

  // keep the canvas crisp and sized to the stage
  useEffect(() => {
    const c = canvas.current
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      c.width = stage.current.clientWidth * dpr
      c.height = stage.current.clientHeight * dpr
      render(last.current)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(stage.current)
    // frames stream in after mount; repaint as they arrive
    const t = setInterval(() => render(last.current), 400)
    const stop = setTimeout(() => clearInterval(t), 20000)
    return () => { ro.disconnect(); clearInterval(t); clearTimeout(stop) }
  }, [render])

  useLayoutEffect(() => {
    if (reduced) { render(FRAME_COUNT - 14); return }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: '+=450%',
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const i = Math.min(FRAME_COUNT - 1, Math.round(self.progress * (FRAME_COUNT - 1)))
          if (i !== last.current) render(i)
          const ch = chapterAt(i)
          setChapter((p) => (p === ch ? p : ch))
          if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`
        },
      })
    }, section)
    return () => ctx.revert()
  }, [reduced, render])

  const c = CHAPTERS[chapter]

  return (
    <section id="story" ref={section} aria-label="From hypercar to watch: scroll-driven transformation" className="relative h-[100svh] overflow-hidden bg-void">
      <div ref={stage} className="absolute inset-0">
        <canvas ref={canvas} role="img" aria-label="Animated sequence: a blue Bugatti Chiron's W16 engine disassembles and reassembles into a Jacob & Co. watch" className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_45%,rgba(3,5,10,.7)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void/95 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void/90 to-transparent" />

      <p className="label absolute left-6 top-24 md:left-10">From hypercar to haute horlogerie</p>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-10 md:pb-14">
        <div className="crystal max-w-md rounded-sm p-6" aria-live="polite">
          <p className="label !text-electric">Chapter {chapter + 1} of {CHAPTERS.length}</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-white md:text-4xl">{c.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-silver/90">{c.text}</p>
        </div>
        <ol className="hidden gap-1.5 md:flex" aria-hidden="true">
          {CHAPTERS.map((_, i) => (
            <li key={i} className={`h-1 w-10 rounded-full transition-colors duration-500 ${i <= chapter ? 'bg-electric' : 'bg-white/15'}`} />
          ))}
        </ol>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-cobalt to-electric" />
      </div>
    </section>
  )
}
