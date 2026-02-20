import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'
import { DayCounter } from '../components/timeline/DayCounter'
import { StandoffScene } from '../components/pixel/scenes'
import { PixelSceneFrame } from '../components/pixel/PixelSceneFrame'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { getEventsByDateRange } from '../data/timeline'
import { selfImprisonmentMeta } from '../data/selfImprisonment'

// Get key events for this chapter's date range
const keyEvents = getEventsByDateRange('1988-12-10', '1989-04-07')
  .filter(e => e.significance === 'high')

export function TheSeventyOneDays() {
  const sceneScroll = useScrollProgress()

  return (
    <Section id="the-71-days" background="void">
      <div className="mx-auto max-w-[640px] space-y-16">
        <ScrollReveal>
          <ChapterHeader
            label="CHAPTER 02"
            title="案發經過：從傳票到自焚的71天"
            labelColor="text-surveillance-green"
          />
        </ScrollReveal>

        {/* Key events timeline */}
        {keyEvents.map((event, index) => (
          <ScrollReveal key={event.date + index} delay={index * 100}>
            <div className="border-l-2 border-surveillance-green/30 pl-6">
              <div className="mb-1 font-document text-[0.75rem] tracking-[0.15em] text-surveillance-green">
                {event.date}
              </div>
              <h3 className="mb-2 font-heading text-[clamp(1rem,2.5vw,1.2rem)] font-bold text-paper-aged">
                {event.event}
              </h3>
              <p className="mb-1 font-narrative text-[0.95rem] leading-[2] text-dust">
                {event.source}
              </p>
            </div>
          </ScrollReveal>
        ))}

        {/* Day counter */}
        <ScrollReveal>
          <DayCounter day={selfImprisonmentMeta.totalDays} total={selfImprisonmentMeta.totalDays} />
        </ScrollReveal>

        {/* Pixel art: standoff */}
        <div ref={sceneScroll.ref}>
          <PixelSceneFrame caption="1989年1月27日至4月7日——71天的自囚與包圍">
            <StandoffScene progress={sceneScroll.progress} isInView={sceneScroll.isInView} />
          </PixelSceneFrame>
        </div>

        {/* Source attribution */}
        <ScrollReveal>
          <div className="font-document text-[0.65rem] tracking-wider text-stone/50">
            [來源：國家發展委員會檔案管理局、鄭南榕基金會]
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
