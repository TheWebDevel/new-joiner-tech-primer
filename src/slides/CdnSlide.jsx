import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Server, Globe, PlayCircle, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const CDN_EDGE_PCT = 18

// Animated pacing is real round-trip ms x TIME_SCALE, applied identically
// everywhere, so animations stay visible but their relative speed (roughly
// 9x) matches the real 380ms vs 42ms numbers exactly.
const TIME_SCALE = 4

const MODE_META = {
  noCdn: { label: 'No CDN' },
  withCdn: { label: 'With CDN' },
}

const CONTENT_TYPES = {
  static: { label: 'Static asset', example: 'e.g. a product photo, a CSS file, a video' },
  dynamic: { label: 'Personalized data', example: 'e.g. your cart total, your account balance' },
}

function getConfig(mode, contentType) {
  if (mode === 'noCdn') {
    return {
      subtitle: 'Every request travels all the way to the one origin server, and back.',
      targetPct: 100,
      latencyMs: 380,
      dotColor: 'bg-rose-400',
      latencyColor: 'text-rose-400',
      destination: 'the origin server',
      doneText: (
        <>
          That round trip crossed an ocean to reach a single server in Virginia. Try{' '}
          <span className="font-heading font-bold text-white">With CDN</span> next.
        </>
      ),
    }
  }

  if (contentType === 'dynamic') {
    return {
      subtitle: 'Personalized data has nothing to cache, so it still goes all the way to the origin.',
      targetPct: 100,
      latencyMs: 380,
      dotColor: 'bg-rose-400',
      latencyColor: 'text-rose-400',
      destination: 'the origin server',
      doneText: (
        <>
          Personalized data, like your cart total or your account balance, is different for
          every single user, so there is nothing a CDN can cache. Even with one in place, this
          still has to reach{' '}
          <span className="font-heading font-bold text-white">the origin server</span> every
          time.
        </>
      ),
    }
  }

  return {
    subtitle: 'Static, cacheable content already sits on a server much closer to this user.',
    targetPct: CDN_EDGE_PCT,
    latencyMs: 42,
    dotColor: 'bg-emerald-400',
    latencyColor: 'text-emerald-400',
    destination: 'the CDN edge in Mumbai',
    doneText: (
      <>
        Static content like this, a product photo, a CSS file, a video, is the same for every
        user, so it can be cached and served from nearby. That is what a{' '}
        <span className="font-heading font-bold text-presidio-cyan">CDN</span> is: a network of
        cached copies spread across many locations.
      </>
    ),
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function CdnSlide({ step = 0 }) {
  const showBoard = step >= 1
  const [mode, setMode] = useState('noCdn')
  const [contentType, setContentType] = useState('static')
  const [phase, setPhase] = useState('idle')
  const [displayMs, setDisplayMs] = useState(0)
  const cancelled = useRef(false)
  const rafId = useRef(null)

  useEffect(() => {
    cancelled.current = false
    return () => {
      cancelled.current = true
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const config = getConfig(mode, contentType)
  const busy = phase === 'out' || phase === 'back'

  const run = async () => {
    const totalMs = config.latencyMs * TIME_SCALE
    const halfMs = totalMs / 2
    setDisplayMs(0)
    setPhase('out')

    const start = performance.now()
    const tick = () => {
      if (cancelled.current) return
      const elapsed = performance.now() - start
      const frac = Math.min(elapsed / totalMs, 1)
      setDisplayMs(Math.round(frac * config.latencyMs))
      if (frac < 1) rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    await sleep(halfMs)
    if (cancelled.current) return
    setPhase('back')
    await sleep(halfMs)
    if (cancelled.current) return
    setDisplayMs(config.latencyMs)
    setPhase('done')
  }

  const reset = () => {
    setPhase('idle')
    setDisplayMs(0)
  }

  const switchMode = (next) => {
    if (busy || next === mode) return
    setMode(next)
    setContentType('static')
    reset()
  }

  const switchContentType = (next) => {
    if (busy || next === contentType) return
    setContentType(next)
    reset()
  }

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] max-w-3xl flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          A User in Chennai, a Server Far Away
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">{config.subtitle}</p>
      </div>

      {showBoard && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-[90%] max-w-5xl flex-col items-center"
        >
          <div className="mb-4 flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
            {Object.entries(MODE_META).map(([key, m]) => (
              <button
                key={key}
                type="button"
                onClick={() => switchMode(key)}
                disabled={busy}
                className={`rounded-full px-5 py-1.5 text-sm font-semibold transition disabled:opacity-60 ${
                  mode === key ? 'bg-presidio-cyan/20 text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="mb-6 flex min-h-[3.25rem] flex-col items-center gap-1.5">
            {mode === 'withCdn' && (
              <>
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                  {Object.entries(CONTENT_TYPES).map(([key, c]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => switchContentType(key)}
                      disabled={busy}
                      className={`rounded-full px-4 py-1 text-xs font-semibold transition disabled:opacity-60 ${
                        contentType === key
                          ? 'bg-white/10 text-white'
                          : 'text-white/40 hover:text-white/70'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-white/35">{CONTENT_TYPES[contentType].example}</p>
              </>
            )}
          </div>

          <div className="mb-6 flex items-center gap-2">
            <span
              className={`font-heading text-3xl font-extrabold tabular-nums ${
                phase === 'idle' ? 'text-white/20' : config.latencyColor
              }`}
            >
              {phase === 'idle' ? '--' : `${displayMs}ms`}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-white/40">
              round trip
            </span>
          </div>

          <div className="flex w-full items-center gap-5">
            <div className="flex shrink-0 flex-col items-center gap-1.5 text-white/70">
              <Users className="h-8 w-8" strokeWidth={1.75} />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
                Chennai, India
              </span>
            </div>

            <div className="relative h-1.5 flex-1 rounded-full bg-white/10">
              <div
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${CDN_EDGE_PCT}%` }}
              >
                <div className="flex -translate-x-1/2 flex-col items-center gap-1">
                  <Globe
                    className={`h-5 w-5 transition-colors duration-300 ${
                      mode === 'withCdn' ? 'text-presidio-cyan' : 'text-white/20'
                    }`}
                    strokeWidth={1.75}
                  />
                  <span
                    className={`whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide transition-colors duration-300 ${
                      mode === 'withCdn' ? 'text-presidio-cyan' : 'text-white/20'
                    }`}
                  >
                    CDN edge (Mumbai)
                  </span>
                </div>
              </div>

              {(busy || phase === 'done') && (
                <motion.div
                  key={`${mode}-${contentType}`}
                  className={`absolute top-1/2 flex h-3 w-3 -translate-y-1/2 items-center justify-center rounded-full ${config.dotColor}`}
                  initial={{ left: '0%' }}
                  animate={{
                    left: phase === 'back' || phase === 'done' ? '0%' : `${config.targetPct}%`,
                  }}
                  transition={{ duration: (config.latencyMs * TIME_SCALE) / 2 / 1000, ease: 'easeInOut' }}
                >
                  <motion.span
                    className="absolute -top-5 text-white/60"
                    animate={{ opacity: phase === 'done' ? 0 : 1 }}
                  >
                    {phase === 'back' ? (
                      <ArrowLeft className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </motion.span>
                </motion.div>
              )}
            </div>

            <div className="flex shrink-0 flex-col items-center gap-1.5 text-white/70">
              <Server className="h-8 w-8" strokeWidth={1.75} />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
                Origin (Virginia)
              </span>
            </div>
          </div>

          <div className="mt-4 min-h-[1.25rem] text-center text-xs text-white/40">
            {phase === 'out' && `Request heading to ${config.destination}...`}
            {phase === 'back' && 'Response heading back to Chennai...'}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={run}
              disabled={busy}
              className="flex items-center gap-2 rounded-full border border-presidio-cyan/50 bg-presidio-cyan/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-presidio-cyan/20 disabled:opacity-40"
            >
              <PlayCircle size={14} /> Simulate a request
            </button>
            {phase === 'done' && (
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur transition hover:bg-white/10"
              >
                <RotateCcw size={14} /> Reset
              </button>
            )}
          </div>

          <div className="mt-6 flex min-h-[4rem] max-w-2xl flex-col items-center gap-2 text-center text-sm text-white/60">
            {phase === 'done' && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                {config.doneText}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </SlideBackground>
  )
}

export default CdnSlide
