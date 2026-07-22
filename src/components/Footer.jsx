import { Briefcase, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Why Career-OS', href: '#why' },
  { label: 'How It Works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'For You', href: '#for-you' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="relative bg-gray-100 overflow-hidden pt-16 pb-10 px-6">
      {/* Giant watermark text behind card */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[18vw] font-black text-gray-300/50 tracking-tight uppercase whitespace-nowrap"
          style={{ letterSpacing: '0.1em' }}
        >
          CAREEROS
        </span>
      </div>

      {/* Card */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 px-8 py-10">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {/* Brand + CTA */}
            <div className="flex-1">
              {/* Logo */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="font-bold text-gray-900 text-xl">
                  Career<span className="text-cyan-600 italic">OS</span>
                </span>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
                AI-powered campus placement management. Built for students who want offers, and companies who want talent — not paperwork.
              </p>

              <a
                href="#"
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-600 text-white text-sm font-semibold shadow-lg shadow-cyan-200 hover:bg-cyan-700 hover:shadow-cyan-300 transition-all duration-300"
              >
                Get started free
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Nav links */}
            <div className="shrink-0">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                Explore
              </p>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-cyan-600 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar inside card area */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 px-2">
          <p className="text-xs text-gray-400">
            © 2026 CareerOS. Developed by <span className='font-bold'>Krish Sharma.</span>
          </p>
          <p className="text-xs text-gray-400 italic">
            Made for students who want offers, not just applications.
          </p>
        </div>
      </div>
    </footer>
  )
}
