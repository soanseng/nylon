import { useEffect, useRef, useState } from 'react'

interface CRTOverlayProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function CRTOverlay({ open, onClose, title, children }: CRTOverlayProps) {
  const [phase, setPhase] = useState<'closed' | 'booting' | 'ready' | 'shutting-down'>('closed')
  const [prevOpen, setPrevOpen] = useState(open)
  const modalRef = useRef<HTMLDivElement>(null)

  // Derive immediate phase transitions during render (avoids setState in effect)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open && phase === 'closed') {
      setPhase('booting')
    } else if (!open && (phase === 'ready' || phase === 'booting')) {
      setPhase('shutting-down')
    }
  }

  // Timed transitions only
  useEffect(() => {
    if (phase === 'booting') {
      const timer = setTimeout(() => setPhase('ready'), 600)
      return () => clearTimeout(timer)
    }
    if (phase === 'shutting-down') {
      const timer = setTimeout(() => setPhase('closed'), 400)
      return () => clearTimeout(timer)
    }
  }, [phase])

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

  // Focus trap — keep Tab cycling within the modal
  useEffect(() => {
    if (phase !== 'ready') return

    const previousFocus = document.activeElement as HTMLElement | null
    const modal = modalRef.current
    if (!modal) return

    // Focus the close button on open
    const closeBtn = modal.querySelector<HTMLElement>('button[aria-label="關閉"]')
    closeBtn?.focus()

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleTab)
    return () => {
      window.removeEventListener('keydown', handleTab)
      previousFocus?.focus()
    }
  }, [phase])

  if (phase === 'closed') return null

  return (
    <div
      ref={modalRef}
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
