// src/components/timeline/AprilSeventhTimeline.tsx
import { getAprilSeventhTimeline } from '../../data/selfImprisonment'
import { ScrollReveal } from '../narrative/ScrollReveal'

const events = getAprilSeventhTimeline()
const AFTERMATH_TIMES = new Set(['09:15', '10:00', '22:00'])

export function AprilSeventhTimeline() {
  return (
    <div className="space-y-10">
      {/* Visual separator from preceding 71-day list */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-surveillance-green/20" />
        <span className="font-document text-[0.65rem] tracking-[0.2em] text-surveillance-green/60">
          第71天
        </span>
        <div className="h-px flex-1 bg-surveillance-green/20" />
      </div>

      {/* Part 1: Scene-setting */}
      <div className="space-y-3">
        <div className="font-document text-[0.7rem] tracking-[0.18em] text-surveillance-green">
          1989年4月7日（民國78年，星期五）
        </div>
        <p className="font-literary italic leading-[2.2] text-[clamp(0.95rem,2.2vw,1.05rem)] text-dust">
          深夜至拂曉——雜誌社裡還有10個人熬夜留宿：<br />
          鄭南榕一家、4名員工、5名志工。<br />
          沒有人知道今天是最後一天。
        </p>
      </div>

      {/* Part 2: Countdown strip */}
      <div className="space-y-6">
        {events.map((event, i) => {
          const isClimax = event.time === '09:10'
          const isAftermath = event.time !== undefined && AFTERMATH_TIMES.has(event.time)
          const timeLabel = event.time ?? '深夜'
          const hasExactTime = event.time !== undefined

          if (isClimax) {
            return (
              <div key={i} className="py-6 text-center space-y-4">
                <div className="h-px bg-ember/60" />
                <p className="font-narrative text-[clamp(1.05rem,2.5vw,1.25rem)] font-bold leading-[2] text-paper-aged">
                  {event.description}
                </p>
                <div className="h-px bg-ember/60" />
              </div>
            )
          }

          return (
            <ScrollReveal key={i}>
              <div
                className={`grid grid-cols-[4.5rem_1fr] gap-4 ${
                  isAftermath ? 'opacity-60' : ''
                }`}
              >
                {/* Time column */}
                <div
                  className={`pt-0.5 text-right font-document tracking-wider ${
                    hasExactTime
                      ? 'text-[0.72rem] text-dust'
                      : 'text-[0.65rem] text-stone'
                  }`}
                >
                  {timeLabel}
                </div>

                {/* Event column */}
                <div className="border-l border-surveillance-green/30 pl-5">
                  <p className="font-narrative text-[0.9rem] leading-[1.9] text-dust-light">
                    {event.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
