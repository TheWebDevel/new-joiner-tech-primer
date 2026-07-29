import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Server, Smile, Frown, XCircle, PowerOff, RotateCcw, Loader2 } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const USER_COUNT = 5
const INSTANCE_COUNT = 3
const DOWN_MS = 700
const REPLACING_MS = 900

function ServerCard({ label, big }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-xl border border-presidio-cyan/40 bg-presidio-cyan/5 ${
        big ? 'px-8 py-8' : 'px-6 py-6'
      }`}
    >
      <Server className={big ? 'h-10 w-10 text-presidio-cyan' : 'h-8 w-8 text-presidio-cyan'} strokeWidth={1.75} />
      <span className="font-heading text-sm font-bold text-white">{label}</span>
    </div>
  )
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function InstancesSlide({ step = 0 }) {
  const showOne = step >= 1
  const showMany = step >= 2
  const [down, setDown] = useState(false)
  const [statuses, setStatuses] = useState(() => Array(INSTANCE_COUNT).fill('up'))
  const [everTriggered, setEverTriggered] = useState(false)
  const cancelled = useRef(false)

  useEffect(() => {
    cancelled.current = false
    return () => {
      cancelled.current = true
    }
  }, [])

  useEffect(() => {
    if (!showOne || showMany) setDown(false)
  }, [showOne, showMany])

  useEffect(() => {
    if (!showMany) {
      setStatuses(Array(INSTANCE_COUNT).fill('up'))
      setEverTriggered(false)
    }
  }, [showMany])

  const crashAndReplace = async (idx) => {
    if (statuses[idx] !== 'up') return
    setEverTriggered(true)

    setStatuses((prev) => prev.map((s, i) => (i === idx ? 'down' : s)))
    await sleep(DOWN_MS)
    if (cancelled.current) return

    setStatuses((prev) => prev.map((s, i) => (i === idx ? 'replacing' : s)))
    await sleep(REPLACING_MS)
    if (cancelled.current) return

    setStatuses((prev) => prev.map((s, i) => (i === idx ? 'up' : s)))
  }

  const anyDown = statuses.some((s) => s !== 'up')

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          One Copy Isn&rsquo;t Enough
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          The backend layer has to actually run somewhere. How many copies of it?
        </p>
      </div>

      <div className="flex min-h-[20rem] w-full flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {showMany ? (
            <motion.div
              key="many"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="flex items-center gap-4">
                {Array.from({ length: USER_COUNT }).map((_, i) => (
                  <Smile key={i} className="h-5 w-5 text-white/50" strokeWidth={1.75} />
                ))}
              </div>

              <div className="h-8 w-px bg-white/15" />

              <div className="rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] px-6 py-6">
                <div className="mb-4 text-center text-[9px] font-semibold uppercase tracking-wide text-white/30">
                  Instance pool
                </div>
                <div className="flex items-center gap-4">
                  {statuses.map((status, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => crashAndReplace(idx)}
                      disabled={status !== 'up'}
                      className={`flex flex-col items-center gap-2 rounded-xl border px-6 py-6 transition-colors duration-300 ${
                        status === 'down'
                          ? 'border-dashed border-rose-400/50 bg-rose-400/5'
                          : status === 'replacing'
                            ? 'border-dashed border-presidio-cyan/40 bg-presidio-cyan/5'
                            : 'border-presidio-cyan/40 bg-presidio-cyan/5 hover:bg-presidio-cyan/10'
                      }`}
                    >
                      {status === 'down' && <XCircle className="h-8 w-8 text-rose-400" strokeWidth={1.75} />}
                      {status === 'replacing' && (
                        <Loader2 className="h-8 w-8 animate-spin text-presidio-cyan" strokeWidth={1.75} />
                      )}
                      {status === 'up' && <Server className="h-8 w-8 text-presidio-cyan" strokeWidth={1.75} />}
                      <span
                        className={`font-heading text-sm font-bold ${
                          status === 'down' ? 'text-rose-300' : 'text-white'
                        }`}
                      >
                        Instance #{idx + 1}
                      </span>
                      {status === 'down' && (
                        <span className="text-[9px] font-semibold uppercase tracking-wide text-rose-300/70">
                          Down
                        </span>
                      )}
                      {status === 'replacing' && (
                        <span className="text-[9px] font-semibold uppercase tracking-wide text-presidio-cyan/80">
                          Replacing...
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : showOne ? (
            <motion.div
              key="one"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-4">
                {Array.from({ length: USER_COUNT }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={down ? { y: [0, -3, 0] } : { y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    {down ? (
                      <Frown className="h-5 w-5 text-rose-400" strokeWidth={1.75} />
                    ) : (
                      <Smile className="h-5 w-5 text-white/50" strokeWidth={1.75} />
                    )}
                  </motion.div>
                ))}
              </div>

              <div
                className={`h-8 w-px transition-colors duration-300 ${
                  down ? 'bg-rose-400/40' : 'bg-white/15'
                }`}
              />

              {down ? (
                <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-rose-400/50 bg-rose-400/5 px-8 py-8">
                  <XCircle className="h-10 w-10 text-rose-400" strokeWidth={1.75} />
                  <span className="font-heading text-sm font-bold text-rose-300">
                    Instance #1 &middot; Down
                  </span>
                </div>
              ) : (
                <ServerCard label="Instance #1" big />
              )}

              <button
                type="button"
                onClick={() => setDown((d) => !d)}
                className={`mt-2 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur transition ${
                  down
                    ? 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                    : 'border-rose-400/50 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20'
                }`}
              >
                {down ? (
                  <>
                    <RotateCcw size={14} /> Restore the instance
                  </>
                ) : (
                  <>
                    <PowerOff size={14} /> Crash the instance
                  </>
                )}
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-6 min-h-[4.5rem] max-w-2xl text-center text-sm text-white/60">
        {showOne && !showMany && !down && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Every one of these users is routed to this one instance. See what happens if it goes
            down.
          </motion.p>
        )}
        {showOne && !showMany && down && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            All {USER_COUNT} users just lost the app, not because their own request failed, but
            because every request goes to this one machine. All eggs, one basket.
          </motion.p>
        )}
        {showMany && !anyDown && !everTriggered && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Each running copy of the backend is called an{' '}
            <span className="font-heading font-bold text-presidio-cyan">instance</span>. All of
            them share the same pool of traffic. Click one to take it down and watch what happens.
          </motion.p>
        )}
        {showMany && anyDown && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            One instance in the pool just failed, and a fresh one is already taking its place. The
            other two keep serving every user in the meantime, nobody is tied to the one that
            went down.
          </motion.p>
        )}
        {showMany && !anyDown && everTriggered && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Back to full strength. Every user was connected to the pool, not to any one instance,
            so nobody had to notice or care which physical copy answered them.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default InstancesSlide
