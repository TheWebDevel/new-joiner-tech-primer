import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, RotateCcw } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'
import Confetti from '../components/Confetti'

const WRONG_FLASH_MS = 600

const PAIRS = [
  { id: 'cicd', term: 'CI/CD pipeline', ticket: 'It builds, tests, and deploys itself on every push.' },
  { id: 'cdn', term: 'CDN', ticket: 'Cache this near our users overseas so it loads faster.' },
  { id: 'lb', term: 'Load balancer', ticket: 'Traffic got rerouted away from the instance that was struggling.' },
  { id: 'serverless', term: 'Serverless', ticket: 'This only runs when called, then shuts back down to nothing.' },
  { id: 'dr', term: 'Disaster recovery (DR)', ticket: 'If this whole region goes down, failover to another one.' },
]

const TERM_ORDER = ['dr', 'serverless', 'cicd', 'lb', 'cdn']
const TERMS = TERM_ORDER.map((id) => PAIRS.find((p) => p.id === id))

function Hour3MatchGameSlide() {
  const [selected, setSelected] = useState(null)
  const [matched, setMatched] = useState(() => new Set())
  const [wrong, setWrong] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const allMatched = matched.size === PAIRS.length

  const pickTicket = (id) => {
    if (matched.has(id) || wrong) return
    setSelected((prev) => (prev === id ? null : id))
  }

  const pickTerm = (id) => {
    if (matched.has(id) || !selected || wrong) return

    if (selected === id) {
      setMatched((prev) => new Set(prev).add(id))
      setSelected(null)
      return
    }

    setMistakes((m) => m + 1)
    setWrong({ ticketId: selected, termId: id })
    timeoutRef.current = setTimeout(() => {
      setWrong(null)
      setSelected(null)
    }, WRONG_FLASH_MS)
  }

  const reset = () => {
    clearTimeout(timeoutRef.current)
    setSelected(null)
    setMatched(new Set())
    setWrong(null)
    setMistakes(0)
  }

  return (
    <SlideBackground orbs={false}>
      {allMatched && <Confetti />}
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Match the Following
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Click a ticket, then click the term that matches it.
        </p>
        <div className="mt-3 flex items-center gap-4 font-heading text-sm font-bold text-presidio-cyan">
          <span>
            {matched.size} / {PAIRS.length} matched
          </span>
          {mistakes > 0 && (
            <span className="font-heading text-xs font-semibold text-white/40">
              {mistakes} slip{mistakes > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      <div className="grid w-[92%] max-w-5xl grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          {PAIRS.map((p) => {
            const isMatched = matched.has(p.id)
            const isSelected = selected === p.id
            const isWrong = wrong?.ticketId === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => pickTicket(p.id)}
                disabled={isMatched}
                className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-xs transition-colors duration-200 sm:text-sm ${
                  isMatched
                    ? 'cursor-default border-emerald-400/50 bg-emerald-400/10 text-emerald-200'
                    : isWrong
                      ? 'border-rose-400/60 bg-rose-400/10 text-rose-200'
                      : isSelected
                        ? 'border-presidio-cyan/60 bg-presidio-cyan/10 text-white'
                        : 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                {isMatched && <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />}
                <span>{p.ticket}</span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-2">
          {TERMS.map((t) => {
            const isMatched = matched.has(t.id)
            const isWrong = wrong?.termId === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => pickTerm(t.id)}
                disabled={isMatched}
                className={`flex items-center justify-between gap-2 rounded-lg border px-4 py-2.5 text-left text-xs font-semibold transition-colors duration-200 sm:text-sm ${
                  isMatched
                    ? 'cursor-default border-emerald-400/50 bg-emerald-400/10 text-emerald-200'
                    : isWrong
                      ? 'border-rose-400/60 bg-rose-400/10 text-rose-200'
                      : 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                <span>{t.term}</span>
                {isMatched && <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex min-h-[3rem] max-w-2xl flex-col items-center gap-3 text-center text-sm text-white/60">
        {allMatched ? (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            All five matched, that&rsquo;s the whole vocabulary for how this ships. Next up,
            Hour 4: how AI and LLMs fit into everything you&rsquo;ve seen so far.
          </motion.p>
        ) : (
          <span className="text-white/40">
            Every ticket is something a BA might actually see or write.
          </span>
        )}
        {matched.size > 0 && (
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur transition hover:bg-white/10"
          >
            <RotateCcw size={14} /> Start over
          </button>
        )}
      </div>
    </SlideBackground>
  )
}

export default Hour3MatchGameSlide
