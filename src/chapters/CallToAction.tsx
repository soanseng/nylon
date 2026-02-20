import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'
import { Guestbook } from '../components/interactive/Guestbook'

const actionCards = [
  {
    title: '4月7日言論自由日',
    description: '2016年正式訂定。每年紀念鄭南榕為言論自由的犧牲。',
    icon: '📅',
    url: 'https://zh.wikipedia.org/zh-tw/%E8%A8%80%E8%AB%96%E8%87%AA%E7%94%B1%E6%97%A5',
  },
  {
    title: '參觀鄭南榕紀念館',
    description: '鄭南榕基金會保存了雜誌社原址，開放預約參觀。',
    icon: '🏛️',
    url: 'https://www.nylon.org.tw/main/index.php?option=com_content&view=article&id=151&Itemid=52',
  },
  {
    title: '促轉會資料典藏',
    description: '線上查詢促進轉型正義委員會解密檔案與調查報告。',
    icon: '📁',
    url: 'https://www.ey.gov.tw/tjb/A699EA3CE66CF4CF',
  },
  {
    title: '國家人權博物館',
    description: '白色恐怖景美紀念園區，保存威權時代政治迫害歷史現場。',
    icon: '🏛️',
    url: 'https://www.nhrm.gov.tw/w/nhrm/index',
  },
  {
    title: '鄭南榕基金會 YouTube',
    description: '影像紀錄、紀念活動、言論自由日相關影片典藏。',
    icon: '▶',
    url: 'https://www.youtube.com/@nylon407/videos',
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
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-amber/20 bg-void/30 p-5 transition-colors hover:border-amber/40"
              >
                <div className="mb-2 text-[1.5rem]">{card.icon}</div>
                <h3 className="mb-2 font-heading text-[1rem] font-bold text-dawn">
                  {card.title}
                </h3>
                <p className="font-narrative text-[0.85rem] leading-[1.8] text-dust">
                  {card.description}
                </p>
              </a>
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
                1980年，林義雄的母親和雙胞胎女兒遇害，至今未破案。1981年，在美國任教的陳文成被發現陳屍臺大校園，死因成謎。1984年，旅美作家劉宜良（江南）在自家車道被槍殺，幕後是情報局。這三個案件都發生在蔣經國執政時期——自由和民主，從來不是從天上掉下來的。
              </p>
              <p>
                1987年解嚴了。很多人以為噩夢結束了。但《懲治叛亂條例》還在，刑法第100條還在——發表文字，仍然可以被判死刑。1989年1月，高檢署對鄭南榕發出涉嫌叛亂的傳票，罪名是刊登一篇憲法草案。解嚴之後第二年，讀書仍然是會死人的。
              </p>
              <p>
                同一年，北京有六四。全世界看見了天安門廣場上的坦克和學生。但很少人注意到，在台灣，一個出版人在自己的雜誌社裡點燃了自己。1989年的中國和台灣，都在用人命的代價，叩問同一個問題：人民有沒有說話的權利？
              </p>
              <p>
                那個年代，只要稍微讀過書、稍微有點想法，你就可能成為下一份監控報告裡的名字。讀書是會死人的——不是比喻，是事實。我們架這個網站，就是因為今天的自由不是理所當然。它是林家的血、陳文成的墜落、劉宜良的槍響、鄭南榕的烈火，一條一條人命換來的。
              </p>
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
              製作者手記
            </h2>
            <div className="space-y-4 font-narrative text-[0.9rem] leading-[2] text-dust">
              <p>
                以前有人說，讀太多書會死掉——聽起來像是玩笑話。但仔細想想，這真的好恐怖。讀個書、說幾句自己的感想，可能就是唯一死刑的罪。被捉了面對的是死刑，那自焚又有什麼差別？
              </p>
              <p>
                鄭南榕自囚的那71天，橫跨了春節。他選擇留在雜誌社——一方面是抵抗，一方面，他也清楚知道自己的死期將近。我們現在以為解嚴就天下太平、什麼都可以說，才知道說錯話還是死路一條。飯可以隨便吃，書真的不能隨便讀——讀了書、有了思想、想說些什麼；說錯話，不只是你死，上有老母、下有妻兒，都要跟著活受罪。
              </p>
              <p>
                我是在做這個網站的過程中，才真正搞懂刑法100條和二條一是什麼。寫錯字、說錯話，就只有死路一條。寫這個網站，放到40年前，可能是極度危險的事情。
              </p>
              <p>
                1989年，不是只有天安門。那一年的台灣，也沒有好到哪裡去。
              </p>
            </div>

            <div className="my-6 w-12 border-t border-amber/20" />

            <p className="font-document text-[0.95rem] tracking-[0.2em] text-amber">
              Nec Tamen Consumebatur
            </p>
            <div className="space-y-4 font-narrative text-[0.9rem] leading-[2] text-dust">
              <p>
                「焚而不燬」出自聖經出埃及記第三章——摩西在西奈山見到荊棘被火燃燒，卻沒有燒盡。拉丁文：<em>Nec Tamen Consumebatur</em>。這四個字，是台灣基督長老教會的座右銘，從馬偕1865年登陸台灣，歷經日據、威權，從未熄滅。義光教會，林義雄的教會，1980年的那個傷痛之地，仍然在那裡。鄭南榕，1989年的烈火，燒掉的是他的身體——他說的那些話，沒有燒掉。
              </p>
              <p>
                <em>Nec Tamen Consumebatur</em>——這個域名還沒有人買。我就買下來，用 nectamen.com，來記錄2026年這個春節長假，我調查這段歷史的過程。
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
          <div className="space-y-6 border-t border-amber/10 pt-10">
            <h2 className="font-heading text-[1.1rem] font-bold text-dawn">資料來源</h2>
            <p className="font-narrative text-[0.8rem] leading-[1.8] text-stone">
              本站所有內容均來自以下公開文獻與政府解密檔案。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 font-document text-[0.65rem] tracking-[0.2em] text-amber/60 uppercase">
                  政府檔案 &amp; 國家機構
                </h3>
                <ul className="space-y-2">
                  {[
                    {
                      label: '國家人權記憶庫 — 二條一（懲治叛亂條例第二條第一項）',
                      url: 'https://memory.nhrm.gov.tw/NormalNode/Detail/81?MenuNode=14',
                    },
                    {
                      label: '國家人權記憶庫 — 懲治叛亂條例',
                      url: 'https://memory.nhrm.gov.tw/NormalNode/Detail/54?MenuNode=13',
                    },
                    {
                      label: '國家發展委員會檔案管理局 — 鄭南榕案（限制出境令、起訴書、不起訴處分書、電話監聽紀錄）',
                      url: 'https://art.archives.gov.tw/Theme.aspx?MenuID=591',
                    },
                    {
                      label: '促進轉型正義委員會 — 任務總結報告第二部：探求歷史真相與責任的開端',
                      url: 'https://gazette2.nat.gov.tw/EG_FileManager/eguploadpub/eg028098/ch01/type7/gov01/num2/Eg.htm',
                    },
                  ].map((item) => (
                    <li key={item.url} className="flex gap-2">
                      <span className="mt-[0.4em] shrink-0 font-document text-[0.6rem] text-amber/40">▸</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-narrative text-[0.8rem] leading-[1.8] text-dust/70 underline decoration-stone/20 underline-offset-2 transition-colors hover:text-amber/80 hover:decoration-amber/30"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-document text-[0.65rem] tracking-[0.2em] text-amber/60 uppercase">
                  促轉會委託研究
                </h3>
                <ul className="space-y-2">
                  {[
                    {
                      label: '蘇慶軒 — 監視怎麼做？以《青谷專案》中陳菊的動態為例',
                      url: 'https://www.ey.gov.tw/File/5B7CE33C62D860B8/17e2267f-6f00-4115-adc4-8923c27e99ca?A=C',
                    },
                    {
                      label: '林易澄 — 威權體制與失控的執行者：從情治檔案重探臺大哲學系事件',
                      url: 'https://www.ey.gov.tw/File/F095FEAD4592A5E3/d205cb11-9acf-4ea4-ac25-b07b06f6093d?A=C',
                    },
                  ].map((item) => (
                    <li key={item.url} className="flex gap-2">
                      <span className="mt-[0.4em] shrink-0 font-document text-[0.6rem] text-amber/40">▸</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-narrative text-[0.8rem] leading-[1.8] text-dust/70 underline decoration-stone/20 underline-offset-2 transition-colors hover:text-amber/80 hover:decoration-amber/30"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-document text-[0.65rem] tracking-[0.2em] text-amber/60 uppercase">
                  鄭南榕基金會論文徵選
                </h3>
                <ul className="space-y-2">
                  {[
                    {
                      label: '第二屆 — 100% 言論自由之時代意義與當今所面臨之挑戰',
                      url: 'https://www.nylon.org.tw/main/docs/scholarship/002.pdf',
                    },
                    {
                      label: '第三屆 — 鄭南榕政治主張與行動之研究',
                      url: 'https://www.nylon.org.tw/main/docs/scholarship/003.pdf',
                    },
                  ].map((item) => (
                    <li key={item.url} className="flex gap-2">
                      <span className="mt-[0.4em] shrink-0 font-document text-[0.6rem] text-amber/40">▸</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-narrative text-[0.8rem] leading-[1.8] text-dust/70 underline decoration-stone/20 underline-offset-2 transition-colors hover:text-amber/80 hover:decoration-amber/30"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-document text-[0.65rem] tracking-[0.2em] text-amber/60 uppercase">
                  出版書籍
                </h3>
                <ul className="space-y-2">
                  {[
                    {
                      label: '鄭南榕基金會（編）— 認識鄭南榕：看見《自由時代》總編輯的十一個面向（逗點文創結社，2025）',
                      url: 'https://www.commabooks.com.tw/book/2110',
                    },
                    {
                      label: '鄭南榕（著）— 本刊文責一律由總編輯鄭南榕負責：《自由時代》雜誌編輯室報告文選（逗點文創結社）',
                      url: 'https://www.commabooks.com.tw/book/833',
                    },
                    {
                      label: '鄭南榕 — 維基百科，自由的百科全書',
                      url: 'https://zh.wikipedia.org/zh-tw/%E9%84%AD%E5%8D%97%E6%A6%95',
                    },
                  ].map((item) => (
                    <li key={item.url} className="flex gap-2">
                      <span className="mt-[0.4em] shrink-0 font-document text-[0.6rem] text-amber/40">▸</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-narrative text-[0.8rem] leading-[1.8] text-dust/70 underline decoration-stone/20 underline-offset-2 transition-colors hover:text-amber/80 hover:decoration-amber/30"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="border-t border-smoke/20 pt-16">
            <Guestbook />
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
