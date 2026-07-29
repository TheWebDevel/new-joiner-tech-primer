import { motion } from 'framer-motion'
import {
  Send,
  LayoutGrid,
  Palette,
  Zap,
  Sparkles,
  Puzzle,
  RefreshCw,
  Server,
  Smartphone,
  ShieldCheck,
} from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const terms = [
  { icon: Send, term: 'Request / Response', detail: 'Asking a server for a page, and the answer that comes back.' },
  { icon: LayoutGrid, term: 'HTML', detail: 'The structure of a page. The skeleton.' },
  { icon: Palette, term: 'CSS', detail: 'The styling. Color, spacing, fonts.' },
  { icon: Zap, term: 'JavaScript', detail: 'The behavior. What happens when you click.' },
  { icon: Sparkles, term: 'Framework', detail: 'A toolkit for building reusable pieces instead of rewriting them.' },
  { icon: Puzzle, term: 'Component', detail: 'A reusable piece, built once and used everywhere.' },
  { icon: RefreshCw, term: 'Client-side rendering', detail: 'The browser updates itself, no full reload.' },
  { icon: Server, term: 'Server-side rendering', detail: 'The server rebuilds and resends the whole page.' },
  { icon: Smartphone, term: 'Responsive design', detail: 'The same page, adapting to whatever screen it is on.' },
  { icon: ShieldCheck, term: 'Form validation', detail: 'Catching bad input before it causes a problem further down the line.' },
]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

function Hour1RecapSlide() {
  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Ten Words You Now Know
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Everything from this hour, in one place.
        </p>
      </div>

      <motion.div
        variants={grid}
        initial="hidden"
        animate="show"
        className="grid w-[90%] max-w-6xl grid-cols-2 gap-3 sm:grid-cols-5"
      >
        {terms.map((t) => (
          <motion.div
            key={t.term}
            variants={card}
            className="flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-left"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 text-presidio-cyan">
              <t.icon size={16} />
            </div>
            <div className="font-heading text-sm font-bold text-white">{t.term}</div>
            <div className="text-xs leading-snug text-white/60">{t.detail}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="mt-8 max-w-2xl text-center text-base text-white/70"
      >
        Next up, Hour 2: what happens on the server side of that request, once it leaves the
        browser.
      </motion.p>
    </SlideBackground>
  )
}

export default Hour1RecapSlide
