import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, FileText, Hash, Search, X } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const DEFAULT_TEXT = 'What does idempotent mean in this ticket?'

const CHIP_COLORS = [
  'border-presidio-cyan/40 bg-presidio-cyan/10 text-presidio-cyan',
  'border-presidio-orange/40 bg-presidio-orange/10 text-presidio-orange',
  'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
  'border-violet-400/40 bg-violet-400/10 text-violet-300',
]

// Not a real tokenizer, just enough to make the shape visible: long words
// split into two chunks, like a real subword tokenizer would, everything
// else stays a whole-word token.
function fakeTokenize(text) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const tokens = []
  words.forEach((word) => {
    if (word.length > 7) {
      const mid = Math.ceil(word.length / 2)
      tokens.push(word.slice(0, mid))
      tokens.push('##' + word.slice(mid))
    } else {
      tokens.push(word)
    }
  })
  return tokens
}

const DOCS = [
  { id: 'refund', text: 'Refunds over $500 require manager approval and a 15% restocking fee.' },
  { id: 'cancel', text: 'Cancelling an order before it ships is free, no questions asked.' },
  { id: 'shipping', text: 'Standard delivery takes 3 to 5 business days within the country.' },
  { id: 'sla', text: 'Support tickets are answered within one business day on weekdays.' },
  { id: 'giftcard', text: 'Gift cards never expire and can be combined with other promotions.' },
]

const QUERIES = [
  {
    id: 'money',
    text: 'Can I get my money back?',
    scores: { refund: 91, cancel: 38, shipping: 12, sla: 9, giftcard: 15 },
  },
  {
    id: 'calloff',
    text: 'I want to call off my purchase',
    scores: { cancel: 89, refund: 44, shipping: 10, sla: 8, giftcard: 6 },
  },
  {
    id: 'arrive',
    text: 'How long until it arrives?',
    scores: { shipping: 93, sla: 22, cancel: 14, refund: 9, giftcard: 5 },
  },
  {
    id: 'voucher',
    text: 'Does my voucher ever run out?',
    scores: { giftcard: 90, refund: 20, cancel: 11, shipping: 7, sla: 6 },
  },
]

function TokensSlide({ step = 0 }) {
  const [text, setText] = useState(DEFAULT_TEXT)
  const [activeQuery, setActiveQuery] = useState(null)

  const showTokenDemo = step >= 1
  const showTokenNaming = step >= 2
  const showEmbedBridge = step >= 3
  const showEmbedNaming = step >= 3
  const showSearchDemo = step >= 4
  const showClosing = step >= 5

  const tokens = useMemo(() => fakeTokenize(text), [text])
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  const scores = activeQuery ? QUERIES.find((q) => q.id === activeQuery).scores : null
  const docs = scores ? [...DOCS].sort((a, b) => scores[b.id] - scores[a.id]) : DOCS

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          From Words, to Chunks, to Numbers
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Before it can answer anything, closed-book or not, here&rsquo;s what it actually reads.
        </p>
      </div>

      <div className="w-[90%] max-w-2xl">
        {!showTokenDemo && (
          <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-white/15 text-sm text-white/30">
            Press Next to see how it actually gets read.
          </div>
        )}

        {showTokenDemo && !showSearchDemo && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur"
          >
            <label className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-white/40">
              <span>Type anything</span>
              <span className="flex items-center gap-1.5 text-presidio-cyan">
                <Hash size={12} />
                {tokens.length} token{tokens.length === 1 ? '' : 's'} · {wordCount} word
                {wordCount === 1 ? '' : 's'}
              </span>
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/20 px-3.5 py-2.5 text-sm text-white focus:border-presidio-cyan/60 focus:outline-none"
              placeholder="Type a sentence..."
            />

            <div className="mt-4 flex min-h-[3.5rem] flex-wrap gap-1.5">
              {tokens.map((token, i) => (
                <motion.span
                  key={`${token}-${i}`}
                  initial={{ opacity: 0, scale: 0.8, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  className={`rounded-md border px-2 py-1 font-mono text-xs ${CHIP_COLORS[i % CHIP_COLORS.length]}`}
                >
                  {token}
                </motion.span>
              ))}
            </div>

            {showEmbedBridge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-4"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="rounded-md border border-presidio-cyan/40 bg-presidio-cyan/10 px-2 py-1 font-mono text-xs text-presidio-cyan">
                    ticket
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-red-300/80">
                    <X size={10} /> can&rsquo;t compute
                  </span>
                </div>
                <ArrowRight size={16} className="shrink-0 text-white/30" />
                <div className="flex flex-col items-center gap-1">
                  <span className="rounded-md border border-white/15 bg-black/20 px-2 py-1 font-mono text-[11px] text-white/60">
                    [0.82, -0.31, 0.55, ...]
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-300/80">
                    <Check size={10} /> can compute
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {showSearchDemo && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur"
          >
            <div className="flex flex-wrap justify-center gap-2">
              {QUERIES.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setActiveQuery(activeQuery === q.id ? null : q.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeQuery === q.id
                      ? 'border-presidio-cyan/60 bg-presidio-cyan/15 text-white'
                      : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Search size={12} />
                  &ldquo;{q.text}&rdquo;
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {docs.map((doc) => {
                const score = scores?.[doc.id]
                const isTop = scores && doc.id === docs[0].id
                return (
                  <motion.div
                    layout
                    key={doc.id}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors duration-300 ${
                      isTop
                        ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-100'
                        : scores
                          ? 'border-white/10 bg-white/5 text-white/40'
                          : 'border-white/10 bg-white/5 text-white/80'
                    }`}
                  >
                    <FileText size={14} className="shrink-0 opacity-60" />
                    <span className="flex-1">{doc.text}</span>
                    {score != null && (
                      <span
                        className={`shrink-0 font-mono text-xs font-semibold ${isTop ? 'text-emerald-300' : 'text-white/30'}`}
                      >
                        {score}%
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-6 min-h-[5.5rem] max-w-2xl text-center text-sm text-white/60">
        {showTokenNaming && !showEmbedNaming && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Each chunk is a{' '}
            <span className="font-heading font-bold text-presidio-cyan">token</span>. Read one
            at a time, not whole words.
          </motion.p>
        )}
        {showEmbedNaming && !showSearchDemo && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            That number list is an{' '}
            <span className="font-heading font-bold text-presidio-cyan">embedding</span>, a
            stand-in for meaning. Same idea, similar numbers, even with different words.
          </motion.p>
        )}
        {showSearchDemo && !showClosing && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Matched by meaning, not by word.
          </motion.p>
        )}
        {showClosing && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Tokens set the cost and length limits. Embeddings let it look something up, instead
            of guessing closed-book.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default TokensSlide
