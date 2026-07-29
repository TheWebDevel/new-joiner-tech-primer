import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Bug } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'
import Confetti from '../components/Confetti'

const questions = [
  {
    prompt:
      'You resize the browser from desktop width down to phone width. The three-column layout collapses into a single column, and the nav bar turns into a hamburger icon.',
    options: ['Client-side rendering', 'A framework', 'Responsive design', 'Form validation'],
    correct: 2,
    explain:
      'The same page adapting its layout to whatever screen it is on is responsive design. Nothing was rebuilt by the server, and no framework was named.',
  },
  {
    prompt:
      'You leave the email field blank and click Submit. Before anything is sent to the server, the field turns red with "This field is required" underneath it.',
    options: ['Server-side rendering', 'Form validation', 'Responsive design', 'A component'],
    correct: 1,
    explain:
      'Catching bad input before it causes a problem further down the line, and doing it before the request even goes out, is form validation.',
  },
  {
    prompt:
      'The task tracker works fine all afternoon. The server restarts for a deploy, and every task anyone added is gone.',
    options: [
      'The API broke',
      'There was no database, so nothing survived the restart',
      'A status code was wrong',
      'The backend framework crashed',
    ],
    correct: 1,
    explain:
      'A database is where data actually lives, so it survives a restart. No database, or nothing written to one, means a restart wipes everything.',
  },
  {
    prompt:
      'A request to save a new task comes back almost instantly with a 3-digit number attached, before the client has looked at any of the actual data in the response. That number alone tells the client whether it worked.',
    options: ['Endpoint', 'JSON', 'Status code', 'Authentication'],
    correct: 2,
    explain:
      'The 3-digit number that says what happened, independent of the actual data, is the status code. 200 means fine, 500 means it is not.',
  },
  {
    prompt:
      'A user logs in with the correct password and gets into the task tracker fine. Later, they click delete on a task someone else created, and get blocked with "You don\'t have permission to do that."',
    options: [
      'Their login was rejected',
      'They were blocked from an action they are not allowed to do, not from proving who they are',
      'The database lost their account',
      'The page failed to load',
    ],
    correct: 1,
    explain:
      'The password worked, so who they are was never in question, that part already passed. Getting blocked from a specific action is about what they are allowed to do, a separate check that runs after identity is already confirmed.',
    note:
      'Spot the other bug: the backend was always going to reject this. So why did the frontend show a working delete button at all? Either that task should not have been visible to this user, or the delete button should not have appeared for it. A control that always fails is a bug worth its own ticket, not just a correct rejection.',
  },
]

const resultCopy = (score, total) => {
  if (score === total) return 'Every one. Frontend and backend both stuck.'
  if (score >= total - 1) return 'Almost clean. Nearly there.'
  if (score >= total / 2) return 'Halfway there. Worth a re-skim of Hour 1 and Hour 2.'
  return 'Rough one. Worth revisiting the recaps before moving on.'
}

function RecapQuizSlide() {
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
          Frontend + Backend Recap
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
                  {question.note && (
                    <div className="flex items-start gap-2.5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3.5 py-3 text-sm text-amber-200">
                      <Bug size={16} className="mt-0.5 shrink-0" />
                      <span>{question.note}</span>
                    </div>
                  )}
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

export default RecapQuizSlide
