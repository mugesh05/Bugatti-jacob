import { scrollToId } from '../lib/scroll'
import SplitHeading from './SplitHeading'
import Particles from './Particles'

export default function FinalCTA() {
  return (
    <section id="discover" className="relative isolate flex min-h-[90svh] items-center justify-center overflow-hidden bg-void px-6 py-28 text-center">
      <div className="absolute left-1/2 top-[55%] -z-10 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 animate-pulseGlow rounded-full bg-[radial-gradient(circle,rgba(7,91,255,.55),rgba(7,91,255,.12)_45%,transparent_68%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[conic-gradient(from_200deg_at_50%_120%,transparent_0_35%,rgba(22,139,255,.25)_42%,transparent_50%,rgba(255,255,255,.1)_56%,transparent_62%)]" />
      <Particles count={40} />
      <div className="relative">
        <SplitHeading lines={['TIME IS NOT MEASURED.', 'IT IS ENGINEERED.']} className="font-display text-[clamp(2.2rem,6.4vw,6rem)] font-medium leading-[1.02] tracking-[.02em] chrome-text" />
        <p className="mt-8 text-sm tracking-[.3em] text-silver/90">Discover the Extraordinary.</p>
        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" className="btn btn-primary" onClick={() => scrollToId('collection')}>Explore the collection</button>
          <button type="button" className="btn btn-glass" onClick={() => scrollToId('specifications')}>Discover the details</button>
        </div>
      </div>
    </section>
  )
}
