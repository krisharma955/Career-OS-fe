import { CheckCircle2, XCircle } from 'lucide-react'

const forYou = [
  {
    text: "You're a student at a college with campus placements",
    sub: 'Career-OS is built for the campus hiring system end-to-end.',
  },
  {
    text: 'You want to know why your resume keeps getting rejected',
    sub: 'AI gives you a breakdown — not just a score, but what to fix.',
  },
  {
    text: "You're applying to jobs and want full visibility on every step",
    sub: 'Track every application from Applied to Hired with a real pipeline.',
  },
  {
    text: "You're a company looking to streamline campus hiring",
    sub: 'Post jobs, review applications, and update statuses in one place.',
  },
]

const notForYou = [
  {
    text: "You want a job-cram shortcut before next week's drive",
    sub: 'This improves your profile over time, not overnight.',
  },
  {
    text: 'You already have a structured placement system at your college',
    sub: 'You may not need the full pipeline we provide.',
  },
  {
    text: "You won't log in and update your profile",
    sub: 'The system works when you work with it, not around it.',
  },
  {
    text: "You want someone to write your resume for you",
    sub: 'We tell you what to improve. You do the improving.',
  },
]

export default function ForYouSection() {
  return (
    <section id="for-you" className="py-24 px-6 bg-gray-50/60">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Is this for you?
          </h2>
          <p className="text-lg text-gray-500 max-w-xl">
            Be honest. Career-OS only helps if your situation matches what it's built for.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Use it if */}
          <div className="p-7 rounded-3xl border border-green-200 bg-white">
            <p className="text-sm font-bold text-green-600 mb-6 tracking-wide uppercase">Use it if</p>
            <ul className="space-y-5">
              {forYou.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Skip it if */}
          <div className="p-7 rounded-3xl border border-red-200 bg-white">
            <p className="text-sm font-bold text-red-500 mb-6 tracking-wide uppercase">Skip it if</p>
            <ul className="space-y-5">
              {notForYou.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
