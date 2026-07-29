import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
}

// Renders one hour's slides as an independent deck: its own step/slide state,
// its own numbering starting at 1, opened in its own tab from the home page.
function HourDeck({ slides }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [jumpValue, setJumpValue] = useState('1')

  const goNext = useCallback(() => {
    const maxSteps = slides[slideIndex].steps
    if (step < maxSteps) {
      setStep(step + 1)
    } else if (slideIndex < slides.length - 1) {
      setDirection(1)
      setSlideIndex(slideIndex + 1)
      setStep(0)
    }
  }, [slides, slideIndex, step])

  const goBack = useCallback(() => {
    if (step > 0) {
      setStep(step - 1)
    } else if (slideIndex > 0) {
      const prevIndex = slideIndex - 1
      setDirection(-1)
      setSlideIndex(prevIndex)
      setStep(slides[prevIndex].steps)
    }
  }, [slides, slideIndex, step])

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight' || e.key === ' ') goNext()
      if (e.key === 'ArrowLeft') goBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goBack])

  useEffect(() => {
    setJumpValue(String(slideIndex + 1))
  }, [slideIndex])

  const commitJump = () => {
    const parsed = parseInt(jumpValue, 10)
    const clamped = Number.isNaN(parsed) ? slideIndex + 1 : Math.min(Math.max(parsed, 1), slides.length)
    const nextIndex = clamped - 1
    if (nextIndex !== slideIndex) {
      setDirection(nextIndex > slideIndex ? 1 : -1)
      setSlideIndex(nextIndex)
      setStep(0)
    }
    setJumpValue(String(clamped))
  }

  const { Component: Slide, steps: maxSteps, section } = slides[slideIndex]
  const atStart = slideIndex === 0 && step === 0
  const atEnd = slideIndex === slides.length - 1 && step === maxSteps

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-presidio-navy font-body text-white">
      <Link
        to="/"
        className="absolute right-6 top-6 z-20 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur transition hover:bg-white/10"
      >
        <Home size={13} /> Home
      </Link>

      {section && (
        <div className="absolute left-6 top-6 z-20 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-presidio-cyan backdrop-blur">
          {section}
        </div>
      )}

      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slideIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0"
        >
          <Slide step={step} />
        </motion.div>
      </AnimatePresence>

      <nav className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={goBack}
          disabled={atStart}
          className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/80 backdrop-blur transition hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <span className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/50">
          <input
            type="text"
            inputMode="numeric"
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value.replace(/[^0-9]/g, ''))}
            onFocus={(e) => e.target.select()}
            onBlur={commitJump}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
            }}
            aria-label="Jump to slide"
            className="w-9 rounded-md border border-white/15 bg-white/5 px-1 py-0.5 text-center text-white/80 focus:border-presidio-cyan/60 focus:outline-none"
          />
          <span>/ {slides.length}</span>
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={atEnd}
          className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/80 backdrop-blur transition hover:bg-white/10 disabled:opacity-30"
        >
          Next <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  )
}

export default HourDeck
