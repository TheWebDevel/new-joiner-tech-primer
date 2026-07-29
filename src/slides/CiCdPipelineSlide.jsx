import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  GitBranch,
  Bug,
  Hammer,
  FlaskConical,
  Rocket,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  Ban,
} from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const STAGES = [
  {
    key: 'build',
    label: 'Build',
    icon: Hammer,
    detail: 'Turns the code into something that can actually run.',
  },
  {
    key: 'test',
    label: 'Test',
    icon: FlaskConical,
    detail: 'Automated checks look for anything broken, before anyone else sees it.',
  },
  {
    key: 'deploy',
    label: 'Deploy',
    icon: Rocket,
    detail: 'The build is copied onto the server the internet can reach.',
  },
]

const STAGE_MS = 900

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function StageIcon({ status, Icon }) {
  if (status === 'running') return <Loader2 className="h-6 w-6 animate-spin text-presidio-cyan" />
  if (status === 'passed') return <CheckCircle2 className="h-6 w-6 text-emerald-400" />
  if (status === 'failed') return <XCircle className="h-6 w-6 text-rose-400" />
  if (status === 'blocked') return <Ban className="h-6 w-6 text-white/25" strokeWidth={1.75} />
  return <Icon className="h-6 w-6 text-white/30" strokeWidth={1.75} />
}

function CiCdPipelineSlide({ step = 0 }) {
  const showBoard = step >= 1
  const [hasBug, setHasBug] = useState(false)
  const [running, setRunning] = useState(false)
  const [statuses, setStatuses] = useState(['idle', 'idle', 'idle'])
  const [done, setDone] = useState(null)
  const cancelled = useRef(false)

  useEffect(() => {
    cancelled.current = false
    return () => {
      cancelled.current = true
    }
  }, [])

  const run = async () => {
    setRunning(true)
    setDone(null)
    setStatuses(['idle', 'idle', 'idle'])
    await sleep(150)
    if (cancelled.current) return
    setStatuses(['running', 'idle', 'idle'])
    await sleep(STAGE_MS)
    if (cancelled.current) return
    setStatuses(['passed', 'idle', 'idle'])
    await sleep(150)
    if (cancelled.current) return
    setStatuses(['passed', 'running', 'idle'])
    await sleep(STAGE_MS)
    if (cancelled.current) return

    if (hasBug) {
      setStatuses(['passed', 'failed', 'blocked'])
      setRunning(false)
      setDone('failed')
      return
    }

    setStatuses(['passed', 'passed', 'idle'])
    await sleep(150)
    if (cancelled.current) return
    setStatuses(['passed', 'passed', 'running'])
    await sleep(STAGE_MS)
    if (cancelled.current) return
    setStatuses(['passed', 'passed', 'passed'])
    setRunning(false)
    setDone('success')
  }

  return (
    <SlideBackground orbs={false}>
      <div className="mb-10 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Nobody Manually Uploads This Anymore
        </h2>
        <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
          Push code, and a machine builds it, tests it, and only then deploys it. Try it both
          ways.
        </p>
      </div>

      {showBoard && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-[90%] max-w-5xl flex-col items-center"
        >
          <div className="mb-8 flex w-full items-center justify-center gap-4 sm:gap-6">
            {STAGES.map((s, i) => (
              <div key={s.key} className="flex flex-1 items-center gap-4 sm:gap-6">
                <div
                  className={`flex min-h-[13rem] w-full flex-col items-center gap-2 rounded-xl border px-5 py-6 text-center transition-colors duration-300 ${
                    statuses[i] === 'passed'
                      ? 'border-emerald-400/50 bg-emerald-400/10'
                      : statuses[i] === 'failed'
                        ? 'border-rose-400/50 bg-rose-400/10'
                        : statuses[i] === 'running'
                          ? 'border-presidio-cyan/50 bg-presidio-cyan/10'
                          : statuses[i] === 'blocked'
                            ? 'border-dashed border-white/15 bg-white/[0.02]'
                            : 'border-white/10 bg-white/5'
                  }`}
                >
                  <StageIcon status={statuses[i]} Icon={s.icon} />
                  <span
                    className={`mt-1 font-heading text-base font-bold sm:text-lg ${
                      statuses[i] === 'blocked' ? 'text-white/40' : 'text-white'
                    }`}
                  >
                    {s.label}
                  </span>
                  {statuses[i] === 'blocked' && (
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/30">
                      Skipped
                    </span>
                  )}
                  <p
                    className={`mt-1 text-xs leading-snug sm:text-sm ${
                      statuses[i] === 'blocked' ? 'text-white/25' : 'text-white/50'
                    }`}
                  >
                    {s.detail}
                  </p>
                </div>
                {i < STAGES.length - 1 && (
                  <ArrowRight
                    className={`h-6 w-6 shrink-0 ${
                      statuses[i + 1] === 'blocked' ? 'text-rose-400/50' : 'text-white/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={run}
              disabled={running}
              className="flex items-center gap-2 rounded-full border border-presidio-cyan/50 bg-presidio-cyan/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-presidio-cyan/20 disabled:opacity-40"
            >
              <GitBranch size={14} /> Push code
            </button>
            <button
              type="button"
              onClick={() => setHasBug((v) => !v)}
              disabled={running}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur transition disabled:opacity-40 ${
                hasBug
                  ? 'border-amber-400/50 bg-amber-400/10 text-amber-300'
                  : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              <Bug size={14} /> {hasBug ? 'Bug included' : 'Include a bug'}
            </button>
          </div>

          <div className="mt-6 min-h-[3.5rem] max-w-2xl text-center text-sm text-white/60">
            {done === 'failed' && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                Test failed, so Deploy never ran. This never reached a single real user.
              </motion.p>
            )}
            {done === 'success' && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                All three stages passed, and it shipped automatically. That whole chain, build,
                test, deploy, running on its own every time code is pushed, is called a{' '}
                <span className="font-heading font-bold text-presidio-cyan">CI/CD pipeline</span>.
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </SlideBackground>
  )
}

export default CiCdPipelineSlide
