import { ScrollReveal } from '../narrative/ScrollReveal'
import { statuteComparisonData } from '../../data/legal'

export function StatuteComparison() {
  const { before, after, keyChange, source } = statuteComparisonData

  return (
    <div className="space-y-8">
      <h3 className="font-heading text-[clamp(1.1rem,3vw,1.4rem)] font-bold text-paper-aged">
        {statuteComparisonData.title}
      </h3>

      {/* Side-by-side on desktop, stacked on mobile */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Before */}
        <ScrollReveal>
          <div className="border border-seal-red/30 bg-void/50 p-5">
            <div className="mb-3 font-document text-[0.7rem] tracking-[0.15em] text-seal-red/70">
              {before.label}
            </div>
            <p className="mb-4 font-narrative text-[0.9rem] leading-[2] text-dust">
              {before.segments.map((seg, i) => (
                <span
                  key={i}
                  className={seg.isHighlighted ? 'bg-seal-red/20 text-paper-aged' : ''}
                >
                  {seg.text}
                </span>
              ))}
            </p>
            <div className="border-t border-smoke/30 pt-3 font-document text-[0.75rem] leading-[1.8] text-seal-red/80">
              {before.effectWithArticle21}
            </div>
            <p className="mt-2 font-narrative text-[0.8rem] italic text-stone">
              {before.note}
            </p>
          </div>
        </ScrollReveal>

        {/* After */}
        <ScrollReveal delay={100}>
          <div className="border border-surveillance-green/30 bg-void/50 p-5">
            <div className="mb-3 font-document text-[0.7rem] tracking-[0.15em] text-surveillance-green/70">
              {after.label}
            </div>
            <p className="mb-4 font-narrative text-[0.9rem] leading-[2] text-dust">
              {after.segments.map((seg, i) => (
                <span
                  key={i}
                  className={seg.isHighlighted ? 'bg-surveillance-green/20 text-paper-aged' : ''}
                >
                  {seg.text}
                </span>
              ))}
            </p>
            <p className="mt-2 font-narrative text-[0.8rem] italic text-stone">
              {after.note}
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Key change callout */}
      <ScrollReveal>
        <div className="border-l-2 border-surveillance-green/50 pl-4">
          <p className="font-narrative text-[0.9rem] leading-[2] text-paper-aged">
            {keyChange}
          </p>
        </div>
      </ScrollReveal>

      <div className="font-document text-[0.65rem] tracking-wider text-stone/50">
        {source}
      </div>
    </div>
  )
}
