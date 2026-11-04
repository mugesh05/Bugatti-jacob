# Bugatti × Jacob & Co. — Engineering Beyond Time

A cinematic, scroll-driven watch experience built with React, Vite, Tailwind CSS, GSAP ScrollTrigger,
Framer Motion and Lenis smooth scrolling. Blue and black palette, crystal-glass finish.

> Independent design concept. Not an official Bugatti or Jacob & Co. website.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build
```
Requires Node 18+.

## Deploy to Render

The repository-root `render.yaml` configures this app as a Render Static Site. In Render, choose **New → Blueprint** and connect the repository. The Blueprint installs from this directory, builds with `npm ci && npm run build`, publishes `dist`, and rewrites client-side routes to `index.html`.

## Folder structure

```
public/
  frames/f001…f213.webp   your 213 frames, converted to WebP (drives the scroll sequence)
  img/                    hero, poster and detail crops cut from your frames
  video/transformation.mp4  the frames assembled into a 9 s film (24 fps)
src/
  App.jsx                 page assembly, loader gate, smooth scroll start
  index.css               design tokens, crystal finish, buttons
  lib/scroll.js           Lenis + GSAP ScrollTrigger wiring
  lib/asset.js            base-URL-safe asset paths
  hooks/useFrames.js      preloads the frame sequence
  hooks/useReducedMotion.js
  data/specs.js           ← edit specifications and hotspots here
  data/gallery.js         ← edit gallery images here
  components/
    Loader · Nav · Hero · Particles
    Transformation        pinned canvas, 213 frames scrubbed by scroll
    Masterpiece · Specifications · Engineering
    Gallery · VideoSection · BrandStory · FinalCTA · Footer
    Img · SplitHeading · Counter (shared)
```

## How the transformation works
`Transformation.jsx` pins the section for 450% of the viewport height. ScrollTrigger maps scroll progress to a
frame index (0–212) and paints that frame to a `<canvas>`. Six chapter captions swap at set frame numbers
(`CHAPTERS` at the top of the file). If you replace the frames, adjust those numbers.

## Images
All imagery comes from your frame sequence. Nothing is stock.
- Your frames contain no rear view of the watch, so the gallery shows front, side, sapphire profile,
  mechanical close-up, tourbillon, strap and the unassembled engine instead.
- Detail crops are enlarged from 1280×720 video frames, so close-ups are softer than true macro photography.
  Swap in higher-resolution stills at the same filenames in `public/img/` for a sharper result.
- The generator's corner sparkle mark was blurred out of `hero.webp` and `poster.webp` only. It is still visible
  in the scroll sequence frames; retouch those if it matters.

## Specifications: what is verified
Figures are taken from published data for the Jacob & Co. Bugatti Chiron Tourbillon:
JCAM37 manual-winding caliber, 578 components, 51 jewels, 60 h reserve, 21,600 vph, one-minute flying
tourbillon inclined 30°, 30 m (3 atm) water resistance, rubber strap with titanium deployment buckle.
Sources: Watchonista product pages, A Timely Perspective, Betteridge (authorised retailer), WatchILove.

Marked **Confirm** (they differ by case variant): case material and case dimensions (55 × 44 mm, 21.5 mm thick are
listed for the sapphire versions). Check them against your exact reference and edit `src/data/specs.js`.
Only verified numbers use animated counters.

## Placeholders to replace
Footer contact details and social links are placeholders on purpose.

## Accessibility and performance
Reduced-motion users get no smooth scroll, no pinned sequence and no entrance animations. Below-the-fold images
are lazy-loaded with reserved dimensions, particle and video loops pause off-screen, keyboard navigation works in
the menu, gallery viewer and film dialog.
