import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'

interface ContentWarningProps {
  onEnter: () => void
}

export function ContentWarning({ onEnter }: ContentWarningProps) {
  return (
    <Section id="content-warning" background="void" vignette>
      <div className="mx-auto max-w-[480px] text-center">
        <ScrollReveal>
          <div className="mb-6 font-document text-[0.7rem] tracking-[0.4em] text-surveillance-green">
            CONTENT WARNING
          </div>
          <h1 className="mb-8 font-heading text-[clamp(1.2rem,4vw,1.8rem)] font-bold tracking-[0.08em] text-paper-aged">
            內容警告
          </h1>
          <p className="mb-4 font-narrative text-[clamp(0.9rem,2.5vw,1.05rem)] leading-[2] text-dust">
            本網站涉及政治迫害、國家監控、以及自焚事件。
          </p>
          <p className="mb-10 font-narrative text-[clamp(0.9rem,2.5vw,1.05rem)] leading-[2] text-dust">
            所有內容均源自政府解密檔案及基金會公開史料。
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <button
            type="button"
            onClick={onEnter}
            className="cursor-pointer border border-surveillance-green/50 bg-transparent px-8 py-3 font-heading text-[0.9rem] tracking-[0.15em] text-surveillance-green transition-all duration-300 hover:border-surveillance-green hover:bg-surveillance-green/10"
          >
            進入
          </button>
        </ScrollReveal>
      </div>
    </Section>
  )
}
