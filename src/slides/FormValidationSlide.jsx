import { motion } from 'framer-motion'
import { Check, MousePointerClick, AlertCircle, CheckCircle, Ticket } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

function AppFrame({ children }) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl">
      <div className="flex items-center gap-2 border-b border-black/10 bg-gray-100 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 truncate rounded-md border border-gray-200 bg-white px-3 py-1 text-[11px] text-gray-500">
          taskapp.local
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function FormFields({ state }) {
  const isError = state === 'error'
  const isSuccess = state === 'success'

  return (
    <div>
      <div className="mb-4 font-heading text-lg font-bold text-gray-800">Add a task</div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        Task name
      </label>
      <motion.div
        key={state}
        animate={isError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm ${
          isError
            ? 'border-red-400 bg-red-50 text-gray-700'
            : isSuccess
              ? 'border-gray-200 text-gray-700'
              : 'border-gray-200 text-gray-400'
        }`}
      >
        {isSuccess ? 'Follow up with design' : 'What needs doing?'}
      </motion.div>
      {isError && (
        <p className="mt-1.5 text-xs font-semibold text-red-500">Task name is required.</p>
      )}
      <button
        type="button"
        className={`mt-4 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors ${
          isSuccess ? 'bg-emerald-500' : 'bg-presidio-blue'
        }`}
      >
        {isSuccess ? (
          <>
            <Check size={14} /> Added
          </>
        ) : (
          'Add Task'
        )}
      </button>
    </div>
  )
}

const beats = [
  {
    state: 'empty',
    icon: MousePointerClick,
    title: 'Click Add, nothing typed',
    detail: 'This is what a ticket saying "validate input" actually means in practice.',
  },
  {
    state: 'error',
    icon: AlertCircle,
    title: 'It stops you',
    detail: 'Red border, a reason why, and nothing gets added yet.',
  },
  {
    state: 'success',
    icon: CheckCircle,
    title: 'Now it goes through',
    detail: 'Type something valid and the error clears, for real this time.',
  },
]

function FormValidationSlide({ step = 0 }) {
  const beatIndex = Math.min(step, beats.length) - 1
  const active = beatIndex >= 0 ? beats[beatIndex] : null
  const showList = step >= 1
  const showPunchline = step >= beats.length + 1

  return (
    <SlideBackground orbs={false}>
      <div className="mb-10 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          What &ldquo;Validate the Input&rdquo; Means
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          One line in a ticket, three moments on screen.
        </p>
      </div>

      <div className="flex w-[90%] max-w-5xl items-center justify-center gap-16">
        <div className="flex min-h-[19rem] w-full max-w-sm flex-col items-center justify-center">
          {active && (
            <motion.div
              key={active.state}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <AppFrame>
                <FormFields state={active.state} />
              </AppFrame>
            </motion.div>
          )}
        </div>

        <div className="flex min-h-[19rem] w-full max-w-md flex-col justify-center gap-6">
          <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white/50">
              <Ticket size={16} />
            </div>
            <div className="text-left">
              <div className="font-heading text-xs font-bold uppercase tracking-wide text-white/40">
                TT-142
              </div>
              <div className="mt-0.5 text-sm text-white/80">
                &ldquo;Validate the input on the Add Task form.&rdquo;
              </div>
            </div>
          </div>

          {showList && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3"
            >
              {beats.map((b) => {
                const isActive = active?.state === b.state
                return (
                  <div
                    key={b.state}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors duration-300 ${
                      isActive
                        ? 'border-presidio-cyan/60 bg-presidio-cyan/10'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                        isActive
                          ? 'border-presidio-cyan/40 text-presidio-cyan'
                          : 'border-white/15 text-white/40'
                      }`}
                    >
                      <b.icon size={16} />
                    </div>
                    <div>
                      <div
                        className={`font-heading text-sm font-bold ${isActive ? 'text-white' : 'text-white/50'}`}
                      >
                        {b.title}
                      </div>
                      <div className={`mt-0.5 text-sm ${isActive ? 'text-white/70' : 'text-white/40'}`}>
                        {b.detail}
                      </div>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}

          {showPunchline && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left text-base text-white/70"
            >
              That&rsquo;s{' '}
              <span className="font-heading font-bold text-presidio-cyan">form validation</span>,
              catching bad input before it causes a problem further down the line.
            </motion.p>
          )}
        </div>
      </div>
    </SlideBackground>
  )
}

export default FormValidationSlide
