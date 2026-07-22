import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Briefcase,
  GraduationCap,
  Building2,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Brain,
  Target,
  TrendingUp,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { BASE_URL } from '../lib/api'

// ─── Left Panel ────────────────────────────────────────────────────────────────
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
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group w-fit">
          <span className="font-bold text-white text-2xl tracking-tight">
            Career<span className="text-cyan-400 italic">OS</span>
          </span>
        </Link>
      </div>

      {/* Center hero text */}
      <div className="relative z-10 space-y-6">
        <h2 className="text-5xl font-black text-white leading-tight">
          Your career, upgraded
          <br />
          with AI{' '}
          <span className="text-cyan-500 bg-clip-text"
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
              <span className="text-sm text-cyan-200">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <p className="text-xs text-white">© 2026 Career<span className='italic text-cyan-400'>OS</span></p>
      </div>
    </div>
  )
}

// ─── Step 1: Role Selector ──────────────────────────────────────────────────────
function RoleSelector({ onSelect }) {
  const roles = [
    {
      role: 'STUDENT',
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'I am a Student',
      desc: 'Build your profile, analyze your resume, and apply to jobs.',
    },
    {
      role: 'COMPANY',
      icon: <Building2 className="w-6 h-6" />,
      title: 'I am a Company',
      desc: 'Post roles, review ranked applicants, and hire top talent.',
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back home */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-10 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Back home
      </Link>

      <h1 className="text-3xl font-black text-gray-900 mb-2">Create your account</h1>
      <p className="text-sm text-gray-500 mb-8">
        Choose how you want to use Career<span className='italic text-cyan-500'>OS</span> to get started.
      </p>

      <div className="space-y-3">
        {roles.map(({ role, icon, title, desc }) => (
          <button
            key={role}
            onClick={() => onSelect(role)}
            className="group w-full flex items-center gap-5 p-5 rounded-2xl border-2 border-gray-100 hover:border-cyan-500 bg-gray-50/60 hover:bg-cyan-50/40 transition-all duration-200 text-left"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 group-hover:bg-cyan-200 transition-colors">
              {icon}
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-base mb-0.5">{title}</p>
              <p className="text-sm text-gray-500 leading-snug">{desc}</p>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-cyan-700 hover:text-cyan-800 transition-colors"
        >
          Login
        </Link>
      </p>
    </div>
  )
}

// ─── Step 2: Registration Form ──────────────────────────────────────────────────
function RegisterForm({ role, onBack }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const roleLabel = role === 'STUDENT' ? 'Student' : 'Company'
  const roleBg = role === 'STUDENT' ? 'bg-cyan-100 text-cyan-700' : 'bg-cyan-100 text-cyan-700'

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || data?.error || 'Signup failed. Please try again.')
        return
      }

      // Store auth data
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('userRole', data.role)
      localStorage.setItem('userName', data.name)
      localStorage.setItem('userEmail', data.email)

      if (role === 'STUDENT') {
        // First signup — always go to onboarding to fill profile details
        localStorage.setItem('profileComplete', 'false')
        navigate('/onboarding/student')
      } else {
        navigate('/onboarding/company')
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back to role select */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-10 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Back
      </button>

      {/* Role badge */}
      <div className="mb-5">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${roleBg}`}>
          {roleLabel} Account
        </span>
      </div>

      <h1 className="text-3xl font-black text-gray-900 mb-1">Create your account</h1>
      <p className="text-sm text-gray-500 mb-8">
        Fill in your details to get started with Career<span className='italic text-cyan-500'>OS</span>
      </p>

      {/* Error alert */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-6">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="signup-name">
            {role === 'STUDENT' ? 'Full Name' : 'Company Name'}
          </label>
          <input
            id="signup-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={30}
            placeholder={role === 'STUDENT' ? 'Your Name' : 'Your Company Name'}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-3 focus:ring-cyan-100 transition-all duration-200"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="signup-email">
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-3 focus:ring-cyan-100 transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="signup-password">
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={4}
              placeholder="Min. 4 characters"
              className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-3 focus:ring-cyan-100 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-600 text-white font-semibold text-sm hover:bg-cyan-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account…
            </>
          ) : (
            <>
              Create {roleLabel} account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-cyan-700 hover:text-cyan-800 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function SignupPage() {
  const [role, setRole] = useState(null) // null = show role selector

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Branding panel */}
      <div className="hidden md:block md:w-[45%] shrink-0">
        <LeftPanel />
      </div>

      {/* Right: Form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-gray-100 min-h-screen">
        {role === null ? (
          <RoleSelector onSelect={setRole} />
        ) : (
          <RegisterForm role={role} onBack={() => setRole(null)} />
        )}
      </div>
    </div>
  )
}
