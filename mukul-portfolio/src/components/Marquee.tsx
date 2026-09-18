const words = ['FULL-STACK', 'JAVA', 'REST APIs', 'MERN', 'SYSTEM DESIGN', 'DSA']

export default function Marquee() {
  const line = [...words, ...words]
  return (
    <div className="border-y border-white/10 py-6 overflow-hidden bg-[#0e1526]">
      <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite]">
        {[...line, ...line].map((w, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-3xl text-[#edeae0]/25 mx-8 flex items-center gap-8"
          >
            {w}
            <span className="text-[#c99b5c]">&middot;</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
