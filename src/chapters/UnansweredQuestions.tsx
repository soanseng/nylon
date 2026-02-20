import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'
import { BurntEdgeCard } from '../components/interactive/BurntEdgeCard'
import { CharredOfficeScene } from '../components/pixel/scenes'
import { PixelSceneFrame } from '../components/pixel/PixelSceneFrame'
import { useScrollProgress } from '../hooks/useScrollProgress'

const mysteries = [
  {
    title: '謎團一：攻堅決策',
    subtitle: '三種方案，為何選最激烈的？',
    content: [
      '高檢署簽發的限期拘票即將屆滿——這是攻堅的法律理由。但執行方式，有選擇。鄭南榕的女兒鄭竹梅在2022年揭露：當時規劃了三種方案——勸降、拖延、鎮暴。最終，警方選擇了最激烈的攻堅。',
      '4月7日上午7時30分，中山分局分局長王郡與刑事組長侯友宜召集值勤教育。部署近200人：刑事組、消防隊、霹靂小組。這不是一次逮捕行動的規模，而是一場軍事行動。',
      '警方在71天前就已掌握情報，知道鄭南榕準備了汽油桶、要以玉石俱焚方式抵抗。明知對方有自焚意圖，卻仍然選擇硬碰硬。學者林修正分析：這是「國民黨軍方保守勢力對台獨勢力的反撲」。',
      '侯友宜事後強調自己是「基層刑事組長，接受上面指示處理」。但「上面」是誰，至今沒有明確答案。2022年他對此事的回應是：「再來一次，仍依法行政。」',
    ],
    sources: [
      '[來源：中央社 2022.9.19、自由時報 2022.9.19、民報專文]',
    ],
  },
  {
    title: '謎團二：4月7日的早晨',
    subtitle: '從最後一個吻到反鎖房門',
    content: [
      '清晨6點，鄭南榕輕輕吻了身旁的葉菊蘭，叫她起床。7點又叫了一次。葉菊蘭匆匆離開雜誌社回家換衣服，準備上班。鄭南榕打了一通電話回家，問她為什麼沒講一聲就走。這是他最後的話。',
      '7時30分，王郡和侯友宜開始值勤前教育。8時55分，調查局人員同時撥打雜誌社電話，佯裝要訂閱雜誌——目的是癱瘓電話線路，阻止雜誌社向支持群眾求援。',
      '攻堅開始後，鄭南榕叫醒了仍留在雜誌社的4名員工、4名志工和9歲的女兒鄭竹梅，要求所有人立刻離開。他特別將女兒託付給總務主任邱美緣。這個動作，排除了一切「失手」的可能。',
      '警方用乙炔切割樓梯間的鐵門。志工向鐵門潑灑汽油阻止警方，但切割噴發的火花立刻引燃樓梯間。鄭南榕趁混亂之際，反身進入總編輯室，將門反鎖，引燃預先準備的汽油桶。消防人員隨後從資料室陽臺救出12人。火勢直到上午10點才完全撲滅。上午9點，葉菊蘭在廣播中聽見了噩耗。',
    ],
    sources: [
      '[來源：維基百科「鄭南榕」、鄭南榕基金會、新台灣和平基金會、ohsir.tw]',
    ],
  },
  {
    title: '謎團三：火場三說',
    subtitle: '自焚、失手、還是謀殺？',
    content: [
      '三十多年後，鄭南榕怎麼死的，仍然眾說紛紜。關於4月7日那天的真相，大致分成三種說法。',
      '自主說——也是目前歷史共識：鄭南榕決心殉道。遺體呈現「面部朝天，雙手平舉至胸前，全身繃縮並緊緊握拳」的姿勢，如同1963年越南僧人釋廣德自焚時的禪坐姿態。他事前將女兒託付他人、要求所有人離開——死意堅定，不是意外。',
      '失手說——當年官方媒體的主流敘事：鄭南榕投擲汽油彈時不慎自焚。但這個說法經不起查證。雜誌社的鐵窗全部加裝了細格鐵網，物理上不可能從內拋出任何東西。警方事後也未尋獲任何汽油彈的物證、照片或瓶身。刑事警官高仁和陳述「早上六點多聽見數聲巨響」，實為室內家電或家具爆炸，被誤報為汽油彈。',
      '謀殺說——反黨國勢力當年的懷疑：鄭南榕遭政治謀殺，遺體被布置成「自焚」的樣貌。《新新聞》在案發第一時間的報導中直言：「這件事情已染上政治色彩，甚至從某個角度而言，本身已是個政治事件」——大眾所熟悉的「自焚」說法，「不過是各方勢力選擇一個大家都能接受的故事罷了。」',
    ],
    sources: [
      '[來源：《新新聞》1989年報導、ohsir.tw、維基百科、Cofacts 查核]',
    ],
  },
  {
    title: '謎團四：現場證據',
    subtitle: '燒毀的、隱藏的、與消失的',
    content: [
      '政治影像工作者邱萬興是最早抵達現場的記者之一。他回顧當年親眼所見：「民權東路巷子兩邊佈滿鎮暴部隊，並無救護車、消防隊。」他的結論直接而尖銳：「侯是來殺人，不是來救人。」',
      '侯友宜將這次行動定調為「不成功的救援」。但同一個人帶了近200人、出動霹靂小組、用乙炔切割鐵門——這是「救援」的部署嗎？',
      '鄭南榕基金會保留了燒毀的總編輯室原貌至今，成為歷史的見證。但官方的火場鑑識報告是否完整、有哪些物證在大火中永久損毀，已無從查證。',
      '更深層的問題在五千頁之外。促轉會徵集了超過五千頁的鄭南榕監控檔案，但解密並非一次完成。部分檔案至今仍受限於機密等級。而已被銷毀的檔案——我們永遠不知道那些消失的紙頁中記錄了什麼。國家的記憶，有時選擇性地遺忘。',
    ],
    sources: [
      '[來源：Newtalk 讀者投書、促轉會調查報告、鄭南榕基金會]',
    ],
  },
  {
    title: '謎團五：制度性追問',
    subtitle: '至今，無人負責',
    content: [
      '高檢署發出「涉嫌叛亂」傳票的決定——明知二條一意味著唯一死刑——是誰簽核的？情治系統持續監控、升高對峙的71天中，有沒有任何一個人提出過異議？',
      '鄭南榕自焚後，國家以「被告死亡，不予起訴」結案。追訴他至死的法律機器——從簽發傳票的檢察官，到執行監控的情報員，到下令攻堅的長官——沒有任何一個零件為此承擔責任。',
      '侯友宜的說法歷經演變：從「一次不成功的救援」，到「不完美的救援」，到2022年的「再來一次，仍依法行政」。鄭南榕遺孀葉菊蘭感嘆：「家屬要的是事實，侯友宜說法是二度傷害。」鄭南榕基金會執行長劉璐娜則警示：「侯友宜並不可怕，可怕的是他代表的價值觀。」',
      '1991年《懲治叛亂條例》廢止、1992年刑法第100條修正，被視為「遲來的正義」。但制度性的反省——對那些簽核文件、執行監控、推動起訴的個人——從未真正發生。在法律和良知之間如何選擇，不只是歷史的問題，也是現在的問題。',
    ],
    sources: [
      '[來源：沃草 2022 報導、聯合新聞網、鄭南榕基金會聲明、國家人權記憶庫]',
    ],
  },
]

export function UnansweredQuestions() {
  const { ref: sceneRef, progress: sceneProgress, isInView: sceneInView } = useScrollProgress()

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
        <div ref={sceneRef}>
          <PixelSceneFrame caption="《自由時代》雜誌社內部：基金會保存了現場原貌至今">
            <CharredOfficeScene progress={sceneProgress} isInView={sceneInView} />
          </PixelSceneFrame>
        </div>

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
                  <div className="mt-2 space-y-0.5 font-document text-[0.65rem] text-stone/50">
                    {mystery.sources.map((src, k) => (
                      <div key={k}>{src}</div>
                    ))}
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
            [來源：促轉會調查報告、鄭南榕基金會紀錄、國家人權記憶庫、《新新聞》、中央社、自由時報、民報]
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
