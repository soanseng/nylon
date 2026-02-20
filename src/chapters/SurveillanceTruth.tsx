import { useState, useEffect, useRef } from 'react'
import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'
import { DocumentPage } from '../components/narrative/DocumentPage'
import { Redacted } from '../components/narrative/Redacted'
import { PageCounter } from '../components/surveillance/PageCounter'
import { SurveillanceReportForm } from '../components/crt/SurveillanceReportForm'
import { IntelligenceOfficeScene } from '../components/pixel/scenes'
import { PixelSceneFrame } from '../components/pixel/PixelSceneFrame'
import { useScrollProgress } from '../hooks/useScrollProgress'
import {
  surveillanceRecords,
  surveillanceStats,
  surveillanceQuotes,
} from '../data/surveillance'

export function SurveillanceTruth() {
  const [reportOpen, setReportOpen] = useState(false)
  const { ref: sceneRef, progress: sceneProgress, isInView: sceneInView } = useScrollProgress()
  const [pagesViewed, setPagesViewed] = useState(0)
  const [counterVisible, setCounterVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Track section visibility for the floating page counter
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setCounterVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleRecordView = () => {
    setPagesViewed((prev) => prev + 1)
  }

  // Records with fullText for the file viewer
  const viewableRecords = surveillanceRecords.filter((r) => r.fullText)

  return (
    <>
      <div ref={sectionRef}>
        <Section id="surveillance-truth" background="void">
          <div className="mx-auto max-w-[640px] space-y-16">
            <ScrollReveal>
              <ChapterHeader
                label="CHAPTER 04"
                title="監控真相：5000頁的凝視"
                labelColor="text-surveillance-green"
              />
            </ScrollReveal>

            {/* 4a: Scale of surveillance */}
            <ScrollReveal>
              <div className="space-y-6 text-center">
                <div className="font-document text-[clamp(3rem,10vw,5rem)] font-bold leading-none text-surveillance-green/80">
                  {surveillanceStats.totalPages.toLocaleString()}
                </div>
                <p className="font-narrative text-[1rem] leading-[2] text-dust">
                  情治單位對鄭南榕的監控檔案超過五千頁。
                </p>
                <div className="mx-auto max-w-[400px] space-y-2 text-[0.85rem] text-stone">
                  <div className="flex justify-between border-b border-smoke/20 pb-1">
                    <span>監控機關</span>
                    <span className="text-surveillance-green">{surveillanceStats.agencies.length} 個</span>
                  </div>
                  <div className="flex justify-between border-b border-smoke/20 pb-1">
                    <span>監控期間</span>
                    <span className="text-surveillance-green">
                      {surveillanceStats.yearsActive.from}–{surveillanceStats.yearsActive.to}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-smoke/20 pb-1">
                    <span>死後仍持續監控</span>
                    <span className="text-seal-red">是</span>
                  </div>
                </div>
                <p className="font-narrative text-[0.85rem] text-stone">
                  如果每天讀十頁，要讀超過一年。
                </p>
              </div>
            </ScrollReveal>

            {/* Pixel art: intelligence office */}
            <div ref={sceneRef}>
              <PixelSceneFrame caption="青谷專案下的情報辦公室：每一份報告的另一端，都是一個人的日常">
                <IntelligenceOfficeScene progress={sceneProgress} isInView={sceneInView} />
              </PixelSceneFrame>
            </div>

            {/* Quote */}
            <ScrollReveal>
              <blockquote className="border-l-2 border-surveillance-green/40 pl-4">
                <p className="font-literary text-[clamp(0.9rem,2.5vw,1.05rem)] leading-[2.2] text-paper-aged">
                  {surveillanceQuotes[0].text}
                </p>
                <footer className="mt-2 font-document text-[0.7rem] text-stone/60">
                  — {surveillanceQuotes[0].source}
                </footer>
              </blockquote>
            </ScrollReveal>

            {/* 4b: Surveillance file viewer */}
            <ScrollReveal>
              <div className="space-y-4">
                <h3 className="font-heading text-[clamp(1.1rem,3vw,1.4rem)] font-bold text-paper-aged">
                  監控檔案
                </h3>
                <p className="font-narrative text-[0.85rem] leading-[2] text-dust">
                  以下為解密後的情報報告摘錄。黑條處可點擊揭露原文。
                </p>
              </div>
            </ScrollReveal>

            {/* File viewer: each record as a DocumentPage */}
            {viewableRecords.map((record) => (
              <ScrollReveal key={record.id}>
                <DocumentPage
                  classification="機密"
                  title={`${record.agency} — ${record.date}`}
                  stampText={record.isRedacted ? '部分遮蔽' : undefined}
                  marginNote={record.archiveRef}
                >
                  <div className="whitespace-pre-line font-document text-[0.8rem] leading-[2] text-ink/80">
                    {record.fullText!.split(/(\[■■■\])/).map((segment, i) =>
                      segment === '[■■■]' ? (
                        <Redacted key={i} permanent onReveal={handleRecordView}>
                          ■■■
                        </Redacted>
                      ) : (
                        <span key={i}>{segment}</span>
                      ),
                    )}
                  </div>
                </DocumentPage>
              </ScrollReveal>
            ))}

            {/* Post-death surveillance callout */}
            <ScrollReveal>
              <div className="border border-seal-red/20 bg-void/50 p-6">
                <p className="font-narrative text-[0.95rem] leading-[2] text-paper-aged">
                  {surveillanceQuotes[3].text}
                </p>
                <footer className="mt-3 font-document text-[0.7rem] text-stone/60">
                  — {surveillanceQuotes[3].source}
                </footer>
              </div>
            </ScrollReveal>

            {/* CRT 監控報告填寫 trigger */}
            <ScrollReveal>
              <div className="text-center">
                <p className="mb-6 font-narrative leading-[2] text-dust">
                  如果你是情報員，你會如何填寫這份報告？
                </p>
                <button
                  type="button"
                  onClick={() => setReportOpen(true)}
                  className="cursor-pointer border border-crt-green-dim/50 bg-void px-6 py-3 font-document text-[0.85rem] tracking-[0.15em] text-crt-green-dim transition-all duration-300 hover:border-crt-green hover:text-crt-green hover:shadow-[0_0_20px_rgba(51,255,51,0.1)]"
                >
                  啟動情報報告填寫系統
                </button>
              </div>
            </ScrollReveal>

            <SurveillanceReportForm
              open={reportOpen}
              onClose={() => setReportOpen(false)}
            />

            {/* Structural note */}
            <ScrollReveal>
              <div className="border-l-2 border-surveillance-green/30 pl-4">
                <p className="font-narrative text-[0.85rem] leading-[2] text-stone">
                  {surveillanceStats.structuralNote}
                </p>
              </div>
            </ScrollReveal>

            {/* Source attribution */}
            <ScrollReveal>
              <div className="font-document text-[0.65rem] tracking-wider text-stone/50">
                [來源：促轉會監控檔案、國家檔案局、蘇慶軒《監視怎麼做？》、林易澄《威權體制與失控的執行者》]
              </div>
            </ScrollReveal>
          </div>
        </Section>
      </div>

      <PageCounter current={pagesViewed} visible={counterVisible} />
    </>
  )
}
