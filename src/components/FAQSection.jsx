import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    q: 'Is this just another job board?',
    a: 'No. Career-OS is a full placement management system — not just a listing site. Students get AI resume scoring with actionable feedback, a real application pipeline with live status updates, and resume management. Companies get a structured dashboard to post, review, shortlist, and hire.',
  },
  {
    q: 'How does the AI resume scoring work?',
    a: 'You upload your PDF resume (up to 5MB). Our backend uses Apache PDFBox to extract the text, then sends it to GPT-5 via OpenRouter. The AI scores your resume across five dimensions — overall, skills, experience, education, and formatting — and returns missing keywords, strengths, and specific suggestions to improve your score.',
  },
  {
    q: 'What roles does Career-OS support?',
    a: 'Three roles: Students can build profiles with skills, CGPA, and branch, upload resumes, apply to jobs, and view their application pipeline. Companies can post jobs with salary ranges and skill requirements, and manage all incoming applications. Admins oversee the entire platform.',
  },
  {
    q: 'How secure is my data?',
    a: 'Career-OS uses JWT access tokens with refresh token rotation — stateless, production-grade authentication. Passwords are BCrypt-hashed. Role-based access control means students, companies, and admins each only see what they\'re supposed to. CSRF is disabled; tokens are used instead.',
  },
  {
    q: 'Can I apply to the same job twice?',
    a: 'No — duplicate applications are blocked at the database level via a unique constraint on (student, job). This prevents accidental re-applications and keeps the pipeline clean for both sides.',
  },
  {
    q: 'What happens to my resume after I upload it?',
    a: 'Your resume is stored securely with a UUID-prefixed filename to prevent collisions. If you upload a new resume, it auto-replaces the old one — you always have exactly one active resume. Download it anytime via the API.',
  },
  {
    q: 'Is my application history saved?',
    a: 'Yes. Every ATS analysis you run is stored permanently. You can view your full score history and see exactly how your resume has improved over time — per report, with all scores, missing keywords, and suggestions.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Questions before you <span className='text-cyan-600'>sign up</span>
          </h2>
          <p className="text-base text-gray-400">Straight answers. No fluff.</p>
        </div>

        {/* Accordion */}
        <div className="rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100 shadow-sm">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white">
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50/60 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-gray-900 text-sm pr-4 leading-snug">
                  {faq.q}
                </span>
                <span className="shrink-0 text-gray-400">
                  {openIndex === i ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>

              {/* Animated answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
