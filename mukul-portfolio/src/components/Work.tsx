import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.work-row').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 80%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={ref} className="py-28 md:py-36 px-6 md:px-10 bg-[#0b1120]">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-sm text-[#c99b5c] mb-4">Selected work</p>
        <h2 className="font-display text-3xl md:text-4xl text-[#edeae0] mb-20 max-w-xl">
          Two production systems, built end to end.
        </h2>

        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`work-row grid md:grid-cols-12 gap-8 md:gap-12 items-start ${
                i % 2 === 1 ? 'md:text-right' : ''
              }`}
            >
              <div
                className={`md:col-span-4 font-mono text-xs text-[#a9a89e] ${
                  i % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <div className="text-[#c99b5c] mb-2">{p.date}</div>
                <div className="mb-6">{p.category}</div>
                <div className={`flex flex-wrap gap-2 ${i % 2 === 1 ? 'md:justify-end' : ''}`}>
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-white/15 px-2.5 py-1 text-[#edeae0]/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`md:col-span-8 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <h3 className="font-display text-2xl md:text-3xl text-[#edeae0] mb-6 group">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 hover:text-[#c99b5c] transition-colors"
                    >
                      {p.title}
                      <span className="text-base text-[#c99b5c] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        ↗
                      </span>
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <div className="space-y-4 text-[#a9a89e] leading-relaxed max-w-2xl md:max-w-none">
                  <p>
                    <span className="text-[#edeae0]/90 font-medium">Problem — </span>
                    {p.problem}
                  </p>
                  <p>
                    <span className="text-[#edeae0]/90 font-medium">Solution — </span>
                    {p.solution}
                  </p>
                  <p>
                    <span className="text-[#edeae0]/90 font-medium">Outcome — </span>
                    {p.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
