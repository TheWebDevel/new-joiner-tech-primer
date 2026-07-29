import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe2, TrendingUp, PowerOff, CheckCircle2, XCircle } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const scenarios = [
  {
    icon: Globe2,
    label: 'Slow, but only for some',
    context: 'Support escalation, 6:15pm',
    quote: 'Users in Australia say the site is slow. It is fast for all of us here in the US.',
    prompt: 'What’s your first question back to engineering?',
    options: [
      { text: 'Restart the servers', correct: false },
      { text: 'Whether a CDN is caching content near them', correct: true },
    ],
    explain:
      'If there is no CDN, every Australian user is fetching everything from a server on the other side of the planet. That distance is the slowness, not a broken server.',
  },
  {
    icon: TrendingUp,
    label: 'Launch day traffic',
    context: 'Product launch, checkout down',
    quote: 'Traffic spiked the moment we went live, and checkout stopped responding.',
    prompt: 'What’s your first question back to engineering?',
    options: [
      { text: 'Buying one much bigger server', correct: false },
      { text: 'Whether a load balancer can spread this across more instances', correct: true },
    ],
    explain:
      'One bigger instance still has a ceiling, and it is still a single point of failure. Spreading the same spike across several instances, with a load balancer to route around a struggling one, is what actually scales.',
  },
  {
    icon: PowerOff,
    label: 'The data center went dark',
    context: 'Postmortem, three hours of downtime',
    quote: 'The primary data center lost power. We were fully offline until it came back.',
    prompt: 'What’s the question you raise in the retro?',
    options: [
      { text: 'How long until power comes back next time', correct: false },
      { text: 'Whether a DR failover plan exists for exactly this', correct: true },
    ],
    explain:
      'Waiting for one region to recover is not a plan, it is hoping. A disaster recovery setup means a standby copy in another region can take over, instead of everyone waiting.',
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

function DeploymentScenariosSlide({ step = 0 }) {
  return (
    <SlideBackground orbs={false}>
      <div className="mb-10 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Deployment, From a BA&rsquo;s Seat
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Same architecture game, three moments a BA actually lives through. Pick a move each
          time.
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

export default DeploymentScenariosSlide
