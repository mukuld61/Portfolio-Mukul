import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero treatment: the portrait is pinned and given a scroll-driven tilt +
 * scale + slight parallax drift, rather than a full 360deg rotation, since
 * we only have one photographed angle to work with. If a real multi-angle
 * photo set is added later (see /public/hero-frames), this can be swapped
 * for a true frame-sequence turntable.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let handlePointerMove: ((e: PointerEvent) => void) | null = null

    const ctx = gsap.context(() => {
      gsap.set(photoRef.current, { transformPerspective: 1400 })

      // Scroll-driven tilt: turns and lifts as the page scrolls past the hero
      gsap.to(photoRef.current, {
        rotateY: 14,
        rotateX: -5,
        scale: 1.06,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=90%',
          scrub: 0.6,
        },
      })

      // Continuous slow float so the portrait never feels static
      gsap.to(photoRef.current, {
        y: '+=16',
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Mouse-follow parallax tilt, layered on top of the scroll tilt
      const quickX = gsap.quickTo(photoRef.current, 'rotateY', {
        duration: 0.8,
        ease: 'power3.out',
      })
      const quickY = gsap.quickTo(photoRef.current, 'rotateX', {
        duration: 0.8,
        ease: 'power3.out',
      })

      handlePointerMove = (e: PointerEvent) => {
        const { innerWidth, innerHeight } = window
        const relX = (e.clientX / innerWidth - 0.5) * 2
        const relY = (e.clientY / innerHeight - 0.5) * 2
        quickX(14 + relX * 10)
        quickY(-5 - relY * 6)
      }

      if (!window.matchMedia('(pointer: coarse)').matches) {
        window.addEventListener('pointermove', handlePointerMove)
      }

      gsap.to(indicatorRef.current, {
        opacity: 0,
        y: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=15%',
          scrub: true,
        },
      })

      gsap.from('.hero-reveal', {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.12,
        delay: 0.2,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      if (handlePointerMove) {
        window.removeEventListener('pointermove', handlePointerMove)
      }
    }
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden blueprint-grid"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1526] via-[#0e1526]/70 to-[#0e1526]" />

      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 pt-32 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="hero-reveal font-mono text-sm text-[#c99b5c] mb-6">
            {profile.role}
          </p>
          <h1 className="hero-reveal font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-[#edeae0] mb-8">
            I ship software that people rely on.
          </h1>
          <p className="hero-reveal text-lg text-[#a9a89e] max-w-md mb-10 leading-relaxed">
            {profile.summary}
          </p>
          <div className="hero-reveal flex flex-wrap gap-4">
            <a
              href="#work"
              className="px-7 py-3.5 bg-[#c99b5c] text-[#0e1526] font-medium hover:bg-[#edeae0] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,155,92,0.35)]"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 border border-white/20 text-[#edeae0] hover:border-[#c99b5c] transition-all hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          {/* Soft brass glow behind the portrait, giving it depth against the dark ground */}
          <div className="absolute w-[320px] md:w-[440px] aspect-[4/5] bg-[#c99b5c]/25 blur-[90px] rounded-full" />

          <div
            ref={photoRef}
            className="relative w-[300px] md:w-[420px] will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src="/mukul-cutout.png"
              alt="Portrait of Mukul Dubey"
              className="relative w-full h-auto"
              style={{ filter: 'drop-shadow(0 35px 45px rgba(0,0,0,0.5))' }}
            />
          </div>
        </div>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#a9a89e]"
      >
        <span className="font-mono text-xs">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#c99b5c] to-transparent" />
      </div>
    </section>
  )
}
