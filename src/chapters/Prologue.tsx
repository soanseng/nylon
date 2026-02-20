import { useState, useEffect } from 'react'
import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { EditorsDeskScene } from '../components/pixel/scenes'
import { PixelSceneFrame } from '../components/pixel/PixelSceneFrame'
import { useScrollProgress } from '../hooks/useScrollProgress'

export function Prologue() {
  const [dateVisible, setDateVisible] = useState(false)
  const sceneScroll = useScrollProgress()

  useEffect(() => {
    const timer = setTimeout(() => setDateVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Section id="prologue" background="void" vignette>
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-12 text-center">
        {/* Pixel art scene */}
        <div ref={sceneScroll.ref}>
          <PixelSceneFrame caption="《自由時代》雜誌社總編輯室">
            <EditorsDeskScene progress={sceneScroll.progress} isInView={sceneScroll.isInView} />
          </PixelSceneFrame>
        </div>

        {/* Date reveal */}
        <div
          className={`font-document text-[clamp(2rem,8vw,4rem)] tracking-[0.3em] text-paper-aged transition-opacity duration-[2000ms] ${
            dateVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          1989.4.7
        </div>

        {/* Key quote */}
        <ScrollReveal delay={500}>
          <blockquote lang="zh-TW" className="font-literary text-[clamp(1.1rem,3.5vw,1.6rem)] leading-[2.2] tracking-[0.06em] text-paper-aged">
            「國民黨只能抓到我的屍體，抓不到我的人。」
          </blockquote>
          <div className="mt-4 font-document text-[0.7rem] tracking-[0.15em] text-stone">
            —— 鄭南榕 [來源：基金會]
          </div>
        </ScrollReveal>

        {/* Scroll hint */}
        <ScrollReveal delay={1000}>
          <div className="mt-8 font-document text-[0.6rem] tracking-[0.3em] text-stone/50">
            ↓ 向下捲動
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
