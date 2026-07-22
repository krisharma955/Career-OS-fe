import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Briefcase, Phone, GraduationCap, BookOpen, GitBranch,
  Calendar, BarChart2, Tag, Plus, X, ChevronRight, Loader2, AlertCircle, Brain, Target, TrendingUp
} from 'lucide-react'
import { apiFetch } from '../lib/api'

const CURRENT_YEAR = new Date().getFullYear()

const DEGREE_OPTIONS = ['B.Tech', 'B.E.', 'B.Sc', 'BCA', 'MCA', 'M.Tech', 'MBA', 'Other']
const BRANCH_OPTIONS = [
  'Computer Science', 'Information Technology', 'Electronics & Communication',
  'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
  'Chemical Engineering', 'Biotechnology', 'Data Science', 'Other'
]

const POPULAR_SKILLS = [
  'Java', 'Python', 'JavaScript', 'React', 'Spring Boot', 'Node.js',
  'SQL', 'MongoDB', 'Docker', 'Git', 'REST APIs', 'AWS', 'C++', 'TypeScript'
]

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
          © 2026 Career<span className='italic text-cyan-400'>OS</span>
        </p>
      </div>
    </div>
  )
}

function StudentOnboardingForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    phoneNumber: '',
    college: '',
    degree: '',
    branch: '',
    graduationYear: '',
    cgpa: '',
    skills: [],
  })
  const [skillInput, setSkillInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const userName = localStorage.getItem('userName') || 'Student'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const addSkill = (skill) => {
    const trimmed = skill.trim()
    if (!trimmed || form.skills.includes(trimmed)) return
    setForm(prev => ({ ...prev, skills: [...prev.skills, trimmed] }))
    setSkillInput('')
  }

  const removeSkill = (skill) => {
    setForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkill(skillInput)
    }
  }

  const validate = () => {
    if (!form.phoneNumber.trim()) return 'Phone number is required.'
    if (!form.college.trim()) return 'College name is required.'
    if (!form.degree) return 'Degree is required.'
    if (!form.branch) return 'Branch is required.'
    if (!form.graduationYear) return 'Graduation year is required.'
    const year = parseInt(form.graduationYear)
    if (year < 2000 || year > 2040) return 'Graduation year must be between 2000 and 2040.'
    if (!form.cgpa) return 'CGPA is required.'
    const cgpa = parseFloat(form.cgpa)
    if (cgpa < 0 || cgpa > 10) return 'CGPA must be between 0.0 and 10.0.'
    if (form.skills.length === 0) return 'Add at least one skill.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) { setError(validationError); return }

    setLoading(true)
    setError('')
    try {
      await apiFetch('/api/students/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          phoneNumber: form.phoneNumber,
          college: form.college,
          degree: form.degree,
          branch: form.branch,
          graduationYear: parseInt(form.graduationYear),
          cgpa: parseFloat(form.cgpa),
          skills: form.skills,
        }),
      })
      // Mark profile as complete in localStorage
      localStorage.setItem('profileComplete', 'true')
      navigate('/dashboard/student')
    } catch (err) {
      setError(err.message || 'Failed to save profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Welcome, {userName.split(' ')[0]}!
        </h1>
        <p className="text-sm text-gray-500">
          Complete your student profile to unlock jobs, ATS scoring, and your application dashboard. All fields are required.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-6">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-600" /> Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-3 focus:ring-cyan-100 transition-all"
              />
            </div>

            {/* College */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-600" /> College / University <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="college"
                value={form.college}
                onChange={handleChange}
                placeholder="IIT Delhi, VIT Vellore, etc."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-3 focus:ring-cyan-100 transition-all"
              />
            </div>

            {/* Degree + Branch row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-600" /> Degree <span className="text-red-400">*</span>
                </label>
                <select
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-3 focus:ring-cyan-100 transition-all appearance-none"
                >
                  <option value="">Select degree</option>
                  {DEGREE_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-cyan-600" /> Branch <span className="text-red-400">*</span>
                </label>
                <select
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-3 focus:ring-cyan-100 transition-all appearance-none"
                >
                  <option value="">Select branch</option>
                  {BRANCH_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Graduation Year + CGPA row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600" /> Graduation Year <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="graduationYear"
                  value={form.graduationYear}
                  onChange={handleChange}
                  min="2000"
                  max="2040"
                  placeholder={String(CURRENT_YEAR + 1)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-3 focus:ring-cyan-100 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-cyan-600" /> CGPA (0 – 10) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="cgpa"
                  value={form.cgpa}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="8.5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-3 focus:ring-cyan-100 transition-all"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                <Tag className="w-3.5 h-3.5 text-cyan-600" /> Skills <span className="text-red-400">*</span>
              </label>

              {/* Quick add popular skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {POPULAR_SKILLS.filter(s => !form.skills.includes(s)).slice(0, 8).map(skill => (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => addSkill(skill)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 hover:bg-cyan-50 hover:text-cyan-700 text-gray-500 text-xs font-medium transition-colors border border-gray-200 hover:border-cyan-200"
                  >
                    <Plus className="w-3 h-3" /> {skill}
                  </button>
                ))}
              </div>

              {/* Custom skill input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-3 focus:ring-cyan-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  className="px-4 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Selected skills */}
              {form.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold border border-cyan-200">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-600 text-white font-bold text-sm shadow-lg shadow-cyan-200 hover:bg-cyan-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving profile…</>
              ) : (
                <>Complete Profile <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
      
      <p className="text-center text-xs text-gray-400 mt-8">
        Your information is used only for campus placement matching.
      </p>
    </div>
  )
}

export default function StudentOnboarding() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Branding panel */}
      <div className="w-[45%] shrink-0">
        <LeftPanel />
      </div>

      {/* Right: Form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-gray-100 min-h-screen">
        <StudentOnboardingForm />
      </div>
    </div>
  )
}
