import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, FileText, User,
  Power, Bell, ChevronRight, CheckCircle2,
  AlertCircle, X, Building2, MapPin, Globe,
  Search, Users, Send, Check, DollarSign,
  Download, ExternalLink, ChevronDown
} from 'lucide-react'
import { apiFetch } from '../lib/api'

// ─── Constants ───────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard',    label: 'Overview',     icon: LayoutDashboard, section: 'Main' },
  { id: 'jobs',         label: 'Job Postings', icon: Briefcase,       section: 'Recruitment' },
  { id: 'applications', label: 'Applications', icon: Users,           section: 'Recruitment' },
  { id: 'profile',      label: 'Company Profile', icon: Building2,    section: 'Company' },
]

const STATUS_CONFIG = {
  APPLIED:      { label: 'Applied',      bg: 'bg-blue-50',   text: 'text-blue-600',   dot: 'bg-blue-500'   },
  UNDER_REVIEW: { label: 'Under Review', bg: 'bg-amber-50',  text: 'text-amber-600',  dot: 'bg-amber-400'  },
  SHORTLISTED:  { label: 'Shortlisted',  bg: 'bg-cyan-50',   text: 'text-cyan-600',   dot: 'bg-cyan-500'   },
  REJECTED:     { label: 'Rejected',     bg: 'bg-red-50',    text: 'text-red-500',    dot: 'bg-red-500'    },
  HIRED:        { label: 'Hired',        bg: 'bg-green-50',  text: 'text-green-600',  dot: 'bg-green-500'  },
}

const JOB_TYPE = {
  FULL_TIME: 'Full-time', PART_TIME: 'Part-time',
  INTERNSHIP: 'Internship', CONTRACT: 'Contract', REMOTE: 'Remote',
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const c = STATUS_CONFIG[status] || { label: status, bg: 'bg-gray-50', text: 'text-gray-500', dot: 'bg-gray-400' }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || 'Company'
  const userEmail = localStorage.getItem('userEmail') || ''
  
  const sections = ['Main', 'Recruitment', 'Company']

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#134e5e] border-r border-[#0f3f4c] flex-col shadow-sm transform transition-transform duration-300 md:relative md:translate-x-0 flex ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Brand */}
      <div className="px-6 py-5 border-b border-cyan-800/50 flex items-center">
        <h1 className="text-3xl font-black text-white tracking-tight">Career<span className="italic text-cyan-300">OS</span></h1>
      </div>

      {/* User info */}
      <div className="px-6 py-5 border-b border-cyan-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-lg font-black text-white shadow-inner shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-white text-sm truncate">{userName}</p>
            <p className="text-[10px] text-cyan-200/70 truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-4 py-5 overflow-y-auto space-y-6">
        {sections.map(section => (
          <div key={section}>
            <p className="text-[10px] font-bold text-cyan-200/50 uppercase tracking-widest px-3 mb-2.5">{section}</p>
            <div className="space-y-1">
              {NAV.filter(n => n.section === section).map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group relative ${
                    active === id
                      ? 'bg-cyan-800/50 text-white'
                      : 'text-cyan-100/70 hover:bg-cyan-800/30 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 shrink-0 ${active === id ? 'text-cyan-300' : 'text-cyan-200/50 group-hover:text-cyan-200'}`} />
                  {label}
                  {active === id && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-cyan-800/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-cyan-100/70 hover:bg-red-500/20 hover:text-red-300 transition-colors group"
        >
          <Power className="w-4.5 h-4.5 shrink-0 text-cyan-200/50 group-hover:text-red-300 transition-colors" />
          Logout
        </button>
      </div>
      </div>
    </>
  )
}

// ─── Notification Bell ────────────────────────────────────────────────────────
function NotificationBell({ applications, onNavigate }) {
  const [open, setOpen] = useState(false)
  const recentApps = applications.slice(0, 4)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all relative ${
          open ? 'bg-cyan-50 text-cyan-600' : 'bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700'
        } border border-gray-200`}
      >
        <Bell className="w-4 h-4" />
        {applications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {applications.length > 9 ? '9+' : applications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
            <p className="font-bold text-gray-900 text-sm">New Applications</p>
            <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-gray-500"><X className="w-4 h-4" /></button>
          </div>
          {recentApps.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">No new applications</div>
          ) : (
            <ul className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
              {recentApps.map(app => (
                <li key={app.id} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => { onNavigate('applications'); setOpen(false) }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {app.studentName?.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">{app.studentName}</p>
                      <p className="text-xs text-gray-400 truncate">Applied for: {app.jobTitle}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="px-4 py-3 border-t border-gray-50">
            <button
              onClick={() => { onNavigate('applications'); setOpen(false) }}
              className="w-full text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors text-center"
            >
              View all applications →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page Header ──────────────────────────────────────────────────────────────
function PageHeader({ title, subtitle, applications, onNavigate, onOpenMobileMenu }) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-8 py-5 bg-white border-b border-gray-100 sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={onOpenMobileMenu}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs font-medium text-gray-400 mt-0.5 hidden sm:block">{subtitle}</p>}
        </div>
      </div>
      <NotificationBell applications={applications} onNavigate={onNavigate} />
    </div>
  )
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────
function DashboardTab({ profile, jobs, applications, onNavigate }) {
  const userName = localStorage.getItem('userName') || 'Company'
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening'
  
  const stats = [
    { label: 'Active Jobs', value: jobs.filter(j => j.jobPostingStatus === 'OPEN').length, icon: Briefcase, color: 'cyan' },
    { label: 'Total Applications', value: applications.length, icon: Users, color: 'blue' },
    { label: 'Hired Candidates', value: applications.filter(a => a.applicationStatus === 'HIRED').length, icon: CheckCircle2, color: 'green' },
  ]

  return (
    <div className="p-4 sm:p-8 space-y-8 w-full max-w-[1200px] mx-auto">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">{greeting}, {userName.split(' ')[0]}</h2>
          <p className="text-sm text-gray-400 mt-1">Here's an overview of your recruitment pipeline.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-[32px] border border-gray-100/80 p-6 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)] flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl bg-${s.color}-50 flex items-center justify-center shrink-0`}>
              <s.icon className={`w-7 h-7 text-${s.color}-500`} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400">{s.label}</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications Feed */}
      <div className="bg-white rounded-[32px] border border-gray-100/80 p-8 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Recent Applications</h3>
          <button onClick={() => onNavigate('applications')} className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">
            View All
          </button>
        </div>
        
        {applications.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <Users className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-gray-400">No applications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.slice(0, 5).map(app => (
              <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-cyan-200 hover:shadow-[0_4px_20px_-8px_rgba(6,182,212,0.15)] bg-gray-50 hover:bg-white transition-all group gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-lg">
                    {app.studentName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">{app.studentName}</h4>
                    <p className="text-xs font-semibold text-gray-400 mt-0.5">Applied for <span className="text-gray-600">{app.jobTitle}</span></p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-2 ${STATUS_CONFIG[app.applicationStatus].bg} ${STATUS_CONFIG[app.applicationStatus].text} border-current/20`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[app.applicationStatus].dot}`} />
                  {STATUS_CONFIG[app.applicationStatus].label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Jobs Tab ─────────────────────────────────────────────────────────────────
function MiniJobCard({ job, onCloseJob }) {
  const salary = job.minSalary && job.maxSalary
    ? `₹${(job.minSalary / 100000).toFixed(1)}L–${(job.maxSalary / 100000).toFixed(1)}L`
    : 'Not disclosed'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-[0_4px_20px_-8px_rgba(6,182,212,0.15)] hover:border-cyan-200 transition-all duration-200 group relative">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm border border-cyan-100">
          {job.companyName?.charAt(0)}
        </div>
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${job.jobPostingStatus === 'OPEN' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
          {job.jobPostingStatus === 'OPEN' ? 'Open' : 'Closed'}
        </span>
      </div>
      <p className="font-bold text-gray-900 text-sm mb-1 truncate">{job.title}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-500">{JOB_TYPE[job.jobType]}</span>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-50 text-cyan-600 border border-cyan-100/50">{job.openings} Openings</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location || 'Remote'}</span>
        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{salary}</span>
      </div>
      {job.jobPostingStatus === 'OPEN' && onCloseJob && (
        <button
          onClick={(e) => { e.stopPropagation(); onCloseJob(job.id); }}
          className="mt-4 w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-lg transition-colors border border-red-100"
        >
          Close Job
        </button>
      )}
    </div>
  )
}

function JobsTab({ jobs, onJobPosted, onCloseJob }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL')
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState('')
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    jobType: 'FULL_TIME',
    location: '',
    minSalary: '',
    maxSalary: '',
    openings: '',
    applicationDeadline: '',
    requiredSkills: ''
  })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handlePost = async () => {
    setError('')
    if (!form.title?.trim() || !form.description?.trim() || !form.location?.trim() || !form.applicationDeadline || !form.requiredSkills?.trim()) {
      setError('Please fill in all required fields (Title, Description, Location, Deadline, Skills).')
      return
    }

    try {
      const payload = {
        title: form.title,
        description: form.description,
        jobType: form.jobType,
        location: form.location,
        minSalary: parseInt(form.minSalary) || null,
        maxSalary: parseInt(form.maxSalary) || null,
        openings: parseInt(form.openings) || 1,
        skills: form.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
        deadline: new Date(form.applicationDeadline).toISOString()
      }
      
      const res = await apiFetch('/api/jobs', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      
      setIsPosting(false)
      if (onJobPosted) onJobPosted(res)
    } catch (err) {
      setError(err.message || 'Failed to post job')
    }
  }

  const types = ['ALL', ...Object.keys(JOB_TYPE)]
  
  const filtered = jobs.filter(j => {
    const matchSearch = j.title?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'ALL' || j.jobType === filter
    return matchSearch && matchFilter
  })

  if (isPosting) {
    return (
      <div className="p-8 max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Post a New Job</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details to publish a new open position.</p>
          </div>
          <button onClick={() => setIsPosting(false)} className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
          {error && <div className="mb-4 text-red-500 text-sm font-semibold">{error}</div>}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Job Title</label>
              <input name="title" value={form.title} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" placeholder="e.g. Software Engineer" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Job Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none" placeholder="Describe the role..." />
            </div>
            <div className="col-span-1 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Job Type</label>
              <div className="relative">
                <select name="jobType" value={form.jobType} onChange={handleChange} className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 cursor-pointer">
                  {Object.keys(JOB_TYPE).map(k => <option key={k} value={k}>{JOB_TYPE[k]}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="col-span-1 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
              <input name="location" value={form.location} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" placeholder="e.g. Remote, Bangalore" />
            </div>
            <div className="col-span-1 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Min Salary (₹)</label>
              <input name="minSalary" value={form.minSalary} onChange={handleChange} type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" placeholder="e.g. 800000" />
            </div>
            <div className="col-span-1 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Max Salary (₹)</label>
              <input name="maxSalary" value={form.maxSalary} onChange={handleChange} type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" placeholder="e.g. 1500000" />
            </div>
            <div className="col-span-1 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Openings</label>
              <input name="openings" value={form.openings} onChange={handleChange} type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" placeholder="e.g. 3" />
            </div>
            <div className="col-span-1 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Application Deadline</label>
              <input name="applicationDeadline" value={form.applicationDeadline} onChange={handleChange} type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Required Skills (Comma Separated)</label>
              <input name="requiredSkills" value={form.requiredSkills} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" placeholder="e.g. Java, Spring Boot, React" />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <button onClick={() => setIsPosting(false)} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all">Cancel</button>
            <button onClick={handlePost} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl shadow-lg shadow-cyan-200 transition-all">Post Job</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search your jobs…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition"
            />
          </div>
          <div className="relative">
            <select 
              value={filter} 
              onChange={e => setFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 cursor-pointer"
            >
              {types.map(t => <option key={t} value={t}>{t === 'ALL' ? 'All Types' : JOB_TYPE[t]}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <button 
          onClick={() => setIsPosting(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-cyan-200 flex items-center justify-center gap-2 transition"
        >
          <Briefcase className="w-4 h-4" /> Post New Job
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(job => (
          <MiniJobCard key={job.id} job={job} onCloseJob={onCloseJob} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-gray-100 border-dashed">
            <Briefcase className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="font-semibold text-gray-400">No jobs found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Applications Tab ─────────────────────────────────────────────────────────
function ApplicationsTab({ applications }) {
  const [filter, setFilter] = useState('ALL')
  const [viewStudentId, setViewStudentId] = useState(null)
  
  const pipelineCounts = {
    APPLIED: applications.filter(a => a.applicationStatus === 'APPLIED').length,
    UNDER_REVIEW: applications.filter(a => a.applicationStatus === 'UNDER_REVIEW').length,
    SHORTLISTED: applications.filter(a => a.applicationStatus === 'SHORTLISTED').length,
    REJECTED: applications.filter(a => a.applicationStatus === 'REJECTED').length,
    HIRED: applications.filter(a => a.applicationStatus === 'HIRED').length,
  }

  const filtered = filter === 'ALL' ? applications : applications.filter(a => a.applicationStatus === filter)

  return (
    <div className="p-8 space-y-8 max-w-[1200px] mx-auto">
      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <div
            key={key}
            onClick={() => setFilter(filter === key ? 'ALL' : key)}
            className={`bg-white rounded-2xl border p-4 text-center cursor-pointer transition-all hover:shadow-sm ${
              filter === key ? 'border-cyan-300 shadow-sm' : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <p className={`text-2xl font-black ${pipelineCounts[key] > 0 ? 'text-gray-900' : 'text-gray-200'}`}>{pipelineCounts[key]}</p>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">{cfg.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <p className="font-bold text-gray-900 text-sm">
            {filter === 'ALL' ? 'All Applicants' : STATUS_CONFIG[filter]?.label}
            <span className="ml-2 text-xs font-normal text-gray-400">({filtered.length})</span>
          </p>
          {filter !== 'ALL' && (
            <button onClick={() => setFilter('ALL')} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
              <X className="w-3 h-3" /> Clear filter
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4"><Users className="w-6 h-6 text-gray-300" /></div>
            <p className="font-semibold text-gray-400">No applicants here</p>
            <p className="text-xs text-gray-300 mt-1">Try a different status filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/60">
                  {['Applicant', 'Job Applied For', 'Applied On', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs border border-cyan-200 shrink-0">
                          {app.studentName?.charAt(0)}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-800 block">{app.studentName}</span>
                          <span className="text-xs text-gray-400">{app.studentEmail}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{app.jobTitle}</td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {new Date(app.appliedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_CONFIG[app.applicationStatus].bg} ${STATUS_CONFIG[app.applicationStatus].text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[app.applicationStatus].dot}`} />
                        {STATUS_CONFIG[app.applicationStatus].label}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <select 
                            value={app.applicationStatus}
                            onChange={async (e) => {
                              try {
                                await apiFetch(`/api/applications/${app.id}`, { method: 'PATCH', body: JSON.stringify({ applicationStatus: e.target.value }) })
                                if (window.location) window.location.reload()
                              } catch (err) {}
                            }}
                            className="appearance-none text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg pl-2 pr-7 py-1.5 text-gray-700 outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
                          >
                            {Object.keys(STATUS_CONFIG).map(k => (
                              <option key={k} value={k}>{STATUS_CONFIG[k].label}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <button 
                          title="Download Resume" 
                          className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                          onClick={async () => {
                            try {
                              const res = await apiFetch(`/api/resume/download/${app.studentId}`)
                              if (res?.url) window.open(res.url, '_blank')
                            } catch (e) {
                              alert('Resume not available')
                            }
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          title="View Profile" 
                          className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                          onClick={() => setViewStudentId(app.studentId)}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {viewStudentId && (
        <StudentProfileModal studentId={viewStudentId} onClose={() => setViewStudentId(null)} />
      )}
    </div>
  )
}

function StudentProfileModal({ studentId, onClose }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch(`/api/students/profile/${studentId}`)
      .then(setProfile)
      .catch(() => alert('Could not load student profile'))
      .finally(() => setLoading(false))
  }, [studentId])

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Student Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 p-1.5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading profile...</div>
        ) : profile ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl font-black">
                {profile.name?.charAt(0) || 'S'}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{profile.name}</h4>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">College</p>
                <p className="text-sm font-semibold text-gray-800">{profile.college || 'N/A'}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Degree</p>
                <p className="text-sm font-semibold text-gray-800">{profile.degree || 'N/A'} - {profile.branch || 'N/A'}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Graduation Year</p>
                <p className="text-sm font-semibold text-gray-800">{profile.graduationYear || 'N/A'}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">CGPA</p>
                <p className="text-sm font-semibold text-gray-800">{profile.cgpa || 'N/A'}</p>
              </div>
            </div>

            {profile.skills && profile.skills.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map(s => (
                    <span key={s} className="px-3 py-1 rounded-lg bg-cyan-50 text-cyan-700 text-xs font-semibold">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">Profile not found.</div>
        )}
      </div>
    </div>
  )
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProfileTab({ profile }) {
  const userName = localStorage.getItem('userName') || 'Company'
  const userEmail = localStorage.getItem('userEmail') || ''
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    companyName: profile?.companyName || userName,
    website: profile?.website || '',
    industry: profile?.industry || '',
    description: profile?.description || '',
    location: profile?.location || '',
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        companyName: profile.companyName || userName,
        website: profile.website || '',
        industry: profile.industry || '',
        description: profile.description || '',
        location: profile.location || '',
      })
    }
  }, [profile, userName])

  const handleSave = async () => {
    try {
      await apiFetch('/api/companies', {
        method: 'PATCH',
        body: JSON.stringify(formData)
      })
      if (window.location) window.location.reload()
    } catch (err) {
      console.error(err)
    }
    setIsEditing(false)
  }

  return (
    <div className="p-8 w-full max-w-[1200px] mx-auto h-[calc(100vh-80px)]">
      <div className="flex gap-8 h-full">
        {/* Left Column: Profile Card */}
        <div className="w-1/3 bg-white rounded-[32px] border border-gray-100/80 overflow-hidden text-center flex flex-col shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)] relative shrink-0">
          <div className="h-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black relative shrink-0">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_50%,_rgba(6,182,212,0.5),_transparent_25%),_radial-gradient(circle_at_80%_30%,_rgba(6,182,212,0.5),_transparent_25%)]" />
          </div>
          
          <div className="-mt-16 mb-4 flex justify-center relative z-10 shrink-0">
            <div className="p-1.5 bg-white rounded-full">
              <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-4xl font-black text-white shadow-inner">
                {formData.companyName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="px-6 pb-8 flex-1 flex flex-col">
            <p className="text-[13px] font-medium text-gray-400 mb-1 tracking-wide">
              @{formData.companyName.split(' ').join('').toLowerCase()}
            </p>
            <h2 className="text-[28px] font-bold text-gray-900 mb-3 tracking-tight">{formData.companyName}</h2>
            
            <div className="flex flex-col items-center justify-center gap-1.5 text-sm text-gray-500 mb-8 font-medium">
              <span>{formData.industry || 'Industry'}</span>
              <span className="text-cyan-600 font-semibold bg-cyan-50 px-3 py-1 rounded-full text-xs">
                {profile?.verified ? 'Verified Company' : 'Unverified Company'}
              </span>
            </div>

            <div className="mt-auto">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl border text-sm font-semibold transition-all active:scale-[0.98] ${
                  isEditing 
                    ? 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300'
                }`}
              >
                {isEditing ? <X className="w-4 h-4" /> : <Building2 className="w-4 h-4" />} 
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Skills OR Edit Form */}
        <div className="w-2/3 bg-white rounded-[32px] border border-gray-100/80 p-9 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)] overflow-y-auto">
          {!isEditing ? (
            <>
              <h3 className="text-xl font-bold text-gray-900 mb-7 tracking-tight">Company Details</h3>
              
              <div className="space-y-6 mb-10">
                {[
                  { icon: Globe,   label: 'Website',  value: profile?.website },
                  { icon: MapPin,  label: 'Location', value: profile?.location },
                  { icon: Send,    label: 'Email',    value: userEmail },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between text-[15px]">
                    <div className="flex items-center gap-3.5 text-gray-400 font-medium">
                      <r.icon className="w-5 h-5 text-cyan-600/80" />
                      {r.label}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {r.value ? (
                        r.label === 'Website' ? <a href={r.value.startsWith('http') ? r.value : `https://${r.value}`} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline">{r.value}</a> : r.value
                      ) : (
                        <span className="text-gray-400 italic">Not provided</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-100/80">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">About the Company</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {profile?.description || <span className="text-gray-400 italic">No description provided yet. Click "Edit Profile" to add one.</span>}
                </p>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-900 mb-7 tracking-tight">Edit Profile</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Company Name</label>
                  <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900 placeholder:text-gray-400" />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Industry</label>
                  <input type="text" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900 placeholder:text-gray-400" />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Website</label>
                  <input type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900 placeholder:text-gray-400" />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900 placeholder:text-gray-400" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                  <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900 resize-none placeholder:text-gray-400" />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button onClick={handleSave} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl shadow-lg shadow-cyan-200 transition-all active:scale-95">
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
export default function CompanyDashboard() {
  const navigate = useNavigate()
  const [active, setActive] = useState(() => localStorage.getItem('companyActiveTab') || 'dashboard')

  useEffect(() => {
    localStorage.setItem('companyActiveTab', active)
  }, [active])

  const [profile, setProfile] = useState(null)
  const [applications, setApplications] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const PAGE_META = {
    dashboard:    { title: 'Dashboard',       subtitle: 'Your recruitment overview'      },
    jobs:         { title: 'Job Postings',    subtitle: 'Manage your active and closed job listings'},
    applications: { title: 'Applications',    subtitle: 'Review candidates and update pipeline status'  },
    profile:      { title: 'Company Profile', subtitle: 'Manage your company identity'                  },
  }

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) { navigate('/login'); return }

    const companyName = localStorage.getItem('userName') || ''
    Promise.all([
      apiFetch('/api/companies/profile').catch(() => null),
      apiFetch(`/api/jobs?company=${encodeURIComponent(companyName)}`).catch(() => null)
    ]).then(async ([p, j]) => {
      setProfile(p)
      const fetchedJobs = j?.content || []
      setJobs(fetchedJobs)
      
      let apps = []
      for (const job of fetchedJobs) {
        const jobApps = await apiFetch(`/api/jobs/${job.id}/applications`).catch(() => null)
        if (jobApps?.content) apps = [...apps, ...jobApps.content]
      }
      setApplications(apps)
    }).finally(() => setLoading(false))
  }, [navigate])

  const handleCloseJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to close this job posting? Candidates will no longer be able to apply.")) return;
    try {
      const res = await apiFetch(`/api/jobs/${jobId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ jobPostingStatus: 'CLOSE' })
      });
      setJobs(jobs.map(j => j.id === jobId ? res : j));
    } catch (err) {
      console.error(err);
      alert("Failed to close job posting");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-400 animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const { title, subtitle } = PAGE_META[active]

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar active={active} setActive={setActive} mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <PageHeader title={title} subtitle={subtitle} applications={applications} onNavigate={setActive} onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto relative">
          {active === 'dashboard'    && <DashboardTab profile={profile} applications={applications} jobs={jobs} onNavigate={setActive} />}
          {active === 'jobs'         && <JobsTab jobs={jobs} onJobPosted={(job) => setJobs(prev => [job, ...prev])} onCloseJob={handleCloseJob} />}
          {active === 'applications' && <ApplicationsTab applications={applications} />}
          {active === 'profile'      && <ProfileTab profile={profile} />}
        </main>
      </div>
    </div>
  )
}
