import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Globe,
  Shuffle,
  Server,
  Database,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const INITIAL_OFF = {
  cdn: false,
  lb: false,
  instanceA: false,
  instanceB: false,
  primaryDb: false,
  replicaDb: false,
  dr: false,
}

function computeConsequences(off) {
  const messages = []
  const bothInstancesOff = off.instanceA && off.instanceB
  const oneInstanceOff = off.instanceA !== off.instanceB

  if (off.cdn) {
    messages.push({
      sev: 2,
      text: 'CDN off: content now travels all the way to the origin server. Slower for far-away users, but not broken.',
    })
  }

  if (off.lb) {
    messages.push({
      sev: 3,
      text: 'Load balancer off: nothing left to spread traffic or route around a failed instance. A single point of failure.',
    })
  } else if (bothInstancesOff) {
    messages.push({
      sev: 3,
      text: 'Both instances off: nothing left to run the app. Every request fails.',
    })
  } else if (oneInstanceOff) {
    messages.push({
      sev: 0,
      text: 'One instance off, but the load balancer already rerouted traffic to the other. Users notice nothing, this is redundancy working.',
    })
  }

  if (off.primaryDb) {
    if (!off.replicaDb) {
      messages.push({
        sev: 2,
        text: 'Primary DB off: the replica gets promoted and takes over after a brief gap.',
      })
    } else {
      messages.push({
        sev: 3,
        text: 'Primary and replica DB both off: nowhere left for reads or writes to go. The app is down.',
      })
    }
  } else if (off.replicaDb) {
    messages.push({
      sev: 1,
      text: 'Replica DB off: nothing changes now, but the safety net for a primary failure is gone.',
    })
  }

  if (off.dr) {
    messages.push({
      sev: 1,
      text: 'DR region off: fine while this region is up, but there is nowhere to fail over to if it goes down entirely.',
    })
  }

  return messages
}

const STATUS_META = {
  '-1': { label: 'All systems normal', className: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300', Icon: CheckCircle2 },
  0: { label: 'Healthy', className: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300', Icon: CheckCircle2 },
  1: { label: 'Exposed', className: 'border-amber-400/50 bg-amber-400/10 text-amber-300', Icon: Info },
  2: { label: 'Degraded', className: 'border-presidio-orange/50 bg-presidio-orange/10 text-presidio-orange', Icon: AlertTriangle },
  3: { label: 'Down', className: 'border-rose-400/50 bg-rose-400/10 text-rose-300', Icon: XCircle },
}

function NodeCard({ icon: Icon, label, on, onToggle, disabled, compact }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`flex w-32 shrink-0 flex-col items-center gap-1.5 rounded-lg border px-3 text-center transition-all duration-300 sm:w-36 ${
        compact ? 'py-2.5' : 'py-4'
      } ${
        on ? 'border-presidio-cyan/50 bg-presidio-cyan/10' : 'border-white/10 bg-white/5 opacity-60'
      } ${disabled ? 'cursor-default' : 'cursor-pointer hover:opacity-100'}`}
    >
      <Icon className={`${compact ? 'h-5 w-5' : 'h-6 w-6'} ${on ? 'text-presidio-cyan' : 'text-white/30'}`} strokeWidth={1.75} />
      <span className="font-heading text-xs font-bold leading-tight text-white">{label}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
          on ? 'bg-emerald-400/20 text-emerald-300' : 'bg-rose-400/20 text-rose-300'
        }`}
      >
        {on ? 'On' : 'Off'}
      </span>
    </button>
  )
}

const Arrow = () => <ArrowRight className="h-5 w-5 shrink-0 text-white/20" />

function ArchitectureGameSlide({ step = 0 }) {
  const [off, setOff] = useState(INITIAL_OFF)
  const interactive = step >= 4

  const showEdge = step >= 1
  const showInstances = step >= 2
  const showDb = step >= 3
  const showDr = step >= 4

  const toggle = (key) => {
    if (!interactive) return
    setOff((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const messages = useMemo(() => computeConsequences(off), [off])
  const anyOff = Object.values(off).some(Boolean)
  const severity = anyOff ? Math.max(...messages.map((m) => m.sev), -1) : -1
  const status = STATUS_META[severity] ?? STATUS_META['-1']

  return (
    <SlideBackground orbs={false}>
      <div className="mb-3 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
          Turn Pieces Off, See What Breaks
        </h2>
        <p className="mt-2 text-sm text-white/70 sm:text-base">
          {interactive
            ? 'Click any piece of the system below to switch it off. Click again to bring it back.'
            : 'This is everything from the last several slides, assembled into one system.'}
        </p>
      </div>

      <div className="flex w-[95%] max-w-6xl flex-wrap items-center justify-center gap-3">
        <div className="flex shrink-0 flex-col items-center gap-1 text-white/50">
          <Users className="h-7 w-7" strokeWidth={1.75} />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Users</span>
        </div>

        {showEdge && (
          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Arrow />
            <NodeCard icon={Globe} label="CDN" on={!off.cdn} onToggle={() => toggle('cdn')} disabled={!interactive} />
            <Arrow />
            <NodeCard icon={Shuffle} label="Load Balancer" on={!off.lb} onToggle={() => toggle('lb')} disabled={!interactive} />
          </motion.div>
        )}

        {showInstances && (
          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Arrow />
            <div className="flex flex-col gap-2">
              <NodeCard icon={Server} label="Instance A" on={!off.instanceA} onToggle={() => toggle('instanceA')} disabled={!interactive} compact />
              <NodeCard icon={Server} label="Instance B" on={!off.instanceB} onToggle={() => toggle('instanceB')} disabled={!interactive} compact />
            </div>
          </motion.div>
        )}

        {showDb && (
          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Arrow />
            <div className="flex flex-col gap-2">
              <NodeCard icon={Database} label="Primary DB" on={!off.primaryDb} onToggle={() => toggle('primaryDb')} disabled={!interactive} compact />
              <NodeCard icon={Database} label="Replica DB" on={!off.replicaDb} onToggle={() => toggle('replicaDb')} disabled={!interactive} compact />
            </div>
          </motion.div>
        )}

        {showDr && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-3 flex items-center gap-3 border-l border-dashed border-white/15 pl-4"
          >
            <NodeCard icon={ShieldCheck} label="DR Region" on={!off.dr} onToggle={() => toggle('dr')} disabled={!interactive} />
            <p className="max-w-[8rem] text-left text-[11px] leading-snug text-white/40">
              Standby copy of everything, in another region.
            </p>
          </motion.div>
        )}
      </div>

      {interactive && (
        <div className="mt-4 flex w-[92%] max-w-2xl flex-col items-center gap-2">
          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${status.className}`}
          >
            <status.Icon size={13} /> {status.label}
          </div>

          <div className="flex min-h-[2rem] w-full flex-col items-center gap-1 text-center text-xs text-white/70 sm:text-sm">
            {messages.length === 0 ? (
              <span className="text-white/40">Everything is on. Try switching something off.</span>
            ) : (
              messages.map((m, i) => <p key={i}>{m.text}</p>)
            )}
          </div>

          {anyOff && (
            <button
              type="button"
              onClick={() => setOff(INITIAL_OFF)}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur transition hover:bg-white/10"
            >
              <RotateCcw size={12} /> Reset all
            </button>
          )}
        </div>
      )}
    </SlideBackground>
  )
}

export default ArchitectureGameSlide
