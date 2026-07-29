import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const RELOAD_PHASES = [
  { checked: false, reloading: false, duration: 1400 },
  { checked: true, reloading: false, duration: 700 },
  { checked: true, reloading: true, duration: 550 },
  { checked: true, reloading: false, duration: 1400 },
  { checked: false, reloading: false, duration: 700 },
  { checked: false, reloading: true, duration: 550 },
]

function ReloadPanel() {
  const [phaseIndex, setPhaseIndex] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % RELOAD_PHASES.length)
    }, RELOAD_PHASES[phaseIndex].duration)
    return () => clearTimeout(id)
  }, [phaseIndex])

  const { checked, reloading } = RELOAD_PHASES[phaseIndex]

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl bg-white shadow-lg">
      {reloading && (
        <motion.div
          className="absolute left-0 top-0 z-10 h-1 bg-presidio-blue"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: RELOAD_PHASES[phaseIndex].duration / 1000, ease: 'easeInOut' }}
        />
      )}
      {reloading ? (
        <div className="h-full w-full bg-white" />
      ) : (
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-heading text-lg font-bold text-gray-800">Tasks</span>
            <span className="rounded-full bg-presidio-blue/10 px-3 py-1 text-sm font-semibold text-presidio-blue">
              {checked ? '0 open' : '1 open'}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: checked ? '#0081bc' : '#d1d5db',
                  backgroundColor: checked ? '#0081bc' : '#ffffff',
                }}
              >
                {checked && <Check size={16} strokeWidth={3} className="text-white" />}
              </div>
              <span className={`text-base ${checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                Sync with engineering
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-presidio-blue bg-presidio-blue">
                <Check size={16} strokeWidth={3} className="text-white" />
              </div>
              <span className="text-base text-gray-400 line-through">Review wireframes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function InstantPanel() {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setChecked((c) => !c), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-64 w-full overflow-hidden rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-heading text-lg font-bold text-gray-800">Tasks</span>
        <motion.span
          key={checked ? 'zero' : 'one'}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          className="rounded-full bg-presidio-blue/10 px-3 py-1 text-sm font-semibold text-presidio-blue"
        >
          {checked ? '0 open' : '1 open'}
        </motion.span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <motion.div
            animate={{
              scale: checked ? [1, 1.25, 1] : 1,
              borderColor: checked ? '#0081bc' : '#d1d5db',
              backgroundColor: checked ? '#0081bc' : '#ffffff',
            }}
            transition={{ duration: 0.35 }}
            className="flex h-7 w-7 items-center justify-center rounded-full border-2"
          >
            {checked && <Check size={16} strokeWidth={3} className="text-white" />}
          </motion.div>
          <span className={`text-base ${checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
            Sync with engineering
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-presidio-blue bg-presidio-blue">
            <Check size={16} strokeWidth={3} className="text-white" />
          </div>
          <span className="text-base text-gray-400 line-through">Review wireframes</span>
        </div>
      </div>
    </div>
  )
}

function FeelsSmartSlide({ step = 0 }) {
  const showOld = step >= 1
  const showNew = step >= 2
  const showPunchline = step >= 3
  const showAnswer = step >= 4

  return (
    <SlideBackground orbs={false}>
      <div className="mb-10 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Why an App Feels Smart
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Watch closely. Something changes, but the page never reloads.
        </p>
      </div>

      <div className="flex w-full flex-wrap items-start justify-center gap-16">
        <div className="flex min-h-[19rem] w-full max-w-lg flex-col items-center justify-center gap-5">
          {showOld && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex w-full flex-col items-center gap-5"
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-white/50">
                The old way
              </span>
              <ReloadPanel />
              <p className="text-base text-white/60">
                Click something, and the whole page starts over.
              </p>
              <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left">
                <div className="text-sm font-bold text-white">Server-side rendered</div>
                <div className="mt-1 text-sm text-white/50">
                  The server builds the whole page and sends it fresh, every time.
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex min-h-[19rem] w-full max-w-lg flex-col items-center justify-center gap-5">
          {showNew && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex w-full flex-col items-center gap-5"
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-presidio-cyan">
                Apps today
              </span>
              <InstantPanel />
              <p className="text-base text-white/60">Click something, and only that changes.</p>
              <div className="w-full rounded-lg border border-presidio-cyan/25 bg-presidio-cyan/5 px-4 py-3 text-left">
                <div className="text-sm font-bold text-presidio-cyan">Client-side rendered</div>
                <div className="mt-1 text-sm text-white/50">
                  The browser updates itself, using code that&rsquo;s already loaded.
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-8 max-w-2xl text-center">
        {showPunchline && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-white/70"
          >
            Nothing reloaded. So how did it know what to update?
          </motion.p>
        )}
        {showAnswer && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-base text-white/50"
          >
            That&rsquo;s client-side rendering: the code already in your browser updates the page
            itself, without asking the server for a full reload.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default FeelsSmartSlide
