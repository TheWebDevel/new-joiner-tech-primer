import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Server, Zap, Send, Moon } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const AWAKE_MS = 1400

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function ServerlessSlide({ step = 0 }) {
  const showTraditional = step >= 1
  const showServerless = step >= 2
  const [awake, setAwake] = useState(false)
  const [pulsing, setPulsing] = useState(false)
  const cancelled = useRef(false)

  useEffect(() => {
    cancelled.current = false
    return () => {
      cancelled.current = true
    }
  }, [])

  const sendRequest = async () => {
    setPulsing(true)
    setAwake(true)
    await sleep(AWAKE_MS)
    if (cancelled.current) return
    setAwake(false)
    setPulsing(false)
  }

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Always Running, or Only When Asked?
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Two ways an instance can exist. Send a request and watch the difference.
        </p>
      </div>

      <div className="grid w-[90%] max-w-3xl grid-cols-2 gap-6">
        <div
          className={`flex min-h-[16rem] flex-col items-center justify-center rounded-xl p-6 text-center transition-colors duration-300 ${
            showTraditional ? 'border border-white/15 bg-white/5' : 'border-2 border-dashed border-white/15'
          }`}
        >
          {showTraditional && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center"
            >
              <Server className="h-9 w-9 text-white/70" strokeWidth={1.75} />
              <div className="mt-3 font-heading text-lg font-extrabold text-white">
                Traditional server
              </div>
              <span className="mt-2 rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                Always on
              </span>
              <p className="mt-4 text-sm text-white/70">
                Running 24 hours a day whether anyone is using it or not. You pay for the whole
                day, every day.
              </p>
            </motion.div>
          )}
        </div>

        <div
          className={`flex min-h-[16rem] flex-col items-center justify-center rounded-xl p-6 text-center transition-colors duration-300 ${
            showServerless
              ? 'border border-presidio-cyan/40 bg-presidio-cyan/5'
              : 'border-2 border-dashed border-white/15'
          }`}
        >
          {showServerless && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={awake ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {awake ? (
                  <Zap className="h-9 w-9 text-presidio-cyan" strokeWidth={1.75} />
                ) : (
                  <Moon className="h-9 w-9 text-white/30" strokeWidth={1.75} />
                )}
              </motion.div>
              <div className="mt-3 font-heading text-lg font-extrabold text-white">Serverless</div>
              <span
                className={`mt-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  awake ? 'bg-presidio-cyan/20 text-presidio-cyan' : 'bg-white/10 text-white/40'
                }`}
              >
                {awake ? 'Awake, handling it' : 'Asleep, scaled to zero'}
              </span>
              <p className="mt-4 text-sm text-white/70">
                Wakes up only when a request comes in, runs the code, then goes back to nothing.
                You pay only for the moments it actually runs.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-6 flex h-10 items-center justify-center">
        {showServerless && (
          <button
            type="button"
            onClick={sendRequest}
            disabled={pulsing}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10 disabled:opacity-40"
          >
            <Send size={14} /> Send a request
          </button>
        )}
      </div>

      <div className="mt-2 min-h-[3rem] max-w-2xl text-center text-sm text-white/60">
        {showServerless && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            The traditional server never noticed, it was already running. The{' '}
            <span className="font-heading font-bold text-presidio-cyan">serverless</span> instance
            woke up, handled it, and went back to sleep, all on its own.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default ServerlessSlide
