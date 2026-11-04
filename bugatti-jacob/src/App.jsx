import { useEffect } from 'react'
import { ScrollTrigger, destroyScroll, initScroll } from './lib/scroll'
import useFrames from './hooks/useFrames'
import useReducedMotion from './hooks/useReducedMotion'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Transformation from './components/Transformation'
import Masterpiece from './components/Masterpiece'
import Specifications from './components/Specifications'
import Engineering from './components/Engineering'
import Gallery from './components/Gallery'
import VideoSection from './components/VideoSection'
import BrandStory from './components/BrandStory'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  const { imgs, loaded, ready } = useFrames()
  const reduced = useReducedMotion()

  // lock scroll behind the loader
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  // smooth scrolling (skipped for reduced motion), then measure once fonts are in
  useEffect(() => {
    if (!ready) return
    if (!reduced) initScroll()
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => { window.removeEventListener('load', refresh); destroyScroll() }
  }, [ready, reduced])

  return (
    <>
      <Loader loaded={loaded} ready={ready} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-void focus:px-4 focus:py-2">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Transformation imgs={imgs} />
        <Masterpiece />
        <Specifications />
        <Engineering />
        <Gallery />
        <VideoSection />
        <BrandStory />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
