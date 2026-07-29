import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, ArrowRight, Sparkles, Check, AlertTriangle, RotateCcw } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'
import TaskTracker from '../components/TaskTracker'

const LINES_PER_COPY = 49

function FrameworksSlide({ step = 0 }) {
  const showWithout = step >= 1
  const showWith = step >= 2
  const showPunchline = step >= 3
  const [updated, setUpdated] = useState(false)

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Why Frameworks Exist
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Reusable pieces, instead of rewriting the same thing every time.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-2 gap-6">
        <div
          className={`flex min-h-[25rem] flex-col items-center justify-center rounded-xl p-6 transition-colors duration-300 ${
            showWithout ? 'border border-white/15 bg-white/5' : 'border-2 border-dashed border-white/15'
          }`}
        >
          {showWithout && (
            <>
              <div className="mb-5 flex items-center gap-2 text-white/60">
                <Copy size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Without a framework
                </span>
              </div>

              <div className="flex items-center gap-4">
                {[-6, 0, 6].map((rotate, i) => {
                  const fixedThisOne = updated && i === 0
                  const missedThisOne = updated && i !== 0
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14, rotate: 0 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotate,
                        scale: fixedThisOne ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.45, delay: showWith ? 0 : i * 0.15 }}
                      className={`flex h-36 w-44 flex-col items-center justify-center gap-2 rounded-xl border transition-colors duration-300 ${
                        fixedThisOne
                          ? 'border-emerald-400/60 bg-emerald-400/10'
                          : missedThisOne
                            ? 'border-amber-400/50 bg-amber-400/10'
                            : 'border-white/15 bg-white/5'
                      }`}
                    >
                      {fixedThisOne ? (
                        <>
                          <Check size={30} className="text-emerald-400" />
                          <span className="text-sm font-semibold text-emerald-300">Updated</span>
                        </>
                      ) : missedThisOne ? (
                        <>
                          <AlertTriangle size={30} className="text-amber-400" />
                          <span className="text-sm font-semibold text-amber-300">Missed it</span>
                        </>
                      ) : (
                        <>
                          <Copy size={28} className="text-white/40" />
                          <span className="font-mono text-sm text-white/50">
                            ~{LINES_PER_COPY} lines
                          </span>
                        </>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              <p className="mt-6 max-w-xs text-sm text-white/60">
                {updated ? (
                  <>
                    <span className="font-heading font-bold text-white">1 of 3 updated.</span> The
                    other two quietly fell out of sync.
                  </>
                ) : (
                  <>
                    <span className="font-heading font-bold text-white">
                      {LINES_PER_COPY * 3} lines.
                    </span>{' '}
                    Three separate copies to maintain.
                  </>
                )}
              </p>
            </>
          )}
        </div>

        <div
          className={`flex min-h-[25rem] flex-col items-center justify-center rounded-xl p-6 transition-colors duration-300 ${
            showWith
              ? 'border border-presidio-cyan/40 bg-presidio-cyan/5'
              : 'border-2 border-dashed border-white/15'
          }`}
        >
          {showWith && (
            <>
              <div className="mb-5 flex items-center gap-2 text-presidio-cyan">
                <Sparkles size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  With a framework
                </span>
              </div>

              <motion.div
                animate={{
                  borderColor: updated ? 'rgb(52 211 153 / 0.5)' : 'rgb(0 172 240 / 0.5)',
                  backgroundColor: updated ? 'rgb(52 211 153 / 0.1)' : 'rgb(0 172 240 / 0.1)',
                }}
                transition={{ duration: 0.4 }}
                className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-semibold ${
                  updated ? 'text-emerald-300' : 'text-presidio-cyan'
                }`}
              >
                Task List component · {updated ? 'updated once' : 'write once'}
              </motion.div>

              <ArrowRight className="my-2 text-white/30" size={16} />

              <div className="flex items-center gap-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.15, type: 'spring', bounce: 0.45 }}
                    className={`h-36 w-44 shrink-0 overflow-hidden rounded-xl border shadow-lg transition-colors duration-300 ${
                      updated ? 'border-emerald-400/60' : 'border-white/15'
                    } bg-white`}
                  >
                    <div style={{ transform: 'scale(0.4)', transformOrigin: 'top left', width: '250%' }}>
                      <TaskTracker html css accent={updated ? 'green' : 'blue'} />
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="mt-6 max-w-xs text-sm text-white/60">
                {updated ? (
                  <>
                    <span className="font-heading font-bold text-white">All three updated.</span>{' '}
                    Instantly, and none can be forgotten.
                  </>
                ) : (
                  <>
                    <span className="font-heading font-bold text-white">{LINES_PER_COPY} lines.</span>{' '}
                    Written once, reused three times.
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mt-5 flex h-9 items-center justify-center">
        {showWith && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setUpdated((u) => !u)}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
          >
            {updated ? (
              <>
                <RotateCcw size={14} /> Reset
              </>
            ) : (
              <>
                <Sparkles size={14} /> Simulate a design update
              </>
            )}
          </motion.button>
        )}
      </div>

      <div className="mt-2 min-h-[3rem] max-w-2xl text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            That reusable piece is called a{' '}
            <span className="font-heading font-bold text-presidio-cyan">component</span>. That&rsquo;s
            the whole idea of a <span className="font-heading font-bold text-presidio-cyan">framework</span>:
            build the component once, reuse it everywhere, update it once and everything using it
            updates too.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default FrameworksSlide
