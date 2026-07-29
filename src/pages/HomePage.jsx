import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const hours = [
  { label: 'Hour 1', topic: 'Frontend', path: '/hour/1', available: true },
  { label: 'Hour 2', topic: 'Backend', path: '/hour/2', available: true },
  { label: 'Hour 3', topic: 'Deployment', path: '/hour/3', available: true },
  { label: 'Hour 4', topic: 'AI / LLMs', path: '/hour/4', available: true },
  { label: 'Recap', topic: 'Frontend + Backend', path: '/recap', available: true },
]

function HomePage() {
  return (
    <SlideBackground>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex max-w-3xl flex-col items-center text-center"
      >
        <motion.div
          variants={item}
          className="mb-6 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-presidio-cyan backdrop-blur"
        >
          BA Training
        </motion.div>

        <motion.h1
          variants={item}
          className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          How a Web App
          <span className="block text-presidio-cyan">Actually Works</span>
        </motion.h1>

        <motion.p variants={item} className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
          Four hours: the frontend, the backend, and the AI layer of a real
          app, plus how apps like it ship.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {hours.map((h) =>
            h.available ? (
              <a
                key={h.label}
                href={`#${h.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur transition hover:border-presidio-cyan/50 hover:bg-presidio-cyan/10 hover:text-white"
              >
                <span className="font-heading font-bold text-presidio-cyan">{h.label}</span>
                <span>· {h.topic}</span>
                <ExternalLink
                  size={12}
                  className="text-white/30 transition group-hover:text-presidio-cyan"
                />
              </a>
            ) : (
              <span
                key={h.label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/30"
              >
                <span className="font-heading font-bold text-white/30">{h.label}</span>
                <span>· {h.topic}</span>
                <span className="text-[10px] uppercase tracking-wide">Soon</span>
              </span>
            ),
          )}
        </motion.div>

        <motion.div
          variants={item}
          className="my-8 h-px w-24 bg-gradient-to-r from-transparent via-presidio-cyan to-transparent"
        />

        <motion.div variants={item} className="flex flex-col items-center">
          <div className="font-heading text-xl font-bold text-white sm:text-2xl">
            Sathish Kumar Saravanan
          </div>
          <div className="mt-1 text-sm font-medium uppercase tracking-[0.15em] text-presidio-cyan">
            Associate Architect
          </div>
        </motion.div>
      </motion.div>
    </SlideBackground>
  )
}

export default HomePage
