import { motion } from 'framer-motion'
import { ArrowDown, Brain, Check, ListChecks, Search } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const TICKET = 'Add a priority flag to each task too, same pattern as the due date field.'

const SKILL_STEPS = [
  'Update the task data model',
  'Update the list UI',
  'Add a test',
  'Update the recap doc',
]

function SkillsSlide({ step = 0 }) {
  const showTicket = step >= 1
  const showSearch = step >= 2
  const showFound = step >= 3
  const showPlan = step >= 4
  const showNaming = step >= 5
  const showPunchline = step >= 6

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          This Time, the Plan Step Doesn&rsquo;t Start Blank
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Same agent, same kind of ticket. Watch where its plan comes from.
        </p>
      </div>

      <div className="flex w-[90%] max-w-xl flex-col gap-3">
        {showTicket && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/80"
          >
            <span className="mr-2 rounded bg-presidio-cyan/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-presidio-cyan">
              TICKET
            </span>
            {TICKET}
          </motion.div>
        )}

        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 pl-1 text-xs text-amber-300/80"
          >
            <Search size={13} className={showFound ? '' : 'animate-pulse'} />
            <span>{showFound ? 'Found a match' : 'Checking for a saved skill that fits this ticket...'}</span>
          </motion.div>
        )}

        {showFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 p-3.5"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200">
                <ListChecks size={13} /> add-a-field skill
              </span>
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                used 12 times before
              </span>
            </div>
            <ul className="space-y-1 pl-1 text-xs text-emerald-100/80">
              {SKILL_STEPS.map((s) => (
                <li key={s}>&middot; {s}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {showPlan && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center text-white/30"
            >
              <ArrowDown size={16} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-presidio-cyan/30 bg-presidio-cyan/5 p-3.5"
            >
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-presidio-cyan">
                <Brain size={13} /> Plan
              </div>
              <ul className="space-y-1.5">
                {SKILL_STEPS.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-xs text-white/80">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </div>

      <div className="mt-8 min-h-[4.5rem] max-w-2xl text-center text-sm text-white/60">
        {showNaming && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            A saved, reusable checklist for a kind of task, that an agent can search for and pull
            in, is a{' '}
            <span className="font-heading font-bold text-presidio-cyan">skill</span>.
          </motion.p>
        )}
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
            Last time, the Plan step figured itself out from scratch. Same step in the agent
            loop, just fed by a skill this time instead of improvising.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default SkillsSlide
