import { motion } from 'framer-motion'
import SlideBackground from '../components/SlideBackground'
import { NodeIcon, PythonIcon, SpringIcon } from '../components/BackendFrameworkIcons'

const frameworks = [
  {
    name: 'Node.js + Express',
    maker: 'JavaScript on the server',
    blurb: 'The same language as the frontend, now running behind the scenes.',
    Icon: NodeIcon,
    color: 'text-emerald-400',
    border: 'border-emerald-400/50',
    bg: 'bg-emerald-400/10',
  },
  {
    name: 'Python + Django',
    maker: 'Built for speed of setup',
    blurb: 'Routing, database access, and security patterns come built in.',
    Icon: PythonIcon,
    color: 'text-sky-400',
    border: 'border-sky-400/50',
    bg: 'bg-sky-400/10',
  },
  {
    name: 'Java + Spring',
    maker: 'Built for large systems',
    blurb: 'Common in banks and enterprises, where scale matters most.',
    Icon: SpringIcon,
    color: 'text-lime-400',
    border: 'border-lime-400/50',
    bg: 'bg-lime-400/10',
  },
]

function BackendFrameworksSlide({ step = 0 }) {
  const showPunchline = step >= 3

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          The Server Side Has Frameworks Too
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Same reason as the frontend: reusable pieces, instead of rewriting them.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-3 gap-4">
        {frameworks.map((fw, i) => {
          const revealed = step >= i + 1
          return (
            <div
              key={fw.name}
              className={`flex min-h-[16rem] flex-col items-center justify-center rounded-xl p-6 text-center transition-colors duration-300 ${
                revealed ? `border ${fw.border} ${fw.bg}` : 'border-2 border-dashed border-white/15'
              }`}
            >
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center"
                >
                  <fw.Icon className={`h-9 w-9 ${fw.color}`} />
                  <div className="mt-3 font-heading text-xl font-extrabold text-white">{fw.name}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/40">
                    {fw.maker}
                  </div>
                  <p className="mt-4 text-sm text-white/70">{fw.blurb}</p>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 h-6 text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Whichever one a project uses, it is called a{' '}
            <span className="font-heading font-bold text-presidio-cyan">backend framework</span>,
            handling routing, database access, and security so nobody rebuilds them from scratch.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default BackendFrameworksSlide
