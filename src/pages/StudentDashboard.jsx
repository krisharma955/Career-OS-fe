import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, Send, FileText, User,
  LogOut, Bell, ChevronRight, Upload, Brain, MapPin,
  DollarSign, Zap, Loader2, AlertCircle, X, Plus,
  Star, Clock, TrendingUp, CheckCircle2, XCircle,
  Power, GraduationCap, Phone, BookOpen, BarChart2,
  Tag, GitBranch, Calendar, Eye, EyeOff, Sparkles,
  Building2, Search, Filter, Download, RefreshCw, Menu,
} from 'lucide-react'
import { apiFetch, BASE_URL } from '../lib/api'

// ─── Constants ────────────────────────────────────────────────────────────────
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
const NAV = [
  { id: 'dashboard',    icon: LayoutDashboard, label: 'Dashboard',    section: 'Main'   },
  { id: 'jobs',         icon: Briefcase,        label: 'Browse Jobs',  section: 'Main'   },
  { id: 'applications', icon: Send,             label: 'Applications', section: 'Main'   },
  { id: 'resume',       icon: FileText,         label: 'Resume & ATS', section: 'Career' },
  { id: 'profile',      icon: User,             label: 'Profile',      section: 'Career' },
]

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
function Sidebar({ active, setActive, newJobCount, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || 'Student'
  const userEmail = localStorage.getItem('userEmail') || ''
  
  const sections = ['Main', 'Career']

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
            <p className="text-[10px] text-cyan-200/70 truncate">{userEmail || 'Student'}</p>
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
                  {id === 'jobs' && newJobCount > 0 && (
                    <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                      {newJobCount}
                    </span>
                  )}
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
function NotificationBell({ jobs, onNavigate }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const recentJobs = jobs.slice(0, 4)

  useEffect(() => {
    const handle = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all relative ${
          open ? 'bg-cyan-50 text-cyan-600' : 'bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700'
        } border border-gray-200`}
      >
        <Bell className="w-4 h-4" />
        {jobs.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {jobs.length > 9 ? '9+' : jobs.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
            <p className="font-bold text-gray-900 text-sm">New Job Openings</p>
            <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-gray-500"><X className="w-4 h-4" /></button>
          </div>
          {recentJobs.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">No new jobs right now</div>
          ) : (
            <ul className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
              {recentJobs.map(job => (
                <li key={job.id} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => { onNavigate('jobs'); setOpen(false) }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {job.companyName?.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">{job.title}</p>
                      <p className="text-xs text-gray-400 truncate">{job.companyName} · {JOB_TYPE[job.jobType]}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="px-4 py-3 border-t border-gray-50">
            <button
              onClick={() => { onNavigate('jobs'); setOpen(false) }}
              className="w-full text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors text-center"
            >
              View all jobs →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
function PageHeader({ title, subtitle, jobs, onNavigate, onOpenMobileMenu }) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-8 py-5 bg-white border-b border-gray-100 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={onOpenMobileMenu}>
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{subtitle}</p>}
        </div>
      </div>
      <NotificationBell jobs={jobs} onNavigate={onNavigate} />
    </div>
  )
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────
function DashboardTab({ profile, applications, jobs, onNavigate }) {
  const userName = localStorage.getItem('userName') || 'Student'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const stats = [
    { label: 'Total Applied',  value: applications.length,                                                         icon: Send,        color: 'text-blue-500',   bg: 'bg-blue-50'   },
    { label: 'Shortlisted',    value: applications.filter(a => a.applicationStatus === 'SHORTLISTED').length,      icon: Star,        color: 'text-cyan-500',   bg: 'bg-cyan-50'   },
    { label: 'Under Review',   value: applications.filter(a => a.applicationStatus === 'UNDER_REVIEW').length,     icon: Clock,       color: 'text-amber-500',  bg: 'bg-amber-50'  },
    { label: 'Open Jobs',      value: jobs.length,                                                                  icon: Briefcase,   color: 'text-green-500',  bg: 'bg-green-50'  },
  ]

  return (
    <div className="p-4 sm:p-8 space-y-8">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">{greeting}, {userName.split(' ')[0]}</h2>
          <p className="text-sm text-gray-400 mt-1">Here's your placement activity at a glance.</p>
        </div>
        {profile?.profileComplete && (
          <span className="hidden sm:flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Profile Active
          </span>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200">
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-4`}>
              <Icon className={`w-4.5 h-4.5 ${color}`} />
            </div>
            <p className="text-3xl font-black text-gray-900 leading-none">{value}</p>
            <p className="text-xs text-gray-400 mt-1.5 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <p className="font-bold text-gray-900 text-sm">Recent Applications</p>
            <button onClick={() => onNavigate('applications')} className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          {applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-3"><Send className="w-5 h-5 text-gray-300" /></div>
              <p className="text-sm font-medium text-gray-400">No applications yet</p>
              <button onClick={() => onNavigate('jobs')} className="mt-3 text-xs text-cyan-600 font-semibold hover:underline">Browse Jobs →</button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {applications.slice(0, 5).map(app => (
                <li key={app.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0 border border-gray-100">
                    {app.companyName?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{app.jobTitle}</p>
                    <p className="text-xs text-gray-400 truncate">{app.companyName} · {JOB_TYPE[app.jobType]}</p>
                  </div>
                  <StatusBadge status={app.applicationStatus} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Profile snapshot */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <p className="font-bold text-gray-900 text-sm">Your Profile</p>
            <button onClick={() => onNavigate('profile')} className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-1">
              Edit <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          {profile ? (
            <div className="px-6 py-5 space-y-3">
              {[
                { label: 'College',    value: profile.college },
                { label: 'Branch',     value: `${profile.degree} · ${profile.branch}` },
                { label: 'Graduation', value: profile.graduationYear },
                { label: 'CGPA',       value: `${profile.cgpa} / 10` },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-medium">{r.label}</span>
                  <span className="font-semibold text-gray-800">{r.value}</span>
                </div>
              ))}
              {profile.skills?.length > 0 && (
                <div className="pt-3 border-t border-gray-50">
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.slice(0, 6).map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold border border-cyan-100">{s}</span>
                    ))}
                    {profile.skills.length > 6 && (
                      <span className="px-2.5 py-1 rounded-full bg-gray-50 text-gray-400 text-xs font-semibold border border-gray-100">+{profile.skills.length - 6} more</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-3"><User className="w-5 h-5 text-gray-300" /></div>
              <p className="text-sm text-gray-400">Profile not loaded</p>
            </div>
          )}
        </div>
      </div>

      {/* Open Positions */}
      {jobs.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-gray-900">Open Positions</p>
            <button onClick={() => onNavigate('jobs')} className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-1">
              {jobs.length} available <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.slice(0, 3).map(job => (
              <MiniJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Mini Job Card (dashboard) ────────────────────────────────────────────────
function MiniJobCard({ job }) {
  const salary = job.minSalary && job.maxSalary
    ? `₹${(job.minSalary / 100000).toFixed(1)}L–${(job.maxSalary / 100000).toFixed(1)}L`
    : 'Not disclosed'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm border border-cyan-100">
          {job.companyName?.charAt(0)}
        </div>
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
          {JOB_TYPE[job.jobType]}
        </span>
      </div>
      <p className="font-bold text-gray-900 text-sm mb-0.5 truncate">{job.title}</p>
      <p className="text-xs text-gray-400 mb-3 truncate">{job.companyName}</p>
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location || 'Remote'}</span>
        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{salary}</span>
      </div>
    </div>
  )
}

// ─── Browse Jobs Tab ──────────────────────────────────────────────────────────
function JobsTab({ jobs, applications, onApply }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL')
  const types = ['ALL', ...Object.keys(JOB_TYPE)]

  const filtered = jobs.filter(j => {
    const matchSearch = j.title?.toLowerCase().includes(search.toLowerCase()) || j.companyName?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'ALL' || j.jobType === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="p-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search jobs or companies…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === t ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-500 hover:border-cyan-300 hover:text-cyan-600'
              }`}
            >
              {t === 'ALL' ? 'All' : JOB_TYPE[t]}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400 self-center ml-auto">{filtered.length} jobs</span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4"><Briefcase className="w-6 h-6 text-gray-300" /></div>
          <p className="font-semibold text-gray-500">No jobs found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(job => {
            const isApplied = applications.some(a => a.jobTitle === job.title && a.companyName === job.companyName)
            return (
              <JobCard 
                key={job.id} 
                job={job} 
                onApply={onApply} 
                hasApplied={isApplied} 
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Full Job Card ────────────────────────────────────────────────────────────
function JobCard({ job, onApply, hasApplied }) {
  const [applying, setApplying] = useState(false)
  const salary = job.minSalary && job.maxSalary
    ? `₹${(job.minSalary / 100000).toFixed(1)}L – ₹${(job.maxSalary / 100000).toFixed(1)}L`
    : 'CTC not disclosed'

  const handleApply = async () => {
    setApplying(true)
    try { await onApply(job.id) } finally { setApplying(false) }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-cyan-50 to-sky-100 text-cyan-700 flex items-center justify-center font-bold text-base border border-cyan-100 shrink-0">
          {job.companyName?.charAt(0)}
        </div>
        <div className="flex gap-2">
          {job.jobPostingStatus === 'CLOSE' && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-600">
              Closed
            </span>
          )}
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
            job.jobType === 'INTERNSHIP' ? 'bg-purple-50 text-purple-600' :
            job.jobType === 'REMOTE' ? 'bg-teal-50 text-teal-600' :
            'bg-gray-100 text-gray-500'
          }`}>
            {JOB_TYPE[job.jobType]}
          </span>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 text-sm mb-0.5 truncate">{job.title}</h3>
      <p className="text-xs text-gray-400 mb-4">{job.companyName}</p>

      <div className="flex flex-col gap-1.5 mb-4 text-xs text-gray-400">
        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gray-300" />{job.location || job.companyLocation || 'Remote'}</span>
        <span className="flex items-center gap-1.5"><DollarSign className="w-3 h-3 text-gray-300" />{salary}</span>
        {job.openings && <span className="flex items-center gap-1.5"><Building2 className="w-3 h-3 text-gray-300" />{job.openings} opening{job.openings !== 1 ? 's' : ''}</span>}
      </div>

      {job.requiredSkills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.requiredSkills.slice(0, 3).map(s => (
            <span key={s} className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-semibold">{s}</span>
          ))}
          {job.requiredSkills.length > 3 && <span className="text-[10px] text-gray-400 self-center">+{job.requiredSkills.length - 3}</span>}
        </div>
      )}

      {job.jobPostingStatus === 'CLOSE' ? (
        <button disabled className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-500 text-xs font-bold cursor-not-allowed">
          Closed
        </button>
      ) : hasApplied ? (
        <button disabled className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 text-gray-500 text-xs font-bold cursor-not-allowed">
          Already applied
        </button>
      ) : (
        <button
          onClick={handleApply}
          disabled={applying}
          className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-700 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {applying ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Applying…</> : <><Zap className="w-3.5 h-3.5" /> Apply Now</>}
        </button>
      )}
    </div>
  )
}

// ─── Applications Tab ─────────────────────────────────────────────────────────
function ApplicationsTab({ applications }) {
  const [filter, setFilter] = useState('ALL')
  const statuses = ['ALL', ...Object.keys(STATUS_CONFIG)]

  const filtered = filter === 'ALL' ? applications : applications.filter(a => a.applicationStatus === filter)

  const pipelineCounts = Object.fromEntries(Object.keys(STATUS_CONFIG).map(s => [s, applications.filter(a => a.applicationStatus === s).length]))

  return (
    <div className="p-8 space-y-6">
      {/* Pipeline summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <p className="font-bold text-gray-900 text-sm">
            {filter === 'ALL' ? 'All Applications' : STATUS_CONFIG[filter]?.label}
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
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4"><Send className="w-6 h-6 text-gray-300" /></div>
            <p className="font-semibold text-gray-400">No applications here</p>
            <p className="text-xs text-gray-300 mt-1">Try a different status filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/60">
                  {['Company', 'Role', 'Type', 'Applied On', 'Status'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-linear-to-br from-gray-100 to-gray-50 text-gray-600 flex items-center justify-center font-bold text-xs border border-gray-100 shrink-0">
                          {app.companyName?.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{app.companyName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{app.jobTitle}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">{JOB_TYPE[app.jobType]}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {new Date(app.appliedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={app.applicationStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Resume & ATS Tab ─────────────────────────────────────────────────────────
function ResumeTab() {
  const [resumeMeta, setResumeMeta] = useState(null)
  const [atsHistory, setAtsHistory] = useState([])
  const [selectedReportIndex, setSelectedReportIndex] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    Promise.all([
      apiFetch('/api/resume').catch(() => null),
      apiFetch('/api/resume/analyze/history').catch(() => null),
    ]).then(([meta, history]) => {
      setResumeMeta(meta)
      setAtsHistory(history?.content || (Array.isArray(history) ? history : []))
    }).finally(() => setLoading(false))
  }, [])

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') { setError('Only PDF files are allowed.'); return }
    if (file.size > 5 * 1024 * 1024) { setError('File must be under 5MB.'); return }
    setUploading(true); setError('')
    const fd = new FormData(); fd.append('file', file)
    try {
      const token = localStorage.getItem('accessToken')
      const res = await fetch(`${BASE_URL}/api/resume/upload`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd,
      })
      if (!res.ok) throw new Error('Upload failed')
      setResumeMeta(await res.json())
    } catch { setError('Upload failed. Please try again.') } finally { setUploading(false) }
  }

  const handleAnalyze = async () => {
    setAnalyzing(true); setError('')
    try {
      const report = await apiFetch('/api/resume/analyze', { method: 'POST' })
      setAtsHistory(prev => [report, ...prev])
      setSelectedReportIndex(0)
    } catch { setError('Analysis failed. Make sure your resume is uploaded.') } finally { setAnalyzing(false) }
  }

  const displayedReport = atsHistory[selectedReportIndex]

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
    </div>
  )

  return (
    <div className="p-8 space-y-6 w-full">
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
          <button onClick={() => setError('')} className="ml-auto text-red-300 hover:text-red-500"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Upload card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-gray-900">Your Resume</h3>
            <p className="text-xs text-gray-400 mt-0.5">PDF only · Max 5MB · Auto-replaces on re-upload</p>
          </div>
          {resumeMeta && <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">✓ Uploaded</span>}
        </div>

        {resumeMeta ? (
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 mb-5">
            <div className="w-10 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-500 font-bold text-[10px]">PDF</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">{resumeMeta.fileName}</p>
              <p className="text-xs text-gray-400 mt-0.5">{(resumeMeta.fileSize / 1024).toFixed(0)} KB</p>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-200 rounded-xl mb-5 cursor-pointer hover:border-cyan-300 hover:bg-cyan-50/20 transition-all group">
            <Upload className="w-7 h-7 text-gray-300 group-hover:text-cyan-400 mb-2 transition-colors" />
            <p className="text-sm font-semibold text-gray-400 group-hover:text-cyan-600 transition-colors">Click to upload your resume</p>
            <p className="text-xs text-gray-300 mt-1">PDF · Max 5MB</p>
            <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <label className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
            uploading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-cyan-600 text-white hover:bg-cyan-700'
          }`}>
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</> : <><Upload className="w-4 h-4" />{resumeMeta ? 'Replace Resume' : 'Upload Resume'}</>}
            <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
          {resumeMeta && (
            <>
              <button
                onClick={async () => {
                  try {
                    const res = await apiFetch('/api/resume/download')
                    if (res?.url) window.open(res.url, '_blank')
                  } catch (e) {
                    alert('Could not open resume')
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-4 h-4" /> View Resume
              </button>
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-200 text-cyan-700 text-sm font-semibold hover:bg-cyan-50 transition-colors disabled:opacity-50"
              >
                {analyzing ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing…</> : <><Brain className="w-4 h-4" /> Run AI Score</>}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ATS Report */}
      {displayedReport && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900">ATS Score Report {selectedReportIndex > 0 && `(Scan #${atsHistory.length - selectedReportIndex})`}</h3>
              <p className="text-xs text-gray-400 mt-0.5">AI analysis by GPT-4o-mini</p>
            </div>
            <div className={`text-3xl font-black ${
              displayedReport.overallScore >= 80 ? 'text-green-600' : displayedReport.overallScore >= 60 ? 'text-amber-500' : 'text-red-500'
            }`}>
              {displayedReport.overallScore}%
            </div>
          </div>

          {/* Score bars */}
          <div className="space-y-3 mb-7">
            {[
              { label: 'Skills Match',  value: displayedReport.skillScore,       color: 'bg-cyan-500'   },
              { label: 'Experience',    value: displayedReport.experienceScore,  color: 'bg-blue-500'   },
              { label: 'Education',     value: displayedReport.educationScore,   color: 'bg-teal-500'   },
              { label: 'Formatting',    value: displayedReport.formattingScore,  color: 'bg-indigo-500' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-xs text-gray-500 font-medium w-24 shrink-0">{label}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${value || 0}%`, transition: 'width 1s ease' }} />
                </div>
                <span className="text-xs font-bold text-gray-700 w-9 text-right">{value || 0}%</span>
              </div>
            ))}
          </div>

          {/* Two-col: keywords + suggestions */}
          <div className="grid md:grid-cols-2 gap-6">
            {displayedReport.missingKeywords?.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Missing Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {displayedReport.missingKeywords.map(kw => (
                    <span key={kw} className="px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-semibold border border-red-100">+ {kw}</span>
                  ))}
                </div>
              </div>
            )}
            {displayedReport.suggestions?.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Suggestions</p>
                <ul className="space-y-2">
                  {displayedReport.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History */}
      {atsHistory.length > 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Score History</h3>
          <div className="space-y-2.5">
            {atsHistory.map((r, i) => (
              <div 
                key={r.id || i} 
                onClick={() => setSelectedReportIndex(i)}
                className={`flex items-center gap-4 p-3.5 rounded-xl border transition-colors cursor-pointer ${
                  selectedReportIndex === i ? 'bg-cyan-50 border-cyan-200' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm ${
                  r.overallScore >= 80 ? 'bg-green-100 text-green-700' :
                  r.overallScore >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>{r.overallScore}%</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-700">Report #{atsHistory.length - i}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{new Date(r.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="text-xs text-gray-400">Skills: <span className="font-bold text-gray-600">{r.skillScore}%</span></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProfileTab({ profile, onUpdateProfile }) {
  const userName = localStorage.getItem('userName') || 'Student'
  const userEmail = localStorage.getItem('userEmail') || ''
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    phoneNumber: profile?.phoneNumber || '',
    college: profile?.college || '',
    degree: profile?.degree || '',
    branch: profile?.branch || '',
    graduationYear: profile?.graduationYear || '',
    cgpa: profile?.cgpa || '',
    skills: profile?.skills?.join(', ') || ''
  })

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      }
      const updatedProfile = await apiFetch('/api/students', {
        method: 'PATCH',
        body: JSON.stringify(payload)
      })
      if (onUpdateProfile) onUpdateProfile(updatedProfile)
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to update profile:', err)
    }
  }

  return (
    <div className="p-8 w-full max-w-[1200px] mx-auto h-[calc(100vh-80px)]">
      <div className="flex gap-8 h-full">
        {/* Left Column: Profile Card */}
        <div className="w-1/3 bg-white rounded-[32px] border border-gray-100/80 overflow-hidden text-center flex flex-col shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)] relative shrink-0">
          {/* Banner with dark gradient/pattern */}
          <div className="h-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black relative shrink-0">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_50%,_rgba(6,182,212,0.5),_transparent_25%),_radial-gradient(circle_at_80%_30%,_rgba(6,182,212,0.5),_transparent_25%)]" />
          </div>
          
          {/* Avatar */}
          <div className="-mt-16 mb-4 flex justify-center relative z-10 shrink-0">
            <div className="p-1.5 bg-white rounded-full">
              <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-4xl font-black text-white shadow-inner">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="px-6 pb-8 flex-1 flex flex-col">
            {/* Name & Handle */}
            <p className="text-[13px] font-medium text-gray-400 mb-1 tracking-wide">
              @{userName.split(' ').join('').toLowerCase()}
            </p>
            <h2 className="text-[28px] font-bold text-gray-900 mb-3 tracking-tight">{profile?.name || userName}</h2>
            
            {/* Location / Meta */}
            <div className="flex flex-col items-center justify-center gap-1.5 text-sm text-gray-500 mb-8 font-medium">
              <span>{profile?.college || 'University'}</span>
              <span className="text-cyan-600 font-semibold bg-cyan-50 px-3 py-1 rounded-full text-xs">Class of {profile?.graduationYear || new Date().getFullYear()}</span>
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
                {isEditing ? <X className="w-4 h-4" /> : <User className="w-4 h-4" />} 
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Skills OR Edit Form */}
        <div className="w-2/3 bg-white rounded-[32px] border border-gray-100/80 p-9 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)] overflow-y-auto">
          {!isEditing ? (
            <>
              <h3 className="text-xl font-bold text-gray-900 mb-7 tracking-tight">Academic & Contact Information</h3>
              
              <div className="space-y-6 mb-10">
                {[
                  { icon: GraduationCap, label: 'Degree', value: profile?.degree ? `${profile.degree} in ${profile.branch}` : null },
                  { icon: BookOpen,      label: 'CGPA',   value: profile?.cgpa ? `${profile.cgpa} / 10.0` : null },
                  { icon: Send,          label: 'Email',  value: profile?.email || userEmail },
                  { icon: Phone,         label: 'Phone',  value: profile?.phoneNumber },
                ].filter(r => r.value).map(r => (
                  <div key={r.label} className="flex items-center justify-between text-[15px]">
                    <div className="flex items-center gap-3.5 text-gray-400 font-medium">
                      <r.icon className="w-5 h-5 text-cyan-600/80" />
                      {r.label}
                    </div>
                    <span className="font-semibold text-gray-900">{r.value}</span>
                  </div>
                ))}
              </div>

              {/* Skills (Tags) */}
              {profile?.skills?.length > 0 && (
                <div className="pt-8 border-t border-gray-100/80">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {profile.skills.map(s => (
                      <span key={s} className="px-5 py-2 rounded-[14px] border border-gray-200/80 text-gray-700 text-sm font-semibold bg-white hover:bg-gray-50 transition-colors cursor-default shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-900 mb-7 tracking-tight">Edit Profile</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                  <input type="tel" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900 placeholder:text-gray-400" placeholder="e.g. +91 9876543210" />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">College</label>
                  <input type="text" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900" placeholder="e.g. IIT Delhi" />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Degree</label>
                  <input type="text" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900" placeholder="e.g. B.Tech" />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Branch</label>
                  <input type="text" value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900" placeholder="e.g. Computer Science" />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Graduation Year</label>
                  <input type="number" value={formData.graduationYear} onChange={e => setFormData({...formData, graduationYear: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900" placeholder="e.g. 2026" />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">CGPA</label>
                  <input type="number" step="0.1" value={formData.cgpa} onChange={e => setFormData({...formData, cgpa: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900" placeholder="e.g. 8.5" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Skills (Comma Separated)</label>
                  <textarea rows="3" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-gray-900 resize-none" placeholder="e.g. React, Node.js, Python" />
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
export default function StudentDashboard() {
  const navigate = useNavigate()
  const [active, setActive] = useState(() => localStorage.getItem('studentActiveTab') || 'dashboard')

  useEffect(() => {
    localStorage.setItem('studentActiveTab', active)
  }, [active])

  const [profile, setProfile] = useState(null)
  const [applications, setApplications] = useState([])
  const [jobs, setJobs] = useState([])
  const [applyError, setApplyError] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const PAGE_META = {
    dashboard:    { title: 'Dashboard',       subtitle: 'Your placement activity overview'      },
    jobs:         { title: 'Browse Jobs',     subtitle: 'All open positions for campus placement'},
    applications: { title: 'Applications',    subtitle: 'Track your full application pipeline'  },
    resume:       { title: 'Resume & ATS',    subtitle: 'Upload your resume and get AI feedback' },
    profile:      { title: 'Profile',         subtitle: 'Your student profile'                  },
  }

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) { navigate('/login'); return }

    Promise.all([
      apiFetch('/api/students/profile').catch(() => null),
      apiFetch('/api/me/applications').catch(() => null),
      apiFetch('/api/jobs').catch(() => null),
    ]).then(([p, a, j]) => {
      setProfile(p)
      setApplications(a?.content || [])
      setJobs(j?.content || [])
    }).finally(() => setLoading(false))
  }, [navigate])

  const handleApply = async (jobId) => {
    setApplyError('')
    try {
      await apiFetch(`/api/jobs/${jobId}/applications`, { method: 'POST' })
      const apps = await apiFetch('/api/me/applications').catch(() => null)
      setApplications(apps?.content || applications)
    } catch (err) {
      setApplyError(err.message || 'Application failed.')
      setTimeout(() => setApplyError(''), 4000)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-cyan-500" />
        <p className="text-sm text-gray-400 font-medium">Loading dashboard…</p>
      </div>
    </div>
  )

  const { title, subtitle } = PAGE_META[active]

  const appliedJobIds = new Set(applications.map(a => {
    // try to match title/company since we don't have jobPostingId directly in the mock app response
    const job = jobs.find(j => j.title === a.jobTitle && j.companyName === a.companyName)
    return job?.id
  }).filter(Boolean))

  const newJobsList = jobs.filter(j => !appliedJobIds.has(j.id) && j.jobPostingStatus === 'OPEN')

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar active={active} setActive={setActive} newJobCount={newJobsList.length} mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <PageHeader title={title} subtitle={subtitle} jobs={newJobsList} onNavigate={setActive} onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Apply error toast */}
        {applyError && (
          <div className="mx-8 mt-4 flex items-center gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-sm text-red-600 flex-1">{applyError}</p>
            <button onClick={() => setApplyError('')} className="text-red-300 hover:text-red-500"><X className="w-4 h-4" /></button>
          </div>
        )}

        <main className="flex-1 overflow-y-auto">
          {active === 'dashboard'    && <DashboardTab profile={profile} applications={applications} jobs={newJobsList} onNavigate={setActive} />}
          {active === 'jobs'         && <JobsTab jobs={jobs} applications={applications} onApply={handleApply} />}
          {active === 'applications' && <ApplicationsTab applications={applications} />}
          {active === 'resume'       && <ResumeTab />}
          {active === 'profile'      && <ProfileTab profile={profile} onUpdateProfile={setProfile} />}
        </main>
      </div>
    </div>
  )
}
