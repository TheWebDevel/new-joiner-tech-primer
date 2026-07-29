export function ReactIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </g>
    </svg>
  )
}

export function AngularIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M12 2.2l8.5 3-1.3 10.6L12 21.8l-7.2-6L3.5 5.2 12 2.2z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.4l4.5 10.2h-1.9l-0.9-2.2h-3.4l-0.9 2.2H7.5L12 6.4zm0 3.3l-1.3 3.2h2.6L12 9.7z"
        fill="currentColor"
      />
    </svg>
  )
}

export function VueIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M2.4 3.2h4l5.6 9.7 5.6-9.7h4L12 21 2.4 3.2z" fill="currentColor" />
      <path
        d="M8.2 3.2h3.1l0.7 1.3 0.7-1.3h3.1L12 10 8.2 3.2z"
        fill="currentColor"
        fillOpacity="0.45"
      />
    </svg>
  )
}
