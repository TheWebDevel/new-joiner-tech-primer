import { motion } from 'framer-motion'

function SlideBackground({ children, orbs = true }) {
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-presidio-navy via-presidio-dark to-presidio-blue">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-40" />

      {orbs && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-presidio-cyan/30 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 30, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute -right-16 bottom-1/4 h-96 w-96 rounded-full bg-presidio-orange/20 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -20, 0], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </>
      )}

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        {children}
      </div>
    </section>
  )
}

export default SlideBackground
