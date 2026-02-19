interface PageCounterProps {
  /** Current page count */
  current: number
  /** Total pages (default 5000) */
  total?: number
  /** Whether the counter is visible */
  visible: boolean
}

export function PageCounter({ current, total = 5000, visible }: PageCounterProps) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-live="polite"
      aria-label={`已閱覽 ${current} / ${total} 頁`}
    >
      <div className="border border-surveillance-green/30 bg-void/90 px-4 py-2 font-document text-[0.75rem] tracking-[0.1em] text-surveillance-green/80 shadow-[0_0_15px_rgba(74,103,65,0.1)] backdrop-blur-sm">
        您已閱覽第{' '}
        <span className="text-[0.9rem] text-surveillance-green">{current.toLocaleString()}</span>
        {' / '}
        {total.toLocaleString()} 頁
      </div>
    </div>
  )
}
