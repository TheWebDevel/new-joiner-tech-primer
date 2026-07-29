import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Brain, Check, CheckCircle2, FileSearch, FlaskConical, Pencil } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'
import TaskTracker from '../components/TaskTracker'

const TICKET = 'Add a due date to each task, and show it next to the task text.'

const AFTER_TASKS = [
  { id: 1, text: 'Draft the requirements doc', done: false, due: 'Fri' },
  { id: 2, text: 'Review wireframes with design', done: true, due: 'Wed' },
  { id: 3, text: 'Sync with engineering', done: false, due: 'Mon' },
]

const DIFF_LINES = [
  { type: '-', text: "{ id: 1, text: 'Draft the requirements doc', done: false }" },
  { type: '+', text: "{ id: 1, text: 'Draft the requirements doc', done: false, dueDate: 'Fri' }" },
  { type: '+', text: '<span className="due-badge">{task.dueDate}</span>' },
]

const LOG = [
  {
    icon: Brain,
    label: 'Plan',
    body: 'Read the task data model, add a dueDate field, show it in the list.',
  },
  {
    icon: FileSearch,
    label: 'Reading TaskTracker.jsx',
    body: 'Found where each task is defined and where the list renders.',
  },
  {
    icon: Pencil,
    label: 'Editing TaskTracker.jsx',
    diff: true,
  },
  {
    icon: FlaskConical,
    label: 'Running tests',
    body: '3 passed. The list still renders, and the new field shows up.',
    pass: true,
  },
  {
    icon: CheckCircle2,
    label: 'Done',
    body: 'Due dates added to the task list.',
    done: true,
  },
]

function AfterPreview() {
  return (
    <div className="h-full overflow-auto p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-gray-800">Tasks</h3>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
          {AFTER_TASKS.filter((t) => !t.done).length} open
        </span>
      </div>
      <ul className="space-y-2">
        {AFTER_TASKS.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                t.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 text-transparent'
              }`}
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span className={`text-sm ${t.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
              {t.text}
            </span>
            <span className="ml-auto shrink-0 rounded-full bg-presidio-blue/10 px-2 py-0.5 text-[10px] font-semibold text-presidio-blue">
              {t.due}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LogEntry({ entry }) {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-lg border p-3 ${
        entry.done ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="flex items-center gap-2">
        <entry.icon size={13} className={entry.done ? 'text-emerald-300' : 'text-presidio-cyan'} />
        <span className={`text-xs font-semibold ${entry.done ? 'text-emerald-200' : 'text-white/80'}`}>
          {entry.label}
        </span>
        {entry.pass && (
          <span className="ml-auto rounded bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
            pass
          </span>
        )}
      </div>
      {entry.body && <p className="mt-1.5 pl-5 text-xs leading-snug text-white/50">{entry.body}</p>}
      {entry.diff && (
        <div className="mt-2 ml-5 rounded border border-white/10 bg-black/30 p-2 font-mono text-[10px] leading-relaxed">
          {DIFF_LINES.map((line, i) => (
            <div
              key={i}
              className={line.type === '+' ? 'text-emerald-400' : line.type === '-' ? 'text-red-400/80' : 'text-white/50'}
            >
              {line.type} {line.text}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function CodingAgentSlide({ step = 0 }) {
  const showDemo = step >= 1
  const logCount = Math.min(Math.max(step - 1, 0), LOG.length)
  const showAfter = step >= 6
  const showNaming = step >= 7
  const showPunchline = step >= 8
  const logRef = useRef(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logCount])

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          A Ticket, Not a Chat
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Same task tracker. This time the ticket goes to something that can touch the code.
        </p>
      </div>

      {showDemo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 w-[90%] max-w-3xl rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/80"
        >
          <span className="mr-2 rounded bg-presidio-cyan/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-presidio-cyan">
            TICKET
          </span>
          {TICKET}
        </motion.div>
      )}

      <div className="flex w-[90%] max-w-3xl items-stretch justify-center gap-6">
        <div
          className={`h-[24rem] w-full max-w-sm overflow-hidden rounded-xl transition-colors duration-300 ${
            showDemo ? 'border border-white/15 bg-white shadow-2xl' : 'border-2 border-dashed border-white/15 bg-white/5'
          }`}
        >
          {showDemo && (
            <AnimatePresence mode="wait">
              {showAfter ? (
                <motion.div key="after" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                  <AfterPreview />
                </motion.div>
              ) : (
                <motion.div key="before" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                  <TaskTracker html css js accent="green" />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        <div
          ref={logRef}
          className="flex h-[24rem] w-full max-w-sm flex-col gap-2 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3 [scrollbar-color:rgba(255,255,255,0.25)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25 [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {!showDemo && (
            <div className="flex h-full items-center justify-center text-center text-sm text-white/30">
              Nothing started yet.
            </div>
          )}
          <AnimatePresence initial={false}>
            {LOG.slice(0, logCount).map((entry) => (
              <LogEntry key={entry.label} entry={entry} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 min-h-[4.5rem] max-w-2xl text-center text-sm text-white/60">
        {showNaming && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Something that can read files, edit them, and run commands on its own is a coding{' '}
            <span className="font-heading font-bold text-presidio-cyan">agent</span>. Each thing
            it did, reading, editing, testing, is a{' '}
            <span className="font-heading font-bold text-presidio-cyan">tool use</span>.
          </motion.p>
        )}
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
            Plan, use a tool, check the result, decide the next step, repeat until done. That
            cycle is called the{' '}
            <span className="font-heading font-bold text-presidio-cyan">agent loop</span>, no
            different from what you just watched.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default CodingAgentSlide
