import { motion } from 'framer-motion'
import { Eye, FileText, ListChecks, RefreshCw, Ticket, XCircle, CheckCircle2 } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const ROWS = [
  {
    icon: RefreshCw,
    theme: 'Starting fresh',
    dont: 'Keep piling new asks onto one long-running chat.',
    do: 'One subtask, one new session, every time.',
  },
  {
    icon: Ticket,
    theme: 'Writing the ask',
    dont: 'Paste a vague one-liner and hope it infers the rest.',
    do: 'Write it like a ticket for a person: what, where, and what done looks like.',
  },
  {
    icon: FileText,
    theme: 'Giving it context',
    dont: 'Describe the doc or ticket from memory.',
    do: 'Paste the actual ticket, doc, or acceptance criteria.',
  },
  {
    icon: ListChecks,
    theme: 'Repeating a pattern',
    dont: 'Let it re-improvise the same kind of ticket from zero, every time.',
    do: 'Point it at the team’s skill or checklist for that kind of task.',
  },
  {
    icon: Eye,
    theme: 'Checking the result',
    dont: 'Trust "Done" and move on.',
    do: 'Review the actual change before it goes anywhere.',
  },
]

function BestPracticesSlide({ step = 0 }) {
  const revealed = Math.min(step, ROWS.length)
  const showPunchline = step >= ROWS.length + 1

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Working With It, Not Just Watching It
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          BAs won&rsquo;t write the code. BAs will hand it the ticket that starts this.
        </p>
      </div>

      <div className="flex w-[90%] max-w-4xl flex-col gap-3">
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 px-1 text-center text-[11px] font-semibold uppercase tracking-wide text-white/30">
          <span className="text-left">&nbsp;</span>
          <span>Don&rsquo;t</span>
          <span>Do</span>
        </div>
        {ROWS.map((row, i) => (
          <motion.div
            key={row.theme}
            initial={false}
            animate={{ opacity: i < revealed ? 1 : 0.12, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-[1fr_1fr_1fr] items-stretch gap-3"
          >
            <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 text-presidio-cyan">
                <row.icon size={15} />
              </div>
              <span className="font-heading text-sm font-bold text-white">{row.theme}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-red-400/25 bg-red-400/5 px-3.5 py-3 text-left text-xs text-red-100/80">
              <XCircle size={14} className="shrink-0 text-red-400/70" />
              <span>{row.dont}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-3 text-left text-xs text-emerald-100">
              <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
              <span>{row.do}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 min-h-[4rem] max-w-2xl text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Worth repeating: a{' '}
            <span className="font-heading font-bold text-presidio-cyan">session</span> is
            everything the agent remembers until you start over. A new subtask in the same
            session inherits every detour, a new session starts clean.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default BestPracticesSlide
