import { useState } from 'react'

interface StampAnimationProps {
  text: string
  color?: 'red' | 'green'
  onStamp?: () => void
  className?: string
}

export function StampAnimation({ text, color = 'red', onStamp, className = '' }: StampAnimationProps) {
  const [stamped, setStamped] = useState(false)

  const handleStamp = () => {
    if (stamped) return
    setStamped(true)
    onStamp?.()
  }

  const colorClasses = color === 'red'
    ? 'border-seal-red text-seal-red'
    : 'border-crt-green text-crt-green'

  return (
    <button
      type="button"
      onClick={handleStamp}
      disabled={stamped}
      className={`relative inline-block cursor-pointer border-0 bg-transparent p-0 ${className}`}
      aria-label={stamped ? text : `點擊蓋章：${text}`}
    >
      <span
        aria-live="assertive"
        className={`inline-block rounded-sm border-2 px-4 py-2 font-heading text-[clamp(1.2rem,4vw,2rem)] font-black tracking-[0.15em] transition-all duration-200 ${colorClasses} ${
          stamped
            ? 'rotate-[-6deg] scale-100 opacity-90'
            : 'scale-150 opacity-0'
        }`}
        style={{
          transition: stamped ? 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
        }}
      >
        {text}
      </span>
    </button>
  )
}
