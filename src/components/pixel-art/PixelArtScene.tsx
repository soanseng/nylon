interface PixelArtSceneProps {
  src: string
  alt: string
  caption: string
  className?: string
}

export function PixelArtScene({ src, alt, caption, className = '' }: PixelArtSceneProps) {
  return (
    <figure
      className={`relative mx-auto w-full max-w-[640px] border border-surveillance-green/60 bg-void p-3 shadow-[0_0_20px_rgba(74,103,65,0.1)] sm:p-4 ${className}`}
    >
      {/* Label */}
      <div className="absolute top-[-0.6rem] left-3 bg-void px-2 font-document text-[0.65rem] tracking-[0.2em] text-surveillance-green">
        場景重現
      </div>

      {/* Pixel art image */}
      <div className="overflow-hidden bg-ink">
        <img
          src={src}
          alt={alt}
          className="block w-full"
          style={{ imageRendering: 'pixelated' }}
          loading="lazy"
        />
      </div>

      {/* Caption */}
      <figcaption className="mt-2 font-document text-[0.75rem] leading-relaxed tracking-wide text-dust sm:mt-3">
        {caption}
      </figcaption>
    </figure>
  )
}
