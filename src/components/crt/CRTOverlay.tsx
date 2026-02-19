import { useEffect, useState } from 'react'

interface CRTOverlayProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function CRTOverlay({ open, onClose, title, children }: CRTOverlayProps) {
  const [phase, setPhase] = useState<'closed' | 'booting' | 'ready' | 'shutting-down'>('closed')

  useEffect(() => {
    if (open && phase === 'closed') {
      setPhase('booting')
      const timer = setTimeout(() => setPhase('ready'), 600)
      return () => clearTimeout(timer)
    }
    if (!open && phase === 'ready') {
      setPhase('shutting-down')
      const timer = setTimeout(() => setPhase('closed'), 400)
      return () => clearTimeout(timer)
    }
  }, [open, phase])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (phase === 'closed') return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-void/90 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'CRT Terminal'}
    >
      {/* CRT Screen */}
      <div
        className={`relative mx-4 w-full max-w-[600px] overflow-hidden rounded-lg border border-crt-green-dim/40 bg-void font-document text-crt-green shadow-[0_0_40px_rgba(51,255,51,0.08)] ${
          phase === 'booting' ? 'animate-[crt-boot_0.6s_ease-out_forwards]' :
          phase === 'shutting-down' ? 'animate-[crt-shutdown_0.4s_ease-in_forwards]' : ''
        }`}
      >
        {/* Scanlines */}
        <div className="crt-scanlines" />

        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-crt-green-dim/30 px-4 py-2">
          <div className="text-[0.7rem] tracking-[0.2em] text-crt-green-dim">
            {title ?? 'TERMINAL'}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center border border-crt-green-dim/30 bg-transparent text-crt-green-dim transition-colors hover:border-crt-green hover:text-crt-green"
            aria-label="關閉"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="relative max-h-[70vh] overflow-y-auto p-4 sm:p-6">
          {phase === 'ready' && children}
        </div>
      </div>
    </div>
  )
}
