import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Building2, Globe, MapPin, AlignLeft,
  ChevronRight, Loader2, AlertCircle, Brain, Target, TrendingUp
} from 'lucide-react'
import { apiFetch } from '../lib/api'

// ─── Left Panel (shared with Signup/Login) ─────────────────────────────────────
function LeftPanel() {
  const features = [
    { icon: <Brain className="w-4 h-4" />, text: 'AI resume scoring against every role' },
    { icon: <Target className="w-4 h-4" />, text: 'Smart job matching in seconds' },
    { icon: <TrendingUp className="w-4 h-4" />, text: 'Track applications from Applied to Offer' },
  ]

  return (
    <div className="hidden lg:flex flex-col justify-between h-full p-10 relative overflow-hidden">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-900 via-cyan-900 to-cyan-950" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(8,145,178,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20,184,166,0.4) 0%, transparent 40%)',
        }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Logo */}
      <div className="relative z-10">
        <Link to="/" className="flex items-center gap-2.5 group w-fit">
          <span className="font-bold text-white text-3xl tracking-tight">
            Career<span className="text-cyan-400 italic">OS</span>
          </span>
        </Link>
      </div>

      {/* Hero text */}
      <div className="relative z-10 space-y-6">
        <h2 className="text-5xl font-black text-white leading-tight">
          Your career, upgraded
          <br />
          with AI{' '}
          <span
            className="text-cyan-500 bg-clip-text"
          >
            intelligence.
          </span>
        </h2>

        <ul className="space-y-4">
          {features.map((f) => (
            <li key={f.text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-800/60 border border-cyan-700/40 flex items-center justify-center text-cyan-300 shrink-0">
                {f.icon}
              </div>
              <span className="text-sm text-white">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <p className="text-xs text-white">
          © 2026 Career<span className='italic text-cyan-400'>OS</span>
        </p>
      </div>
    </div>
  )
}

function CompanyOnboardingForm() {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || 'Company'
  
  const [form, setForm] = useState({
    companyName: userName,
    industry: '',
    website: '',
    location: '',
    description: '',
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!form.companyName || !form.industry || !form.location) {
      setError('Please fill out all required fields.')
      return
    }

    setLoading(true)
    setError('')
    try {
      await apiFetch('/api/companies', {
        method: 'PATCH',
        body: JSON.stringify(form)
      })
      navigate('/dashboard/company')
    } catch (err) {
      setError(err.message || 'Failed to save profile.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-black text-gray-900 mb-2">Company Setup</h2>
      <p className="text-sm text-gray-500 mb-8">
        Tell us about your company to get started.
      </p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Company Name *</label>
            <input 
              type="text" name="companyName" value={form.companyName} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Industry *</label>
            <input 
              type="text" name="industry" value={form.industry} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm"
              placeholder="e.g. Software"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Location *</label>
            <input 
              type="text" name="location" value={form.location} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm"
              placeholder="e.g. Bangalore"
            />
          </div>

          <div className="col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Website URL</label>
            <input 
              type="url" name="website" value={form.website} onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm"
              placeholder="https://example.com"
            />
          </div>

          <div className="col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Company Description</label>
            <textarea 
              name="description" value={form.description} onChange={handleChange} rows="4"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-none text-sm"
              placeholder="Tell us what your company does..."
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl bg-cyan-600 text-white font-semibold text-sm hover:bg-cyan-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
            <>
              Complete Setup <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default function CompanyOnboarding() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Branding panel */}
      <div className="w-[45%] shrink-0">
        <LeftPanel />
      </div>

      {/* Right: Form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-gray-100 min-h-screen">
        <CompanyOnboardingForm />
      </div>
    </div>
  )
}
