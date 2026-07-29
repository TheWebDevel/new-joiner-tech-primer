import { useState } from 'react'
import { motion } from 'framer-motion'
import { Table2, Files, Lock, Sparkles } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const baseTasks = [
  { id: 1, text: 'Draft the requirements doc', done: false },
  { id: 2, text: 'Review wireframes with design', done: true },
  { id: 3, text: 'Sync with engineering', done: false },
]

function DatabaseTypesSlide({ step = 0 }) {
  const showRelational = step >= 1
  const showNonRelational = step >= 2
  const showPunchline = step >= 3
  const [addedField, setAddedField] = useState(false)

  return (
    <SlideBackground orbs={false}>
      <div className="mb-6 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Not All Databases Store Data the Same Way
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Same three tasks. Two very different shapes underneath.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-2 gap-6">
        <div
          className={`flex min-h-[20rem] flex-col items-center justify-center rounded-xl p-6 transition-colors duration-300 ${
            showRelational ? 'border border-white/15 bg-white/5' : 'border-2 border-dashed border-white/15'
          }`}
        >
          {showRelational && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex w-full flex-col items-center"
            >
              <div className="mb-4 flex items-center gap-2 text-white/60">
                <Table2 size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">Relational</span>
              </div>

              <div className="w-full max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400">
                      <th className="px-2.5 py-1.5 font-semibold">id</th>
                      <th className="px-2.5 py-1.5 font-semibold">text</th>
                      <th className="px-2.5 py-1.5 font-semibold">done</th>
                      {addedField && (
                        <motion.th
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="whitespace-nowrap px-2.5 py-1.5 font-semibold text-amber-500"
                        >
                          due_date
                        </motion.th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {baseTasks.map((t) => (
                      <tr key={t.id} className="border-b border-gray-50 text-gray-700 last:border-0">
                        <td className="px-2.5 py-1.5 text-gray-400">{t.id}</td>
                        <td className="px-2.5 py-1.5">{t.text}</td>
                        <td className="px-2.5 py-1.5">{String(t.done)}</td>
                        {addedField && (
                          <motion.td
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={t.id === 2 ? 'px-2.5 py-1.5 text-gray-700' : 'px-2.5 py-1.5 text-gray-300'}
                          >
                            {t.id === 2 ? 'Fri' : 'null'}
                          </motion.td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 max-w-xs text-sm text-white/60">
                Every row has the exact same columns. Fixed and predictable.
              </p>

              {addedField && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs text-amber-300"
                >
                  <Lock size={12} /> The table now has a due_date column. Every row gets it, even the
                  two with nothing to put there.
                </motion.div>
              )}

              <p className="mt-3 text-[11px] uppercase tracking-wide text-white/30">
                e.g. PostgreSQL, MySQL, SQL Server
              </p>
            </motion.div>
          )}
        </div>

        <div
          className={`flex min-h-[20rem] flex-col items-center justify-center rounded-xl p-6 transition-colors duration-300 ${
            showNonRelational
              ? 'border border-presidio-cyan/40 bg-presidio-cyan/5'
              : 'border-2 border-dashed border-white/15'
          }`}
        >
          {showNonRelational && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex w-full flex-col items-center"
            >
              <div className="mb-4 flex items-center gap-2 text-presidio-cyan">
                <Files size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">Non-relational</span>
              </div>

              <div className="flex w-full max-w-xs flex-col gap-2">
                {baseTasks.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-lg border border-white/10 bg-black/20 p-2.5 font-mono text-[11px] text-white/70"
                  >
                    <div>{'{'}</div>
                    <div className="pl-3">&quot;text&quot;: &quot;{t.text}&quot;,</div>
                    <div className="pl-3">&quot;done&quot;: {String(t.done)}
                      {t.id === 2 && addedField ? ',' : ''}
                    </div>
                    {t.id === 2 && addedField && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="pl-3 text-presidio-cyan"
                      >
                        &quot;dueDate&quot;: &quot;Fri&quot;
                      </motion.div>
                    )}
                    <div>{'}'}</div>
                  </div>
                ))}
              </div>

              <p className="mt-4 max-w-xs text-sm text-white/60">
                {addedField
                  ? 'Only that one record changed. Nothing else had to.'
                  : 'Each record can have its own shape, no shared structure required.'}
              </p>

              <p className="mt-3 text-[11px] uppercase tracking-wide text-white/30">
                e.g. MongoDB, DynamoDB
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-5 flex h-9 items-center justify-center">
        {showNonRelational && (
          <button
            type="button"
            onClick={() => setAddedField((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
          >
            <Sparkles size={14} /> {addedField ? 'Reset' : 'Add a due date to just one task'}
          </button>
        )}
      </div>

      <div className="mt-2 min-h-[3rem] max-w-2xl text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Fixed columns and tables make a{' '}
            <span className="font-heading font-bold text-presidio-cyan">relational database</span>.
            Flexible, self-contained records make a{' '}
            <span className="font-heading font-bold text-presidio-cyan">non-relational database</span>.
            A ticket that says &ldquo;we need a flexible store for this&rdquo; is usually asking for the second one.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default DatabaseTypesSlide
