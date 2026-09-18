import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { achievements } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ach-row', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        immediateRender: false
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-sm text-[#c99b5c] mb-4">Achievements & certifications</p>
        <h2 className="font-display text-3xl md:text-4xl text-[#edeae0] mb-14">
          A record built one problem at a time.
        </h2>

        <div>
          {achievements.map((a, i) => (
            <div
              key={a}
              className="ach-row flex items-baseline gap-6 py-5 border-t border-white/10 last:border-b hover:pl-2 hover:border-[#c99b5c]/40 transition-all duration-300"
            >
              <span className="font-mono text-xs text-[#c99b5c] w-8 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[#a9a89e]">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
