import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#a9a89e]">
        <span>{profile.name}</span>
        <span>Built with React, GSAP & Lenis</span>
        <span>&copy; 2026</span>
      </div>
    </footer>
  )
}
