import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { GALLERY } from '../data/gallery'
import { asset } from '../lib/asset'
import { startScroll, stopScroll } from '../lib/scroll'
import SplitHeading from './SplitHeading'
import Img from './Img'

export default function Gallery() {
  const track = useRef(null)
  const drag = useRef({ down: false, x: 0, left: 0, moved: false })
  const [index, setIndex] = useState(0)
  const [viewer, setViewer] = useState(null) // index | null

  const slideTo = useCallback((i) => {
    const t = track.current
    const el = t?.children[i]
    if (!el) return
    t.scrollTo({ left: el.offsetLeft - (t.clientWidth - el.clientWidth) / 2, behavior: 'smooth' })
  }, [])

  const onScroll = () => {
    const t = track.current
    const mid = t.scrollLeft + t.clientWidth / 2
    let best = 0, dist = Infinity
    ;[...t.children].forEach((el, i) => {
      const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - mid)
      if (d < dist) { dist = d; best = i }
    })
    setIndex(best)
  }

  // mouse drag (touch uses native scrolling)
  const down = (e) => {
    if (e.pointerType !== 'mouse') return
    const d = drag.current, t = track.current
    d.down = true; d.x = e.clientX; d.left = t.scrollLeft; d.moved = false
    t.style.scrollSnapType = 'none'; t.style.scrollBehavior = 'auto'
  }
  const move = (e) => {
    const d = drag.current
    if (!d.down) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 5) d.moved = true
    track.current.scrollLeft = d.left - dx
  }
  const up = () => {
    const d = drag.current
    if (!d.down) return
    d.down = false
    track.current.style.scrollSnapType = ''
    track.current.style.scrollBehavior = ''
    if (d.moved) slideTo(index)
  }

  // full-screen viewer: lock page scroll, keyboard support
  useEffect(() => {
    if (viewer === null) return
    stopScroll()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setViewer(null)
      if (e.key === 'ArrowRight') setViewer((v) => (v + 1) % GALLERY.length)
      if (e.key === 'ArrowLeft') setViewer((v) => (v - 1 + GALLERY.length) % GALLERY.length)
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; startScroll() }
  }, [viewer])

  const item = viewer !== null ? GALLERY[viewer] : null

  return (
    <section id="gallery" className="relative overflow-hidden bg-void py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SplitHeading lines={['EVERY ANGLE.', 'EVERY DETAIL.']} className="font-display text-[clamp(2.2rem,5.4vw,5rem)] font-medium leading-none tracking-[.03em] chrome-text" />
          <div className="flex gap-3">
            <button type="button" aria-label="Previous image" onClick={() => slideTo(Math.max(0, index - 1))} className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-electric hover:text-electric"><ChevronLeft size={20} /></button>
            <button type="button" aria-label="Next image" onClick={() => slideTo(Math.min(GALLERY.length - 1, index + 1))} className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-electric hover:text-electric"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>

      <div
        ref={track} onScroll={onScroll}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onPointerCancel={up}
        role="region" aria-roledescription="carousel" aria-label="Product gallery"
        style={{ "--gh": "clamp(300px, 56vh, 620px)" }}
        className="no-scrollbar mt-14 flex items-end cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-6 active:cursor-grabbing md:gap-7 md:px-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]"
      >
        {GALLERY.map((g, i) => (
          <figure key={g.src} className="group relative shrink-0 snap-center" style={{ width: `min(calc(var(--gh) * ${(g.w / g.h).toFixed(4)}), 86vw)` }}>
            <button type="button" aria-label={`Open ${g.title} full screen`} onClick={() => { if (!drag.current.moved) setViewer(i) }} className="block w-full text-left">
              <div className="crystal rounded-sm">
                <Img src={g.src} alt={g.title} w={g.w} h={g.h} className="w-full" style={{ aspectRatio: `${g.w} / ${g.h}` }} imgClassName="select-none transition-transform duration-[1200ms] group-hover:scale-105 [-webkit-user-drag:none]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                <Maximize2 size={16} className="absolute right-4 top-4 text-white/70 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-xl text-white">{g.title}</span>
                <span className="label tabular-nums">{String(i + 1).padStart(2, '0')} / {String(GALLERY.length).padStart(2, '0')}</span>
              </figcaption>
            </button>
          </figure>
        ))}
        <div className="w-4 shrink-0" aria-hidden="true" />
      </div>

      {/* thumbnails */}
      <div className="mx-auto mt-10 flex max-w-[1400px] justify-center gap-3 overflow-x-auto px-6 no-scrollbar" role="tablist" aria-label="Gallery thumbnails">
        {GALLERY.map((g, i) => (
          <button key={g.src} type="button" role="tab" aria-selected={i === index} aria-label={g.title} onClick={() => slideTo(i)}
            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border transition-all duration-500 md:h-16 md:w-16 ${i === index ? 'border-electric shadow-[0_0_24px_-4px_#168BFF]' : 'border-white/10 opacity-50 hover:opacity-100'}`}>
            <img src={asset(g.src)} alt="" loading="lazy" decoding="async" width="64" height="64" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {item && (
          <motion.div role="dialog" aria-modal="true" aria-label={`${item.title}, full screen`}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-void/95 backdrop-blur-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            onClick={() => setViewer(null)}>
            <button type="button" aria-label="Close viewer" onClick={() => setViewer(null)} className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white hover:border-electric"><X size={20} /></button>
            <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setViewer((viewer - 1 + GALLERY.length) % GALLERY.length) }} className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white hover:border-electric md:left-8"><ChevronLeft size={22} /></button>
            <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setViewer((viewer + 1) % GALLERY.length) }} className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white hover:border-electric md:right-8"><ChevronRight size={22} /></button>
            <AnimatePresence mode="wait">
              <motion.figure key={viewer} className="flex max-h-[88vh] max-w-[88vw] flex-col items-center"
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}>
                <img src={asset(item.src)} alt={item.title} width={item.w} height={item.h} className="max-h-[78vh] w-auto max-w-full rounded-sm object-contain shadow-[0_0_120px_-20px_rgba(22,139,255,.6)]" />
                <figcaption className="mt-5 font-display text-xl text-white">{item.title}</figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
