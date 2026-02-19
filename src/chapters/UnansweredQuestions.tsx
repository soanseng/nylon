import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'
import { PixelArtScene } from '../components/pixel-art/PixelArtScene'
import { BurntEdgeCard } from '../components/interactive/BurntEdgeCard'
import charredOffice from '../assets/pixel-art/charred-office.png'

const mysteries = [
  {
    title: '謎團一：警方攻堅的決定',
    subtitle: '誰下令？為什麼選4月7日？',
    content: [
      '1989年4月7日上午，警方對《自由時代》雜誌社發動攻堅。但關於這次行動的諸多細節，至今仍存在爭議。',
      '誰做出攻堅的最終決定？為什麼選擇4月7日——自囚的第71天？攻堅策略是否適當？是否考慮過替代方案？',
      '時任刑事警察局侯友宜主導現場指揮。他在事後的說詞在不同場合有所出入。攻堅是否符合比例原則，始終是一個未被充分釐清的問題。',
    ],
    source: '[來源：政府檔案、基金會紀錄]',
  },
  {
    title: '謎團二：現場證據保存',
    subtitle: '哪些證據已永久損毀？',
    content: [
      '鄭南榕基金會保留了燒毀現場的原貌，供後人憑弔與研究。但官方的證據保全程序是否完善，一直受到質疑。',
      '火災現場的鑑識報告是否完整？有哪些物證在火災中永久損毀？現場重建是否能還原最後時刻的全貌？',
      '這些問題的答案，隨著時間流逝和當事人凋零，可能永遠無法完整回答。',
    ],
    source: '[來源：基金會紀錄]',
  },
  {
    title: '謎團三：監控檔案的解密',
    subtitle: '五千頁中，還有多少未曾公開？',
    content: [
      '促轉會徵集了超過五千頁的鄭南榕監控檔案，但解密並非一次完成。部分檔案至今仍受限於機密等級或保存狀況，無法公開。',
      '更令人不安的是：已被銷毀的檔案。我們永遠不知道，在那些消失的紙頁中，記錄了什麼——哪些行動曾被規劃？哪些決定曾被做出？',
      '國家的記憶有時選擇性地遺忘。而被遺忘的部分，往往正是最關鍵的。',
    ],
    source: '[來源：促轉會調查報告]',
  },
  {
    title: '謎團四：制度性責任',
    subtitle: '有沒有人為此負責？',
    content: [
      '高檢署發出「涉嫌叛亂」傳票的決定——明知二條一意味著唯一死刑——是誰簽核的？情治系統持續監控、升高對峙的過程中，有沒有人提出過異議？',
      '鄭南榕自焚後，國家以「被告死亡，不予起訴」結案。追訴他至死的法律機器，沒有任何一個零件為此承擔責任。',
      '1991年《懲治叛亂條例》廢止、1992年刑法第100條修正，被視為「遲來的正義」。但制度性的反省——對那些簽核文件、執行監控、推動起訴的個人——從未真正發生。',
    ],
    source: '[來源：促轉會調查報告、國家人權記憶庫]',
  },
]

export function UnansweredQuestions() {
  return (
    <Section id="unanswered-questions" background="ash">
      <div className="mx-auto max-w-[640px] space-y-16">
        <ScrollReveal>
          <ChapterHeader
            label="CHAPTER 05"
            title="未解之謎：燒焦的真相"
            labelColor="text-scorch"
          />
        </ScrollReveal>

        {/* Pixel art: charred office */}
        <ScrollReveal>
          <PixelArtScene
            src={charredOffice}
            alt="燒毀的辦公室——焦黑內部，倒塌傢俱剪影，一道從破窗射入的光束；無人物"
            caption="《自由時代》雜誌社內部：基金會保存了現場原貌至今"
          />
        </ScrollReveal>

        <ScrollReveal>
          <p className="font-narrative leading-[2] text-dust">
            火焰帶走了一個人的生命，卻沒有燒盡所有的疑問。
            三十多年後，這些問題依然沒有完整的答案。
          </p>
        </ScrollReveal>

        {/* Mystery cards */}
        <div className="space-y-4">
          {mysteries.map((mystery, i) => (
            <ScrollReveal key={mystery.title} delay={i * 80}>
              <BurntEdgeCard title={mystery.title} subtitle={mystery.subtitle}>
                <div className="space-y-3">
                  {mystery.content.map((para, j) => (
                    <p
                      key={j}
                      className="font-narrative text-[0.9rem] leading-[2] text-dust"
                    >
                      {para}
                    </p>
                  ))}
                  <div className="mt-2 font-document text-[0.65rem] text-stone/50">
                    {mystery.source}
                  </div>
                </div>
              </BurntEdgeCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing reflection */}
        <ScrollReveal>
          <blockquote className="border-l-2 border-scorch/40 pl-4">
            <p className="font-literary text-[clamp(0.95rem,2.5vw,1.1rem)] leading-[2.2] text-paper-aged">
              有些真相在火中燒成了灰。有些真相在檔案櫃中等待了三十年。
              還有一些真相，從未被寫成文字。
            </p>
          </blockquote>
        </ScrollReveal>

        {/* Source attribution */}
        <ScrollReveal>
          <div className="font-document text-[0.65rem] tracking-wider text-stone/50">
            [來源：促轉會調查報告、鄭南榕基金會紀錄、國家人權記憶庫]
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
