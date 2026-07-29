import { motion } from 'framer-motion'
import { Bot, CheckCircle2, FileSearch, Search, User } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const QUESTION = "What's our refund policy for orders over $500?"
const POLICY_DOC = 'Refunds over $500 require manager approval and a 15% restocking fee.'
const GOOD_ANSWER =
  'Refunds over $500 need manager approval, and a 15% restocking fee applies.'

function RagSlide({ step = 0 }) {
  const showQuestion = step >= 1
  const showSearch = step >= 2
  const showFound = step >= 3
  const showPrompt = step >= 4
  const showAnswer = step >= 5
  const showNaming = step >= 6

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Same Question. Open Book This Time.
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Same closed-book question from last slide. This time, it gets to check the page first.
        </p>
      </div>

      <div className="flex w-[90%] max-w-2xl flex-col gap-3">
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

        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 pl-1 text-xs text-amber-300/80"
          >
            <Search size={13} className={showFound ? '' : 'animate-pulse'} />
            <span>{showFound ? 'Found the right page' : 'Finding the shelf where the answer lives...'}</span>
          </motion.div>
        )}

        {showFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-1 flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3.5 py-2 text-xs text-emerald-100"
          >
            <FileSearch size={14} className="shrink-0 text-emerald-300" />
            <span>&ldquo;{POLICY_DOC}&rdquo;</span>
            <span className="ml-auto shrink-0 font-mono font-semibold text-emerald-300">91%</span>
          </motion.div>
        )}

        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-white/15 bg-black/30 p-3 font-mono text-[11px] leading-relaxed text-white/60"
          >
            <div className="mb-1.5 text-[9px] uppercase tracking-wide text-white/30">
              What actually gets sent to the model
            </div>
            <div className="text-white/40">Context: &ldquo;{POLICY_DOC}&rdquo;</div>
            <div className="mt-1 text-white/40">Question: &ldquo;{QUESTION}&rdquo;</div>
          </motion.div>
        )}

        {showAnswer && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10">
              <Bot size={13} className="text-emerald-300" />
            </div>
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2 text-sm leading-relaxed text-emerald-100">
              {GOOD_ANSWER}
              <CheckCircle2 size={14} className="shrink-0 text-emerald-300" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-6 min-h-[4.5rem] max-w-2xl text-center text-sm text-white/60">
        {showNaming && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Look up the page first, then answer, open-book instead of closed-book. That&rsquo;s
            called <span className="font-heading font-bold text-presidio-cyan">RAG</span>,
            retrieval-augmented generation. It never learned the policy, just got handed the
            right paragraph.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default RagSlide
