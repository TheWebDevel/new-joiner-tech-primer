import { AnimatePresence, motion } from 'framer-motion'
import { Bot, EyeOff, Hourglass, User, Zap } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const CAPACITY = 4

const MESSAGES = [
  { from: 'user', text: 'Ticket PROJ-482. Cancel button breaks if you click it twice, needs to be idempotent.' },
  { from: 'bot', text: 'Got it, flagging PROJ-482, add an idempotency check to the cancel endpoint.' },
  { from: 'user', text: 'PROJ-483 touches that same endpoint, keep that in mind.' },
  { from: 'bot', text: 'Noted, 483 and 482 share the cancel endpoint.' },
  { from: 'user', text: 'Quick one, which ticket needs the idempotency fix again?' },
  { from: 'bot', text: "I don't see that earlier in our conversation, which ticket did you mean?", confused: true },
]

function Bubble({ msg }) {
  const isUser = msg.from === 'user'
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
            msg.confused ? 'border-amber-400/50 bg-amber-400/10' : 'border-presidio-cyan/40 bg-presidio-cyan/10'
          }`}
        >
          <Bot size={13} className={msg.confused ? 'text-amber-300' : 'text-presidio-cyan'} />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          isUser
            ? 'rounded-tr-sm bg-presidio-blue/30 text-white'
            : msg.confused
              ? 'rounded-tl-sm border border-amber-400/30 bg-amber-400/10 text-amber-100'
              : 'rounded-tl-sm bg-white/10 text-white/90'
        }`}
      >
        {msg.text}
      </div>
      {isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10">
          <User size={13} className="text-white/70" />
        </div>
      )}
    </motion.div>
  )
}

function ContextWindowSlide({ step = 0 }) {
  const count = Math.min(step, MESSAGES.length)
  const showNaming = step >= MESSAGES.length + 1
  const showPunchline = step >= MESSAGES.length + 2
  const showWhyLimit = step >= MESSAGES.length + 3

  const visible = MESSAGES.slice(Math.max(0, count - CAPACITY), count)
  const droppedCount = Math.max(0, count - CAPACITY)

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          It Only Sees So Far Back
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Reading in chunks has a limit too, how far back it can see.
        </p>
      </div>

      <div className="w-[90%] max-w-2xl">
        <div className="mb-2 flex h-5 items-center justify-center gap-1.5 text-xs text-white/40">
          {droppedCount > 0 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5"
            >
              <EyeOff size={12} />
              {droppedCount} earlier message{droppedCount > 1 ? 's' : ''} no longer in view
            </motion.span>
          )}
        </div>

        <div className="flex h-72 flex-col justify-end gap-3 overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
          {count === 0 && (
            <div className="flex h-full items-center justify-center text-sm text-white/30">
              Press Next to pick the conversation back up.
            </div>
          )}
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((msg) => (
              <Bubble key={MESSAGES.indexOf(msg)} msg={msg} />
            ))}
          </AnimatePresence>
        </div>

        {showWhyLimit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex items-center gap-1.5 text-xs text-emerald-300/90">
              <Zap size={13} /> 4 in view · light compute
            </div>
            <span className="text-white/20">vs</span>
            <div className="flex items-center gap-1.5 text-xs text-amber-300/90">
              <Hourglass size={13} /> 400 in view · heavy compute
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 min-h-[4.5rem] max-w-2xl text-center text-sm text-white/60">
        {showNaming && !showWhyLimit && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            The model only reads what fits in its{' '}
            <span className="font-heading font-bold text-presidio-cyan">context window</span>,
            everything currently visible to it. Once a message drops out, it&rsquo;s gone, not
            just hidden.
          </motion.p>
        )}
        {showPunchline && !showWhyLimit && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
            That&rsquo;s not the model being careless. Nothing before the window exists for it
            anymore.
          </motion.p>
        )}
        {showWhyLimit && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            It compares every word in view against every other word, every time it writes one.
            More in view, more computation, that&rsquo;s the real ceiling, and why it costs more
            too.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default ContextWindowSlide
