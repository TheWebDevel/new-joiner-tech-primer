import { motion } from 'framer-motion'
import { Eye, PlusCircle, Pencil, Trash2 } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const methods = [
  {
    method: 'GET',
    verb: 'Fetch',
    Icon: Eye,
    color: 'text-sky-400',
    border: 'border-sky-400/50',
    bg: 'bg-sky-400/10',
    plain: '"Give me what’s already there."',
    example: 'GET /api/tasks',
  },
  {
    method: 'POST',
    verb: 'Create',
    Icon: PlusCircle,
    color: 'text-emerald-400',
    border: 'border-emerald-400/50',
    bg: 'bg-emerald-400/10',
    plain: '"Add this new thing."',
    example: 'POST /api/tasks',
  },
  {
    method: 'PUT / PATCH',
    verb: 'Update',
    Icon: Pencil,
    color: 'text-amber-400',
    border: 'border-amber-400/50',
    bg: 'bg-amber-400/10',
    plain: '"Change what’s already there."',
    example: 'PATCH /api/tasks/3',
  },
  {
    method: 'DELETE',
    verb: 'Remove',
    Icon: Trash2,
    color: 'text-rose-400',
    border: 'border-rose-400/50',
    bg: 'bg-rose-400/10',
    plain: '"Take this away."',
    example: 'DELETE /api/tasks/3',
  },
]

function RequestMethodsSlide({ step = 0 }) {
  const showPunchline = step >= methods.length

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Four Words for Four Actions
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Every request to an API is really just one of these four.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-4 gap-4">
        {methods.map((m, i) => {
          const revealed = step >= i + 1
          return (
            <div
              key={m.method}
              className={`flex min-h-[17rem] flex-col items-center justify-center rounded-xl p-5 text-center transition-colors duration-300 ${
                revealed ? `border ${m.border} ${m.bg}` : 'border-2 border-dashed border-white/15'
              }`}
            >
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center"
                >
                  <m.Icon className={`h-8 w-8 ${m.color}`} strokeWidth={1.75} />
                  <div className="mt-3 font-heading text-lg font-extrabold text-white">{m.verb}</div>
                  <div className={`mt-1 font-mono text-xs font-bold ${m.color}`}>{m.method}</div>
                  <p className="mt-3 text-sm italic text-white/70">{m.plain}</p>
                  <div className="mt-4 rounded border border-white/10 bg-black/20 px-2 py-1 font-mono text-[11px] text-white/60">
                    {m.example}
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 h-6 text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Together these are called{' '}
            <span className="font-heading font-bold text-presidio-cyan">HTTP methods</span>. A
            ticket that says &ldquo;this should update the record&rdquo; is just describing one of these four.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default RequestMethodsSlide
