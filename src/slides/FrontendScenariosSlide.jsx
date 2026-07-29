import { motion } from 'framer-motion'
import { AlertTriangle, Clock, FileText, Lightbulb } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const scenarios = [
  {
    icon: Clock,
    label: 'Estimating a “reuse”',
    context: 'Sprint 14 planning, PM to the room',
    quote:
      'The My Projects tab just needs the same task list component. Dev says a day, tops, it already exists.',
    meaning:
      'That estimate only holds if Task List was actually built as a standalone component last sprint. If it is still hardcoded to the Tasks page, this is a rebuild wearing a reuse costume, and it will not surface until dev is two days in. Ask to see the component before the estimate goes into the sprint commitment.',
  },
  {
    icon: FileText,
    label: 'Writing acceptance criteria',
    context: 'Client requirements doc, line 12, signed off, QA sign-off due Friday',
    quote: 'The task list should feel modern and responsive.',
    meaning:
      '“Feels modern” cannot be tested, so QA will invent their own bar and it will not match the client’s. Rewrite it as “checking a task updates the count with no page reload” and “list drops to a single column under 480px”, the actual client-side-rendering and responsive-design requirements hiding behind the adjective.',
  },
  {
    icon: AlertTriangle,
    label: 'P1 triage',
    context: '9:14am, day after go-live, client ops lead in the incident channel',
    quote:
      'Add Task is broken in prod. Pilot team can’t add anything. This is blocking the rollout.',
    meaning:
      'Before this goes in as a P1 blocking the pilot: is the button invisible or misaligned (CSS, a visual fix, low risk) or does the click genuinely do nothing (JS, likely a broken deploy or a swallowed error, real severity)? A 90-second screen share answers it. Escalating the wrong one either buries a real outage or panics a client over a style bug.',
  },
]

function FrontendScenariosSlide({ step = 0 }) {
  return (
    <SlideBackground orbs={false}>
      <div className="mb-10 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Frontend, From a BA&rsquo;s Seat
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Same task list component. Three moments a BA actually lives through.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-3 gap-4">
        {scenarios.map((s, i) => {
          const questionRevealed = step >= i * 2 + 1
          const answerRevealed = step >= i * 2 + 2
          return (
            <div
              key={s.label}
              className={`flex min-h-[22rem] flex-col rounded-xl p-5 text-left transition-colors duration-300 ${
                questionRevealed
                  ? 'border border-white/15 bg-white/5'
                  : 'border-2 border-dashed border-white/15'
              }`}
            >
              {questionRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-1 flex-col"
                >
                  <div className="mb-2 flex items-center gap-2 text-white/50">
                    <s.icon size={16} />
                    <span className="text-xs font-semibold uppercase tracking-wide">{s.label}</span>
                  </div>
                  <div className="mb-2 text-[11px] font-medium text-white/40">{s.context}</div>
                  <p className="text-sm italic text-white/80">&ldquo;{s.quote}&rdquo;</p>
                  {answerRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-auto"
                    >
                      <div className="my-4 h-px w-full bg-white/10" />
                      <div className="flex items-start gap-2">
                        <Lightbulb size={16} className="mt-0.5 shrink-0 text-presidio-cyan" />
                        <p className="text-sm text-white/60">{s.meaning}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </SlideBackground>
  )
}

export default FrontendScenariosSlide
