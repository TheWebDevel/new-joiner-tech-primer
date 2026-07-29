import { motion } from 'framer-motion'
import { Keyboard, Send, Server, LayoutTemplate } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const flowSteps = [
  {
    icon: Keyboard,
    title: 'You type a URL',
    caption: 'You enter an address in the browser bar and hit enter.',
  },
  {
    icon: Send,
    title: 'A request goes out',
    caption: 'The browser reaches out over the internet to ask for that page.',
  },
  {
    icon: Server,
    title: 'A server replies',
    caption: 'A computer somewhere finds the page and sends an answer back.',
  },
  {
    icon: LayoutTemplate,
    title: 'The browser draws the page',
    caption: 'The answer gets turned into the page you actually see.',
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

function PageLoadSlide({ step = 0 }) {
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
          What Happens When You Open a Website
        </motion.h2>
        <motion.p variants={headerItem} className="mt-4 text-base text-white/70 sm:text-lg">
          No jargon yet, just the flow.
        </motion.p>
      </motion.div>

      <div className="relative w-full max-w-5xl px-6">
        <div className="absolute left-[12.5%] right-[12.5%] top-10 h-0.5 -translate-y-1/2 bg-white/10" />

        <motion.div
          className="absolute left-[12.5%] top-10 h-0.5 -translate-y-1/2 bg-gradient-to-r from-presidio-cyan to-presidio-blue"
          animate={{ width: `${(revealed / flowSteps.length) * 75}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {allRevealed && (
          <motion.div
            className="absolute top-10 h-3 w-3 -translate-y-1/2 rounded-full bg-presidio-cyan shadow-[0_0_14px_4px_rgba(0,172,240,0.65)]"
            initial={{ left: '12.5%', opacity: 0 }}
            animate={{ left: ['12.5%', '87.5%'], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.6,
              delay: 0.4,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: 'easeInOut',
            }}
          />
        )}

        <div className="grid grid-cols-4 gap-4">
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
    </SlideBackground>
  )
}

export default PageLoadSlide
