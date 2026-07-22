import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Briefcase,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Brain,
  Target,
  TrendingUp,
  AlertCircle,
  Loader2,
} from 'lucide-react'

// ─── Left Panel (shared with Signup) ───────────────────────────────────────────
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
            'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.4) 0%, transparent 40%)',
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
          <span className="font-bold text-white text-2xl tracking-tight">
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
          © 2026 Career<span className='italic text-cyan-400'>OS</span></p>
      </div>
    </div>
  )
}

// ─── Login Form ─────────────────────────────────────────────────────────────────
function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || data?.error || 'Invalid email or password.')
        return
      }

      // Store auth data
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('userRole', data.role)
      localStorage.setItem('userName', data.name)

      // Redirect by role
      if (data.role === 'STUDENT') navigate('/dashboard/student')
      else if (data.role === 'COMPANY') navigate('/dashboard/company')
      else if (data.role === 'ADMIN') navigate('/dashboard/admin')
      else navigate('/')
    } catch (err) {
      setError('Unable to connect to server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

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

      <h1 className="text-3xl font-black text-gray-900 mb-1">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-8">
        Sign in to your Career-OS account to continue.
      </p>

      {/* Error alert */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-6">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="login-email">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100 transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-gray-700" htmlFor="login-password">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Your password"
              autoComplete="current-password"
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
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-600 text-white font-semibold text-sm hover:bg-cyan-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="font-semibold text-cyan-600 hover:text-cyan-800 transition-colors"
        >
          Create one now
        </Link>
      </p>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Branding panel */}
      <div className="w-[45%] shrink-0">
        <LeftPanel />
      </div>

      {/* Right: Form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-gray-100 min-h-screen">
        <LoginForm />
      </div>
    </div>
  )
}
