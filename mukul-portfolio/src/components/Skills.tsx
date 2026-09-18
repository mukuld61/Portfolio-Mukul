import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-group', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={ref} className="py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-sm text-[#c99b5c] mb-4">Skills</p>
        <h2 className="font-display text-3xl md:text-4xl text-[#edeae0] mb-16 max-w-xl">
          The stack behind the work.
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="skill-group border-t border-white/10 pt-6">
              <h3 className="font-mono text-xs text-[#a9a89e] mb-4">{group}</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="font-display text-xl md:text-2xl text-[#edeae0] hover:text-[#c99b5c] hover:scale-110 hover:-rotate-1 transition-all duration-300 cursor-default inline-block"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
