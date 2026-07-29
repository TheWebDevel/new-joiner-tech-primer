import { useState } from 'react'
import { Check, Plus, Loader2 } from 'lucide-react'

export const initialTasks = [
  { id: 1, text: 'Draft the requirements doc', done: false },
  { id: 2, text: 'Review wireframes with design', done: true },
  { id: 3, text: 'Sync with engineering', done: false },
]

// The shared "task tracker" example reused across interactive slides in
// Hours 1, 2, and 4 (see CLAUDE.md) so the audience builds on one mental
// model instead of resetting context each hour.
//
// Uncontrolled by default (owns its own `tasks` state, updates instantly on
// click). Passing `tasks` switches it to controlled mode instead: clicks
// call `onToggle`/`onAddClick` and nothing changes on screen until the
// parent feeds back an updated `tasks` array — used by ApiEndpointSlide so
// the list only reflects a change once the simulated response arrives.
function TaskTracker({
  html = false,
  css = false,
  js = false,
  accent = 'blue',
  onAction,
  pendingId,
  pendingAdd = false,
  loading = false,
  tasks: controlledTasks,
  onToggle,
  onAddClick,
}) {
  const [internalTasks, setInternalTasks] = useState(initialTasks)
  const controlled = controlledTasks !== undefined
  const tasks = controlled ? controlledTasks : internalTasks
  const isGreen = accent === 'green'

  const toggleTask = (id) => {
    if (!js) return
    if (controlled) {
      onToggle?.(id)
      return
    }
    const current = internalTasks.find((t) => t.id === id)
    setInternalTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
    onAction?.({ type: 'toggle', id, done: !current?.done })
  }

  const addTask = () => {
    if (!js) return
    if (controlled) {
      onAddClick?.()
      return
    }
    const newTask = { id: Date.now(), text: 'Follow up with stakeholder', done: false }
    setInternalTasks((prev) => [...prev, newTask])
    onAction?.({ type: 'add', task: newTask })
  }

  if (!html) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-sm text-gray-300">
        Nothing yet. Turn on a layer to start building the page.
      </div>
    )
  }

  if (controlled && loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-300" />
        <div className="text-sm text-gray-400">Loading tasks...</div>
      </div>
    )
  }

  if (!css) {
    return (
      <div
        className="h-full overflow-auto p-4"
        style={{ fontFamily: 'Times New Roman, Times, serif', color: '#000' }}
      >
        <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Tasks</div>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {tasks.map((t) => (
            <li key={t.id} style={{ marginBottom: 4 }}>
              <input type="checkbox" checked={t.done} readOnly /> {t.text}
            </li>
          ))}
        </ul>
        <button
          type="button"
          style={{
            fontFamily: 'inherit',
            fontSize: 14,
            marginTop: 8,
            padding: '2px 8px',
            border: '2px outset buttonface',
            background: 'buttonface',
            color: 'buttontext',
          }}
        >
          Add Task
        </button>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-gray-800">Tasks</h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            isGreen ? 'bg-emerald-500/10 text-emerald-600' : 'bg-presidio-blue/10 text-presidio-blue'
          }`}
        >
          {tasks.filter((t) => !t.done).length} open
        </span>
      </div>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${
              pendingId === t.id ? 'border-amber-300 bg-amber-50' : 'border-gray-100 bg-gray-50'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleTask(t.id)}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                t.done
                  ? isGreen
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-presidio-blue bg-presidio-blue text-white'
                  : 'border-gray-300 text-transparent'
              } ${js ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <Check size={12} strokeWidth={3} />
            </button>
            <span className={`text-sm ${t.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
              {t.text}
            </span>
            {pendingId === t.id && (
              <Loader2 size={12} className="ml-auto shrink-0 animate-spin text-amber-500" />
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={addTask}
        disabled={pendingAdd}
        className={`mt-4 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white transition ${
          isGreen ? 'bg-emerald-500' : 'bg-presidio-blue'
        } ${
          pendingAdd
            ? 'cursor-default opacity-70'
            : js
              ? `cursor-pointer ${isGreen ? 'hover:bg-emerald-600' : 'hover:bg-presidio-dark'}`
              : 'cursor-default opacity-60'
        }`}
      >
        {pendingAdd ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Adding...
          </>
        ) : (
          <>
            <Plus size={14} /> Add Task
          </>
        )}
      </button>
    </div>
  )
}

export default TaskTracker
