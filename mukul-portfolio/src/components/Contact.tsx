import { profile } from '../data/content'

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-40 px-6 md:px-10 blueprint-grid relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1526] via-[#0e1526]/90 to-[#0e1526]" />
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="font-mono text-sm text-[#c99b5c] mb-6">Contact</p>
        <h2 className="font-display text-4xl md:text-6xl text-[#edeae0] mb-8 leading-tight">
          Have a role in mind?
          <br />
          Let&rsquo;s talk.
        </h2>
        <p className="text-lg text-[#a9a89e] max-w-xl mx-auto mb-12">
          Open to Software Engineer, Full Stack Developer, and Associate Software Engineer
          roles. I reply quickly — reach out directly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href={`mailto:${profile.email}`}
            className="px-8 py-4 bg-[#c99b5c] text-[#0e1526] font-medium hover:bg-[#edeae0] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,155,92,0.35)]"
          >
            {profile.email}
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 border border-white/20 text-[#edeae0] hover:border-[#c99b5c] transition-all hover:-translate-y-0.5"
          >
            Connect on LinkedIn
          </a>
        </div>

        <div className="flex justify-center gap-8 font-mono text-sm text-[#a9a89e]">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-[#c99b5c]">
            GitHub
          </a>
          <a href={profile.links.leetcode} target="_blank" rel="noreferrer" className="hover:text-[#c99b5c]">
            LeetCode
          </a>
          <a href={profile.links.gfg} target="_blank" rel="noreferrer" className="hover:text-[#c99b5c]">
            GeeksforGeeks
          </a>
          <span>{profile.phone}</span>
        </div>
      </div>
    </section>
  )
}
