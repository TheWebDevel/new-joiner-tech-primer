import { motion } from 'framer-motion'
import {
  Rocket,
  FlaskConical,
  GitBranch,
  Cloud,
  Server,
  Shuffle,
  TrendingUp,
  Globe,
  Zap,
  Copy,
  DatabaseBackup,
  ShieldCheck,
} from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const terms = [
  { icon: Rocket, term: 'Deployment', detail: 'Getting code from a laptop onto a server the internet can reach.' },
  { icon: FlaskConical, term: 'Staging', detail: 'A rehearsal copy, the last stop before production.' },
  { icon: GitBranch, term: 'CI/CD pipeline', detail: 'Build, test, and deploy, running automatically on every push.' },
  { icon: Cloud, term: 'Cloud hosting', detail: 'Renting capacity from a provider instead of owning the machines.' },
  { icon: Server, term: 'Instance', detail: 'One running copy of the backend.' },
  { icon: Shuffle, term: 'Load balancer', detail: 'Spreads traffic across instances, and routes around a failed one.' },
  { icon: TrendingUp, term: 'Horizontal scaling', detail: 'Handling more traffic by adding more instances.' },
  { icon: Globe, term: 'CDN', detail: 'Cached copies of content, spread across many locations near users.' },
  { icon: Zap, term: 'Serverless', detail: 'Runs only on request, then scales back down to nothing.' },
  { icon: Copy, term: 'Redundancy', detail: 'More than one of a thing, so a single failure doesn’t take everything down.' },
  { icon: DatabaseBackup, term: 'Backup', detail: 'A copy of data you can restore when the live copy is damaged or gone.' },
  { icon: ShieldCheck, term: 'Disaster recovery (DR)', detail: 'A standby copy of the whole system in another region.' },
]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

function Hour3RecapSlide() {
  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Twelve Words for How This Actually Ships
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Everything from this hour, in one place.
        </p>
      </div>

      <motion.div
        variants={grid}
        initial="hidden"
        animate="show"
        className="grid w-[90%] max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
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
        Let&rsquo;s see what stuck.
      </motion.p>
    </SlideBackground>
  )
}

export default Hour3RecapSlide
