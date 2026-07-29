import { motion } from 'framer-motion'
import SlideBackground from '../components/SlideBackground'

const KEYWORDS =
  '\\b(?:const|let|var|function|document|querySelector|querySelectorAll|forEach|addEventListener|getElementById|createElement|classList|toggle|appendChild|nextElementSibling|innerHTML)\\b'

const TOKEN_REGEX = new RegExp(
  `("[^"]*"|'[^']*')|(<\\/?[a-zA-Z][\\w-]*)|(${KEYWORDS})|([a-zA-Z-]+(?=\\s*[:{]))`,
  'g',
)

function highlightLine(line) {
  const tokens = []
  let lastIndex = 0
  let match
  TOKEN_REGEX.lastIndex = 0
  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), cls: 'text-white/70' })
    }
    let cls = 'text-white/70'
    if (match[1]) cls = 'text-amber-300'
    else if (match[2]) cls = 'text-sky-400'
    else if (match[3]) cls = 'text-sky-400'
    else if (match[4]) cls = 'text-purple-300'
    tokens.push({ text: match[0], cls })
    lastIndex = TOKEN_REGEX.lastIndex
  }
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), cls: 'text-white/70' })
  }
  return tokens.length ? tokens : [{ text: line || ' ', cls: 'text-white/70' }]
}

const htmlLines = [
  '<div class="task-list">',
  '  <h3>Tasks</h3>',
  '  <ul>',
  '    <li>',
  '      <input type="checkbox">',
  '      <span>Draft the requirements doc</span>',
  '    </li>',
  '    <li>',
  '      <input type="checkbox" checked>',
  '      <span>Review wireframes</span>',
  '    </li>',
  '  </ul>',
  '  <button id="add-task">Add Task</button>',
  '</div>',
]

const cssLines = [
  '.task-list {',
  '  padding: 24px;',
  '  border-radius: 12px;',
  '  background: #fff;',
  '}',
  '.task-list li {',
  '  display: flex;',
  '  gap: 12px;',
  '  padding: 8px 12px;',
  '  background: #f9fafb;',
  '}',
  '.task-list input:checked + span {',
  '  text-decoration: line-through;',
  '}',
  '#add-task {',
  '  background: #0081bc;',
  '  color: #fff;',
  '  border-radius: 999px;',
  '}',
]

const jsLines = [
  "const list = document.querySelector('ul');",
  '',
  "document.querySelectorAll('input')",
  '  .forEach((box) => {',
  "    box.addEventListener('change', () => {",
  '      box.nextElementSibling',
  "        .classList.toggle('done');",
  '    });',
  '  });',
  '',
  "document.getElementById('add-task')",
  "  .addEventListener('click', () => {",
  "    const li = document.createElement('li');",
  '    li.innerHTML = \'<input type="checkbox">\';',
  '    list.appendChild(li);',
  '  });',
]

const totalLines = htmlLines.length + cssLines.length + jsLines.length

const files = [
  {
    filename: 'index.html',
    dotColor: 'bg-orange-500',
    lines: htmlLines,
    quote: '14 lines just to describe three checkboxes and a button.',
  },
  {
    filename: 'style.css',
    dotColor: 'bg-blue-500',
    lines: cssLines,
    quote: 'Every one of those needs its own styling rules, by hand.',
  },
  {
    filename: 'app.js',
    dotColor: 'bg-yellow-400',
    lines: jsLines,
    quote: 'And every click needs to be wired up, one at a time.',
  },
]

function CodePanel({ filename, dotColor, lines, revealed }) {
  return (
    <div
      className={`h-72 overflow-hidden rounded-xl transition-colors duration-300 ${
        revealed
          ? 'border border-white/15 bg-[#04101c] shadow-2xl'
          : 'border-2 border-dashed border-white/15 bg-white/5'
      }`}
    >
      {revealed && (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2">
            <span className={`h-2 w-2 rounded-full ${dotColor}`} />
            <span className="font-mono text-[11px] text-white/60">{filename}</span>
          </div>
          <div className="flex-1 overflow-auto px-3 py-2">
            <pre className="whitespace-pre font-mono text-[10.5px] leading-relaxed">
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-3 w-4 shrink-0 text-right text-white/20">{i + 1}</span>
                  <span>
                    {highlightLine(line).map((tok, j) => (
                      <span key={j} className={tok.cls}>
                        {tok.text}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

function CodeRevealSlide({ step = 0 }) {
  const allRevealed = step >= 3

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          What That Actually Takes
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          The real code behind the task tracker you just saw, by hand.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-3 gap-3">
        {files.map((file, i) => (
          <CodePanel key={file.filename} {...file} revealed={step >= i + 1} />
        ))}
      </div>

      <div className="mt-3 grid w-[90%] grid-cols-3 gap-3">
        {files.map((file, i) => {
          const revealed = step >= i + 1
          return (
            <div key={file.filename} className="px-2 text-center">
              {revealed && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm italic leading-snug text-white/70"
                >
                  “{file.quote}”
                </motion.p>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-3 h-6 text-center text-sm text-white/60">
        {allRevealed && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-heading font-bold text-white">~{totalLines} lines.</span> For
            one task list. Now imagine an entire app.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default CodeRevealSlide
