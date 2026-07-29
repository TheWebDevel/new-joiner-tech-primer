import { motion } from 'framer-motion'
import { LayoutGrid, Palette, Zap } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'
import TaskTracker from '../components/TaskTracker'

const layers = [
  {
    icon: LayoutGrid,
    label: 'HTML',
    analogy: 'The structure, the skeleton of the page.',
    quote: 'Same content, zero styling, this is what HTML gives you for free.',
    props: { html: true, css: false, js: false },
  },
  {
    icon: Palette,
    label: 'CSS',
    analogy: 'The style, color, spacing, fonts.',
    quote: 'Nothing about the content changed, only how it looks.',
    props: { html: true, css: true, js: false },
  },
  {
    icon: Zap,
    label: 'JS',
    analogy: 'The behavior, what happens when you click.',
    quote: 'Same page, now it listens and responds.',
    props: { html: true, css: true, js: true },
  },
]

function BuildingBlocksSlide({ step = 0 }) {
  const js = step >= 3

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          The Three Building Blocks
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Every page is built from the same three layers. Watch them stack, live.
        </p>
      </div>

      <div className="mb-3 grid w-[90%] grid-cols-3 gap-3">
        {layers.map((layer, i) => {
          const active = step >= i + 1
          return (
            <div
              key={layer.label}
              className={`flex flex-col items-center rounded-xl border px-3 py-3 text-center transition-colors duration-300 ${
                active ? 'border-presidio-cyan/60 bg-presidio-cyan/10' : 'border-white/10 bg-white/5'
              }`}
            >
              <layer.icon
                className={`h-5 w-5 ${active ? 'text-presidio-cyan' : 'text-white/30'}`}
                strokeWidth={1.75}
              />
              <div
                className={`mt-1.5 font-heading text-sm font-bold ${active ? 'text-white' : 'text-white/40'}`}
              >
                {layer.label}
              </div>
              <div
                className={`mt-1 text-[11px] leading-snug ${active ? 'text-white/70' : 'text-white/30'}`}
              >
                {layer.analogy}
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid w-[90%] grid-cols-3 gap-3">
        {layers.map((layer, i) => {
          const revealed = step >= i + 1
          return (
            <div
              key={layer.label}
              className={`h-72 overflow-hidden rounded-xl transition-colors duration-300 ${
                revealed
                  ? 'border border-white/15 bg-white shadow-2xl'
                  : 'border-2 border-dashed border-white/15 bg-white/5'
              }`}
            >
              {revealed && <TaskTracker {...layer.props} />}
            </div>
          )
        })}
      </div>

      <div className="mt-3 grid w-[90%] grid-cols-3 gap-3">
        {layers.map((layer, i) => {
          const revealed = step >= i + 1
          return (
            <div key={layer.label} className="px-2 text-center">
              {revealed && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm italic leading-snug text-white/70"
                >
                  “{layer.quote}”
                </motion.p>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-3 h-4 text-xs text-white/50">
        {js && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Try it in the last panel, click a checkbox or Add Task.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default BuildingBlocksSlide
