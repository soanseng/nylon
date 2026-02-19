interface DayCounterProps {
  day: number
  total: number
  className?: string
}

export function DayCounter({ day, total, className = '' }: DayCounterProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="font-document text-[0.65rem] tracking-[0.3em] text-surveillance-green">
        自囚第
      </div>
      <div className="font-heading text-[clamp(3rem,12vw,6rem)] font-black leading-none text-paper-aged">
        {day}
      </div>
      <div className="font-document text-[0.65rem] tracking-[0.3em] text-surveillance-green">
        / {total} 天
      </div>
    </div>
  )
}
