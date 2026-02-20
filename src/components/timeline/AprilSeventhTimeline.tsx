// src/components/timeline/AprilSeventhTimeline.tsx
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
    </div>
  )
}
