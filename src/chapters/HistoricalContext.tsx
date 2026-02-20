import { useState } from 'react'
import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'
import { DocumentPage } from '../components/narrative/DocumentPage'
import { StampAnimation } from '../components/interactive/StampAnimation'
import { StatuteJudgment } from '../components/crt/StatuteJudgment'
import { CourtroomScene } from '../components/pixel/scenes'
import { PixelSceneFrame } from '../components/pixel/PixelSceneFrame'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { punishmentOfRebellionAct, article21Quotes } from '../data/legal'

export function HistoricalContext() {
  const [judgmentOpen, setJudgmentOpen] = useState(false)
  const { ref: sceneRef, progress: sceneProgress, isInView: sceneInView } = useScrollProgress()

  return (
    <Section id="historical-context" background="ink">
      <div className="mx-auto max-w-[640px] space-y-16">
        <ScrollReveal>
          <ChapterHeader
            label="CHAPTER 01"
            title="時代背景：言論即叛亂"
            labelColor="text-surveillance-green"
          />
        </ScrollReveal>

        {/* 1a: 解嚴的假象 */}
        <ScrollReveal>
          <div className="space-y-4">
            <h3 className="font-heading text-[clamp(1.1rem,3vw,1.4rem)] font-bold text-paper-aged">
              解嚴 ≠ 自由
            </h3>
            <p className="font-narrative leading-[2] text-dust">
              1987年7月15日，台灣宣布解嚴。但以下法律仍然有效——
            </p>
            <div className="space-y-2 border-l-2 border-surveillance-green/50 pl-4">
              <div className="font-document text-[0.85rem] text-surveillance-green">
                《懲治叛亂條例》（1949–1991）
              </div>
              <div className="font-document text-[0.85rem] text-surveillance-green">
                《動員戡亂時期臨時條款》
              </div>
              <div className="font-document text-[0.85rem] text-surveillance-green">
                《刑法第100條》舊條文
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pixel art: courtroom */}
        <div ref={sceneRef}>
          <PixelSceneFrame caption="懲治叛亂條例下的軍事法庭：法官沒有從輕量刑的選擇">
            <CourtroomScene progress={sceneProgress} isInView={sceneInView} />
          </PixelSceneFrame>
        </div>

        {/* 1b: 二條一 statute display */}
        <ScrollReveal>
          <DocumentPage
            classification="極機密"
            title="懲治叛亂條例 第二條第一項"
            stampText="唯一死刑"
          >
            <p className="mb-6 font-document leading-[2.2] text-ink">
              {punishmentOfRebellionAct.articles.find(a => a.id === 'pra-art-2-1')?.text}
            </p>
            <div className="border-t border-ink/20 pt-4">
              <p className="text-[0.85rem] leading-[1.8] text-smoke">
                {article21Quotes[0].text}
              </p>
            </div>
          </DocumentPage>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex justify-center">
            <StampAnimation text="唯一死刑" color="red" />
          </div>
        </ScrollReveal>

        {/* CRT mini-interaction trigger */}
        <ScrollReveal>
          <div className="text-center">
            <p className="mb-6 font-narrative leading-[2] text-dust">
              什麼行為會觸犯「二條一」？試試看——
            </p>
            <button
              type="button"
              onClick={() => setJudgmentOpen(true)}
              className="cursor-pointer border border-crt-green-dim/50 bg-void px-6 py-3 font-document text-[0.85rem] tracking-[0.15em] text-crt-green-dim transition-all duration-300 hover:border-crt-green hover:text-crt-green hover:shadow-[0_0_20px_rgba(51,255,51,0.1)]"
            >
              啟動法條適用判斷系統
            </button>
          </div>
        </ScrollReveal>

        <StatuteJudgment open={judgmentOpen} onClose={() => setJudgmentOpen(false)} />

        {/* Source attribution */}
        <ScrollReveal>
          <div className="font-document text-[0.65rem] tracking-wider text-stone/50">
            [來源：國家人權記憶庫、懲治叛亂條例全文]
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
