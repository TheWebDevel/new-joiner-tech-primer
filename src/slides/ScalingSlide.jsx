import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Server, Shuffle, Zap, AlertTriangle, RotateCcw } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const SPIKE_MS = 1300
const TICK_MS = 700
const THRESHOLD = 80
// Each step is total demand as a % of one instance's capacity. Crossing 80%
// per instance is what triggers the load balancer to bring another one online.
const DEMAND_STEPS = [25, 65, 120, 200]

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function LoadBar({ pct, danger, durationMs = SPIKE_MS }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className={`h-full rounded-full ${danger ? 'bg-rose-400' : 'bg-emerald-400'}`}
        animate={{ width: `${pct}%` }}
        transition={{ duration: durationMs / 1000, ease: 'easeInOut' }}
      />
    </div>
  )
}

function ScalingSlide({ step = 0 }) {
  const showBoard = step >= 1
  const [mode, setMode] = useState('single')
  const [phase, setPhase] = useState('idle')
  const [demand, setDemand] = useState(8)
  const [instanceCount, setInstanceCount] = useState(1)
  const cancelled = useRef(false)

  useEffect(() => {
    cancelled.current = false
    return () => {
      cancelled.current = true
    }
  }, [])

  useEffect(() => {
    setPhase('idle')
    setDemand(8)
    setInstanceCount(1)
  }, [mode])

  const sendSpike = async () => {
    if (mode === 'single') {
      setPhase('spiking')
      await sleep(SPIKE_MS)
      if (cancelled.current) return
      setPhase('result')
      return
    }

    setPhase('spiking')
    for (const d of DEMAND_STEPS) {
      const needed = Math.max(1, Math.ceil(d / THRESHOLD))
      setInstanceCount((prev) => Math.max(prev, needed))
      setDemand(d)
      await sleep(TICK_MS)
      if (cancelled.current) return
    }
    setPhase('result')
  }

  const reset = () => {
    setPhase('idle')
    setDemand(8)
    setInstanceCount(1)
  }

  const crashed = mode === 'single' && phase === 'result'
  const singlePct = phase === 'idle' ? 8 : 100
  const perInstancePct = phase === 'idle' ? 8 : Math.round(demand / instanceCount)

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] max-w-3xl flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Big Billion Day Sends a Spike. Now What?
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Midnight, sale goes live, everyone opens the app at once. One big instance, or several
          sharing the load, send the same spike at both.
        </p>
      </div>

      {showBoard && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-[90%] max-w-5xl flex-col items-center"
        >
          <div className="mb-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setMode('single')}
              disabled={phase === 'spiking'}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                mode === 'single' ? 'bg-presidio-cyan/20 text-presidio-cyan' : 'text-white/50 hover:text-white/80'
              }`}
            >
              One instance
            </button>
            <button
              type="button"
              onClick={() => setMode('balanced')}
              disabled={phase === 'spiking'}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                mode === 'balanced' ? 'bg-presidio-cyan/20 text-presidio-cyan' : 'text-white/50 hover:text-white/80'
              }`}
            >
              Load balancer + auto-scaling
            </button>
          </div>

          <div className="flex min-h-[13rem] w-full flex-col items-center justify-center">
            {mode === 'single' ? (
              <div className="w-full max-w-md rounded-xl border border-white/15 bg-white/5 p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {crashed ? (
                      <AlertTriangle className="h-9 w-9 text-rose-400" />
                    ) : (
                      <Server className="h-9 w-9 text-white/70" />
                    )}
                    <span className="font-heading text-lg font-bold text-white">Instance #1</span>
                  </div>
                  <span className={`text-sm font-semibold ${crashed ? 'text-rose-400' : 'text-white/50'}`}>
                    {crashed ? 'Down' : phase === 'spiking' ? 'Climbing...' : 'Idle'}
                  </span>
                </div>
                <div className="mt-6">
                  <LoadBar pct={singlePct} danger={phase !== 'idle'} />
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-col items-center gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-presidio-orange/40 bg-presidio-orange/5 px-4 py-2">
                  <Shuffle className="h-5 w-5 text-presidio-orange" />
                  <span className="font-heading text-xs font-bold text-white">Load balancer</span>
                </div>

                {phase !== 'idle' && (
                  <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-wide text-white/40">
                    <span>
                      Demand <span className="text-white">{demand}%</span>
                    </span>
                    <span>
                      Instances online <span className="text-white">{instanceCount}</span>
                    </span>
                  </div>
                )}

                <motion.div layout className="flex w-full items-stretch justify-center gap-5">
                  {Array.from({ length: instanceCount }).map((_, i) => (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="min-w-[10rem] max-w-xs flex-1 rounded-xl border border-white/15 bg-white/5 p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Server className="h-7 w-7 text-white/70" />
                          <span className="font-heading text-sm font-bold text-white">
                            Instance #{i + 1}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-400">
                          {phase === 'idle' ? 'Idle' : 'Handling it'}
                        </span>
                      </div>
                      <div className="mt-4">
                        <LoadBar pct={perInstancePct} durationMs={TICK_MS} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={sendSpike}
              disabled={phase !== 'idle'}
              className="flex items-center gap-2 rounded-full border border-presidio-cyan/50 bg-presidio-cyan/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-presidio-cyan/20 disabled:opacity-40"
            >
              <Zap size={14} /> Send the sale-day spike
            </button>
            {phase === 'result' && (
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur transition hover:bg-white/10"
              >
                <RotateCcw size={14} /> Reset
              </button>
            )}
          </div>

          <div className="mt-6 min-h-[3rem] max-w-xl text-center text-sm text-white/60">
            {phase === 'result' && mode === 'single' && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                One instance took the entire sale-day rush alone, and crashed. Everyone racing to
                check out now sees an error instead.
              </motion.p>
            )}
            {phase === 'result' && mode === 'balanced' && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                Each time demand crossed what one instance could comfortably handle, the{' '}
                <span className="font-heading font-bold text-presidio-orange">load balancer</span>{' '}
                brought another one online, ending with {instanceCount} instances sharing the same
                rush. None of them ever crashed. Adding more instances to share load like this is
                called <span className="font-heading font-bold text-presidio-cyan">horizontal scaling</span>.
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </SlideBackground>
  )
}

export default ScalingSlide
