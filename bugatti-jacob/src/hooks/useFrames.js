import { useEffect, useRef, useState } from 'react'
import { asset } from '../lib/asset'

export const FRAME_COUNT = 213
export const PRIORITY = 36 // frames needed before the loader lifts

/** Preloads the scroll-scrubbed frame sequence (public/frames/f001.webp …). */
export default function useFrames() {
  const imgs = useRef([])
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    let n = 0
    let cancelled = false
    const done = () => {
      n += 1
      if (cancelled) return
      if (n % 6 === 0 || n >= FRAME_COUNT || n === PRIORITY) setLoaded(n)
    }
    for (let i = 0; i < FRAME_COUNT; i++) {
      const im = new Image()
      im.decoding = 'async'
      im.onload = done
      im.onerror = done
      im.src = asset(`frames/f${String(i + 1).padStart(3, '0')}.webp`)
      imgs.current[i] = im
    }
    return () => { cancelled = true }
  }, [])

  return { imgs, loaded, ready: loaded >= PRIORITY }
}
