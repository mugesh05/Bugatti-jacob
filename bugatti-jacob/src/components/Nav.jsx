import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { scrollToId } from '../lib/scroll'

const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Collection', id: 'collection' },
  { label: 'Engineering', id: 'engineering' },
  { label: 'Specifications', id: 'specifications' },
  { label: 'Gallery', id: 'gallery' },
]

export default function Nav() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 70)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => { setOpen(false); setTimeout(() => scrollToId(id), open ? 350 : 0) }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4">
        <nav
          aria-label="Primary"
          className={`flex w-full items-center justify-between gap-4 transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
            compact ? 'crystal max-w-4xl rounded-full px-5 py-2.5' : 'max-w-[1500px] px-2 py-4 md:px-8'
          }`}
        >
          <a href="#home" onClick={(e) => { e.preventDefault(); go('home') }} className="whitespace-nowrap text-[.62rem] font-medium tracking-[.3em] text-white md:text-[.7rem]">
            BUGATTI <span className="text-electric">×</span> JACOB &amp; CO.
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id) }}
                   className="group relative py-1 text-[.64rem] uppercase tracking-[.26em] text-silver transition-colors hover:text-white">
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-electric transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button type="button" onClick={() => go('collection')} className={`btn btn-primary !px-5 !py-2.5 !text-[.6rem] max-sm:hidden ${compact ? '!hidden md:!inline-flex' : ''}`}>
              Explore watch
            </button>
            <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-electric">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void/95 px-8 backdrop-blur-xl md:px-24"
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(7,91,255,.3),transparent_55%)]" />
            <ul className="relative space-y-2">
              {LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.7 }}>
                  <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id) }} className="block font-display text-4xl text-white transition-colors hover:text-electric md:text-6xl">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <hr className="hairline relative my-8 max-w-xs" />
            <p className="label relative">A fan-made concept. Not an official brand site.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
