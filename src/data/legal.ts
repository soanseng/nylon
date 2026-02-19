/**
 * legal.ts — Application-layer data for legal statutes, prosecution documents,
 * and interactive statute-application scenarios.
 *
 * All content sourced from:
 * - 國家人權記憶庫（National Human Rights Museum Memory Archive）
 * - 國家發展委員會檔案管理局（National Archives Administration）
 * - 財團法人鄭南榕基金會（Nylon Cheng Liberty Foundation）
 *
 * Attribution tags:
 *   [來源：政府檔案] = government documents / official archives
 *   [來源：基金會]   = Foundation archives / primary sources
 *   [來源：學術]     = peer-reviewed academic analysis
 */

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------------

export type StatuteStatus = 'active' | 'repealed' | 'amended'

export type PenaltyType = 'death' | 'imprisonment' | 'fine' | 'exile'

export type AgencyCode =
  | '國安局'   // National Security Bureau
  | '調查局'   // Investigation Bureau
  | '警總'     // Taiwan Garrison Command
  | '高檢署'   // Supreme Prosecutors Office (Taiwan High Court Prosecutors)
  | '軍事法庭' // Military Tribunal

/** A single article within a statute. */
export interface StatuteArticle {
  /** Article identifier, e.g. "第二條第一項" */
  id: string
  /** Short vernacular label, e.g. "二條一" */
  shortLabel?: string
  /** Full original text of the article (Traditional Chinese) */
  text: string
  /** English summary */
  summaryEn: string
  /** Penalty categories triggered by this article */
  penalties: PenaltyType[]
  /** Whether judges retain any sentencing discretion */
  mandatoryPenalty: boolean
  /** Explanatory notes */
  notes?: string
}

/** A complete statute (law / decree). */
export interface Statute {
  id: string
  /** Official title in Traditional Chinese */
  title: string
  /** Official title in English */
  titleEn: string
  /** Date the statute came into force (ISO 8601) */
  effectiveDate: string
  /** Date the statute was repealed or amended (ISO 8601), null if still active */
  endDate: string | null
  status: StatuteStatus
  /** Brief description of why the statute ended, if applicable */
  endReason?: string
  /** All articles (or the most legally significant subset) */
  articles: StatuteArticle[]
  /** High-level narrative summary for site copy */
  summary: string
  summaryEn: string
  /** Attribution source tag */
  source: string
}

/** A single event in the prosecution timeline. */
export interface ProsecutionEvent {
  /** ISO 8601 date */
  date: string
  /** Optional time (HH:MM local time) */
  time?: string
  /** Short label for timeline display (Traditional Chinese) */
  label: string
  /** Full description (Traditional Chinese) */
  description: string
  /** English description */
  descriptionEn: string
  /** Applicable statutes at this moment */
  applicableStatutes?: string[]
  /** Category for visual differentiation */
  category: 'publication' | 'summons' | 'selfImprisonment' | 'immolation' | 'closure' | 'legalReform'
  /** Attribution source tag */
  source: string
  /** Whether this event should be highlighted as a key moment */
  isKeyMoment: boolean
}

/** One scenario for the 法條適用判斷 (Statute Application Judgment) mini-interaction. */
export interface LegalScenario {
  id: string
  /** Display number (1-based) */
  order: number
  /** Year the scenario is set in */
  year: number
  /**
   * The scenario description shown to the user before they make their judgment
   * (Traditional Chinese).
   */
  description: string
  descriptionEn: string
  /** The act described (short phrase) */
  actLabel: string
  /** The applicable statute article id(s) */
  applicableStatuteIds: string[]
  /** Human-readable statute reference for display */
  applicableStatuteLabel: string
  /** The resulting sentence */
  sentence: string
  sentenceEn: string
  /** Text shown on/after the verdict stamp */
  verdictText: string
  /** Whether this triggers the 唯一死刑 stamp animation */
  isDeathSentence: boolean
  /**
   * Explanatory text shown after verdict — connects the scenario to the
   * Cheng Nan-jung case and/or the broader legal context.
   */
  explanation: string
  explanationEn: string
  /**
   * The legal reasoning chain (for display in expanded view).
   * Each step is a string: "act → charge → statute → outcome"
   */
  legalChain: string[]
  /** Attribution */
  source: string
}

/** The direct legal logic chain applied to the Cheng Nan-jung prosecution. */
export interface ChengProsecutionChain {
  /** The triggering publication */
  triggeringAct: string
  triggeringActEn: string
  /** The legal charge derived from the act */
  charge: string
  chargeEn: string
  /** The primary criminal code article invoked */
  primaryStatuteId: string
  primaryStatuteLabel: string
  /** The special act that elevated the sentence to mandatory death */
  elevatingStatuteId: string
  elevatingStatuteLabel: string
  /** The outcome under the combined statutes */
  outcome: string
  outcomeEn: string
  /** Legal chain as display steps */
  chain: Array<{
    step: number
    label: string
    labelEn: string
    detail: string
    statueRef?: string
  }>
  /** Government archive reference */
  archiveRef: string
  source: string
}

// ---------------------------------------------------------------------------
// STATUTES
// ---------------------------------------------------------------------------

/**
 * 懲治叛亂條例
 * Punishment of Rebellion Act (1949–1991)
 *
 * Source: 國家人權記憶庫《懲治叛亂條例》條目，撰寫者：劉恆妏、劉后安
 * [來源：政府檔案]
 */
export const punishmentOfRebellionAct: Statute = {
  id: 'punishment-of-rebellion-act',
  title: '懲治叛亂條例',
  titleEn: 'Punishment of Rebellion Act',
  effectiveDate: '1949-06-21',
  endDate: '1991-05-22',
  status: 'repealed',
  endReason:
    '1991年5月因清華大學「獨立臺灣會案」引發大規模民間抗議，立法院三讀通過廢止，' +
    '由總統李登輝明令廢止。施行期間共42年。',
  summary:
    '《懲治叛亂條例》是白色恐怖時期最重要的特別刑法，制定公布於1949年6月21日，' +
    '施行長達42年，直至1991年5月22日廢止。全文共13條，' +
    '第二條第一項（「二條一」）被民間稱為「最令人聞之色變的法律條文」——' +
    '對四類刑法罪行一律處以死刑，法官完全喪失量刑裁量空間。' +
    '解嚴（1987年7月15日）並未廢止本條例，「二條一」在解嚴後繼續適用長達四年。',
  summaryEn:
    'The Punishment of Rebellion Act was the most important special criminal law of the White Terror era, ' +
    'enacted on June 21, 1949 and remaining in force for 42 years until May 22, 1991. ' +
    'Its Article 2, Paragraph 1 ("Article 2-1") imposed a mandatory death sentence for four categories ' +
    'of criminal offenses, stripping judges of all sentencing discretion. ' +
    'The lifting of martial law on July 15, 1987 did not repeal this Act; ' +
    'Article 2-1 continued to apply for four years after martial law ended.',
  source: '國家人權記憶庫《懲治叛亂條例》條目，撰寫者：劉恆妏、劉后安 [來源：政府檔案]',
  articles: [
    {
      id: 'pra-art-1',
      text:
        '叛亂罪犯適用本條例懲治之。' +
        '本條例稱叛徒者，指犯第二條各項罪行之人而言。',
      summaryEn:
        'Article 1 — Scope: Rebellion criminals are punished under this Act. ' +
        '"Rebel" refers to anyone who commits the offenses listed in Article 2.',
      penalties: [],
      mandatoryPenalty: false,
      notes:
        '「叛亂罪犯」範圍較廣，包含「叛徒」（第2條）及違反第3–7條所列罪行之人。',
    },
    {
      id: 'pra-art-2-1',
      shortLabel: '二條一',
      text:
        '犯刑法第一百條第一項、第一百零一條第一項、' +
        '第一百零三條第一項、第一百零四條第一項之罪者，處死刑。',
      summaryEn:
        'Article 2, Paragraph 1 ("Article 2-1") — Mandatory death sentence: ' +
        'Anyone who commits the crimes under Criminal Code Articles 100(1), 101(1), 103(1), or 104(1) ' +
        'shall be sentenced to death. ' +
        'This eliminated all judicial discretion — judges had no power to impose any lesser sentence.',
      penalties: ['death'],
      mandatoryPenalty: true,
      notes:
        '「二條一」將《刑法》上開條文原本規定的刑度（死刑、無期徒刑或一定期限之有期徒刑），' +
        '限縮為唯一死刑。「法官對於上述各項犯罪行為之處罰，絲毫沒有得視犯罪情節輕重而' +
        '加以裁量減輕之空間，而一概均須科處死刑。」' +
        '——劉恆妏、劉后安，國家人權記憶庫「二條一」條目',
    },
    {
      id: 'pra-art-2-others',
      text: '（第二條其他各項：幫助叛亂、交付、投降等行為之刑責）',
      summaryEn:
        'Article 2, other paragraphs — Other rebellion offenses (aiding, surrendering, etc.) ' +
        'carrying death, life imprisonment, or fixed-term imprisonment.',
      penalties: ['death', 'imprisonment'],
      mandatoryPenalty: false,
    },
    {
      id: 'pra-art-3',
      text: '（第三條：交付或投降叛徒罪——處刑包含死刑）',
      summaryEn:
        'Article 3 — Surrendering to or delivering assets to rebels; ' +
        'may trigger mandatory asset confiscation under Article 8.',
      penalties: ['death', 'imprisonment'],
      mandatoryPenalty: false,
    },
    {
      id: 'pra-art-4',
      text:
        '（第四條：幫助叛徒罪）' +
        '為叛徒招募兵伕、徵募財物或供給金錢資產、包庇或藏匿叛徒者，' +
        '處死刑、無期徒刑或十年以上有期徒刑。',
      summaryEn:
        'Article 4 — Aiding rebels: recruiting soldiers, supplying funds, ' +
        'or harboring rebels. Penalty: death, life imprisonment, or 10+ years imprisonment.',
      penalties: ['death', 'imprisonment'],
      mandatoryPenalty: false,
      notes:
        '第4條第1項第1–10款所列罪行可觸發第8條「沒收全部財產」。' +
        '讀者、訂閱者、廣告商均可能因「供給資產」而入罪。',
    },
    {
      id: 'pra-art-5',
      text:
        '（第五條：參加叛亂組織罪）' +
        '參加叛亂組織或集會者，處無期徒刑或十年以上有期徒刑。',
      summaryEn:
        'Article 5 — Joining a rebellion organization or assembly: ' +
        'life imprisonment or 10+ years. "Rebellion organization" was broadly interpreted ' +
        'to include reading groups and Taiwan independence organizations.',
      penalties: ['imprisonment'],
      mandatoryPenalty: false,
      notes:
        '大法官釋字第68號確立「繼續犯」原則：曾參加者，除非自首或有確切脫離證明，' +
        '一律視為繼續參加。讀書會、台獨組織均可構成「叛亂組織」。' +
        '實務上文字宣傳行為可與本條合用，升格論以「二條一」唯一死刑。',
    },
    {
      id: 'pra-art-7',
      text: '（第七條：以文字宣傳罪）以文字從事叛亂宣傳者。',
      summaryEn:
        'Article 7 — Seditious propaganda in writing. ' +
        'In practice, combined with Article 5 and elevated to Article 2-1 mandatory death ' +
        'via administrative interpretation.',
      penalties: ['imprisonment'],
      mandatoryPenalty: false,
      notes:
        '行政解釋函令：「參加叛亂之組織，而後從事以文字為匪宣傳工作，' +
        '則其一貫之叛亂犯行已達於以非法之方法，著手實行顛覆政府之程度，' +
        '應構成懲治叛亂條例第二條之罪。」——使出版物的每一頁都成為潛在死刑依據。',
    },
    {
      id: 'pra-art-8',
      text:
        '（第八條：沒收財產——1950年修正新增）' +
        '對叛徒罪、投降叛徒罪、直接或間接圖利叛徒罪之人，' +
        '除自首或反正來歸者外，得宣告沒收全部財產；' +
        '尚未逮捕甚至已死亡者，只要罪證明確，亦得沒收。',
      summaryEn:
        'Article 8 (added 1950) — Confiscation of all property: ' +
        'applies even to those not yet arrested or already deceased. ' +
        'Cheng Nan-jung\'s estate remained legally at risk under this provision.',
      penalties: ['fine'],
      mandatoryPenalty: false,
      notes: '鄭南榕死亡後，遺屬在法律上仍面臨財產被沒收的風險，直至1991年本條例廢止。',
    },
    {
      id: 'pra-art-9',
      text:
        '（第九條：感化教育——1950年修正新增）' +
        '縱使因自首、反正來歸或檢舉有功而不起訴或減免其刑，' +
        '仍得施以三年以下感化教育。',
      summaryEn:
        'Article 9 (added 1950) — Re-education: ' +
        'even those whose charges are dropped or sentences reduced via self-reporting ' +
        'may still be subjected to up to 3 years of "corrective education."',
      penalties: ['imprisonment'],
      mandatoryPenalty: false,
    },
    {
      id: 'pra-art-10',
      text:
        '（第十條：軍事審判）' +
        '在戒嚴區域內犯本條例之罪者，不問身分是否為軍人，' +
        '一概交由軍事機關審判。',
      summaryEn:
        'Article 10 — Military tribunal jurisdiction: ' +
        'anyone accused of offenses under this Act within the martial law zone (all of Taiwan until 1987) ' +
        'is tried by military courts, regardless of civilian status.',
      penalties: [],
      mandatoryPenalty: false,
      notes:
        '台灣地區直到1987年7月15日解嚴前，所有案件（含一般平民）均可交軍法審判，' +
        '繞過一般司法程序。',
    },
    {
      id: 'pra-art-11',
      text:
        '（第十一條：現行犯緊急處置）' +
        '犯本條例專科死刑之現行犯，得予以緊急處置。',
      summaryEn:
        'Article 11 — Emergency measures for current offenders: ' +
        'those caught in the act of committing offenses punishable by death may be subjected ' +
        'to immediate emergency measures (i.e., summary execution).',
      penalties: ['death'],
      mandatoryPenalty: false,
      notes:
        '此條款為1989年4月7日警方攻堅《自由時代》雜誌社的法律授權背景之一。',
    },
  ],
}

/**
 * 刑法第100條（1992年修正前原文）
 * Criminal Code Article 100 — Pre-1992 text (Ordinary Sedition)
 *
 * Source: 國家人權記憶庫《懲治叛亂條例》條目；
 *         「100%言論自由」之時代意義與當今所面臨之挑戰（論文，腳注1）
 * [來源：政府檔案] [來源：學術]
 */
export const criminalCodeArt100Pre1992: Statute = {
  id: 'criminal-code-art-100-pre-1992',
  title: '中華民國刑法第一百條（1992年修正前）',
  titleEn: 'Criminal Code Article 100 — Original text (before 1992 amendment)',
  effectiveDate: '1935-01-01',
  endDate: '1992-05-16',
  status: 'amended',
  endReason:
    '1992年5月16日（民國81年）修正，增加「以強暴脅迫」要件，' +
    '使純粹言論行為不再構成普通內亂罪。',
  summary:
    '刑法第100條第1項（普通內亂罪）的構成要件極為寬泛：' +
    '「意圖破壞國體，竊據國土，或以非法之方法變更國憲，顛覆政府，而著手實行者」，' +
    '並未具體規定「著手實行何種行為」——不論行為人是否採取暴力手段，' +
    '只要具有上述意圖並「著手實行」，即可能入罪。' +
    '在《懲治叛亂條例》第二條第一項的特別法優先適用下，刑責被限縮為唯一死刑。' +
    '主張台灣獨立、主張修憲或制憲、批評總統等言論，均可能構成本罪。',
  summaryEn:
    'The pre-1992 version of Criminal Code Article 100(1) ("Ordinary Sedition") had an extremely broad scope: ' +
    'it criminalized intent to "destroy national polity, seize national territory, or unlawfully change ' +
    'the constitution or overthrow the government" — without requiring any violent means. ' +
    'Under the superior-law priority of Punishment of Rebellion Act Article 2-1, ' +
    'the sentence was elevated to mandatory death. ' +
    'Advocating Taiwan independence, constitutional reform, or criticizing the president ' +
    'could all constitute this offense.',
  source:
    '國家人權記憶庫《懲治叛亂條例》條目；' +
    '「100%言論自由」之時代意義與當今所面臨之挑戰（腳注1） [來源：政府檔案] [來源：學術]',
  articles: [
    {
      id: 'cc100-pre-art-1',
      text:
        '意圖破壞國體，竊據國土，或以非法之方法變更國憲，顛覆政府，' +
        '而著手實行者，處七年以上有期徒刑；首謀者，處無期徒刑。',
      summaryEn:
        'Article 100(1) pre-1992: Anyone who, with intent to destroy the national polity, ' +
        'seize national territory, or unlawfully change the constitution or overthrow the government, ' +
        'commences such acts, shall be sentenced to imprisonment of seven years or more; ' +
        'ringleaders to life imprisonment. ' +
        'Combined with Punishment of Rebellion Act Article 2-1: mandatory death sentence.',
      penalties: ['death', 'imprisonment'],
      mandatoryPenalty: false,
      notes:
        '在《懲治叛亂條例》「二條一」的特別法優先適用下，' +
        '本條原定刑度（七年以上有期徒刑、無期徒刑）被全部限縮為唯一死刑。\n' +
        '「即便是在報章雜誌上發表言論，或是於競選公職過程中提出政見，鼓吹或主張諸如' +
        '臺灣獨立（「竊據國土」）、修改憲法甚或制憲（「變更國憲」）、以及批評總統等' +
        '國家領導人（「顛覆政府」）等行為，都有可能構成此項「普通內亂罪」，' +
        '而遭到科處唯一死刑的命運。」\n' +
        '——國家人權記憶庫《懲治叛亂條例》條目，撰寫者：劉恆妏、劉后安',
    },
    {
      id: 'cc100-pre-art-2',
      text: '預備犯前項之罪者，處六月以上五年以下有期徒刑。',
      summaryEn:
        'Article 100(2) pre-1992: Preparation to commit the above offense: ' +
        '6 months to 5 years imprisonment.',
      penalties: ['imprisonment'],
      mandatoryPenalty: false,
    },
  ],
}

/**
 * 刑法第100條（1992年修正後）
 * Criminal Code Article 100 — Post-1992 amended text
 *
 * Source: 國家人權記憶庫《懲治叛亂條例》條目 [來源：政府檔案]
 */
export const criminalCodeArt100Post1992: Statute = {
  id: 'criminal-code-art-100-post-1992',
  title: '中華民國刑法第一百條（1992年5月16日修正後）',
  titleEn: 'Criminal Code Article 100 — Post-1992 amendment',
  effectiveDate: '1992-05-16',
  endDate: null,
  status: 'active',
  summary:
    '1992年5月16日修正後，刑法第100條增加「以強暴脅迫」要件，' +
    '使純粹言論（如刊登憲法草案）不再構成普通內亂罪。' +
    '此修正是「獨台會案」（1991）後在社會壓力下完成的立法改革，' +
    '終結了「言論即叛亂」的法律時代。',
  summaryEn:
    'The 1992 amendment added the requirement of "violence or coercion," ' +
    'ending the criminalization of pure speech acts such as publishing a draft constitution. ' +
    'This reform was achieved under sustained public pressure following the Nylon Cheng case (1989) ' +
    'and the Independent Taiwan Case (1991).',
  source: '國家人權記憶庫《懲治叛亂條例》條目 [來源：政府檔案]',
  articles: [
    {
      id: 'cc100-post-art-1',
      text:
        '意圖以強暴脅迫使中華民國憲法所規定之政府機制停止運作，' +
        '而以強暴脅迫著手實行者，處七年以上有期徒刑；首謀者，處無期徒刑。',
      summaryEn:
        'Article 100(1) post-1992: Intent to use violence or coercion to halt ' +
        'constitutional government functions, AND commencing such acts through violence or coercion: ' +
        '7+ years imprisonment; ringleaders: life. ' +
        'Key change: pure speech (without violence/coercion) is no longer criminal.',
      penalties: ['imprisonment'],
      mandatoryPenalty: false,
      notes:
        '修正前後關鍵差異：\n' +
        '修正前：「著手實行者」（任何形式的「實行」均可入罪，包含言論出版）\n' +
        '修正後：「以強暴脅迫著手實行者」（必須有暴力或脅迫行為才構成犯罪）\n\n' +
        '在今日台灣，刊登《台灣共和國憲法草案》完全合法。' +
        '但在1989年，此行為足以讓鄭南榕被判處死刑。',
    },
    {
      id: 'cc100-post-art-2',
      text: '預備犯前項之罪者，處六月以上五年以下有期徒刑。',
      summaryEn:
        'Article 100(2) post-1992: Preparation of the above offense: 6 months to 5 years.',
      penalties: ['imprisonment'],
      mandatoryPenalty: false,
    },
  ],
}

// ---------------------------------------------------------------------------
// CONSOLIDATED STATUTE MAP (for lookup by id)
// ---------------------------------------------------------------------------

export const statutes: Record<string, Statute> = {
  [punishmentOfRebellionAct.id]: punishmentOfRebellionAct,
  [criminalCodeArt100Pre1992.id]: criminalCodeArt100Pre1992,
  [criminalCodeArt100Post1992.id]: criminalCodeArt100Post1992,
}

// ---------------------------------------------------------------------------
// PROSECUTION TIMELINE
// ---------------------------------------------------------------------------

/**
 * Key events in the prosecution and legal aftermath of the Cheng Nan-jung case.
 *
 * Sources:
 *   - 國家檔案 4.5.17-3（起訴文件）[來源：政府檔案]
 *   - 國家檔案 4.5.17-4（不起訴處分書）[來源：政府檔案]
 *   - 國家人權記憶庫「二條一」條目 [來源：政府檔案]
 *   - 「100%言論自由」之時代意義與當今所面臨之挑戰（論文，p. 4）[來源：學術]
 */
export const prosecutionTimeline: ProsecutionEvent[] = [
  {
    date: '1988-12-10',
    label: '《自由時代》第254期出版',
    description:
      '《自由時代》週刊第254期出版，刊載許世楷起草之〈台灣新憲法草案〉（欄目「台獨風雲」），' +
      '頁70，雜誌底部印有確切出版日期「1988.12.10」。' +
      '此為臺灣高等法院檢察署起訴的直接觸發事件。',
    descriptionEn:
      'Freedom Era Weekly Issue 254 is published, carrying Hsu Shih-kai\'s ' +
      '"Draft Constitution of the Taiwan Republic" under the column "Taiwan Independence Storm," page 70. ' +
      'This publication becomes the direct trigger for the sedition prosecution.',
    applicableStatutes: ['pra-art-2-1', 'cc100-pre-art-1'],
    category: 'publication',
    source:
      '國家檔案 4.5.17-3（週刊第254期掃描頁底部印記）；' +
      '「100%言論自由」之時代意義與當今所面臨之挑戰, p. 4 [來源：政府檔案]',
    isKeyMoment: true,
  },
  {
    date: '1989-01-21',
    label: '高檢署發出叛亂傳票',
    description:
      '臺灣高等法院檢察署（高檢署）正式發出涉嫌叛亂傳票（案號：78偵1叛亂，' +
      '檔號：A311900000F/0078/檔偵/000001/1/002），' +
      '以刑法第100條「意圖竊據國土」（普通內亂罪）為由，' +
      '並適用《懲治叛亂條例》第二條第一項，鄭南榕面臨唯一死刑。\n\n' +
      '鄭南榕聲明：「國民黨只能抓到我的屍體，抓不到我的人。」',
    descriptionEn:
      'The Taiwan High Court Prosecutors Office issues a sedition summons (Case No. 78 Investigation 1 Rebellion, ' +
      'Archive No. A311900000F/0078/檔偵/000001/1/002). ' +
      'The charge: publishing the draft constitution constitutes "intent to seize national territory" ' +
      'under Criminal Code Article 100(1), elevated to mandatory death by Punishment of Rebellion Act Article 2-1. ' +
      'Cheng declares: "The KMT can only arrest my corpse — they cannot arrest me."',
    applicableStatutes: ['pra-art-2-1', 'cc100-pre-art-1'],
    category: 'summons',
    source:
      '國家檔案 4.5.17-3（TXT元數據）；' +
      '「100%言論自由」之時代意義與當今所面臨之挑戰, p. 4 [來源：政府檔案]',
    isKeyMoment: true,
  },
  {
    date: '1989-01-27',
    label: '鄭南榕宣布自囚',
    description:
      '鄭南榕宣布「自囚」於《自由時代》雜誌社，拒絕出庭受審，' +
      '以身體的自由對抗國家以法律為武器的追訴。' +
      '自囚期間持續撰寫文章、接受訪問、通訊聯絡，' +
      '記錄並宣揚言論自由理念。自囚共71天。',
    descriptionEn:
      'Cheng Nan-jung announces his "self-imprisonment" at the Freedom Era Weekly offices, ' +
      'refusing to appear in court. He continues writing, receiving visitors, and corresponding, ' +
      'documenting and publicizing his commitment to freedom of speech. The self-confinement lasts 71 days.',
    category: 'selfImprisonment',
    source: '鄭南榕基金會典藏；「100%言論自由」之時代意義與當今所面臨之挑戰, p. 4 [來源：基金會]',
    isKeyMoment: true,
  },
  {
    date: '1989-04-07',
    time: '09:10',
    label: '鄭南榕自焚',
    description:
      '1989年4月7日上午，警方攻堅《自由時代》雜誌社。' +
      '鄭南榕以自焚抵抗逮捕，於上午9時10分自焚。' +
      '叛亂案被告因死亡，依刑事訴訟法構成不起訴法定事由。\n\n' +
      '國民黨確實「只抓到了屍體」。',
    descriptionEn:
      'April 7, 1989: Police storm the Freedom Era Weekly offices. ' +
      'Cheng Nan-jung self-immolates at 09:10 AM to resist arrest. ' +
      'His death becomes the legally mandated grounds for closing the sedition case.',
    applicableStatutes: ['pra-art-11'],
    category: 'immolation',
    source: '國家檔案 4.5.17-4（TXT元數據）[來源：政府檔案]',
    isKeyMoment: true,
  },
  {
    date: '1989-05-09',
    label: '不起訴處分書出具',
    description:
      '臺灣高等法院檢察署出具正式「不起訴處分書」（案號：78偵1叛亂），' +
      '以被告鄭南榕於民國78年4月7日自焚身亡為由，依法不予起訴。' +
      '案由欄記載：「鄭君叛亂不起訴處分、許君簽結。時代週刊第254、264期附卷。」\n\n' +
      '許世楷（憲法草案作者）以「簽結」（存檔備查）方式結案，未正式起訴。\n\n' +
      '法律悖論：追訴他至死，再用他的死結束追訴。',
    descriptionEn:
      'The Taiwan High Court Prosecutors Office issues a formal "Decision Not to Prosecute" (Case No. 78-1 Rebellion). ' +
      'Grounds: defendant Cheng Nan-jung died by self-immolation on April 7, 1989. ' +
      'Case note: "Cheng — no prosecution (rebellion); Hsu — case filed and archived. ' +
      'Issues 254 and 264 of Freedom Era Weekly attached as evidence." ' +
      'Legal paradox: the state pursued him to death, then used his death to close the case.',
    category: 'closure',
    source:
      '國家檔案 4.5.17-4（不起訴處分書，案卷第D030頁）[來源：政府檔案]',
    isKeyMoment: true,
  },
  {
    date: '1991-05-01',
    label: '動員戡亂時期終止',
    description: '動員戡亂時期經總統明令終止。',
    descriptionEn: 'The Period of National Mobilization for Suppression of the Communist Rebellion is officially ended by presidential decree.',
    category: 'legalReform',
    source: '國家人權記憶庫「二條一」條目 [來源：政府檔案]',
    isKeyMoment: false,
  },
  {
    date: '1991-05-09',
    label: '獨立臺灣會案',
    description:
      '動員戡亂終止後僅8天，法務部調查局以叛亂罪偵辦清華大學學生（「獨立臺灣會案」），' +
      '引起民間大規模靜坐抗議。《懲治叛亂條例》在動員戡亂終止後仍繼續被嘗試適用。',
    descriptionEn:
      'Just 8 days after the end of the National Mobilization period, the Investigation Bureau ' +
      'invokes the Punishment of Rebellion Act to investigate National Tsing Hua University students ' +
      'in the "Independent Taiwan Association Case," triggering mass sit-in protests.',
    applicableStatutes: ['pra-art-2-1'],
    category: 'legalReform',
    source: '國家人權記憶庫「二條一」條目 [來源：政府檔案]',
    isKeyMoment: false,
  },
  {
    date: '1991-05-22',
    label: '《懲治叛亂條例》廢止',
    description:
      '立法院三讀通過廢止《懲治叛亂條例》，總統李登輝明令廢止。' +
      '「二條一」正式走入歷史。施行期間共42年（1949–1991）。',
    descriptionEn:
      'The Legislative Yuan passes the repeal of the Punishment of Rebellion Act in three readings; ' +
      'President Lee Teng-hui formally promulgates the repeal. ' +
      'Article 2-1 enters history after 42 years of enforcement (1949–1991).',
    category: 'legalReform',
    source: '國家人權記憶庫「二條一」條目 [來源：政府檔案]',
    isKeyMoment: true,
  },
  {
    date: '1992-05-16',
    label: '刑法第100條修正',
    description:
      '刑法第100條修正，增加「以強暴脅迫」要件，' +
      '純粹言論行為不再構成普通內亂罪。' +
      '「言論即叛亂」的法律時代正式終結。',
    descriptionEn:
      'Criminal Code Article 100 is amended to require "violence or coercion," ' +
      'ending the criminalization of pure speech. ' +
      'The legal era of "words as treason" officially concludes.',
    category: 'legalReform',
    source: '國家人權記憶庫《懲治叛亂條例》條目 [來源：政府檔案]',
    isKeyMoment: true,
  },
]

// ---------------------------------------------------------------------------
// CHENG NAN-JUNG PROSECUTION CHAIN
// ---------------------------------------------------------------------------

/**
 * The exact legal logic chain applied in the Cheng Nan-jung prosecution.
 *
 * Sources:
 *   - 國家檔案 4.5.17-3（起訴文件）[來源：政府檔案]
 *   - 國家人權記憶庫《懲治叛亂條例》條目 [來源：政府檔案]
 *   - 「100%言論自由」之時代意義與當今所面臨之挑戰（論文，p. 4, 腳注1）[來源：學術]
 */
export const chengProsecutionChain: ChengProsecutionChain = {
  triggeringAct:
    '鄭南榕主辦之《自由時代》週刊第254期（1988年12月10日）' +
    '刊載許世楷起草之〈台灣新憲法草案〉',
  triggeringActEn:
    'Freedom Era Weekly Issue 254 (December 10, 1988), edited by Cheng Nan-jung, ' +
    'publishes Hsu Shih-kai\'s "Draft Constitution of the Taiwan Republic."',
  charge: '意圖竊據國土（普通內亂罪）',
  chargeEn: 'Intent to seize national territory (Ordinary Sedition)',
  primaryStatuteId: 'criminal-code-art-100-pre-1992',
  primaryStatuteLabel: '刑法第100條第1項（1992年修正前）',
  elevatingStatuteId: 'punishment-of-rebellion-act',
  elevatingStatuteLabel: '懲治叛亂條例第二條第一項（「二條一」）',
  outcome: '唯一死刑（法官無裁量空間）',
  outcomeEn: 'Mandatory death sentence — judges had no discretion to impose any lesser penalty.',
  chain: [
    {
      step: 1,
      label: '刊載行為',
      labelEn: 'The Publication',
      detail:
        '《自由時代》第254期刊登《台灣新憲法草案》——主張建立台灣共和國，' +
        '內容涵蓋序言、總論、國民權利義務、國防、外交等章節。',
      statueRef: undefined,
    },
    {
      step: 2,
      label: '罪名認定',
      labelEn: 'Charge Classification',
      detail:
        '刊登主張台灣建國的憲法草案，被認定為「意圖竊據國土」，' +
        '構成《刑法》第100條第1項「普通內亂罪」。' +
        '（「著手實行」不需要暴力手段——言論出版即已足夠。）',
      statueRef: 'cc100-pre-art-1',
    },
    {
      step: 3,
      label: '特別法加重',
      labelEn: 'Special Law Elevation',
      detail:
        '依《懲治叛亂條例》第二條第一項（「二條一」）之特別法優先適用，' +
        '《刑法》第100條原定刑度（七年以上有期徒刑、無期徒刑）' +
        '全部被限縮為「唯一死刑」。' +
        '法官「絲毫沒有得視犯罪情節輕重而加以裁量減輕之空間」。',
      statueRef: 'pra-art-2-1',
    },
    {
      step: 4,
      label: '司法結果',
      labelEn: 'Judicial Outcome',
      detail:
        '一旦依「二條一」起訴，「除非獲得軍事法庭判決無罪（但是機會甚為渺茫），' +
        '否則就必然會被判處死刑」。' +
        '鄭南榕選擇自焚而非讓國家宣判他的死刑。',
      statueRef: 'pra-art-2-1',
    },
  ],
  archiveRef: '國家檔案 A311900000F/0078/檔偵/000001/1/002（4.5.17-3；4.5.17-4）',
  source:
    '國家發展委員會檔案管理局 4.5.17-3（起訴文件）；' +
    '國家人權記憶庫《懲治叛亂條例》條目 [來源：政府檔案]',
}

// ---------------------------------------------------------------------------
// LEGAL SCENARIOS — 法條適用判斷 mini-interaction
// ---------------------------------------------------------------------------

/**
 * Three scenarios for the CRT terminal mini-interaction "法條適用判斷"
 * (Statute Application Judgment) in Chapter 1 (時代背景：言論即叛亂).
 *
 * Each scenario is drawn from real categories of cases prosecuted under
 * the Punishment of Rebellion Act and Criminal Code Article 100 (pre-1992).
 *
 * After completing all three scenarios, the conclusion text is shown:
 * 「在今天的台灣都完全合法。但在1989年，每一個都足以讓你被判死刑。」
 *
 * Sources:
 *   - 國家人權記憶庫《懲治叛亂條例》條目 [來源：政府檔案]
 *   - 「100%言論自由」之時代意義與當今所面臨之挑戰, p. 4–6 [來源：學術]
 */
export const legalScenarios: LegalScenario[] = [
  {
    id: 'scenario-magazine',
    order: 1,
    year: 1988,
    actLabel: '出版雜誌，刊載台灣獨立相關文章',
    description:
      '你主辦一份雜誌。本期你刊載了一篇關於台灣獨立的文章，' +
      '內容包含一份主張建立台灣共和國的憲法草案。' +
      '你在雜誌上印上自己的名字作為負責人。\n\n' +
      '這是1988年12月10日。適用哪一條法律？',
    descriptionEn:
      'You publish a magazine. This issue carries an article on Taiwan independence, ' +
      'including a draft constitution proposing a Republic of Taiwan. ' +
      'Your name appears as the responsible editor.\n\n' +
      'It is December 10, 1988. Which statute applies?',
    applicableStatuteIds: ['pra-art-2-1', 'cc100-pre-art-1'],
    applicableStatuteLabel:
      '《懲治叛亂條例》第二條第一項（透過《刑法》第100條第1項）',
    sentence: '唯一死刑',
    sentenceEn: 'Mandatory Death Sentence',
    verdictText: '唯一死刑',
    isDeathSentence: true,
    explanation:
      '刊登主張台灣建國的憲法草案，被認定為「意圖竊據國土」，' +
      '構成《刑法》第100條第1項「普通內亂罪」。\n\n' +
      '《懲治叛亂條例》第二條第一項（「二條一」）特別法優先適用，' +
      '將刑度限縮為唯一死刑，法官毫無裁量空間。\n\n' +
      '這正是鄭南榕所面臨的法律處境。\n\n' +
      '在今天的台灣，這完全合法。',
    explanationEn:
      'Publishing a draft constitution advocating Taiwan\'s independence was classified as ' +
      '"intent to seize national territory," constituting Ordinary Sedition under Criminal Code Article 100(1). ' +
      'Under the superior-law priority of Punishment of Rebellion Act Article 2-1, ' +
      'the sentence was elevated to mandatory death — no judicial discretion permitted. ' +
      'This was the exact legal situation Cheng Nan-jung faced. ' +
      'In Taiwan today, this act is completely legal.',
    legalChain: [
      '刊登台灣獨立憲法草案',
      '→ 意圖竊據國土',
      '→ 刑法第100條第1項「普通內亂罪」',
      '→ 懲治叛亂條例第二條第一項（二條一）',
      '→ 唯一死刑',
    ],
    source:
      '國家人權記憶庫《懲治叛亂條例》條目；國家檔案 4.5.17-3 [來源：政府檔案]',
  },
  {
    id: 'scenario-reading-group',
    order: 2,
    year: 1989,
    actLabel: '參加讀書會，討論民主改革',
    description:
      '你和幾位朋友在私人住宅定期聚會，閱讀並討論民主改革相關書籍，' +
      '包括批評國民黨執政的文章。你們沒有採取任何暴力行動。\n\n' +
      '這是1989年。適用哪一條法律？',
    descriptionEn:
      'You meet regularly with friends at a private home to read and discuss materials ' +
      'on democratic reform, including articles critical of the KMT government. ' +
      'No violent action is taken.\n\n' +
      'It is 1989. Which statute applies?',
    applicableStatuteIds: ['pra-art-5'],
    applicableStatuteLabel: '《懲治叛亂條例》第五條（參加叛亂組織罪）',
    sentence: '無期徒刑或十年以上有期徒刑',
    sentenceEn: 'Life imprisonment or 10+ years',
    verdictText: '無期徒刑',
    isDeathSentence: false,
    explanation:
      '一個定期聚會、討論民主改革的讀書會，在《懲治叛亂條例》實務解釋下，' +
      '可構成「叛亂組織或集會」，適用第五條——無期徒刑或十年以上有期徒刑。\n\n' +
      '大法官釋字第68號更確立「繼續犯」原則：' +
      '曾經參加者，除非自首或有確切脫離證明，一律視為持續犯罪。\n\n' +
      '在今天的台灣，這完全合法。',
    explanationEn:
      'A reading group meeting regularly to discuss democratic reform could be classified as ' +
      'a "rebellion organization or assembly" under Punishment of Rebellion Act Article 5, ' +
      'carrying life imprisonment or 10+ years. ' +
      'Grand Justice Interpretation No. 68 established the "continuing offense" principle: ' +
      'anyone who ever participated was presumed to be continuously offending unless they reported themselves. ' +
      'In Taiwan today, this is completely legal.',
    legalChain: [
      '定期聚會討論民主改革',
      '→ 構成叛亂組織或集會',
      '→ 懲治叛亂條例第五條',
      '→ 無期徒刑或十年以上有期徒刑',
      '（繼續犯：一旦參加，除非自首，永遠在案）',
    ],
    source:
      '國家人權記憶庫《懲治叛亂條例》條目，撰寫者：劉恆妏、劉后安 [來源：政府檔案]',
  },
  {
    id: 'scenario-street-speech',
    order: 3,
    year: 1989,
    actLabel: '在街頭演講，批評政府，主張台灣獨立',
    description:
      '你在公開場合進行演講，批評現任政府，' +
      '並明確主張台灣應以獨立共和國的身份存在。' +
      '你沒有號召任何暴力行動。\n\n' +
      '這是1989年。適用哪一條法律？',
    descriptionEn:
      'You give a public speech criticizing the government and explicitly advocating ' +
      'for Taiwan to exist as an independent republic. ' +
      'You call for no violent action.\n\n' +
      'It is 1989. Which statute applies?',
    applicableStatuteIds: ['pra-art-2-1', 'cc100-pre-art-1'],
    applicableStatuteLabel:
      '《懲治叛亂條例》第二條第一項（透過《刑法》第100條第1項）',
    sentence: '唯一死刑',
    sentenceEn: 'Mandatory Death Sentence',
    verdictText: '唯一死刑',
    isDeathSentence: true,
    explanation:
      '公開主張台灣獨立，被認定為「意圖竊據國土」或「顛覆政府」，' +
      '構成《刑法》第100條第1項「普通內亂罪」。\n\n' +
      '1992年修正前，法條不要求使用暴力——純粹的語言主張已足夠入罪。\n\n' +
      '《懲治叛亂條例》第二條第一項再次將刑度限縮為唯一死刑。\n\n' +
      '「即便是在競選公職過程中提出政見，鼓吹台灣獨立，' +
      '都有可能構成此項普通內亂罪，而遭到科處唯一死刑的命運。」\n\n' +
      '在今天的台灣，這完全合法。',
    explanationEn:
      'Publicly advocating for Taiwan independence was classified as "intent to seize national territory" ' +
      'or "overthrow the government" under Criminal Code Article 100(1). ' +
      'Before 1992, no violence was required — pure speech was sufficient for conviction. ' +
      'Punishment of Rebellion Act Article 2-1 again elevated the sentence to mandatory death. ' +
      '"Even making policy proposals while running for public office, ' +
      'advocating for Taiwan independence, could constitute Ordinary Sedition ' +
      'punishable by mandatory death." ' +
      'In Taiwan today, this is completely legal.',
    legalChain: [
      '街頭演講主張台灣獨立',
      '→ 意圖竊據國土／顛覆政府',
      '→ 刑法第100條第1項「普通內亂罪」（無需暴力，言論即已足夠）',
      '→ 懲治叛亂條例第二條第一項（二條一）',
      '→ 唯一死刑',
    ],
    source:
      '國家人權記憶庫《懲治叛亂條例》條目，撰寫者：劉恆妏、劉后安 [來源：政府檔案]',
  },
]

/**
 * Conclusion text displayed after the user completes all three scenarios.
 * Shown in the CRT terminal overlay.
 */
export const legalScenariosConclusion = {
  zh: '在今天的台灣，以上三件事都完全合法。\n\n但在1989年，每一個都足以讓你被判死刑。',
  en: 'In Taiwan today, all three of these acts are completely legal.\n\nIn 1989, each one was sufficient grounds to sentence you to death.',
} as const

// ---------------------------------------------------------------------------
// ARTICLE 2-1 KEY QUOTES (for display components)
// ---------------------------------------------------------------------------

/**
 * Authoritative quotes about 二條一, sourced directly from government/academic sources.
 * For use in pull-quotes, typewriter effects, and document overlays.
 */
export const article21Quotes = [
  {
    id: 'q-no-discretion',
    text:
      '法官對於上述各項犯罪行為之處罰，絲毫沒有得視犯罪情節輕重而加以裁量減輕之空間，' +
      '而一概均須科處死刑。',
    textEn:
      'Judges have absolutely no room to reduce the sentence based on the severity of the offense — ' +
      'all such crimes must be punished by death.',
    attribution: '國家人權記憶庫「二條一」條目，撰寫者：劉恆妏、劉后安',
    source: '國家人權記憶庫 [來源：政府檔案]',
  },
  {
    id: 'q-prosecution-equals-death',
    text:
      '一旦被軍事檢察官依本項條文加以起訴，除非獲得軍事法庭判決無罪' +
      '（但是機會甚為渺茫），否則就必然會被判處死刑。',
    textEn:
      'Once prosecuted by a military prosecutor under this provision, ' +
      'unless acquitted by a military tribunal (an extremely remote possibility), ' +
      'conviction and death were virtually certain.',
    attribution: '國家人權記憶庫「二條一」條目，撰寫者：劉恆妏、劉后安',
    source: '國家人權記憶庫 [來源：政府檔案]',
  },
  {
    id: 'q-terror-of-governance',
    text: '「二條一」代表白色恐怖時期威權體制的嚴刑峻罰，以威嚇方式來鞏固其統治。',
    textEn:
      '"Article 2-1" represented the severe punishments of the authoritarian regime during the White Terror era, ' +
      'using intimidation to consolidate its rule.',
    attribution: '國家人權記憶庫「二條一」條目，撰寫者：劉恆妏、劉后安',
    source: '國家人權記憶庫 [來源：政府檔案]',
  },
  {
    id: 'q-repeal-context',
    text:
      '1991年5月1日，動員戡亂時期經總統明令終止之後，5月9日，臺灣竟然又發生清華大學學生' +
      '所涉及的「獨立臺灣會案」，法務部調查局以叛亂罪偵辦清大學生等人，引起民間的大幅靜坐抗議。' +
      '因此，《懲治叛亂條例》以及惡名昭彰的「二條一」規定，才隨即在1991年5月22日被公布廢止，' +
      '正式走入歷史。',
    textEn:
      'On May 1, 1991, after the president formally ended the National Mobilization period, ' +
      'Taiwan shockingly saw the "Independent Taiwan Association Case" on May 9, ' +
      'with the Investigation Bureau charging National Tsing Hua University students with rebellion, ' +
      'triggering large-scale sit-in protests. ' +
      'Only then were the Punishment of Rebellion Act and the notorious "Article 2-1" ' +
      'formally abolished on May 22, 1991, entering the annals of history.',
    attribution: '國家人權記憶庫「二條一」條目，撰寫者：劉恆妏、劉后安',
    source: '國家人權記憶庫 [來源：政府檔案]',
  },
  {
    id: 'q-speech-as-sedition',
    text:
      '即便是在報章雜誌上發表言論，或是於競選公職過程中提出政見，鼓吹或主張諸如' +
      '臺灣獨立（「竊據國土」）、修改憲法甚或制憲（「變更國憲」）、以及批評總統等' +
      '國家領導人（「顛覆政府」）等行為，都有可能構成此項「普通內亂罪」，' +
      '而遭到科處唯一死刑的命運。',
    textEn:
      'Even publishing articles in newspapers or magazines, or making policy proposals while ' +
      'campaigning for public office — advocating Taiwan independence ("seize national territory"), ' +
      'constitutional revision or a new constitution ("change the constitution"), ' +
      'or criticizing the president ("overthrow the government") — ' +
      'could all constitute "Ordinary Sedition," punishable by mandatory death.',
    attribution: '國家人權記憶庫《懲治叛亂條例》條目，撰寫者：劉恆妏、劉后安',
    source: '國家人權記憶庫 [來源：政府檔案]',
  },
  {
    id: 'q-cheng-declaration',
    text: '國民黨只能抓到我的屍體，抓不到我的人。',
    textEn: 'The KMT can only arrest my corpse — they cannot arrest me.',
    attribution: '鄭南榕（1989年1月21日，收到傳票後）',
    source: '鄭南榕基金會典藏；「100%言論自由」之時代意義與當今所面臨之挑戰, p. 4 [來源：基金會]',
  },
] as const

// ---------------------------------------------------------------------------
// ARCHIVE DOCUMENT METADATA (for解密互動 / decryption mini-interaction)
// ---------------------------------------------------------------------------

/**
 * Metadata for the two government archive documents central to the case.
 * Used in the 解密互動 (declassification) CRT mini-interaction in Chapters 3 & 4.
 */
export const archiveDocuments = [
  {
    id: 'archive-4-5-17-3',
    title: '叛亂起訴文件',
    titleEn: 'Sedition Prosecution Document',
    archiveNo: 'A311900000F/0078/檔偵/000001/1/002',
    caseNo: '78偵1叛亂',
    filingDate: '1989-01',
    agency: '臺灣高等法院檢察署' as const,
    classification: '偵查卷宗',
    /**
     * Redacted fields that reveal in the 解密互動.
     * Each field has a redacted label and a revealed value.
     */
    redactedFields: [
      {
        fieldLabel: '被告',
        redacted: '████',
        revealed: '鄭南榕',
      },
      {
        fieldLabel: '罪名',
        redacted: '████████',
        revealed: '涉嫌叛亂（普通內亂罪）',
      },
      {
        fieldLabel: '法條依據',
        redacted: '████████████',
        revealed: '刑法第100條第1項；懲治叛亂條例第二條第一項',
      },
      {
        fieldLabel: '起訴事由',
        redacted: '████████████████████',
        revealed: '主辦《時代週刊》第254期刊載《台灣新憲法草案》',
      },
      {
        fieldLabel: '附件',
        redacted: '████████',
        revealed: '時代週刊第254期、第264期（附卷）',
      },
    ],
    source: '國家發展委員會檔案管理局 [來源：政府檔案]',
  },
  {
    id: 'archive-4-5-17-4',
    title: '不起訴處分書',
    titleEn: 'Decision Not to Prosecute',
    archiveNo: 'A311900000F/0078/檔偵/000001/1/002',
    caseNo: '78偵1叛亂',
    filingDate: '1989-05-09',
    agency: '臺灣高等法院檢察署' as const,
    classification: '處分書',
    redactedFields: [
      {
        fieldLabel: '被告',
        redacted: '████',
        revealed: '鄭南榕',
      },
      {
        fieldLabel: '出生',
        redacted: '████████',
        revealed: '民國36年（1947年）9月17日',
      },
      {
        fieldLabel: '職業',
        redacted: '████',
        revealed: '自由業（雜誌社負責人）',
      },
      {
        fieldLabel: '不起訴原因',
        redacted: '████████████████',
        revealed: '被告鄭南榕於民國78年4月7日自焚身亡，依法不予起訴',
      },
      {
        fieldLabel: '案由',
        redacted: '████████████████████████████',
        revealed:
          '鄭君叛亂不起訴處分、許君簽結。時代週刊第254、264期附卷。',
      },
    ],
    /**
     * The core legal paradox text — shown after all fields are revealed.
     */
    paradoxText:
      '追訴他至死，再用他的死結束追訴。\n\n' +
      '國家用「唯一死刑」的法律威脅一個人至死，' +
      '然後以「人已死亡」為由宣告結案，' +
      '就好像什麼都沒有發生。',
    paradoxTextEn:
      'The state pursued him to death, then used his death to close the case. ' +
      'A mandatory death sentence drove a man to die, ' +
      'and the state used that death to announce closure — ' +
      'as though nothing had happened.',
    source: '國家發展委員會檔案管理局 [來源：政府檔案]',
  },
] as const

// ---------------------------------------------------------------------------
// STATUTORY REFORM TIMELINE — side-by-side comparison data
// ---------------------------------------------------------------------------

/**
 * Data for the side-by-side statute comparison display in Chapter 4
 * (調查歷程：紙上的正義).
 *
 * Shows the before/after of Criminal Code Article 100, with key changes highlighted.
 */
export const statuteComparisonData = {
  title: '刑法第100條：修正前後對照',
  titleEn: 'Criminal Code Article 100: Before and After the 1992 Amendment',
  before: {
    label: '修正前（1992年5月16日以前）',
    labelEn: 'Before Amendment (before May 16, 1992)',
    text:
      '意圖破壞國體，竊據國土，或以非法之方法變更國憲，顛覆政府，' +
      '而著手實行者，處七年以上有期徒刑；首謀者，處無期徒刑。',
    /**
     * Segments for highlight rendering.
     * Each segment has: text, isHighlighted (changed/removed portion).
     */
    segments: [
      { text: '意圖破壞國體，竊據國土，或以非法之方法變更國憲，顛覆政府，', isHighlighted: false },
      { text: '而著手實行者', isHighlighted: true },
      { text: '，處七年以上有期徒刑；首謀者，處無期徒刑。', isHighlighted: false },
    ],
    effectWithArticle21:
      '加上《懲治叛亂條例》第二條第一項 → 唯一死刑（無法官裁量空間）',
    note: '「著手實行」不需要暴力——言論出版即已足夠構成本罪。',
  },
  after: {
    label: '修正後（1992年5月16日起）',
    labelEn: 'After Amendment (from May 16, 1992)',
    text:
      '意圖以強暴脅迫使中華民國憲法所規定之政府機制停止運作，' +
      '而以強暴脅迫著手實行者，處七年以上有期徒刑；首謀者，處無期徒刑。',
    segments: [
      { text: '意圖', isHighlighted: false },
      { text: '以強暴脅迫', isHighlighted: true },
      { text: '使中華民國憲法所規定之政府機制停止運作，而', isHighlighted: false },
      { text: '以強暴脅迫', isHighlighted: true },
      { text: '著手實行者，處七年以上有期徒刑；首謀者，處無期徒刑。', isHighlighted: false },
    ],
    note: '增加「以強暴脅迫」要件——純粹言論行為不再構成本罪。',
  },
  keyChange:
    '關鍵修正：增加「以強暴脅迫」要件。在此之前，純粹的言論（如刊登憲法草案、主張台灣獨立）即已足夠構成死罪。',
  keyChangeEn:
    'Key change: the addition of "violence or coercion" as a requirement. ' +
    'Before this amendment, pure speech acts — such as publishing a draft constitution ' +
    'or advocating Taiwan independence — were sufficient grounds for a mandatory death sentence.',
  reformDate: '1992-05-16',
  source: '國家人權記憶庫《懲治叛亂條例》條目 [來源：政府檔案]',
} as const
