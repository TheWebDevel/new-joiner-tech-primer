import { motion } from 'framer-motion'
import { Bot, FileText, User, XCircle } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const QUESTION = "What's our refund policy for orders over $500?"
const WRONG_ANSWER =
  'Orders over $500 qualify for a full refund within 60 days, no questions asked.'
const REAL_POLICY = 'Refunds over $500 require manager approval and a 15% restocking fee.'

function HallucinationSlide({ step = 0 }) {
  const showQuestion = step >= 1
  const showAnswer = step >= 2
  const showReveal = step >= 3
  const showNaming = step >= 4

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Confident Isn&rsquo;t the Same as Correct
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Nobody ever told it your company&rsquo;s refund policy, so it answered closed-book
          anyway.
        </p>
      </div>

      <div className="flex w-[90%] max-w-xl flex-col gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
        <div className="min-h-[8rem] space-y-3">
          {showQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start justify-end gap-2"
            >
              <div className="rounded-2xl rounded-tr-sm bg-presidio-blue/30 px-3.5 py-2 text-sm text-white">
                {QUESTION}
              </div>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <User size={13} className="text-white/70" />
              </div>
            </motion.div>
          )}

          {showAnswer && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                  showReveal ? 'border-red-400/50 bg-red-400/10' : 'border-presidio-cyan/40 bg-presidio-cyan/10'
                }`}
              >
                <Bot size={13} className={showReveal ? 'text-red-300' : 'text-presidio-cyan'} />
              </div>
              <div
                className={`rounded-2xl rounded-tl-sm px-3.5 py-2 text-sm leading-relaxed transition-colors duration-500 ${
                  showReveal ? 'border border-red-400/30 bg-red-400/10 text-red-100' : 'bg-white/10 text-white/90'
                }`}
              >
                {WRONG_ANSWER}
                {showReveal && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-2 inline-flex items-center gap-1 align-middle text-xs font-semibold text-red-300"
                  >
                    <XCircle size={13} /> not your policy
                  </motion.span>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {showReveal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 border-t border-white/10 pt-3"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10">
              <FileText size={13} className="text-emerald-300" />
            </div>
            <div className="rounded-2xl rounded-tl-sm border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2 text-sm leading-relaxed text-emerald-100">
              Actual policy doc: &ldquo;{REAL_POLICY}&rdquo;
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 min-h-[4.5rem] max-w-2xl text-center text-sm text-white/60">
        {showNaming && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            It didn&rsquo;t lie, it doesn&rsquo;t know what lying is. Closed-book, it just
            generated something that sounded right. A confident, fluent, wrong answer like this
            is called a{' '}
            <span className="font-heading font-bold text-presidio-cyan">hallucination</span>.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default HallucinationSlide
