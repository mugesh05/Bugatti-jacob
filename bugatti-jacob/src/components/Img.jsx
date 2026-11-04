import { useEffect, useRef, useState } from 'react'
import { asset } from '../lib/asset'

/** Lazy image with a crystal-shimmer skeleton and fixed aspect ratio (no layout shift). */
export default function Img({ src, alt, w, h, eager = false, className = '', imgClassName = '', style, imgRef }) {
  const [ok, setOk] = useState(false)
  const local = useRef(null)
  const ref = imgRef || local

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setOk(true)
  }, [ref])

  return (
    <div className={`relative overflow-hidden ${ok ? '' : 'skeleton'} ${className}`} style={style}>
      <img
        ref={ref}
        src={asset(src)}
        alt={alt}
        width={w}
        height={h}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onLoad={() => setOk(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${ok ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  )
}
