import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Monitor,
  Smartphone,
  MoveHorizontal,
  Check,
  Plus,
  LayoutList,
  Hand,
  Maximize2,
  Signal,
  Wifi,
  BatteryFull,
} from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const MIN_WIDTH = 220
const MAX_WIDTH = 620
const MOBILE_THRESHOLD = 340

const changes = [
  {
    icon: LayoutList,
    title: 'Header stacks',
    detail: 'Title and count no longer fight for the same row.',
  },
  {
    icon: Hand,
    title: 'Touch targets grow',
    detail: 'Checkboxes get bigger so a thumb can actually hit them.',
  },
  {
    icon: Maximize2,
    title: 'Button goes full-width',
    detail: '“Add Task” becomes the easiest thing on the screen to tap.',
  },
]

const tasks = [
  { id: 1, text: 'Draft the requirements doc', done: false },
  { id: 2, text: 'Review wireframes with design', done: true },
  { id: 3, text: 'Sync with engineering', done: false },
]

function TaskRow({ task, isMobile }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
      <div
        className={`flex shrink-0 items-center justify-center rounded-full border-2 ${
          isMobile ? 'h-7 w-7' : 'h-5 w-5'
        } ${task.done ? 'border-presidio-blue bg-presidio-blue' : 'border-gray-300'}`}
      >
        {task.done && <Check size={isMobile ? 14 : 11} strokeWidth={3} className="text-white" />}
      </div>
      <span
        className={`text-sm ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'} ${
          isMobile ? 'truncate' : ''
        }`}
      >
        {task.text}
      </span>
    </div>
  )
}

function AdaptiveTaskList({ isMobile }) {
  const openCount = tasks.filter((t) => !t.done).length

  if (isMobile) {
    return (
      <div className="p-4">
        <div className="mb-3 flex flex-col items-start gap-1.5">
          <span className="font-heading text-base font-bold text-gray-800">Tasks</span>
          <span className="rounded-full bg-presidio-blue/10 px-2 py-0.5 text-[11px] font-semibold text-presidio-blue">
            {openCount} open
          </span>
        </div>
        <div className="space-y-2">
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} isMobile />
          ))}
        </div>
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-presidio-blue py-2.5 text-xs font-semibold text-white"
        >
          <Plus size={14} /> Add Task
        </button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-heading text-base font-bold text-gray-800">Tasks</span>
          <span className="rounded-full bg-presidio-blue/10 px-2.5 py-1 text-xs font-semibold text-presidio-blue">
            {openCount} open
          </span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-presidio-blue px-3.5 py-1.5 text-xs font-semibold text-white"
        >
          <Plus size={14} /> Add Task
        </button>
      </div>
      <div className="space-y-2">
        {tasks.map((t) => (
          <TaskRow key={t.id} task={t} isMobile={false} />
        ))}
      </div>
    </div>
  )
}

function ResizableFrame() {
  const [width, setWidth] = useState(480)
  const dragRef = useRef({ dragging: false, startX: 0, startWidth: 480 })

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.dragging) return
      e.preventDefault()
      const delta = e.clientX - dragRef.current.startX
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragRef.current.startWidth + delta))
      setWidth(next)
    }
    const onUp = () => {
      dragRef.current.dragging = false
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  const startDrag = (e) => {
    e.preventDefault()
    dragRef.current = { dragging: true, startX: e.clientX, startWidth: width }
  }

  const isMobile = width < MOBILE_THRESHOLD
  // Height scales up as the frame narrows, so it reads as a phone silhouette
  // (tall and narrow) rather than the desktop layout just being squeezed.
  const progress = 1 - (width - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH)
  const height = Math.round(360 + progress * 260)

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div
        className={`relative flex flex-col overflow-hidden shadow-2xl ${
          isMobile
            ? 'rounded-[2.2rem] border-[10px] border-gray-900 bg-gray-900'
            : 'rounded-xl border border-white/15 bg-white'
        }`}
        style={{ width, height }}
      >
        {isMobile ? (
          <div className="flex shrink-0 items-center justify-between bg-black px-5 py-2 text-[11px] font-semibold text-white">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal size={12} />
              <Wifi size={12} />
              <BatteryFull size={13} />
            </div>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2 border-b border-black/10 bg-gray-100 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
          </div>
        )}
        <div className="flex-1 overflow-y-auto bg-white">
          <AdaptiveTaskList isMobile={isMobile} />
        </div>
        {isMobile && (
          <div className="flex shrink-0 justify-center bg-white py-2">
            <div className="h-1 w-28 rounded-full bg-gray-900/80" />
          </div>
        )}
        <div
          onPointerDown={startDrag}
          className="absolute right-0 top-0 flex h-full w-5 cursor-ew-resize touch-none items-center justify-center bg-gradient-to-l from-black/10 to-transparent"
        >
          <div className="flex h-10 w-4 items-center justify-center rounded-full bg-gray-300/90">
            <MoveHorizontal size={11} className="text-gray-600" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/60">
        {isMobile ? <Smartphone size={14} /> : <Monitor size={14} />}
        {isMobile ? 'Mobile width' : 'Desktop width'}
        <span className="text-white/30">· drag the edge</span>
      </div>
    </div>
  )
}

function ResponsiveDesignSlide({ step = 0 }) {
  const showFrame = step >= 1
  const showCaption = step >= 2
  const showPunchline = step >= 3

  return (
    <SlideBackground orbs={false}>
      <div className="mb-10 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Same Page, Every Screen Size
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Drag the edge. Watch what happens as the screen runs out of room.
        </p>
      </div>

      <div className="flex w-[90%] flex-wrap items-center justify-center gap-20">
        <div className="flex min-h-[19rem] flex-1 items-center justify-center">
          {showFrame && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <ResizableFrame />
            </motion.div>
          )}
        </div>

        <div className="flex min-h-[19rem] w-full max-w-md flex-1 flex-col justify-center gap-8">
          {showCaption && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-5"
            >
              {changes.map((c) => (
                <div key={c.title} className="flex items-start gap-3 text-left">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-presidio-cyan">
                    <c.icon size={16} />
                  </div>
                  <div>
                    <div className="font-heading text-sm font-bold text-white">{c.title}</div>
                    <div className="mt-0.5 text-sm text-white/60">{c.detail}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {showPunchline && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left text-base text-white/70"
            >
              That&rsquo;s called{' '}
              <span className="font-heading font-bold text-presidio-cyan">responsive design</span>,
              and none of it happens by itself. Someone designs both versions.
            </motion.p>
          )}
        </div>
      </div>
    </SlideBackground>
  )
}

export default ResponsiveDesignSlide
