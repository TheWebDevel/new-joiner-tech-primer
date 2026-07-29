import { motion } from 'framer-motion'
import { Bot, Send } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const QUESTION = 'What does "idempotent" mean in this API ticket?'
const ANSWER =
  'It means calling it once or five times leaves the same result, nothing extra happens the second time.'
const ANSWER_WORDS = ANSWER.split(' ')

const header = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const headerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/50"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function LlmIntroSlide({ step = 0 }) {
  const showQuestion = step >= 1
  const showTyping = step === 2
  const showAnswer = step >= 3
  const showNaming = step >= 4

  return (
    <SlideBackground orbs={false}>
      <motion.div
        variants={header}
        initial="hidden"
        animate="show"
        className="mb-8 flex max-w-2xl flex-col items-center text-center"
      >
        <motion.h2
          variants={headerItem}
          className="font-heading text-3xl font-extrabold text-white sm:text-4xl"
        >
          This Is What Talking to AI Looks Like
        </motion.h2>
        <motion.p variants={headerItem} className="mt-4 text-base text-white/70 sm:text-lg">
          A chat window, same as any other. Watch what happens when someone types into it.
        </motion.p>
      </motion.div>

      <div className="flex w-[90%] max-w-xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-presidio-cyan/15">
            <Bot size={14} className="text-presidio-cyan" />
          </div>
          <span className="text-sm font-semibold text-white">AI Assistant</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Online
          </span>
        </div>

        <div className="min-h-[10rem] space-y-3 p-4">
          {showQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-presidio-blue/30 px-3.5 py-2 text-sm text-white">
                {QUESTION}
              </div>
            </motion.div>
          )}

          {showTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <TypingDots />
            </motion.div>
          )}

          {showAnswer && (
            <div className="flex justify-start">
              <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2 text-sm leading-relaxed text-white/90">
                {ANSWER_WORDS.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.045, duration: 0.15 }}
                    className="mr-1 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
          <div className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/30">
            Type a question...
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/40">
            <Send size={15} />
          </div>
        </div>
      </div>

      <div className="mt-6 min-h-[4.5rem] max-w-2xl text-center text-sm text-white/60">
        {showNaming && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            What you typed is called a{' '}
            <span className="font-heading font-bold text-presidio-cyan">prompt</span>. What
            answered it is an{' '}
            <span className="font-heading font-bold text-presidio-cyan">LLM</span>, a large
            language model. It predicted a good next word, over and over, closed-book. Nothing
            was looked up.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default LlmIntroSlide
