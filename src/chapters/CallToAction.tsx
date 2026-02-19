import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'

const actionCards = [
  {
    title: '4月7日言論自由日',
    description: '2016年正式訂定。每年紀念鄭南榕為言論自由的犧牲。',
    icon: '📅',
  },
  {
    title: '參觀鄭南榕紀念館',
    description: '鄭南榕基金會保存了雜誌社原址，開放預約參觀。',
    icon: '🏛️',
  },
  {
    title: '促轉會資源',
    description: '線上查詢解密檔案，閱讀調查報告。',
    icon: '📁',
  },
  {
    title: '延伸閱讀',
    description: '《自由時代》數位典藏、相關書籍與紀錄片。',
    icon: '📚',
  },
]

export function CallToAction() {
  return (
    <Section id="call-to-action" background="ash" className="bg-gradient-to-b from-ash to-[#2A2418]">
      <div className="mx-auto max-w-[640px] space-y-12">
        <ScrollReveal>
          <ChapterHeader
            label="CHAPTER 06"
            title="行動呼籲：讓自由不再需要殉道"
            labelColor="text-amber"
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {actionCards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 100}>
              <div className="border border-amber/20 bg-void/30 p-5 transition-colors hover:border-amber/40">
                <div className="mb-2 text-[1.5rem]">{card.icon}</div>
                <h3 className="mb-2 font-heading text-[1rem] font-bold text-dawn">
                  {card.title}
                </h3>
                <p className="font-narrative text-[0.85rem] leading-[1.8] text-dust">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center font-document text-[0.65rem] tracking-[0.2em] text-stone/40">
            鄭南榕 (1947–1989) — 「剩下的，就是你們的事了。」
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
