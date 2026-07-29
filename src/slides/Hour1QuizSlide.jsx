import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'
import Confetti from '../components/Confetti'

const questions = [
  {
    prompt:
      'You fill out a signup form. You click Next, and the whole screen goes blank white for a second before the next page shows up.',
    options: ['Client-side rendering', 'Form validation', 'Server-side rendering', 'Responsive design'],
    correct: 2,
    explain:
      'A blank white flash means the server rebuilt the page and sent it again. Client-side rendering would have swapped the content right away, no flash.',
  },
  {
    prompt: 'A button called Export Report looks fine and sits in the right place. Nothing happens when you click it.',
    options: ['JavaScript', 'CSS', 'The framework', 'Responsive design'],
    correct: 0,
    explain: 'It looks right, so the styling (CSS) is fine. Nothing happens on click, so the problem is in the behavior, JavaScript.',
  },
  {
    prompt: 'Someone changes all the colors on a page and makes the corners rounder. The words and the layout stay exactly the same.',
    options: ['HTML', 'CSS', 'JavaScript', 'A framework'],
    correct: 1,
    explain: 'Colors and rounded corners are styling. That is CSS. The words (HTML) and the behavior (JavaScript) did not change.',
  },
  {
    prompt:
      'Two teams each built their own copy of the same login screen. When the logo changes, one team updates it right away. The other forgets for a month.',
    options: [
      'Responsive design matters',
      'Form validation matters',
      'A shared component matters',
      'Server-side rendering matters',
    ],
    correct: 2,
    explain: 'One shared component would update both teams at once. Two separate copies means one of them gets forgotten.',
  },
  {
    prompt: 'A ticket just says: “Make the checkout page feel trustworthy.”',
    options: [
      'It is a JavaScript problem',
      'It should go to design, not engineering',
      'It is fine, QA can judge that',
      'It cannot be tested as written, it needs clear, checkable steps',
    ],
    correct: 3,
    explain: '“Feels trustworthy” cannot be checked. Someone has to turn it into something specific before QA can test it.',
  },
]

const resultCopy = (score, total) => {
  if (score === total) return 'Every one. Hour 1 stuck.'
  if (score >= total - 1) return 'Almost clean. Hour 1 mostly stuck.'
  if (score >= total / 2) return 'Halfway there. Worth a re-skim before Hour 2.'
  return 'Rough one. Let’s revisit the recap before moving on.'
}

function Hour1QuizSlide() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[index]
  const isLast = index === questions.length - 1

  const choose = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === question.correct) setScore((s) => s + 1)
  }

  const advance = () => {
    if (isLast) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  const restart = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <SlideBackground orbs={false}>
      {finished && <Confetti />}
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Five Questions. Let&rsquo;s See What Stuck.
        </h2>
        {!finished && (
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Question {index + 1} of {questions.length}
          </p>
        )}
      </div>

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4 rounded-xl border border-white/15 bg-white/5 p-8 text-center"
            >
              <Trophy size={32} className="text-presidio-cyan" />
              <div className="font-heading text-4xl font-extrabold text-white">
                {score} / {questions.length}
              </div>
              <p className="text-base text-white/70">{resultCopy(score, questions.length)}</p>
              <button
                type="button"
                onClick={restart}
                className="mt-2 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
              >
                <RotateCcw size={14} /> Try again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-5 rounded-xl border border-white/15 bg-white/5 p-6"
            >
              <p className="text-lg font-semibold text-white">{question.prompt}</p>

              <div className="flex flex-col gap-2.5">
                {question.options.map((opt, i) => {
                  const isChosen = selected === i
                  const isCorrect = i === question.correct
                  const revealState = selected !== null

                  let stateClasses = 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10'
                  if (revealState && isCorrect) {
                    stateClasses = 'border-emerald-400/60 bg-emerald-400/10 text-emerald-200'
                  } else if (revealState && isChosen && !isCorrect) {
                    stateClasses = 'border-red-400/60 bg-red-400/10 text-red-200'
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => choose(i)}
                      disabled={revealState}
                      className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${stateClasses}`}
                    >
                      <span>{opt}</span>
                      {revealState && isCorrect && (
                        <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                      )}
                      {revealState && isChosen && !isCorrect && (
                        <XCircle size={18} className="shrink-0 text-red-400" />
                      )}
                    </button>
                  )
                })}
              </div>

              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-start gap-3 border-t border-white/10 pt-4"
                >
                  <p className="text-sm text-white/60">{question.explain}</p>
                  <button
                    type="button"
                    onClick={advance}
                    className="flex items-center gap-1.5 rounded-full bg-presidio-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-presidio-dark"
                  >
                    {isLast ? 'See results' : 'Next question'} <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideBackground>
  )
}

export default Hour1QuizSlide
