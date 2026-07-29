import { motion } from 'framer-motion'
import SlideBackground from '../components/SlideBackground'
import { ReactIcon, AngularIcon, VueIcon } from '../components/FrameworkIcons'

const frameworks = [
  {
    name: 'React',
    maker: 'Built by Meta',
    blurb: 'The most widely used. Huge community, very flexible.',
    Icon: ReactIcon,
    color: 'text-sky-400',
    border: 'border-sky-400/50',
    bg: 'bg-sky-400/10',
  },
  {
    name: 'Angular',
    maker: 'Built by Google',
    blurb: 'A complete toolkit. Comes with everything built in.',
    Icon: AngularIcon,
    color: 'text-rose-400',
    border: 'border-rose-400/50',
    bg: 'bg-rose-400/10',
  },
  {
    name: 'Vue',
    maker: 'Built by the community',
    blurb: 'Easy to pick up. Popular for smaller projects.',
    Icon: VueIcon,
    color: 'text-emerald-400',
    border: 'border-emerald-400/50',
    bg: 'bg-emerald-400/10',
  },
]

function FrameworkExamplesSlide({ step = 0 }) {
  const showPunchline = step >= 3

  return (
    <SlideBackground orbs={false}>
      <div className="mb-8 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          The Frameworks You&rsquo;ll Hear About
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Different tools, same idea: write once, reuse everywhere.
        </p>
      </div>

      <div className="grid w-[90%] grid-cols-3 gap-4">
        {frameworks.map((fw, i) => {
          const revealed = step >= i + 1
          return (
            <div
              key={fw.name}
              className={`flex min-h-[16rem] flex-col items-center justify-center rounded-xl p-6 text-center transition-colors duration-300 ${
                revealed ? `border ${fw.border} ${fw.bg}` : 'border-2 border-dashed border-white/15'
              }`}
            >
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center"
                >
                  <fw.Icon className={`h-9 w-9 ${fw.color}`} />
                  <div className="mt-3 font-heading text-2xl font-extrabold text-white">
                    {fw.name}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/40">
                    {fw.maker}
                  </div>
                  <p className="mt-4 text-sm text-white/70">{fw.blurb}</p>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 h-6 text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Different tools, same idea: build the piece once, reuse it everywhere.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default FrameworkExamplesSlide
