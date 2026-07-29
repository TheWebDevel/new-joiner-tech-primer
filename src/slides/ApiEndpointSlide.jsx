import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Loader2, Plug } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'
import TaskTracker, { initialTasks } from '../components/TaskTracker'

const methodStyles = {
  GET: 'border-sky-400/50 bg-sky-400/10 text-sky-300',
  POST: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300',
  PATCH: 'border-amber-400/50 bg-amber-400/10 text-amber-300',
}

function EventCard({ event }) {
  const pending = event.status == null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -12, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3"
    >
      <div className="flex items-center gap-2">
        <span
          className={`rounded border px-1.5 py-0.5 font-mono text-[10px] font-bold ${methodStyles[event.method]}`}
        >
          {event.method}
        </span>
        <span className="font-mono text-xs text-white/70">{event.path}</span>
      </div>

      <AnimatePresence mode="wait">
        {pending ? (
          <motion.div
            key="pending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex items-center gap-2 pl-1 text-xs text-amber-300/80"
          >
            <Loader2 size={12} className="animate-spin" />
            <span>Sending request... press Next for the response</span>
          </motion.div>
        ) : (
          <motion.div key="resolved" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mt-2 flex items-center gap-2 pl-1 text-xs text-white/50">
              <ArrowRight size={12} className="text-white/30" />
              <span className="font-mono">{event.status}</span>
              <span>{event.detail}</span>
            </div>
            {event.body && (
              <div className="mt-2 rounded border border-white/10 bg-black/30 p-2 font-mono text-[10px] text-white/60">
                <div className="mb-1 text-[9px] uppercase tracking-wide text-white/30">Response body</div>
                <pre className="whitespace-pre-wrap break-words">{JSON.stringify(event.body, null, 2)}</pre>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ApiEndpointSlide({ step = 0 }) {
  const showDemo = step >= 1
  const showEndpointNote = step >= 2
  const showPunchline = step >= 3
  const [events, setEvents] = useState([])
  const [tasks, setTasks] = useState([])
  const [tasksLoaded, setTasksLoaded] = useState(false)
  const [pendingId, setPendingId] = useState(null)
  const [pendingAdd, setPendingAdd] = useState(false)

  // A request stays pending, spinner and all, until the trainer presses
  // Next/Right — the response only "arrives" on that explicit cue, never on
  // a timer, so the reveal stays in the presenter's control. The task list
  // itself is controlled here (not by TaskTracker) so it only shows a change,
  // or even the initial list, once that response has actually landed.
  const sendEvent = ({ method, path, resolve, apply, rowId, isInitialLoad }) => {
    const id = `${method}-${path}-${Date.now()}`
    setEvents((prev) => [
      ...prev,
      { id, method, path, status: null, detail: null, body: null, resolve, apply, isInitialLoad },
    ])
    if (rowId != null) setPendingId(rowId)
  }

  useEffect(() => {
    const applies = events.map((e) => e.apply).filter(Boolean)
    if (applies.length) {
      setTasks((prev) => applies.reduce((acc, fn) => fn(acc), prev))
    }
    if (events.some((e) => e.apply && e.isInitialLoad)) {
      setTasksLoaded(true)
    }
    setEvents((prev) =>
      prev.map((e) => (e.resolve ? { ...e, ...e.resolve, resolve: null, apply: null } : e)),
    )
    setPendingId(null)
    setPendingAdd(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  useEffect(() => {
    if (!showDemo) {
      setEvents([])
      setTasks([])
      setTasksLoaded(false)
      setPendingId(null)
      setPendingAdd(false)
      return
    }
    sendEvent({
      method: 'GET',
      path: '/api/tasks',
      resolve: { status: '200 OK', detail: 'Loaded the current list', body: { tasks: initialTasks } },
      apply: () => initialTasks,
      isInitialLoad: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDemo])

  const handleAddClick = () => {
    const newTask = { id: Date.now(), text: 'Follow up with stakeholder', done: false }
    setPendingAdd(true)
    sendEvent({
      method: 'POST',
      path: '/api/tasks',
      resolve: {
        status: '201 Created',
        detail: 'Saved the new task',
        body: { id: newTask.id, text: newTask.text, done: newTask.done },
      },
      apply: (prev) => [...prev, newTask],
    })
  }

  const handleToggle = (id) => {
    const current = tasks.find((t) => t.id === id)
    const nextDone = !current?.done
    sendEvent({
      method: 'PATCH',
      path: `/api/tasks/${id}`,
      rowId: id,
      resolve: {
        status: '200 OK',
        detail: 'Updated that one task',
        body: { id, done: nextDone },
      },
      apply: (prev) => prev.map((t) => (t.id === id ? { ...t, done: nextDone } : t)),
    })
  }

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          The Conversation Behind the Click
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Same task tracker. Now watch what it actually sends.
        </p>
      </div>

      <div className="flex w-[90%] max-w-5xl items-stretch justify-center gap-8">
        <div
          className={`h-[26rem] w-full max-w-sm overflow-hidden rounded-xl transition-colors duration-300 ${
            showDemo ? 'border border-white/15 bg-white shadow-2xl' : 'border-2 border-dashed border-white/15 bg-white/5'
          }`}
        >
          {showDemo && (
            <TaskTracker
              html
              css
              js
              tasks={tasks}
              onToggle={handleToggle}
              onAddClick={handleAddClick}
              pendingId={pendingId}
              pendingAdd={pendingAdd}
              loading={!tasksLoaded}
            />
          )}
        </div>

        <div className="flex w-full max-w-sm flex-col">
          <div className="mb-2 flex items-center gap-2 text-white/50">
            <Plug size={14} />
            <span className="text-xs font-semibold uppercase tracking-wide">Network</span>
          </div>
          <div className="flex h-[26rem] flex-col gap-2 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3">
            {!showDemo && (
              <div className="flex h-full items-center justify-center text-center text-sm text-white/30">
                Nothing sent yet.
              </div>
            )}
            <AnimatePresence initial={false}>
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </AnimatePresence>
          </div>
          {showDemo && (
            <p className="mt-3 text-xs text-white/50">
              Try it: check a box, or add a task, then press Next to let the response arrive.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 max-w-2xl text-center text-sm text-white/60">
        {showEndpointNote && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-presidio-cyan">/api/tasks</span> is an{' '}
            <span className="font-heading font-bold text-presidio-cyan">endpoint</span>, a specific
            address the server listens on. The whole conversation, one program asking another
            for something, is called an{' '}
            <span className="font-heading font-bold text-presidio-cyan">API</span>.
          </motion.p>
        )}
        {showPunchline && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2"
          >
            Every click you just made was this app quietly calling its own API in the background.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default ApiEndpointSlide
