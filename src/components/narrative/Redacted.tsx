import { useState } from 'react'

interface RedactedProps {
  children: React.ReactNode
  /** When true, text stays revealed permanently after first click (no toggle back) */
  permanent?: boolean
  /** Callback fired when text is revealed (useful for counting reveals) */
  onReveal?: () => void
}

export function Redacted({ children, permanent = false, onReveal }: RedactedProps) {
  const [revealed, setRevealed] = useState(false)

  const handleReveal = () => {
    if (permanent && revealed) return
    const next = permanent ? true : !revealed
    setRevealed(next)
    if (next && onReveal) onReveal()
  }

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={revealed ? undefined : '點擊揭示隱藏文字'}
      className={`inline cursor-pointer select-none rounded-sm px-[0.3em] py-[0.15em] transition-all duration-700 ${
        revealed
          ? 'bg-blood/15 text-blood underline decoration-wavy underline-offset-4'
          : 'redacted-bar border border-smoke/50 bg-ash text-transparent hover:border-blood-dark/60 hover:bg-smoke/80'
      }`}
      style={{ minHeight: '44px', minWidth: '44px', touchAction: 'manipulation' }}
      onClick={handleReveal}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleReveal()
        }
      }}
    >
      {children}
    </span>
  )
}
