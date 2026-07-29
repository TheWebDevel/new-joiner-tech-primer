import { motion } from 'framer-motion'
import { FileSearch, MessagesSquare, ScrollText, Settings2 } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const LAYERS = [
  {
    icon: Settings2,
    title: 'System instructions',
    caption: 'The standing rules: tone, role, what it should never do. Set once, present every turn.',
    width: 15,
    color: 'bg-violet-400/70',
  },
  {
    icon: MessagesSquare,
    title: 'Conversation history',
    caption: 'Everything said so far, up to whatever the context window still holds.',
    width: 35,
    color: 'bg-presidio-cyan/70',
  },
  {
    icon: FileSearch,
    title: 'Retrieved context',
    caption: 'Whatever RAG pulled in for this question, like the policy doc from last slide.',
    width: 30,
    color: 'bg-emerald-400/70',
  },
  {
    icon: ScrollText,
    title: 'Your current prompt',
    caption: 'The actual question or instruction, typed just now.',
    width: 10,
    color: 'bg-presidio-orange/70',
  },
]

function ContextManagementSlide({ step = 0 }) {
  const revealed = Math.min(step, LAYERS.length)
  const showBudget = step >= LAYERS.length + 1
  const showPunchline = step >= LAYERS.length + 2
  const filled = LAYERS.slice(0, revealed).reduce((sum, l) => sum + l.width, 0)

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          What&rsquo;s Actually in There
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          That open book from last slide is only one of four things filling the context window
          right now.
        </p>
      </div>

      <div className="flex w-[90%] max-w-2xl flex-col gap-2.5">
        {LAYERS.map((layer, i) => (
          <motion.div
            key={layer.title}
            initial={false}
            animate={{ opacity: i < revealed ? 1 : 0.15, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 text-presidio-cyan">
              <layer.icon size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-heading text-sm font-bold text-white">{layer.title}</div>
              <div className="mt-0.5 text-xs leading-snug text-white/60">{layer.caption}</div>
            </div>
          </motion.div>
        ))}

        <div className="mt-2">
          <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-wide text-white/40">
            <span>Context window</span>
            <span>{filled}% filled</span>
          </div>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
            {LAYERS.slice(0, revealed).map((layer) => (
              <motion.div
                key={layer.title}
                initial={{ width: 0 }}
                animate={{ width: `${layer.width}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={layer.color}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 min-h-[4.5rem] max-w-2xl text-center text-sm text-white/60">
        {showBudget && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Deciding what goes in, and what gets trimmed or summarized to make room, is{' '}
            <span className="font-heading font-bold text-presidio-cyan">context management</span>.
          </motion.p>
        )}
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
            More filled isn&rsquo;t automatically better. A window stuffed with old history slows
            the model down, and distracts it from what matters.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default ContextManagementSlide
