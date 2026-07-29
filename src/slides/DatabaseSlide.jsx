import { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Database, Ghost, CheckCircle2 } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const rows = [
  { id: 1, text: 'Draft the requirements doc', done: false },
  { id: 2, text: 'Review wireframes with design', done: true },
  { id: 3, text: 'Sync with engineering', done: false },
]

function TaskRow({ text, done }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-left">
      <div
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
          done ? 'border-presidio-blue bg-presidio-blue' : 'border-gray-300'
        }`}
      />
      <span className={`text-xs ${done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{text}</span>
    </div>
  )
}

function DatabaseSlide({ step = 0 }) {
  const showWithout = step >= 1
  const showWith = step >= 2
  const showPunchline = step >= 3
  const [refreshed, setRefreshed] = useState(false)

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Where the Data Actually Lives
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          The server remembers things. Here&rsquo;s what happens if it doesn&rsquo;t.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-2 gap-6">
        <div
          className={`flex min-h-[22rem] flex-col items-center justify-center rounded-xl p-6 transition-colors duration-300 ${
            showWithout ? 'border border-white/15 bg-white/5' : 'border-2 border-dashed border-white/15'
          }`}
        >
          {showWithout && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex w-full flex-col items-center"
            >
              <div className="mb-5 flex items-center gap-2 text-white/60">
                <Ghost size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">Without a database</span>
              </div>

              <div className="w-full max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                <div className="border-b border-gray-100 px-3 py-2 text-xs font-bold text-gray-700">
                  Tasks
                </div>
                <div className="space-y-1.5 p-3">
                  {refreshed ? (
                    <div className="py-4 text-center text-xs text-gray-400">No tasks. It&rsquo;s gone.</div>
                  ) : (
                    rows.map((r) => <TaskRow key={r.id} {...r} />)
                  )}
                </div>
              </div>

              <p className="mt-5 max-w-xs text-sm text-white/60">
                {refreshed ? (
                  <>
                    <span className="font-heading font-bold text-white">Refreshed the page.</span> The
                    server only kept the list in memory, and memory clears when it restarts.
                  </>
                ) : (
                  'The server is holding this list in memory only. Nothing is saved anywhere else.'
                )}
              </p>
            </motion.div>
          )}
        </div>

        <div
          className={`flex min-h-[22rem] flex-col items-center justify-center rounded-xl p-6 transition-colors duration-300 ${
            showWith
              ? 'border border-presidio-cyan/40 bg-presidio-cyan/5'
              : 'border-2 border-dashed border-white/15'
          }`}
        >
          {showWith && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex w-full flex-col items-center"
            >
              <div className="mb-5 flex items-center gap-2 text-presidio-cyan">
                <Database size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">With a database</span>
              </div>

              <div className="w-full max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2">
                  <span className="text-xs font-bold text-gray-700">Tasks</span>
                  {refreshed && <CheckCircle2 size={14} className="text-emerald-500" />}
                </div>
                <div className="space-y-1.5 p-3">
                  {rows.map((r) => (
                    <TaskRow key={r.id} {...r} />
                  ))}
                </div>
              </div>

              <p className="mt-5 max-w-xs text-sm text-white/60">
                {refreshed ? (
                  <>
                    <span className="font-heading font-bold text-white">Refreshed the page.</span> The
                    server asked the database again, and every row was still there.
                  </>
                ) : (
                  'Every row lives in a database on disk. It survives a restart, a crash, anything.'
                )}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-5 flex h-9 items-center justify-center">
        {showWith && (
          <button
            type="button"
            onClick={() => setRefreshed((r) => !r)}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
          >
            <RefreshCw size={14} /> {refreshed ? 'Reset' : 'Simulate a refresh'}
          </button>
        )}
      </div>

      <div className="mt-2 min-h-[3rem] max-w-2xl text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            That persistent storage is the{' '}
            <span className="font-heading font-bold text-presidio-cyan">database</span>. It is the
            difference between data that survives and data that was never really saved.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default DatabaseSlide
