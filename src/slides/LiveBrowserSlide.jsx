import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard, Send, Server, LayoutTemplate } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const URL_TEXT = 'example.com'
const LIVE_URL = 'https://example.com'
const LOAD_TIMEOUT_MS = 4000

const recapSteps = [
  { icon: Keyboard, label: 'Type URL' },
  { icon: Send, label: 'Request out' },
  { icon: Server, label: 'Server replies' },
  { icon: LayoutTemplate, label: 'Page drawn' },
]

function SkeletonPage() {
  return (
    <motion.div
      key="skeleton"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full space-y-4 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="h-24 w-full animate-pulse rounded-lg bg-gray-200" />
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function BlankPage() {
  return (
    <motion.div
      key="blank"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-6"
    />
  )
}

function FallbackPage() {
  return (
    <motion.div
      key="fallback"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full space-y-4 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="font-heading text-sm font-extrabold tracking-tight text-gray-800">
          example.com
        </div>
        <div className="h-6 w-40 rounded-full border border-gray-200 bg-gray-50" />
        <div className="h-6 w-6 rounded-full bg-presidio-blue" />
      </div>
      <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gradient-to-r from-presidio-dark to-presidio-blue text-xs font-semibold text-white/90">
        This domain is for use in examples
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex h-16 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-300">
              <LayoutTemplate size={20} />
            </div>
            <div className="h-2.5 w-3/4 rounded bg-gray-300" />
            <div className="h-2.5 w-1/3 rounded bg-presidio-blue/40" />
          </div>
        ))}
      </div>
      <div className="text-[10px] font-medium uppercase tracking-wide text-gray-300">
        Simulated view, offline
      </div>
    </motion.div>
  )
}

function LiveFrame() {
  // `onLoad` alone can't tell a real page apart from a blocked/offline
  // navigation (the browser's own error page still fires `load`), so we
  // probe connectivity first and only mount the iframe once that succeeds.
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), LOAD_TIMEOUT_MS)

    fetch(LIVE_URL, { mode: 'no-cors', signal: controller.signal })
      .then(() => {
        if (!cancelled) setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('failed')
      })
      .finally(() => clearTimeout(timer))

    return () => {
      cancelled = true
      controller.abort()
      clearTimeout(timer)
    }
  }, [])

  if (status === 'failed') {
    return <FallbackPage />
  }

  if (status === 'checking') {
    return (
      <motion.div
        key="checking"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-full items-center justify-center bg-white"
      >
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-presidio-blue" />
      </motion.div>
    )
  }

  return (
    <motion.div
      key="live"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full"
    >
      <iframe src={LIVE_URL} title="Live website" className="h-full w-full border-0" />
    </motion.div>
  )
}

function LiveBrowserSlide({ step = 0 }) {
  // step 0 = nothing happened yet, 1 = typing, 2 = requesting, 3 = loading, 4 = loaded
  const activeIndex = step - 1
  const progressWidth = step === 2 ? '35%' : step === 3 ? '100%' : '0%'
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (step < 1) {
      setTyped('')
      return
    }
    if (step !== 1) {
      setTyped(URL_TEXT)
      return
    }
    let i = 0
    setTyped('')
    const interval = setInterval(() => {
      i += 1
      setTyped(URL_TEXT.slice(0, i))
      if (i >= URL_TEXT.length) clearInterval(interval)
    }, 90)
    return () => clearInterval(interval)
  }, [step])

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex max-w-2xl flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Live: Opening example.com
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Watch the same four steps from a moment ago, happening for real.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {recapSteps.map((rStep, i) => (
          <div
            key={rStep.label}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${
              i === activeIndex
                ? 'border-presidio-cyan/60 bg-presidio-cyan/10 text-presidio-cyan'
                : i < activeIndex
                  ? 'border-white/10 bg-white/5 text-white/40'
                  : 'border-white/10 bg-white/5 text-white/30'
            }`}
          >
            <rStep.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            {rStep.label}
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl">
        <div className="flex items-center gap-2 border-b border-black/10 bg-gray-100 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <div className="ml-3 flex flex-1 items-center rounded-md border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700">
            <span>{typed}</span>
            {step <= 1 && (
              <motion.span
                className="ml-0.5 inline-block h-3.5 w-px bg-gray-500"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            )}
          </div>
        </div>

        <div className="h-0.5 w-full bg-gray-100">
          <motion.div
            className="h-full bg-presidio-cyan"
            animate={{ width: progressWidth }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative h-72 bg-white">
          <AnimatePresence mode="wait">
            {step === 4 ? (
              <LiveFrame key="live-frame" />
            ) : step === 0 ? (
              <BlankPage />
            ) : (
              <SkeletonPage />
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideBackground>
  )
}

export default LiveBrowserSlide
