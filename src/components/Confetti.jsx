import { useMemo } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#00ACF0', '#0081BC', '#FF9D16', '#FFC42A', '#70D44B', '#410098']

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

// Framer Motion only interpolates smoothly when a property's unit stays
// consistent across initial/animate, so the fall uses `top` (percent to
// percent) and the sideways drift uses `x` (px to px) as separate props.
function Confetti({ count = 60 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: randomBetween(0, 100),
        size: randomBetween(6, 12),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: randomBetween(180, 540),
        duration: randomBetween(1.8, 3.2),
        delay: randomBetween(0, 0.5),
        drift: randomBetween(-70, 70),
        rounded: Math.random() > 0.5,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ top: '-5%', x: 0, opacity: 1, rotate: 0 }}
          animate={{ top: '110%', x: p.drift, opacity: [1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            width: p.size,
            height: p.rounded ? p.size : p.size * 0.4,
            backgroundColor: p.color,
            borderRadius: p.rounded ? '9999px' : '2px',
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
