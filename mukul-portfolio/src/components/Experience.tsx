import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience, education } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-row', {
        opacity: 0,
        x: -20,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 md:px-10 bg-[#0b1120]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_2fr] gap-16">
        <div>
          <p className="font-mono text-sm text-[#c99b5c] mb-4">Experience</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#edeae0]">
            Where the work happened.
          </h2>
        </div>

        <div className="space-y-14">
          <div>
            {experience.map((e) => (
              <div key={e.role} className="timeline-row border-l-2 border-[#c99b5c] pl-6 mb-10">
                <div className="font-mono text-xs text-[#a9a89e] mb-2">{e.period}</div>
                <h3 className="font-display text-xl text-[#edeae0] mb-1">{e.role}</h3>
                <div className="text-[#c99b5c] text-sm mb-4">{e.org}</div>
                <ul className="space-y-2 text-[#a9a89e] leading-relaxed">
                  {e.points.map((pt) => (
                    <li key={pt} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[#c99b5c]/60">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-white/15 pl-6 space-y-8">
            {education.map((ed) => (
              <div key={ed.title} className="timeline-row">
                <div className="font-mono text-xs text-[#a9a89e] mb-1">{ed.period}</div>
                <h3 className="font-display text-lg text-[#edeae0]">{ed.title}</h3>
                <div className="text-[#a9a89e] text-sm">{ed.org}</div>
                {ed.detail && (
                  <div className="text-[#c99b5c] text-sm mt-1">{ed.detail}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
