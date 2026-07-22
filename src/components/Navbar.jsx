import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Briefcase } from 'lucide-react'

const navLinks = [
  { label: 'Why', href: '#why' },
  { label: 'How', href: '#how' },
  { label: 'For You', href: '#for-you' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <nav className={`flex items-center justify-between w-full max-w-4xl px-4 py-2.5 rounded-4xl transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-cyan-100/50 border border-cyan-100'
          : 'bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm'
      }`}>
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-bold text-2xl text-gray-900 tracking-tight">
            Career<span className="text-cyan-600 italic">OS</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} className="text-sm font-medium text-gray-600 hover:text-cyan-700 transition-colors duration-200">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-cyan-700 transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded-full bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition-all duration-200 shadow-md hover:shadow-cyan-300">
            Get Started
          </Link>
        </div>

        <button className="md:hidden p-2 text-gray-600 hover:text-cyan-700 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-cyan-100 p-4 md:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map(link => (
              <li key={link.label}>
                <a href={link.href} className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link to="/login" className="block px-4 py-2 text-sm font-medium text-center text-gray-600" onClick={() => setIsOpen(false)}>Sign In</Link>
            <Link to="/signup" className="block px-4 py-2 rounded-full bg-cyan-600 text-white text-sm font-semibold text-center" onClick={() => setIsOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </header>
  )
}
