import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize, Play, X } from 'lucide-react'
import { asset } from '../lib/asset'
import { startScroll, stopScroll } from '../lib/scroll'
import useReducedMotion from '../hooks/useReducedMotion'
import SplitHeading from './SplitHeading'

export default function VideoSection() {
  const bg = useRef(null)
  const full = useRef(null)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  // background loop only plays while visible
  useEffect(() => {
    const v = bg.current
    if (!v || reduced) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [reduced])

  useEffect(() => {
    if (!open) return
    stopScroll()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && !document.fullscreenElement && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; startScroll() }
  }, [open])

  const goFull = () => {
    const v = full.current
    if (!v) return
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {})
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen()
  }

  return (
    <section id="film" aria-label="Film" className="relative isolate flex min-h-[90svh] items-center justify-center overflow-hidden bg-void">
      <video ref={bg} src={asset('video/transformation.mp4')} poster={asset('img/poster.webp')} muted loop playsInline preload="none"
             aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover opacity-70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(3,5,10,.35),rgba(3,5,10,.9)_80%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-void to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-void to-transparent" />

      <div className="px-6 text-center">
        <SplitHeading lines={['POWER IN', 'EVERY SECOND.']} className="font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[.95] tracking-[.03em] chrome-text" />
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-silver/90">Watch the engine become the watch. 9 seconds, in full frame.</p>
        <button type="button" onClick={() => setOpen(true)} aria-label="Play the transformation film"
                className="group relative mx-auto mt-12 grid h-24 w-24 place-items-center rounded-full text-white">
          <span className="crystal absolute inset-0 rounded-full transition-transform duration-500 group-hover:scale-110" />
          <span className="absolute -inset-3 animate-pulseGlow rounded-full border border-electric/50" />
          <Play size={28} fill="currentColor" className="relative ml-1" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" aria-label="Transformation film" className="fixed inset-0 z-[90] flex items-center justify-center bg-void/95 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <div className="absolute right-5 top-5 z-10 flex gap-3">
              <button type="button" aria-label="Full screen" onClick={(e) => { e.stopPropagation(); goFull() }} className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white hover:border-electric"><Maximize size={18} /></button>
              <button type="button" aria-label="Close film" onClick={() => setOpen(false)} className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white hover:border-electric"><X size={20} /></button>
            </div>
            <video ref={full} src={asset('video/transformation.mp4')} poster={asset('img/poster.webp')} controls autoPlay playsInline loop
                   className="max-h-[85vh] w-full max-w-5xl rounded-sm shadow-[0_0_140px_-30px_rgba(22,139,255,.7)]" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
