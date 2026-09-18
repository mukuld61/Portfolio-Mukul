import { useEffect, useState } from 'react'
import { profile } from '../data/content'

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0e1526]/85 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="font-display text-lg tracking-tight text-[#edeae0]">
          Mukul Dubey
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-[#a9a89e] hover:text-[#edeae0] transition-colors group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c99b5c] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm px-5 py-2.5 border border-[#c99b5c] text-[#c99b5c] hover:bg-[#c99b5c] hover:text-[#0e1526] transition-colors"
          >
            Let&rsquo;s talk
          </a>
        </div>

        <button
          className="md:hidden text-[#edeae0]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`h-px bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-px bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span
              className={`h-px bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </div>
        </button>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 top-20 bg-[#0e1526] flex flex-col px-8 py-10 gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-[#edeae0]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.links.github}
            className="font-mono text-sm text-[#a9a89e] mt-auto"
          >
            {profile.links.github.replace('https://', '')}
          </a>
        </div>
      )}
    </header>
  )
}
