import { motion } from 'framer-motion'
import { ArrowLeftRight, ListFilter, Wifi } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const cards = [
  {
    name: 'REST',
    Icon: ArrowLeftRight,
    color: 'text-presidio-cyan',
    border: 'border-presidio-cyan/50',
    bg: 'bg-presidio-cyan/10',
    blurb: 'One request, one response, one fixed address per action. Everything this hour has been REST.',
    ticket: null,
  },
  {
    name: 'GraphQL',
    Icon: ListFilter,
    color: 'text-emerald-400',
    border: 'border-emerald-400/50',
    bg: 'bg-emerald-400/10',
    blurb: 'Ask for exactly the fields you need, all in one request, instead of calling several fixed endpoints.',
    ticket: '"This screen only needs the title and due date" is a GraphQL-shaped request.',
  },
  {
    name: 'WebSocket',
    Icon: Wifi,
    color: 'text-amber-400',
    border: 'border-amber-400/50',
    bg: 'bg-amber-400/10',
    blurb: 'A connection that stays open, so the server can push updates without being asked again and again.',
    ticket: '"The dashboard should update live when someone else changes a task" needs a websocket, not repeated fetching.',
  },
]

function ApiVariationsSlide({ step = 0 }) {
  const showPunchline = step >= cards.length

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          A Couple More Shapes You&rsquo;ll Hear About
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Same idea, request and response, just packaged differently for different jobs.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-3 gap-4">
        {cards.map((c, i) => {
          const revealed = step >= i + 1
          return (
            <div
              key={c.name}
              className={`flex min-h-[16rem] flex-col items-center justify-center rounded-xl p-6 text-center transition-colors duration-300 ${
                revealed ? `border ${c.border} ${c.bg}` : 'border-2 border-dashed border-white/15'
              }`}
            >
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center"
                >
                  <c.Icon className={`h-8 w-8 ${c.color}`} strokeWidth={1.75} />
                  <div className="mt-3 font-heading text-xl font-extrabold text-white">{c.name}</div>
                  <p className="mt-3 text-sm text-white/70">{c.blurb}</p>
                  {c.ticket && (
                    <p className="mt-4 border-t border-white/10 pt-3 text-xs italic text-white/50">
                      {c.ticket}
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 max-w-2xl text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Both are still requests and responses underneath, just shaped differently. If a ticket
            mentions <span className="font-heading font-bold text-emerald-400">GraphQL</span> or a{' '}
            <span className="font-heading font-bold text-amber-400">websocket</span>, you now know
            roughly what is actually happening.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default ApiVariationsSlide
