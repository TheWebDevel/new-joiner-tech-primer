import { motion } from 'framer-motion'
import { ServerCrash, DatabaseBackup, Building2 } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const cards = [
  {
    icon: ServerCrash,
    question: 'What if one instance dies?',
    answer: 'Something else needs to notice, and take over, before anyone feels it.',
  },
  {
    icon: DatabaseBackup,
    question: 'What if the database loses data?',
    answer: 'There needs to be another copy somewhere to go back to.',
  },
  {
    icon: Building2,
    question: 'What if the entire data center goes down?',
    answer: 'Everything running there needs somewhere else to go.',
  },
]

function DrRedundancySlide({ step = 0 }) {
  return (
    <SlideBackground orbs={false}>
      <div className="mb-10 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Three Questions Nobody Asks Until It Happens
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Everything so far assumed nothing ever breaks. Now assume it does, and see what has to
          be true so it still works.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-3 gap-4">
        {cards.map((c, i) => {
          const revealed = step >= i + 1
          return (
            <div
              key={c.question}
              className={`flex min-h-[19rem] flex-col items-center justify-center rounded-xl p-6 text-center transition-colors duration-300 ${
                revealed ? 'border border-white/15 bg-white/5' : 'border-2 border-dashed border-white/15'
              }`}
            >
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center"
                >
                  <c.icon className="h-9 w-9 text-presidio-cyan" strokeWidth={1.75} />
                  <div className="mt-4 font-heading text-base font-bold text-white">
                    {c.question}
                  </div>
                  <p className="mt-3 text-sm text-white/70">{c.answer}</p>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </SlideBackground>
  )
}

export default DrRedundancySlide
