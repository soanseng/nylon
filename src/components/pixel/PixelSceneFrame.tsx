import type { ReactNode } from 'react'

interface PixelSceneFrameProps {
  caption: string
  children: ReactNode
  className?: string
}

/**
 * Visual frame for PixiJS pixel art scenes.
 * Matches the existing PixelArtScene border/label/caption treatment.
 */
export function PixelSceneFrame({ caption, children, className = '' }: PixelSceneFrameProps) {
  return (
    <figure className={`relative mx-auto w-full max-w-[640px] border border-surveillance-green/60 bg-void p-3 shadow-[0_0_20px_rgba(74,103,65,0.1)] sm:p-4 ${className}`}>
      <div className="absolute top-[-0.6rem] left-3 bg-void px-2 font-document text-[0.65rem] tracking-[0.2em] text-surveillance-green">
        場景重現
      </div>
      <div className="overflow-hidden bg-ink">
        {children}
      </div>
      <figcaption className="mt-2 font-document text-[0.75rem] leading-relaxed tracking-wide text-dust sm:mt-3">
        {caption}
      </figcaption>
    </figure>
  )
}
