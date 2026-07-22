import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
  className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D})`,
  }}
    >

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-35 pb-16">

        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
          Land your dream{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-br from-cyan-500 via-cyan-600 to-cyan-700"
          >
            campus job
          </span>
          <br />
          with AI on your side
        </h1>

        <p className="text-lg fon md:text-xl text-gray-800 max-w-xl mx-auto mb-10 leading-relaxed">
          Career-OS connects students with companies through a smart hiring pipeline — with AI that scores your resume and tells you exactly how to improve it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="http://localhost:5173/signup"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-600 text-white font-bold text-base hover:bg-cyan-700 hover:shadow-cyan-500/40 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/70 backdrop-blur-sm text-gray-800 font-semibold text-base border border-white/80 hover:bg-white/90 transition-all duration-300 shadow-md"
          >
            <Play className="w-4 h-4 text-cyan-600" />
            See how it works
          </a>
        </div>

      </div>
    </section>
  )
}
