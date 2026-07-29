import { motion } from 'framer-motion'
import { Inbox, Signpost, Cog, Database, Send } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const flowSteps = [
  {
    icon: Inbox,
    title: 'The request arrives',
    caption: 'The server picks up what the browser sent.',
  },
  {
    icon: Signpost,
    title: 'It matches the route',
    caption: 'The server works out which piece of code should handle it.',
  },
  {
    icon: Cog,
    title: 'The rules get applied',
    caption: 'Is this allowed? Does the math check out? That logic runs now.',
  },
  {
    icon: Database,
    title: 'The database is checked',
    caption: 'Data gets read, or written, depending on what was asked.',
  },
  {
    icon: Send,
    title: 'An answer goes back',
    caption: 'The server sends a response, and the browser takes it from there.',
  },
]

const header = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const headerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function ServerFlowSlide({ step = 0 }) {
  const revealed = Math.min(step, flowSteps.length)
  const allRevealed = revealed === flowSteps.length

  return (
    <SlideBackground orbs={false}>
      <motion.div
        variants={header}
        initial="hidden"
        animate="show"
        className="mb-14 flex max-w-2xl flex-col items-center text-center"
      >
        <motion.h2
          variants={headerItem}
          className="font-heading text-3xl font-extrabold text-white sm:text-4xl"
        >
          What Happens Once the Request Lands
        </motion.h2>
        <motion.p variants={headerItem} className="mt-4 text-base text-white/70 sm:text-lg">
          Hour 1 ended at the server&rsquo;s door. Here&rsquo;s what happens behind it.
        </motion.p>
      </motion.div>

      <div className="relative w-full max-w-6xl px-6">
        <div className="absolute left-[10%] right-[10%] top-10 h-0.5 -translate-y-1/2 bg-white/10" />

        <motion.div
          className="absolute left-[10%] top-10 h-0.5 -translate-y-1/2 bg-gradient-to-r from-presidio-cyan to-presidio-blue"
          animate={{ width: `${(revealed / flowSteps.length) * 80}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {allRevealed && (
          <motion.div
            className="absolute top-10 h-3 w-3 -translate-y-1/2 rounded-full bg-presidio-cyan shadow-[0_0_14px_4px_rgba(0,172,240,0.65)]"
            initial={{ left: '10%', opacity: 0 }}
            animate={{ left: ['10%', '90%'], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.8,
              delay: 0.4,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: 'easeInOut',
            }}
          />
        )}

        <div className="grid grid-cols-5 gap-4">
          {flowSteps.map((flowStep, i) => (
            <motion.div
              key={flowStep.title}
              className="flex flex-col items-center text-center"
              initial={false}
              animate={{ opacity: i < revealed ? 1 : 0, y: i < revealed ? 0 : 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur">
                <flowStep.icon className="h-8 w-8 text-presidio-cyan" strokeWidth={1.75} />
              </div>
              <div className="mt-4 font-heading text-sm font-bold text-white sm:text-base">
                {flowStep.title}
              </div>
              <div className="mt-1.5 text-xs leading-snug text-white/60 sm:text-sm">
                {flowStep.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 min-h-[3rem] max-w-2xl text-center text-sm text-white/60">
        {allRevealed && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            The machine doing all five of these steps is the{' '}
            <span className="font-heading font-bold text-presidio-cyan">server</span>. The step
            where the rules get checked, is this allowed, does the math check out, is called{' '}
            <span className="font-heading font-bold text-presidio-cyan">business logic</span>.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default ServerFlowSlide
