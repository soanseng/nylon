import { useState } from 'react'
import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'
import { DocumentPage } from '../components/narrative/DocumentPage'
import { StatuteComparison } from '../components/legal/StatuteComparison'
import { DecryptionInteraction } from '../components/crt/DecryptionInteraction'
import {
  prosecutionTimeline,
  chengProsecutionChain,
  article21Quotes,
} from '../data/legal'

export function Investigation() {
  const [decryptOpen, setDecryptOpen] = useState(false)

  return (
    <Section id="investigation" background="ink">
      <div className="mx-auto max-w-[640px] space-y-16">
        <ScrollReveal>
          <ChapterHeader
            label="CHAPTER 03"
            title="調查歷程：紙上的正義"
            labelColor="text-surveillance-green"
          />
        </ScrollReveal>

        {/* 3a: Prosecution timeline */}
        <ScrollReveal>
          <div className="space-y-4">
            <h3 className="font-heading text-[clamp(1.1rem,3vw,1.4rem)] font-bold text-paper-aged">
              從出版到死亡的司法歷程
            </h3>
            <div className="space-y-0">
              {prosecutionTimeline.map((event, i) => (
                <div key={event.date + event.label} className="relative flex gap-4 pb-6">
                  {/* Timeline line */}
                  {i < prosecutionTimeline.length - 1 && (
                    <div className="absolute left-[5px] top-3 h-full w-[1px] bg-surveillance-green/20" />
                  )}
                  {/* Dot */}
                  <div
                    className={`relative mt-[6px] h-[11px] w-[11px] shrink-0 rounded-full border ${
                      event.isKeyMoment
                        ? 'border-seal-red bg-seal-red/30'
                        : 'border-surveillance-green/50 bg-surveillance-green/10'
                    }`}
                  />
                  <div className="space-y-1">
                    <div className="font-document text-[0.75rem] text-surveillance-green/70">
                      {event.date}
                    </div>
                    <div className="font-heading text-[0.9rem] font-bold text-paper-aged">
                      {event.label}
                    </div>
                    <p className="font-narrative text-[0.85rem] leading-[1.9] text-dust">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 3b: Legal logic chain */}
        <ScrollReveal>
          <DocumentPage
            classification="偵查卷宗"
            title="法律如何殺人"
            stampText="唯一死刑"
          >
            <p className="mb-4 font-narrative text-[0.85rem] leading-[1.8] text-ink/70">
              {chengProsecutionChain.triggeringAct}
            </p>
            <div className="space-y-0">
              {chengProsecutionChain.chain.map((step) => (
                <div key={step.step} className="border-l-2 border-seal-red/30 py-3 pl-4">
                  <div className="mb-1 font-document text-[0.7rem] text-stone">
                    步驟 {step.step}：{step.label}
                  </div>
                  <p className="font-narrative text-[0.85rem] leading-[1.9] text-ink">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </DocumentPage>
        </ScrollReveal>

        {/* Pull quote */}
        <ScrollReveal>
          <blockquote className="border-l-2 border-seal-red/40 pl-4">
            <p className="font-literary text-[clamp(1rem,2.5vw,1.15rem)] leading-[2.2] text-paper-aged">
              {article21Quotes[1].text}
            </p>
            <footer className="mt-2 font-document text-[0.7rem] text-stone/60">
              — {article21Quotes[1].attribution}
            </footer>
          </blockquote>
        </ScrollReveal>

        {/* CRT 解密互動 trigger */}
        <ScrollReveal>
          <div className="text-center">
            <p className="mb-6 font-narrative leading-[2] text-dust">
              起訴書與不起訴處分書——兩份公文，一個案號，一個荒謬的結局。
            </p>
            <button
              type="button"
              onClick={() => setDecryptOpen(true)}
              className="cursor-pointer border border-crt-green-dim/50 bg-void px-6 py-3 font-document text-[0.85rem] tracking-[0.15em] text-crt-green-dim transition-all duration-300 hover:border-crt-green hover:text-crt-green hover:shadow-[0_0_20px_rgba(51,255,51,0.1)]"
            >
              啟動解密系統
            </button>
          </div>
        </ScrollReveal>

        <DecryptionInteraction
          open={decryptOpen}
          onClose={() => setDecryptOpen(false)}
        />

        {/* 3c: Statute comparison */}
        <ScrollReveal>
          <div className="space-y-4">
            <h3 className="font-heading text-[clamp(1.1rem,3vw,1.4rem)] font-bold text-paper-aged">
              遲來的正義？
            </h3>
            <p className="font-narrative leading-[2] text-dust">
              鄭南榕死後兩年，《懲治叛亂條例》才被廢止。又過了一年，刑法第100條才修正——
              增加「以強暴脅迫」要件，純粹言論不再構成叛亂。
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <StatuteComparison />
        </ScrollReveal>

        {/* Source attribution */}
        <ScrollReveal>
          <div className="font-document text-[0.65rem] tracking-wider text-stone/50">
            [來源：國家檔案局、國家人權記憶庫、促轉會調查報告]
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
