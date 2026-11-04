import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import useReducedMotion from '../hooks/useReducedMotion'

/** Animated number — only used for verified numeric specifications. */
export default function Counter({ to, suffix = '' }) {
  const el = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = el.current
    const fmt = (v) => Math.round(v).toLocaleString('en-US') + suffix
    if (reduced) { node.textContent = fmt(to); return }
    const o = { v: 0 }
    const tween = gsap.to(o, {
      v: to, duration: 1.9, ease: 'power2.out',
      scrollTrigger: { trigger: node, start: 'top 92%', once: true },
      onUpdate: () => { node.textContent = fmt(o.v) },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [to, suffix, reduced])

  return <span ref={el}>{`0${suffix}`}</span>
}
