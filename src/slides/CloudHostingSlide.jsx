import { motion } from 'framer-motion'
import { LayoutTemplate, Server, Database } from 'lucide-react'
import SlideBackground from '../components/SlideBackground'

const layers = [
  {
    icon: LayoutTemplate,
    name: 'Frontend',
    accent: 'border-presidio-cyan/40 bg-presidio-cyan/5',
    iconColor: 'text-presidio-cyan',
    home: 'Static hosting, or a CDN',
    detail: 'Just files, HTML, CSS, JS, handed straight to a browser. No code needs to run on the other end.',
    examples: 'e.g. Netlify, Vercel, S3 + CloudFront',
  },
  {
    icon: Server,
    name: 'Backend',
    accent: 'border-presidio-orange/40 bg-presidio-orange/5',
    iconColor: 'text-presidio-orange',
    home: 'A server, container, or serverless platform',
    detail: 'Something has to actually run code on every request, business logic, routing, all of it.',
    examples: 'e.g. EC2, ECS, Lambda',
  },
  {
    icon: Database,
    name: 'Database',
    accent: 'border-emerald-400/40 bg-emerald-400/5',
    iconColor: 'text-emerald-400',
    home: 'A managed database service',
    detail: 'The provider handles backups and maintenance, so nobody on the team has to babysit it.',
    examples: 'e.g. RDS, Cosmos DB, Cloud SQL',
  },
]

function CloudHostingSlide({ step = 0 }) {
  const showPunchline = step >= layers.length

  return (
    <SlideBackground orbs={false}>
      <div className="mb-4 flex w-[90%] flex-col items-center text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Different Layers, Different Homes
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Frontend, backend, and database usually don&rsquo;t even live in the same place.
        </p>
        <div className="mt-3 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs text-white/50">
          All of it still runs on rented computers somewhere, that&rsquo;s what &ldquo;the
          cloud&rdquo; means.
        </div>
      </div>

      <div className="grid w-[90%] max-w-5xl grid-cols-3 gap-4">
        {layers.map((l, i) => {
          const revealed = step >= i + 1
          return (
            <div
              key={l.name}
              className={`flex min-h-[17rem] flex-col items-center justify-center rounded-xl p-5 text-center transition-colors duration-300 ${
                revealed ? `border ${l.accent}` : 'border-2 border-dashed border-white/15'
              }`}
            >
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center"
                >
                  <l.icon className={`h-8 w-8 ${l.iconColor}`} strokeWidth={1.75} />
                  <div className="mt-3 font-heading text-lg font-extrabold text-white">
                    {l.name}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/40">
                    {l.home}
                  </div>
                  <p className="mt-3 text-sm text-white/70">{l.detail}</p>
                  <p className="mt-3 text-[11px] uppercase tracking-wide text-white/30">
                    {l.examples}
                  </p>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 min-h-[3rem] max-w-2xl text-center text-sm text-white/60">
        {showPunchline && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            That is why the frontend and backend are not just different code, they are often
            deployed in completely different places, and can fail completely independently of
            each other.
          </motion.p>
        )}
      </div>
    </SlideBackground>
  )
}

export default CloudHostingSlide
