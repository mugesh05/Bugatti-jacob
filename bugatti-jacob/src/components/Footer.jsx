import { Instagram, Twitter, Youtube } from 'lucide-react'
import { scrollToId } from '../lib/scroll'

const NAV = [['Home', 'home'], ['Collection', 'collection'], ['Engineering', 'engineering'], ['Specifications', 'specifications'], ['Gallery', 'gallery']]
const COLLECTION = [['The masterpiece', 'collection'], ['Transformation', 'story'], ['The film', 'film'], ['Brand story', 'discover']]
const SOCIAL = [[Instagram, 'Instagram'], [Twitter, 'X (Twitter)'], [Youtube, 'YouTube']]

export default function Footer() {
  const jump = (id) => (e) => { e.preventDefault(); scrollToId(id) }
  return (
    <footer className="relative bg-void px-6 pb-10 pt-20 md:px-10">
      <hr className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="text-xs font-medium tracking-[.3em] text-white">BUGATTI <span className="text-electric">×</span> JACOB &amp; CO.</p>
          <p className="mt-2 label !text-electric">Inspired concept</p>
          <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted">
            An independent design concept. It is not an official website of Bugatti or Jacob &amp; Co., and is not affiliated with either brand.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="label mb-5">Navigate</h2>
          <ul className="space-y-3 text-sm text-silver">
            {NAV.map(([l, id]) => <li key={id}><a href={`#${id}`} onClick={jump(id)} className="transition-colors hover:text-electric">{l}</a></li>)}
          </ul>
        </nav>
        <nav aria-label="Collection links">
          <h2 className="label mb-5">Collection</h2>
          <ul className="space-y-3 text-sm text-silver">
            {COLLECTION.map(([l, id]) => <li key={id}><a href={`#${id}`} onClick={jump(id)} className="transition-colors hover:text-electric">{l}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="label mb-5">Contact</h2>
          <address className="space-y-2 text-sm not-italic text-silver">
            <p>[Your studio name]</p>
            <p>[email@yourdomain.com]</p>
            <p>[+00 000 000 0000]</p>
          </address>
          <p className="mt-3 text-[.68rem] text-muted">Placeholder details. Replace before launch.</p>
          <div className="mt-6 flex gap-3">
            {SOCIAL.map(([Icon, name]) => (
              <a key={name} href="#" onClick={(e) => e.preventDefault()} aria-label={`${name} (placeholder link)`}
                 className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-silver transition-colors hover:border-electric hover:text-electric"><Icon size={16} /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[.7rem] text-muted md:flex-row">
        <p>© {new Date().getFullYear()} Concept project. All trademarks belong to their respective owners.</p>
        <p>Product imagery supplied by the project owner.</p>
      </div>
    </footer>
  )
}
