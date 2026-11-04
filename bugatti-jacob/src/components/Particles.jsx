import { useEffect, useRef } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

/** Drifting electric-blue motes. Pauses off-screen and when motion is reduced. */
export default function Particles({ count = 55 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let w = 0, h = 0, raf = 0, visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pts = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + .4,
      vy: -(Math.random() * .00006 + .00002), vx: (Math.random() - .5) * .00003, a: Math.random() * .6 + .2,
    }))
    const size = () => {
      w = c.clientWidth; h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx * 16; p.y += p.vy * 16
        if (p.y < -.02) { p.y = 1.02; p.x = Math.random() }
        ctx.beginPath()
        ctx.fillStyle = `rgba(120,190,255,${p.a})`
        ctx.shadowColor = '#168BFF'; ctx.shadowBlur = 8
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (visible && !reduced) raf = requestAnimationFrame(frame)
    }
    size()
    frame()
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && !reduced) raf = requestAnimationFrame(frame)
    })
    io.observe(c)
    window.addEventListener('resize', size)
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', size) }
  }, [count, reduced])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}
