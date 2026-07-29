import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Bot,
  Code2,
  FileSearch,
  Hash,
  Layers,
  ListChecks,
  MessageSquare,
  RefreshCw,
  Repeat,
  Settings2,
  Sparkles,
} from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const terms = [
  { icon: Bot, term: 'LLM', detail: 'Trained on huge amounts of text to predict a good next word, over and over.' },
  { icon: MessageSquare, term: 'Prompt', detail: 'What you type in, the question or instruction.' },
  { icon: Hash, term: 'Token', detail: 'The chunk of text a model actually reads and writes, not a whole word.' },
  { icon: Layers, term: 'Context window', detail: 'Everything currently visible to the model. Once it scrolls out, it’s gone.' },
  { icon: AlertTriangle, term: 'Hallucination', detail: 'A confident, fluent, wrong answer.' },
  { icon: Sparkles, term: 'Embedding', detail: 'Text converted into numbers that capture its meaning.' },
  { icon: FileSearch, term: 'RAG', detail: 'Search first, then answer using what it found.' },
  { icon: Code2, term: 'Coding agent', detail: 'Reads files, edits them, and runs commands on its own to get a task done.' },
  { icon: Repeat, term: 'Agent loop', detail: 'Plan, use a tool, observe, decide the next step, repeat until done.' },
  { icon: ListChecks, term: 'Skill', detail: 'A saved, reusable checklist for a specific kind of task, instead of improvising one.' },
  { icon: RefreshCw, term: 'Session', detail: 'Everything an agent remembers, until you start over.' },
  { icon: Settings2, term: 'Context management', detail: 'Deciding what’s worth keeping in the window, and what to drop.' },
]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

function Hour4RecapSlide() {
  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Twelve Words for the AI Layer
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Everything from this hour, in one place.
        </p>
      </div>

      <motion.div
        variants={grid}
        initial="hidden"
        animate="show"
        className="grid w-[90%] max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {terms.map((t) => (
          <motion.div
            key={t.term}
            variants={card}
            className="flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-left"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 text-presidio-cyan">
              <t.icon size={16} />
            </div>
            <div className="font-heading text-sm font-bold text-white">{t.term}</div>
            <div className="text-xs leading-snug text-white/60">{t.detail}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="mt-8 max-w-2xl text-center text-base text-white/70"
      >
        Let&rsquo;s see what stuck.
      </motion.p>
    </SlideBackground>
  )
}

export default Hour4RecapSlide
