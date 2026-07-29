import { motion } from 'framer-motion'
import { Braces, ArrowRight } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

function JsonLine({ children, active }) {
  return (
    <div
      className={`rounded px-2 py-0.5 transition-colors duration-300 ${
        active ? 'bg-presidio-cyan/20 text-presidio-cyan' : 'text-white/70'
      }`}
    >
      {children}
    </div>
  )
}

function JsonSlide({ step = 0 }) {
  const showJson = step >= 1
  const showCard = step >= 2
  const highlightText = step === 3
  const highlightDone = step === 4
  const showPunchline = step >= 4

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          The Shape the Data Actually Takes
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          This is what the server sends back, before it becomes a screen.
        </p>
      </div>

      <div className="flex w-[90%] max-w-4xl items-center justify-center gap-8">
        <div className="flex min-h-[16rem] w-full max-w-sm flex-col justify-center">
          {showJson && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-xl border border-white/15 bg-black/30 p-4"
            >
              <div className="mb-2 flex items-center gap-2 text-white/40">
                <Braces size={14} />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Response body</span>
              </div>
              <div className="space-y-0.5 font-mono text-sm">
                <div className="text-white/40">{'{'}</div>
                <JsonLine active={false}>&nbsp;&nbsp;&quot;id&quot;: 2,</JsonLine>
                <JsonLine active={highlightText}>
                  &nbsp;&nbsp;&quot;text&quot;: &quot;Review wireframes with design&quot;,
                </JsonLine>
                <JsonLine active={highlightDone}>&nbsp;&nbsp;&quot;done&quot;: true</JsonLine>
                <div className="text-white/40">{'}'}</div>
              </div>
            </motion.div>
          )}
        </div>

        {showCard && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ArrowRight className="text-white/30" size={22} />
          </motion.div>
        )}

        <div className="flex min-h-[16rem] w-full max-w-sm flex-col justify-center">
          {showCard && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xl"
            >
              <div className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                On screen
              </div>
              <div
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors duration-300 ${
                  highlightDone ? 'border-presidio-cyan bg-presidio-cyan/5' : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                    highlightDone
                      ? 'border-presidio-blue bg-presidio-blue'
                      : 'border-presidio-blue bg-presidio-blue'
                  }`}
                />
                <span
                  className={`text-sm text-gray-400 line-through transition-colors duration-300 ${
                    highlightText ? 'rounded bg-presidio-cyan/10 text-gray-600' : ''
                  }`}
                >
                  Review wireframes with design
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-6 max-w-2xl text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            That labeled, text-based shape is{' '}
            <span className="font-heading font-bold text-presidio-cyan">JSON</span>. Nearly every
            API sends and receives data in this exact format.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default JsonSlide
