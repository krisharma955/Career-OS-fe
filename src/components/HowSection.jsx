import { useState } from 'react'
import {
  Brain,
  FileText,
  Building2,
  BarChart3,
  ShieldCheck,
  Bell,
} from 'lucide-react'

const steps = [
  { id: '01', label: 'Sign Up' },
  { id: '02', label: 'Build Profile' },
  { id: '03', label: 'Apply' },
  { id: '04', label: 'Get Scored' },
]

const featureCards = [
  {
    icon: <Brain className="w-5 h-5" />,
    title: 'AI ATS Scoring Engine',
    description:
      'Upload your PDF resume. Our GPT-4o-mini-powered engine scores it across skills, experience, education, and formatting — then tells you exactly what keywords you\'re missing.',
    color: 'bg-violet-50 text-violet-600',
    border: 'border-violet-100',
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Smart Resume Management',
    description:
      'Upload once, access anywhere. PDF-only with a 5MB cap. Auto-replaces on re-upload. Download your resume anytime with a single click.',
    color: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    title: 'Full Job Lifecycle',
    description:
      'Companies post jobs with salary ranges, required skills, deadlines, and openings. Students apply in one click — no duplicate applications ever.',
    color: 'bg-green-50 text-green-600',
    border: 'border-green-100',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Application Pipeline Tracking',
    description:
      'Every application moves through a real pipeline: Applied → Under Review → Shortlisted → Hired. Full transparency on every step.',
    color: 'bg-amber-50 text-amber-600',
    border: 'border-amber-100',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Role-Based Access',
    description:
      'Students, Companies, and Admins each get their own secure space. JWT auth with refresh token rotation — production-grade security from day one.',
    color: 'bg-rose-50 text-rose-600',
    border: 'border-rose-100',
  },
  {
    icon: <Bell className="w-5 h-5" />,
    title: 'ATS Report History',
    description:
      'Every AI analysis is stored. Track how your resume has improved over time. See scores, missing keywords, and suggestions per report.',
    color: 'bg-indigo-50 text-indigo-600',
    border: 'border-indigo-100',
  },
]

const ATSDemo = () => {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Upload', 'Analyze', 'Improve', 'Apply']
  const tabContent = [
    {
      title: 'Resume Uploaded',
      desc: 'PDF parsed and ready for AI analysis.',
      preview: (
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="w-8 h-10 bg-cyan-100 rounded flex items-center justify-center text-cyan-600 text-xs font-bold">PDF</div>
            <div>
              <p className="text-xs font-semibold text-gray-800">resume_krish_2026.pdf</p>
              <p className="text-[10px] text-gray-400">2.1 MB · Uploaded just now</p>
            </div>
            <div className="ml-auto w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'AI Analysis Running',
      desc: 'GPT-4o-mini scoring your resume in seconds.',
      preview: (
        <div className="space-y-2">
          {['Overall Score', 'Skills Match', 'Experience', 'Formatting'].map((label, i) => {
            const scores = [82, 74, 88, 91]
            const colors = ['bg-cyan-500', 'bg-amber-400', 'bg-green-500', 'bg-blue-500']
            return (
              <div key={label} className="flex items-center gap-3">
                <span className="text-[11px] text-gray-500 w-24 shrink-0">{label}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${colors[i]} rounded-full transition-all duration-700`} style={{ width: `${scores[i]}%` }} />
                </div>
                <span className="text-[11px] font-bold text-gray-700">{scores[i]}%</span>
              </div>
            )
          })}
        </div>
      ),
    },
    {
      title: 'Missing Keywords Found',
      desc: 'Exact gaps identified — add these to get past ATS filters.',
      preview: (
        <div className="flex flex-wrap gap-2">
          {['Spring Boot', 'REST APIs', 'Docker', 'PostgreSQL', 'CI/CD', 'Agile'].map(kw => (
            <span key={kw} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold border border-red-100">
              + {kw}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'Ready to Apply',
      desc: 'Your improved resume is matched to open roles.',
      preview: (
        <div className="space-y-2">
          {[
            { role: 'Backend Engineer Intern', co: 'TechCorp India', match: 94 },
            { role: 'SDE-1 (Java)', co: 'StartupX', match: 87 },
            { role: 'Full Stack Developer', co: 'DevHouse', match: 81 },
          ].map(job => (
            <div key={job.role} className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-gray-100">
              <div className="w-7 h-7 rounded-md bg-cyan-100 flex items-center justify-center text-cyan-500 text-[10px] font-bold">{job.co[0]}</div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-800">{job.role}</p>
                <p className="text-[10px] text-gray-400">{job.co}</p>
              </div>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{job.match}%</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="bg-gray-50/80 rounded-3xl border border-gray-100 overflow-hidden shadow-xl shadow-gray-100">
      {/* Tab bar */}
      <div className="flex border-b border-gray-100 bg-white px-4 pt-4 gap-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-semibold transition-all duration-200 ${
              activeTab === i
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <span className="text-[10px] opacity-70">{String(i + 1).padStart(2, '0')}</span>
            {tab}
          </button>
        ))}
      </div>
      <div className="p-6">
        <p className="text-xs font-bold text-cyan-600 mb-1 uppercase tracking-wider">{tabContent[activeTab].title}</p>
        <p className="text-sm text-gray-500 mb-4">{tabContent[activeTab].desc}</p>
        {tabContent[activeTab].preview}
      </div>
    </div>
  )
}

export default function HowSection() {
  return (
    <section id="how" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            How the system actually works
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Not just a job board. A complete placement pipeline — with AI that coaches you, not just scores you.
          </p>
        </div>

        {/* Interactive demo */}
        <div className="mb-20">
          <ATSDemo />
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className={`group p-6 rounded-2xl border ${card.border} hover:shadow-lg transition-all duration-300 bg-white hover:-translate-y-1`}
            >
              <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                {card.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug">{card.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
