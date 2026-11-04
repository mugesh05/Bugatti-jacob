import { motion, AnimatePresence } from 'framer-motion'
import { PRIORITY } from '../hooks/useFrames'

export default function Loader({ loaded, ready }) {
  const pct = Math.min(100, Math.round((loaded / PRIORITY) * 100))
  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label={`Loading experience ${pct} percent`}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(7,91,255,.28),transparent_60%)]" />
          <p className="label !tracking-[.5em]">Bugatti × Jacob &amp; Co.</p>
          <p className="mt-6 font-display text-6xl font-medium italic chrome-text tabular-nums">{pct}</p>
          <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
            <motion.div className="h-full origin-left bg-gradient-to-r from-cobalt to-electric" animate={{ scaleX: pct / 100 }} transition={{ ease: 'easeOut', duration: 0.4 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
