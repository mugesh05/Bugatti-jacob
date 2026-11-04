import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/scroll'
import useReducedMotion from '../hooks/useReducedMotion'

/** Word-by-word masked reveal, triggered once on scroll. `lines` keeps the brief's line breaks. */
export default function SplitHeading({ lines, as: Tag = 'h2', className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.w', {
        yPercent: 115,
        duration: 1.15,
        ease: 'power4.out',
        stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <Tag ref={ref} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} className="block" aria-hidden="true">
          {line.split(' ').map((word, j) => (
            <span key={j} className="inline-block overflow-hidden pb-[.12em] -mb-[.12em] align-bottom">
              <span className="w inline-block">{word}&nbsp;</span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

export { ScrollTrigger }
