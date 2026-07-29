import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, FileWarning, ListTodo, ShieldQuestion, XCircle } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const scenarios = [
  {
    icon: ShieldQuestion,
    label: 'It said Done',
    context: 'Reviewing a coding agent’s pull request',
    quote: 'The agent says the due-date feature is complete and ready to merge.',
    prompt: 'What do you do before approving it?',
    options: [
      { text: 'Merge it, the agent said it’s done', correct: false },
      { text: 'Check the actual diff and test output yourself', correct: true },
    ],
    explain:
      '"Done" is the agent’s own assessment, not proof. Same review habits as a person’s pull request: read the change, check the tests actually ran.',
  },
  {
    icon: ListTodo,
    label: 'One giant ask',
    context: 'Mid-session, ticket keeps growing',
    quote:
      'While it’s already working on due dates, you add: "also add email reminders, and a filter view."',
    prompt: 'What’s the better move?',
    options: [
      { text: 'Let it keep going in the same session', correct: false },
      { text: 'Split it into subtasks, a fresh session for each', correct: true },
    ],
    explain:
      'Every extra ask stacks onto a context window already filling with detours. Smaller, separate sessions stay focused, and are easier to review.',
  },
  {
    icon: FileWarning,
    label: 'A confident mismatch',
    context: 'Answering a policy question',
    quote: 'It answers your refund-policy question fast and sounds completely sure.',
    prompt: 'How do you treat that answer?',
    options: [
      { text: 'Trust it, it sounded sure', correct: false },
      { text: 'Check it against the actual policy doc it should have retrieved', correct: true },
    ],
    explain:
      'Confidence isn’t accuracy, it never was. If it can’t point to a source, check it before it reaches a customer.',
  },
]

function ScenarioCard({ scenario, revealed }) {
  const [chosen, setChosen] = useState(null)
  const answered = chosen !== null

  return (
    <div
      className={`flex min-h-[24rem] flex-col rounded-xl p-5 text-left transition-colors duration-300 ${
        revealed ? 'border border-white/15 bg-white/5' : 'border-2 border-dashed border-white/15'
      }`}
    >
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-1 flex-col"
        >
          <div className="mb-2 flex items-center gap-2 text-white/50">
            <scenario.icon size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">{scenario.label}</span>
          </div>
          <div className="mb-2 text-[11px] font-medium text-white/40">{scenario.context}</div>
          <p className="text-sm italic text-white/80">&ldquo;{scenario.quote}&rdquo;</p>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/40">
            {scenario.prompt}
          </p>

          <div className="mt-2.5 flex flex-col gap-2">
            {scenario.options.map((opt, i) => {
              const isChosen = chosen === i
              let stateClasses = 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10'
              if (answered && opt.correct) {
                stateClasses = 'border-emerald-400/60 bg-emerald-400/10 text-emerald-200'
              } else if (answered && isChosen && !opt.correct) {
                stateClasses = 'border-red-400/60 bg-red-400/10 text-red-200'
              }
              return (
                <button
                  key={opt.text}
                  type="button"
                  onClick={() => setChosen(i)}
                  disabled={answered}
                  className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors duration-200 ${stateClasses}`}
                >
                  <span>{opt.text}</span>
                  {answered && opt.correct && (
                    <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
                  )}
                  {answered && isChosen && !opt.correct && (
                    <XCircle size={15} className="shrink-0 text-red-400" />
                  )}
                </button>
              )
            })}
          </div>

          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-auto pt-4"
            >
              <div className="mb-3 h-px w-full bg-white/10" />
              <p className="text-sm text-white/60">{scenario.explain}</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

function AgentScenariosSlide({ step = 0 }) {
  return (
    <SlideBackground orbs={false}>
      <div className="mb-10 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Working With an Agent, From a BA&rsquo;s Seat
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Three moments a BA might actually run into. Pick a move each time.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-3 gap-4">
        {scenarios.map((s, i) => (
          <ScenarioCard key={s.label} scenario={s} revealed={step >= i + 1} />
        ))}
      </div>
    </SlideBackground>
  )
}

export default AgentScenariosSlide
