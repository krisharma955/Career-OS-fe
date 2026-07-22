const problems = [
  {
    number: '01',
    title: 'Applications disappear into the void',
    description: "You apply to 50 jobs and never hear back. No feedback, no insights — just silence while your resume gets filtered out by ATS bots.",
  },
  {
    number: '02',
    title: 'Resume guesswork costs you offers',
    description: "You tweak your resume hoping something sticks. Without knowing what recruiters and ATS systems actually want, you're flying blind.",
  },
  {
    number: '03',
    title: 'Campus placements feel like a lottery',
    description: "Who gets shortlisted feels random. There's no structured pipeline, no visibility, and no way to track where you stand.",
  },
]

export default function WhySection() {
  return (
    <section id="why" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
            You're not short on ambition.
            <br />
            You're short on the right tools.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
            Submitting applications and hoping for the best is easy. Landing the job requires knowing what's wrong and fixing it fast.
            Career-OS exists for that gap.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {problems.map((p) => (
            <div
              key={p.number}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-50 transition-all duration-300 bg-gray-50/50 hover:bg-white"
            >
              <span className="text-xs font-bold text-cyan-500 tracking-widest mb-3 block">{p.number}</span>
              <h3 className="font-bold text-gray-900 mb-2 text-base leading-snug">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Founder quote-style block */}
        <div className="p-8 md:p-10 rounded-3xl bg-cyan-50/60 border border-cyan-100">
          <p className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-snug">
            I built Career-OS because campus hiring is broken. Companies post jobs with no transparency. Students apply with no feedback. And AI resume tools give you a score but not a path forward.
          </p>
          <p className="text-base text-gray-500 leading-relaxed max-w-2xl">
            Career-OS is the structured system that sits between students and companies — with a full application pipeline, an AI that actually reads your resume and tells you what's missing, and a dashboard that keeps everyone on the same page.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-600 to-cyan-700 flex items-center justify-center text-white font-bold text-sm">K</div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Krish Sharma</p>
              <p className="text-xs text-gray-400">Creator, Career<span className="italic">OS</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
