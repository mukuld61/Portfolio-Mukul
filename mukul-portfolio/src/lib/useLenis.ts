import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wires Lenis smooth-scroll into GSAP's ScrollTrigger so scroll-driven
 * animations (hero parallax, section reveals) stay in sync with the
 * smoothed scroll position instead of the raw browser scroll.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Section reveals use gsap.from(), which bakes in the hidden state
    // immediately. If the page's height changes after that (web fonts
    // swapping in, the hero photo finishing its load) every trigger below
    // that point is now positioned wrong and may never fire — leaving
    // those sections stuck invisible. Re-measuring after layout settles
    // fixes that for every section at once.
    const refresh = () => ScrollTrigger.refresh()

    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    const images = Array.from(document.images)
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', refresh, { once: true })
    })

    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(document.body)

    return () => {
      lenis.destroy()
      window.removeEventListener('load', refresh)
      resizeObserver.disconnect()
    }
  }, [])
}
