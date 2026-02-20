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
          <div className="space-y-6 border-t border-amber/10 pt-10">
            <h2 className="font-heading text-[1.1rem] font-bold text-dawn">
              為什麼要架這個網站
            </h2>
            <div className="space-y-4 font-narrative text-[0.9rem] leading-[2] text-dust">
              <p>
                這是一個以沉浸式互動體驗呈現鄭南榕事件的網站。我們不虛構、不推測、不煽動——網站中的每一句話，都來自政府公開的解密檔案與鄭南榕基金會的典藏資料。我們相信，對抗歷史遺忘最有力的方式，是讓更多人讀到原始史料。
              </p>
              <p>
                本站以「紙上死刑」為設計核心——恐怖不是烈火，而是官僚體制：公文裡的冷漠措辭、五千頁的監控紀錄、一條規定「發表這些文字→死刑」的法條、以及七十一天的自我囚禁。我們希望讓現代訪客「體感」那個年代的窒息——
              </p>
              <p className="border-l-2 border-amber/30 pl-4 font-literary text-[1rem] text-fluorescent">
                解嚴之後，言論仍然是叛亂。唯一的刑罰仍然是死刑。
              </p>
              <p>
                鄭南榕不是用死亡換取自由，而是用行動告訴我們：自由不是被給予的，而是必須被堅持的。這個網站的存在，是為了讓更多人記住這段歷史，理解今日我們習以為常的言論自由，是多少人用生命換來的。
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="space-y-6 border-t border-amber/10 pt-10">
            <h2 className="font-heading text-[1.1rem] font-bold text-dawn">
              系列網站
            </h2>
            <p className="font-narrative text-[0.85rem] leading-[1.8] text-dust">
              本站為「台灣威權時代重大案件」互動式歷史紀錄系列之一：
            </p>
            <div className="grid gap-2">
              {[
                { name: '林宅血案', url: 'https://soanseng.github.io/the-lin/' },
                { name: '陳文成事件', url: 'https://soanseng.github.io/Chen-Wen-chen/' },
                { name: '鄭南榕事件（本站）', url: 'https://soanseng.github.io/nylon/', isCurrent: true },
                { name: '江南案', url: 'https://soanseng.github.io/henry-liu-case/' },
              ].map((site) => (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block border p-3 transition-colors ${
                    site.isCurrent
                      ? 'border-amber/30 bg-amber/5 text-dawn'
                      : 'border-stone/20 bg-void/20 text-dust hover:border-stone/40'
                  }`}
                >
                  <span className="font-narrative text-[0.85rem]">{site.name}</span>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="space-y-4 border-t border-amber/10 pt-10">
            <h2 className="font-heading text-[1.1rem] font-bold text-dawn">
              製作團隊
            </h2>
            <div className="space-y-2">
              <p className="font-narrative text-[0.9rem] font-bold text-dust">陳璿丞 醫師</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://anatomind.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-narrative text-[0.85rem] text-amber/80 hover:text-amber"
                >
                  anatomind.com
                </a>
                <a
                  href="https://facebook.com/anatomind"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-narrative text-[0.85rem] text-amber/80 hover:text-amber"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center font-document text-[0.65rem] tracking-[0.2em] text-stone/40">
            鄭南榕 (1947–1989) — 「剩下的，就是你們的事了。」
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
