import { motion } from 'framer-motion'
import { KeyRound, UserCheck, UserX } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

function AuthSlide({ step = 0 }) {
  const showGate = step >= 1
  const showOutcomes = step >= 2

  return (
    <SlideBackground orbs={false}>
      <div className="mb-10 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          One Question Before Anything Else
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Before the server does any of that, it asks one thing first.
        </p>
      </div>

      <div className="flex w-full max-w-3xl flex-col items-center">
        {showGate && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center rounded-xl border border-white/15 bg-white/5 px-8 py-6"
          >
            <KeyRound className="h-9 w-9 text-presidio-cyan" strokeWidth={1.75} />
            <div className="mt-3 font-heading text-lg font-bold text-white">Who are you?</div>
            <p className="mt-1 text-sm text-white/60">
              Every request carries proof of identity before the server trusts it with anything.
            </p>
          </motion.div>
        )}

        <div className="mt-8 flex w-full items-start justify-center gap-6">
          {showOutcomes && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="flex w-full max-w-xs flex-col items-center rounded-xl border border-emerald-400/50 bg-emerald-400/10 p-6 text-center"
              >
                <UserCheck className="h-8 w-8 text-emerald-400" strokeWidth={1.75} />
                <div className="mt-3 font-heading text-sm font-bold text-white">Recognized</div>
                <p className="mt-1.5 text-sm text-white/70">
                  Identity confirmed. The request carries on.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="flex w-full max-w-xs flex-col items-center rounded-xl border border-rose-400/50 bg-rose-400/10 p-6 text-center"
              >
                <UserX className="h-8 w-8 text-rose-400" strokeWidth={1.75} />
                <div className="mt-3 font-heading text-sm font-bold text-white">Not recognized</div>
                <p className="mt-1.5 text-sm text-white/70">
                  Stops here. Sent back as 401 Unauthorized.
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 max-w-2xl text-center text-sm text-white/60">
        {showOutcomes && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            That check is called{' '}
            <span className="font-heading font-bold text-presidio-cyan">authentication</span>,
            confirming who someone is.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default AuthSlide
