import { motion } from 'framer-motion'
import { Code2, FlaskConical, Globe } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const panels = [
  {
    icon: Code2,
    name: 'Development',
    accent: 'border-white/15 bg-white/5',
    iconColor: 'text-white/70',
    detail: 'Your own copy, on your own machine. Break it as much as you want, nobody else sees it.',
    tag: 'Only you',
  },
  {
    icon: FlaskConical,
    name: 'Staging',
    accent: 'border-presidio-cyan/40 bg-presidio-cyan/5',
    iconColor: 'text-presidio-cyan',
    detail: 'A rehearsal copy that looks and behaves like the real thing. The last stop before real users see it.',
    tag: 'A dress rehearsal',
  },
  {
    icon: Globe,
    name: 'Production',
    accent: 'border-presidio-orange/40 bg-presidio-orange/5',
    iconColor: 'text-presidio-orange',
    detail: 'The real thing. Real users, real data. What breaks here actually breaks for someone.',
    tag: 'Everyone',
  },
]

function EnvironmentsSlide({ step = 0 }) {
  const showPunchline = step >= panels.length

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          The Same App, Three Different Rooms
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Before code reaches real users, it usually passes through three separate copies.
        </p>
      </div>

      <div className="grid w-[90%] max-w-5xl grid-cols-3 gap-4">
        {panels.map((p, i) => {
          const revealed = step >= i + 1
          return (
            <div
              key={p.name}
              className={`flex min-h-[18rem] flex-col items-center justify-center rounded-xl p-6 text-center transition-colors duration-300 ${
                revealed ? `border ${p.accent}` : 'border-2 border-dashed border-white/15'
              }`}
            >
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center"
                >
                  <p.icon className={`h-9 w-9 ${p.iconColor}`} strokeWidth={1.75} />
                  <div className="mt-3 font-heading text-lg font-extrabold text-white">{p.name}</div>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-white/40">
                    {p.tag}
                  </span>
                  <p className="mt-3 text-sm text-white/70">{p.detail}</p>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 min-h-[3rem] max-w-2xl text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            A ticket that says &ldquo;verify in staging first&rdquo; means exactly this: check it
            on the rehearsal copy before it ever reaches{' '}
            <span className="font-heading font-bold text-presidio-orange">production</span>.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default EnvironmentsSlide
