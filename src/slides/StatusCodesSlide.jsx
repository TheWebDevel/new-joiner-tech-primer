import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, PlusCircle, SearchX, AlertOctagon } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const responses = [
  {
    id: 'ok',
    trigger: 'Load the task list',
    code: '200',
    label: 'OK',
    Icon: CheckCircle2,
    color: 'text-emerald-400',
    border: 'border-emerald-400/50',
    bg: 'bg-emerald-400/10',
    explain: 'Everything worked. Here is the answer you asked for.',
  },
  {
    id: 'created',
    trigger: 'Add a new task',
    code: '201',
    label: 'Created',
    Icon: PlusCircle,
    color: 'text-emerald-400',
    border: 'border-emerald-400/50',
    bg: 'bg-emerald-400/10',
    explain: 'Something new was made, and made successfully.',
  },
  {
    id: 'notfound',
    trigger: 'Open a task that was already deleted',
    code: '404',
    label: 'Not Found',
    Icon: SearchX,
    color: 'text-amber-400',
    border: 'border-amber-400/50',
    bg: 'bg-amber-400/10',
    explain: 'Asked for something that is not there. Not a crash, just a dead end.',
  },
  {
    id: 'servererror',
    trigger: 'Trigger a server hiccup',
    code: '500',
    label: 'Server Error',
    Icon: AlertOctagon,
    color: 'text-rose-400',
    border: 'border-rose-400/50',
    bg: 'bg-rose-400/10',
    explain: 'Something broke on the server’s side. Not something the user did wrong.',
  },
]

function StatusCodesSlide({ step = 0 }) {
  const showDemo = step >= 1
  const showPunchline = step >= 2
  const [activeId, setActiveId] = useState(null)
  const active = responses.find((r) => r.id === activeId)

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          A Number That Tells You What Happened
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Every response carries one of these. Try a few.
        </p>
      </div>

      <div className="flex w-[90%] max-w-4xl items-center justify-center gap-10">
        <div className="flex min-h-[18rem] w-full max-w-xs flex-col justify-center gap-2.5">
          {showDemo &&
            responses.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveId(r.id)}
                className={`rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                  activeId === r.id
                    ? `${r.border} ${r.bg} text-white`
                    : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {r.trigger}
              </button>
            ))}
        </div>

        <div className="flex min-h-[18rem] w-full max-w-xs items-center justify-center">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35 }}
                className={`flex w-full flex-col items-center rounded-xl border p-6 text-center ${active.border} ${active.bg}`}
              >
                <active.Icon className={`h-10 w-10 ${active.color}`} strokeWidth={1.75} />
                <div className={`mt-3 font-heading text-3xl font-extrabold ${active.color}`}>
                  {active.code}
                </div>
                <div className="text-sm font-semibold uppercase tracking-wide text-white/60">
                  {active.label}
                </div>
                <p className="mt-3 text-sm text-white/70">{active.explain}</p>
              </motion.div>
            ) : (
              <div className="text-center text-sm text-white/30">Pick one on the left.</div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 max-w-2xl text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            That number is the{' '}
            <span className="font-heading font-bold text-presidio-cyan">status code</span>. When
            someone says &ldquo;we&rsquo;re seeing 500s in prod,&rdquo; this is exactly what they mean.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default StatusCodesSlide
