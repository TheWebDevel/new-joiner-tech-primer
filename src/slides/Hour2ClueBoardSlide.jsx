import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Plug,
  Signpost,
  Server,
  Cog,
  Database,
  Table2,
  Files,
  Repeat,
  Hash,
  Braces,
  Layers,
  KeyRound,
  HelpCircle,
  CheckCircle2,
  Shuffle,
} from 'lucide-react'
import SlideBackground from '../components/SlideBackground'
import Confetti from '../components/Confetti'

const terms = [
  {
    icon: Server,
    term: 'Server',
    clue: 'I’m the one thing that actually receives every request and decides what happens next.',
    detail: 'The computer that receives a request and sends back an answer.',
  },
  {
    icon: Signpost,
    term: 'Endpoint',
    clue: 'I’m not the whole address, just the specific part, like /api/tasks.',
    detail: 'The specific address the server listens on.',
  },
  {
    icon: Plug,
    term: 'API',
    clue: 'I’m not a single request. I’m the whole back-and-forth between two programs.',
    detail: 'One program asking another for something.',
  },
  {
    icon: Cog,
    term: 'Business logic',
    clue: 'Before anything gets saved, I’m the one asking “wait, is this actually allowed?”',
    detail: 'The rules the server applies before it acts.',
  },
  {
    icon: Database,
    term: 'Database',
    clue: 'Turn the whole app off and back on. I’m still holding everything.',
    detail: 'Where data actually lives, so it survives a restart.',
  },
  {
    icon: Table2,
    term: 'Relational database',
    clue: 'Every single row of mine looks exactly the same shape. No exceptions.',
    detail: 'Fixed tables and columns, same shape every row.',
  },
  {
    icon: Files,
    term: 'Non-relational database',
    clue: 'One of my records has a field the other two don’t. That’s fine by me.',
    detail: 'Flexible records, each with its own shape.',
  },
  {
    icon: Repeat,
    term: 'HTTP method',
    clue: 'GET, POST, PATCH, DELETE, I’m the verb, not the address.',
    detail: 'Fetch, create, update, remove.',
  },
  {
    icon: Hash,
    term: 'Status code',
    clue: 'Three digits. 200 means you’re fine. 500 means I’m not.',
    detail: 'A number in the response that says what happened.',
  },
  {
    icon: Braces,
    term: 'JSON',
    clue: 'I’m just labeled text, but somehow I become a whole screen.',
    detail: 'The shape data takes between server and screen.',
  },
  {
    icon: Layers,
    term: 'Backend framework',
    clue: 'I hand you routing and database access already built, so you don’t have to.',
    detail: 'A toolkit that handles the basics for you.',
  },
  {
    icon: KeyRound,
    term: 'Authentication',
    clue: 'Before you get anywhere, I want to know exactly who you are.',
    detail: 'Confirming who someone is before trusting the request.',
  },
]

function Tile({ data, onSolved, shuffling }) {
  const [state, setState] = useState('hidden')

  const advance = () => {
    if (shuffling) return
    if (state === 'hidden') {
      setState('clue')
    } else if (state === 'clue') {
      setState('solved')
      onSolved()
    }
  }

  return (
    <motion.button
      layout
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      type="button"
      onClick={advance}
      disabled={state === 'solved' || shuffling}
      className={`flex min-h-[9.5rem] flex-col items-center justify-center rounded-xl border p-4 text-center transition-colors duration-300 ${
        state === 'solved'
          ? 'cursor-default border-emerald-400/50 bg-emerald-400/10'
          : state === 'clue'
            ? 'cursor-pointer border-presidio-cyan/50 bg-presidio-cyan/10'
            : shuffling
              ? 'cursor-default border-white/15 bg-white/5'
              : 'cursor-pointer border-white/15 bg-white/5 hover:bg-white/10'
      }`}
    >
      <AnimatePresence mode="wait">
        {state === 'hidden' && (
          <motion.div
            key="hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <HelpCircle className="h-6 w-6 text-white/30" strokeWidth={1.75} />
            <span className="mt-2 text-[11px] text-white/40">
              {shuffling ? 'Shuffling...' : 'Click for a clue'}
            </span>
          </motion.div>
        )}
        {state === 'clue' && (
          <motion.div
            key="clue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs italic text-white/80">&ldquo;{data.clue}&rdquo;</p>
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-presidio-cyan">
              Click to reveal
            </span>
          </motion.div>
        )}
        {state === 'solved' && (
          <motion.div
            key="solved"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-1.5">
              <data.icon className="h-5 w-5 text-emerald-400" strokeWidth={1.75} />
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-1.5 font-heading text-sm font-bold text-white">{data.term}</div>
            <p className="mt-1 text-[11px] leading-snug text-white/60">{data.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const SHUFFLE_ROUNDS = 3
const SHUFFLE_STEP_MS = 550

function Hour2ClueBoardSlide() {
  const [board, setBoard] = useState(terms)
  const [shuffling, setShuffling] = useState(true)
  const [solvedCount, setSolvedCount] = useState(0)
  const allSolved = solvedCount === board.length

  useEffect(() => {
    const timeouts = Array.from({ length: SHUFFLE_ROUNDS }, (_, i) =>
      setTimeout(() => {
        setBoard(shuffle(terms))
        if (i === SHUFFLE_ROUNDS - 1) setShuffling(false)
      }, (i + 1) * SHUFFLE_STEP_MS),
    )
    return () => timeouts.forEach(clearTimeout)
  }, [])

  return (
    <SlideBackground orbs={false}>
      {allSolved && <Confetti />}
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Twelve Clues, Twelve Terms
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Read the clue out loud. Let the room guess. Click again to check.
        </p>
        <div className="mt-3 flex items-center justify-center gap-1.5 font-heading text-sm font-bold text-presidio-cyan">
          {shuffling ? (
            <>
              <Shuffle size={14} className="animate-pulse" /> Shuffling the board...
            </>
          ) : (
            `${solvedCount} / ${board.length} cleared`
          )}
        </div>
      </div>

      <div className="grid w-[90%] max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {board.map((t) => (
          <Tile key={t.term} data={t} shuffling={shuffling} onSolved={() => setSolvedCount((c) => c + 1)} />
        ))}
      </div>

      <div className="mt-6 min-h-[2rem] max-w-2xl text-center text-base text-white/70">
        {allSolved && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Board cleared, that&rsquo;s every term from this hour. Next up, Hour 3: how all of this
            actually gets out into the world.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default Hour2ClueBoardSlide
