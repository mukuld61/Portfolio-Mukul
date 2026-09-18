import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile, stats } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={ref} className="py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16">
        <div>
          <p className="about-reveal font-mono text-sm text-[#c99b5c] mb-4">About</p>
          <h2 className="about-reveal font-display text-3xl md:text-4xl text-[#edeae0] leading-tight">
            More than a developer —<br />an engineer who ships.
          </h2>
        </div>

        <div>
          <p className="about-reveal text-lg text-[#a9a89e] leading-relaxed mb-6">
            I&rsquo;m {profile.name}, based in {profile.location}. My work sits at the
            intersection of Java engineering and full-stack web development — REST APIs,
            relational schemas, authentication, and the React interfaces that sit on top of
            them. I care about code that survives contact with production: tested, reviewed,
            and built to handle real concurrent use.
          </p>
          <p className="about-reveal text-lg text-[#a9a89e] leading-relaxed mb-12">
            That foundation comes from 500+ solved data-structure and algorithm problems and
            a record as Overall Branch Topper — the same rigor I bring to shipping features.
          </p>

          <div className="about-reveal grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10">
            {stats.map((s) => (
              <div key={s.label} className="transition-transform duration-300 hover:scale-105">
                <div className="font-display text-3xl md:text-4xl text-[#c99b5c]">
                  {s.value}
                </div>
                <div className="font-mono text-xs text-[#a9a89e] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
