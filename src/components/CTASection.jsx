import { ArrowRight, Briefcase } from 'lucide-react'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const roles = [
  { label: 'Student', color: 'bg-teal-100 text-teal-700', desc: 'Build your profile, upload resume, apply to jobs, track applications, and get AI feedback.' },
  { label: 'Company', color: 'bg-violet-100 text-violet-700', desc: 'Post jobs with requirements, review applications, shortlist candidates, and hire.' },
  { label: 'Admin', color: 'bg-cyan-100 text-cyan-700', desc: 'Verify companies, manage users, and oversee the full platform.' },
]

export default function CTASection() {
  return (
    <section id="cta" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Roles */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              One platform, three roles
            </h2>
            <p className="text-lg text-gray-500 max-w-lg mx-auto">
              Everyone in the campus hiring process has a dedicated, purpose-built experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {roles.map((role) => (
              <div
                key={role.label}
                className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-1 transition-all duration-300"
              >
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${role.color}`}>{role.label}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {[
            { value: 'GPT-5', label: 'AI Model', color: 'text-sky-600' },
            { value: '5MB', label: 'Resume Cap', color: 'text-teal-600' },
            { value: '5', label: 'ATS Score Dimensions', color: 'text-emerald-500' },
            { value: 'Secured', label: 'Application Lifecycle', color: 'text-violet-500' },
          ].map(stat => (
            <div key={stat.label} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <p className={`text-2xl font-black mb-1 ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div
          className="relative overflow-hidden p-10 md:p-14 rounded-3xl text-center bg-cyan-700"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white" style={{ transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white" style={{ transform: 'translate(-30%, 30%)' }} />
          </div>

          <div className="relative z-10">
            <p className="text-cyan-200 text-sm font-semibold mb-4 uppercase tracking-widest">Ready to get started?</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Your campus career starts here.
            </h2>
            <p className="text-cyan-200 text-base mb-9 max-w-md mx-auto leading-relaxed">
              Sign up as a student, or company. Get your AI resume score in under a minute. Start applying to real jobs today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-gray-100 text-cyan-700 font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Create your account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://github.com/krisharma955"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-cyan-400/50 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
              >
                <GithubIcon />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
