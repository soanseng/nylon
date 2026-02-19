import { Section } from '../components/layout/Section'

interface ContentWarningProps {
  onEnter?: () => void
}

export function ContentWarning({ onEnter }: ContentWarningProps) {
  return (
    <Section id="content-warning" background="void" vignette>
      <div className="text-center font-heading text-stone">
        內容警告 — Content Warning
      </div>
      {onEnter && (
        <button
          type="button"
          onClick={onEnter}
          className="mt-8 border border-stone/40 bg-transparent px-6 py-3 font-heading text-[0.85rem] tracking-[0.15em] text-paper-aged transition-colors hover:border-paper-aged/60 hover:bg-ash/30"
        >
          進入 Enter
        </button>
      )}
    </Section>
  )
}
