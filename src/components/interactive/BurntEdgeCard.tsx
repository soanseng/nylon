import { useState } from 'react'

interface BurntEdgeCardProps {
  title: string
  children: React.ReactNode
  /** Optional subtitle shown below title when collapsed */
  subtitle?: string
}

export function BurntEdgeCard({ title, subtitle, children }: BurntEdgeCardProps) {
  const [expanded, setExpanded] = useState(false)
  const contentId = `burnt-card-${title.replace(/\s+/g, '-')}`

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        /* Charred edge gradient on left border */
        borderLeft: '3px solid',
        borderImage: 'linear-gradient(to bottom, #7F1D1D, #5C3A1E, #3D2B1A, #1A1008) 1',
      }}
    >
      {/* Scorch overlay on top/bottom edges */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: 'linear-gradient(to right, #3D2B1A, transparent 30%, transparent 70%, #3D2B1A)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]"
        style={{
          background: 'linear-gradient(to right, #1A1008, transparent 40%, transparent 60%, #1A1008)',
        }}
      />

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full cursor-pointer bg-ash/80 px-5 py-4 text-left transition-colors hover:bg-smoke/60"
        aria-expanded={expanded}
        aria-controls={contentId}
      >
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-[clamp(0.95rem,2.5vw,1.15rem)] font-bold text-paper-aged">
            {title}
          </h4>
          <span
            className="ml-3 text-[0.8rem] text-stone transition-transform duration-300"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ▼
          </span>
        </div>
        {subtitle && !expanded && (
          <p className="mt-1 font-narrative text-[0.85rem] text-stone">
            {subtitle}
          </p>
        )}
      </button>

      <div
        id={contentId}
        role="region"
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: expanded ? '2000px' : '0px',
          opacity: expanded ? 1 : 0,
        }}
      >
        <div className="bg-void/60 px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  )
}
