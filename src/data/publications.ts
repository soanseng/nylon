/**
 * 《自由時代》週刊 (Freedom Era Weekly) — Publication data
 *
 * Sources:
 *   [基金會] 本刊文責一律由總編輯鄭南榕負責：《自由時代》雜誌編輯室報告文選
 *            逗點文創結社，示見22；鄭南榕基金會選文 (E14)
 *   [基金會] 認識鄭南榕：看見《自由時代》總編輯的十一個面向
 *            逗點文創結社，示見29；鄭南榕基金會編，2025初版 (E15)
 *   [政府檔案] 國家發展委員會檔案管理局，檔號 A311900000F/0078/檔偵/000001/1/002
 *              叛亂起訴文件（4.5.17-3）；含《時代週刊》第254期附卷掃描 (E06)
 *   [維基百科] 鄭南榕條目，最後修訂 2026年2月15日 (E03)
 */

// ─── Type Definitions ────────────────────────────────────────────────────────

export interface Article {
  /** Article title in Traditional Chinese */
  title: string;
  /** Author name(s) */
  author: string;
  /** Reference to characters.ts id — omit if no entry exists yet */
  authorId?: string;
  /** True if written as an editorial / editor's-room report */
  isEditorial: boolean;
  /**
   * True if covered by the standing declaration printed on every issue:
   * 「本刊文責一律由總編輯鄭南榕負責」
   * (Editorial responsibility for this publication rests entirely
   *  with Editor-in-Chief Cheng Nan-Jung)
   */
  isNylonSigned: boolean;
  /** Notable verbatim excerpt from the article */
  quote?: string;
  /** Which law this article was alleged to violate; null if none alleged */
  legalRisk?: string;
}

export interface Issue {
  /** Continuous sequential issue number (1–302 across all name variants) */
  number: number;
  /** ISO 8601 date of publication */
  date: string;
  /** ROC calendar date string, e.g. "民國77年12月10日" */
  rocdDate?: string;
  /**
   * The registered masthead name in use for this specific issue.
   * The series ran under 22 different names due to successive bans.
   * See nameChangeHistory below.
   */
  mastheadName?: string;
  /** Special commemorative or thematic title for the issue, if any */
  title?: string;
  /** Articles included in the record for this issue */
  keyArticles: Article[];
  /** True for issues of particular historical significance */
  isKeyIssue: boolean;
  /** True if this issue directly triggered a prosecution */
  prosecutionTarget: boolean;
  /** Additional contextual notes */
  notes?: string;
}

export interface NameChange {
  /** Sequential ban number (1st ban, 2nd ban, etc.) */
  banNumber: number;
  /** The masthead name used during this period */
  name: string;
  /** Approximate starting issue number for this name */
  startIssue?: number;
  /** Approximate ending issue number for this name */
  endIssue?: number;
  /** Approximate date range start (ISO or partial) */
  startDate?: string;
  /** Approximate date range end (ISO or partial) */
  endDate?: string;
  /** Why the previous name was banned / what triggered the change */
  banReason?: string;
}

export interface PublicationStats {
  /** Publication name (canonical collective title) */
  name: string;
  /** English name */
  nameEn: string;
  /** ISO date of the very first issue */
  founded: string;
  /**
   * ISO date publication effectively ceased.
   * The final issue was printed; Cheng's death on 1989-04-07 ended the
   * editorial line. The series ceased publication later in 1989 due to
   * financial pressure.
   */
  ceased: string;
  /** Total issues published across all masthead names */
  totalIssues: number;
  /**
   * Number of registered publication licences obtained in advance.
   * Cheng collected diplomas from friends and relatives to pre-register
   * 24 licences under names containing "時代" (Era/Times), ensuring the
   * magazine could always relaunch under a new name after each ban.
   */
  registeredLicences: number;
  /** Number of licences actually used (of the 24 registered) */
  licencesUsed: number;
  /** Number of distinct masthead names used over the run */
  mastheadNames: number;
  /** Duration of run */
  runDuration: string;
  /** Number of times individual issues were confiscated / banned */
  timesConfiscated: string;
  /** Number of times the publication was suspended */
  timesSuspended: number;
  /** Number of speech-related lawsuits faced */
  speechLawsuits: number;
  /** Founder of the publication */
  founder: string;
  /** Editor-in-Chief throughout the run */
  editor: string;
  /** Inaugural publisher / 社長 */
  firstPublisher: string;
  /** Inaugural adviser / 總監 */
  firstAdviser: string;
  /** Inaugural distributor / 發行人 */
  firstDistributor: string;
  /** One-sentence mission statement (Cheng's own formulation) */
  mission: string;
  /** Legacy and impact */
  legacy: string;
  /** Physical address of the editorial office */
  officeAddress: string;
  /** Standing declaration printed on every issue cover */
  editorialResponsibilityDeclaration: string;
  /** Tagline / slogan printed on every back cover */
  slogan: string;
}

// ─── Publication Stats ────────────────────────────────────────────────────────

/**
 * Aggregate metadata for the 《自由時代》週刊 series (1984–1989).
 *
 * Source: [基金會] E14 核心內容摘要 §2–3；E15 §4；[維基百科] E03 §創辦一節
 */
export const publicationStats: PublicationStats = {
  name: '自由時代週刊',
  nameEn: 'Freedom Era Weekly',
  founded: '1984-03-12',
  ceased: '1989-12-31', // Exact final date uncertain; series ended 1989 due to financial pressure after Cheng's death (1989-04-07)
  totalIssues: 302,
  registeredLicences: 24,
  licencesUsed: 18,
  mastheadNames: 22,
  runDuration: '5年8個月',
  // By the fifth anniversary (1989-03-11) Cheng reported 40 suspensions; earlier sources cite ~34 —
  // the difference reflects different counting cutoff points. [來源：基金會 E14 §Section0036]
  timesConfiscated: '百餘次',
  timesSuspended: 40,
  speechLawsuits: 10,
  founder: '鄭南榕',
  editor: '鄭南榕',
  firstPublisher: '陳水扁',
  firstAdviser: '李敖',
  firstDistributor: '林世煜',
  mission:
    '爭取百分之百的言論自由——我們深信，所有的自由裡，第一個應該爭取的是言論自由，有了言論自由以後，才有可能保住其他的自由。',
  legacy:
    '《自由時代》是戒嚴末期至解嚴後台灣查禁次數最多、持續時間最長的黨外雜誌，其存在本身即是對「報禁」制度的持續挑戰。1989年鄭南榕自焚後，雜誌停刊，但其推動的言論自由運動促成：1991年廢除《懲治叛亂條例》、1992年修正《刑法》第100條，去除純言論入罪的條款。2016年行政院核定4月7日為「言論自由日」。',
  officeAddress: '臺北市民權東路三段106巷3弄11號3樓',
  editorialResponsibilityDeclaration:
    '本刊文責一律由總編輯鄭南榕負責',
  slogan: '爭取100%自由',
};

// ─── Editorial Responsibility Declaration ────────────────────────────────────

/**
 * The standing declaration printed on every issue cover.
 *
 * Original purpose: to shield reporters from individual prosecution —
 * Cheng personally assumed legal liability for all content.
 * It later became the defining symbol of his character and the
 * title of the posthumous collected-writings volume published by the Foundation.
 *
 * Source: [基金會] E14 §書名意義；書名本身即引自此標語
 */
export const nylonDeclaration = {
  chinese: '本刊文責一律由總編輯鄭南榕負責',
  english:
    'Editorial responsibility for all content in this publication rests entirely with Editor-in-Chief Cheng Nan-Jung.',
  purpose:
    '此舉原為保護記者，避免政府從記者入手打壓；後成為鄭南榕勇於承擔的精神象徵。',
  source: '基金會 — 《本刊文責一律由總編輯鄭南榕負責》書名，逗點文創結社，示見22',
} as const;

// ─── Name Change History ──────────────────────────────────────────────────────

/**
 * 《自由時代》ran under 22 different masthead names because the government
 * banned individual issues and forced registration changes. Cheng pre-registered
 * 24 licences (using 18) with names containing "時代" so the magazine could
 * immediately relaunch under a new name each time a ban was enforced.
 *
 * The names documented here are derived from the article index in E14, which
 * maps articles to specific mastheads by issue number. The complete list of
 * all 22 names (including reserve names never actually used) is recorded in the
 * appendix of [基金會] E14.
 *
 * Known reserve names mentioned in E15: 《發揚時代》《進步時代》《創新時代》
 *
 * Source: [基金會] E14 §附錄：《自由時代》22個名稱；§核心內容摘要 §3；
 *         [基金會] E15 §陳夏民文（第三篇）；[維基百科] E03 §創辦一節
 *
 * NOTE: Exact issue-number boundaries for each name are partially reconstructed
 * from the article index in E14. Issues not appearing in the index are marked
 * with approximate ranges. The appendix in E14 contains the authoritative
 * complete list; only names directly evidenced in the article index or prose
 * are included below.
 */
export const nameChangeHistory: NameChange[] = [
  {
    banNumber: 1,
    name: '自由時代週刊',
    startIssue: 1,
    startDate: '1984-03-12',
    banReason: '創刊名稱；首批查禁後改名',
    // The original name; exact end issue not confirmed in sources
  },
  {
    banNumber: 2,
    name: '民主天地',
    // Issues 56–95 evidenced in E14 article index (1985-04-01 to 1985-11-11)
    startIssue: 56,
    endIssue: 95,
    startDate: '1985-04-01',
    endDate: '1985-11-11',
    banReason: '前刊名遭查禁後啟用',
  },
  {
    banNumber: 3,
    name: '先鋒時代',
    // Issues 97–102 evidenced in E14 article index (1985-12-02 to 1986-01-06)
    startIssue: 97,
    endIssue: 102,
    startDate: '1985-12-02',
    endDate: '1986-01-06',
    banReason: '前刊名遭查禁後啟用',
  },
  {
    banNumber: 4,
    name: '民主時代',
    // Issues 112–113 evidenced in E14 article index (1986-03-24 to 1986-03-31);
    // upper bound uncertain — may extend further
    startIssue: 112,
    startDate: '1986-03-24',
    banReason: '前刊名遭查禁後啟用',
  },
  {
    banNumber: 5,
    name: '全元時代',
    // Issue 251 evidenced in E14 article index (1988-11-19)
    startIssue: 251,
    endIssue: 251,
    startDate: '1988-11-19',
    endDate: '1988-11-19',
    banReason: '前刊名遭查禁後啟用',
  },
  {
    banNumber: 6,
    name: '捍衛時代',
    // Issues 258–263 evidenced in E14 article index (1989-01-07 to 1989-02-04)
    startIssue: 258,
    endIssue: 263,
    startDate: '1989-01-07',
    endDate: '1989-02-04',
    banReason: '前刊名遭查禁後啟用；鄭南榕收到叛亂傳票期間使用此名',
  },
  {
    banNumber: 7,
    name: '鄉土時代',
    // Issues 266–267 evidenced in E14 article index (1989-03-04 to 1989-03-11);
    // this is among the final mastheads before Cheng's death
    startIssue: 266,
    endIssue: 267,
    startDate: '1989-03-04',
    endDate: '1989-03-11',
    banReason: '前刊名遭查禁後啟用',
  },
];

/**
 * Reserve masthead names pre-registered but not directly evidenced as used
 * in the article index. Mentioned in [基金會] E15 §陳夏民文.
 */
export const reserveMastheadNames: string[] = [
  '發揚時代',
  '進步時代',
  '創新時代',
];

// ─── Key Issues ───────────────────────────────────────────────────────────────

/**
 * Issue 254 — the prosecution trigger.
 *
 * Published on International Human Rights Day (1988-12-10), this issue
 * contained 許世楷's 《台灣共和國憲法草案》 (Draft Constitution of the
 * Republic of Taiwan) under the column heading 「台獨風雲」.
 *
 * Legal chain:
 *   刊登憲法草案
 *   → 「意圖竊據國土」
 *   → 刑法第100條第1項
 *   → 懲治叛亂條例第二條第一項（二條一）
 *   → 唯一死刑（強制死刑，法官無量刑裁量權）
 *
 * Source: [政府檔案] E06（起訴附卷掃描，檔號 4.5.17-3）；
 *         [基金會] E14 §Section0033；[維基百科] E03
 */
export const issue254: Issue = {
  number: 254,
  date: '1988-12-10',
  rocdDate: '民國77年12月10日',
  // The issue appeared under the collective "時代週刊" brand in government
  // documents; the precise registered masthead name at issue 254 is not
  // confirmed in the available sources — it falls between the evidenced
  // 全元時代 (issue 251) and 捍衛時代 (issue 258) periods.
  mastheadName: '時代週刊',
  title: '台灣新憲法草案特刊',
  isKeyIssue: true,
  prosecutionTarget: true,
  notes:
    '出版日為國際人權日。此期為臺灣高等法院檢察署起訴鄭南榕叛亂罪之直接依據，原件掃描存於國家發展委員會檔案管理局（檔號 A311900000F/0078/檔偵/000001/1/002）。第264期亦附卷作為起訴證物。',
  keyArticles: [
    {
      title: '台灣新憲法草案',
      author: '許世楷',
      authorId: 'hsu-shih-kai',
      isEditorial: false,
      isNylonSigned: true,
      quote:
        '（序言）台灣是一個主權獨立的國家，其存在不容否認。台灣人民有權決定自己的前途與命運。',
      legalRisk:
        '刑法第100條第1項「意圖竊據國土」＋懲治叛亂條例第二條第一項（唯一死刑）。' +
        '作者許世楷以「許君簽結」處理（存檔備查，未正式起訴，原因可能為其身在海外）。' +
        '[來源：政府檔案 E06]',
    },
  ],
};

/**
 * Issue 259 — first published response to the sedition summons.
 *
 * Published three weeks after the 1989-01-21 summons, this editorial
 * (「面對叛亂案的重刑，我們只有不敢怠懈而已！」) is Cheng's first
 * public first-person account of the prosecution, including his analysis of
 * the three-agency command chain (國安局 → 調查局 → 高檢署) and the
 * applicable statutes.
 *
 * Source: [基金會] E14 §Section0033
 */
export const issue259: Issue = {
  number: 259,
  date: '1989-01-14',
  rocdDate: '民國78年1月14日',
  mastheadName: '捍衛時代',
  isKeyIssue: true,
  prosecutionTarget: false,
  notes:
    '傳票發出（1989.1.21）前數日付印；為鄭南榕就叛亂案最早的第一人稱公開表態。' +
    '首次在媒體上揭露國安局→調查局→高檢署三層機關指揮鏈條。',
  keyArticles: [
    {
      title: '面對叛亂案的重刑，我們只有不敢怠懈而已！',
      author: '鄭南榕',
      authorId: 'cheng-nan-jung',
      isEditorial: true,
      isNylonSigned: true,
      quote:
        '本刊雖是這場多事之秋的直接受害者，但「新憲案」絕不只是自由時代一家，' +
        '或鄭南榕一人的事而已……刊登一篇文章，竟然會涉嫌「叛亂」，竟然會面臨' +
        '少則七年重刑、多則槍斃死刑的生命威脅。',
      legalRisk:
        '文章本身未遭起訴；內容分析刑法第100條及懲治叛亂條例第2條、第7條的法律風險。[來源：基金會 E14]',
    },
  ],
};

/**
 * Issues 262–263 — the resistance declaration (Spring Festival double issue).
 *
 * Published 1989-02-04. This double issue contains Cheng's explicit
 * declaration that he will exercise his right of resistance (抵抗權) and
 * will not appear in court under any circumstances, and the famous analysis
 * of the "killing machine" staffed by human beings following orders.
 *
 * Source: [基金會] E14 §Section0034
 */
export const issues262263: Issue = {
  number: 262,
  date: '1989-02-04',
  rocdDate: '民國78年2月4日',
  mastheadName: '捍衛時代',
  title: '春節特刊（第262–263期合刊）',
  isKeyIssue: true,
  prosecutionTarget: false,
  notes:
    '春節合刊。鄭南榕在此明確宣告抵抗權，是自囚71天決意最直接的文字記錄。' +
    '此期距自焚僅62天。',
  keyArticles: [
    {
      title: '這是考驗「人性」與「理性」的時刻！',
      author: '鄭南榕',
      authorId: 'cheng-nan-jung',
      isEditorial: true,
      isNylonSigned: true,
      quote:
        '鄭南榕堅信在民主國家中，刊登一篇憲法草案根本不可能涉嫌叛亂，' +
        '因此拒絕這種非法傳訊……鄭南榕將不惜一切行使他的抵抗權。',
      legalRisk: undefined,
    },
    {
      title: '（編輯室分析）殺人工程',
      author: '鄭南榕',
      authorId: 'cheng-nan-jung',
      isEditorial: true,
      isNylonSigned: true,
      quote:
        '但是最可悲的，是進行這項殺人工程的竟然都是有血有肉的人。' +
        '包括檢察官、推事、法警、霹靂小組、甚至於獄吏在內，' +
        '他們都將執行一項「上級」交代的任務：解決鄭南榕。' +
        '他們在政治黑手指揮之下，必須環環相扣地把鄭南榕辦到底，' +
        '不容許任何細節因為「良心」因素而逸出控制，否則他們會失去飯碗。' +
        '甚至他們也必須說服自己：鄭南榕罪有應得。' +
        '這樣一個人性備受扭曲的極權統治體系，才真正是「臺獨人士」終身反對的對象。',
      legalRisk: undefined,
    },
  ],
};

/**
 * Issue 266 — "fighting to the end for free speech."
 *
 * Source: [基金會] E14 §Section0035
 */
export const issue266: Issue = {
  number: 266,
  date: '1989-03-04',
  rocdDate: '民國78年3月4日',
  mastheadName: '鄉土時代',
  isKeyIssue: false,
  prosecutionTarget: false,
  notes:
    '批評國民黨文工會對三大電視台下達五項新聞指示（含禁止報導二二八紀念活動）。',
  keyArticles: [
    {
      title: '為言論自由之役奮戰到底',
      author: '鄭南榕',
      authorId: 'cheng-nan-jung',
      isEditorial: true,
      isNylonSigned: true,
      quote:
        '我們深信，所有的自由裡，第一個應該爭取的是言論自由，' +
        '有了言論自由以後，才有可能保住其他的自由。',
      legalRisk: undefined,
    },
  ],
};

/**
 * Issue 267 — fifth anniversary issue; the last major editorial before Cheng's death.
 *
 * Published 1989-03-11 — the fifth anniversary of the magazine's founding.
 * Cheng's editorial counts 40 suspensions, 100+ confiscations, 10 lawsuits,
 * and one time "a gun was pointed at us." This is the most complete first-hand
 * accounting of the magazine's history in his own words.
 *
 * Source: [基金會] E14 §Section0036
 */
export const issue267: Issue = {
  number: 267,
  date: '1989-03-11',
  rocdDate: '民國78年3月11日',
  mastheadName: '鄉土時代',
  title: '創刊五周年特刊',
  isKeyIssue: true,
  prosecutionTarget: false,
  notes:
    '距自焚僅27天。鄭南榕在此發表最後的五周年宣言，统計雜誌五年8個月的完整抗爭紀錄。',
  keyArticles: [
    {
      title: '落實對臺灣命運的終極關懷（創刊五周年）',
      author: '鄭南榕',
      authorId: 'cheng-nan-jung',
      isEditorial: true,
      isNylonSigned: true,
      quote:
        '終於，自由時代週刊昂然邁進第六個年頭，在多事之秋的此刻。' +
        '回首來時路，五年的奮鬥歷程……本刊自創刊迄今，' +
        '歷經四十次停刊、百餘次查禁。十次言論官司，一次槍口對準人身……' +
        '環視臺灣的反對派刊物，能延續言論自由的香火而五年不斷者，' +
        '也只有自由時代碩果僅存而已。',
      legalRisk: undefined,
    },
    {
      title: '未來發展是難以逆料的（五周年宣言節錄）',
      author: '鄭南榕',
      authorId: 'cheng-nan-jung',
      isEditorial: true,
      isNylonSigned: true,
      quote:
        '未來發展是難以逆料的，但我們始終堅信，唯有靠人民力量的全面覺醒，' +
        '臺灣才會有公理正義降臨的一天。',
      legalRisk: undefined,
    },
  ],
};

/**
 * The inaugural issue.
 *
 * Source: [基金會] E14 §Section0002（編輯室報告）；[維基百科] E03 §創辦一節
 */
export const issue1: Issue = {
  number: 1,
  date: '1984-03-12',
  rocdDate: '民國73年3月12日',
  mastheadName: '自由時代週刊',
  title: '創刊號',
  isKeyIssue: true,
  prosecutionTarget: false,
  notes:
    '創刊號封面人物為李敖（兼總監），社長為陳水扁，總編輯為鄭南榕，發行人為林世煜。' +
    '封底首次印出「爭取100%自由」標語。' +
    '鄭南榕事先向親友收集18張大學文憑，以備用刊名因應可能的查禁，全24張登記證中最終使用18張。',
  keyArticles: [
    {
      title: '（創刊號）爭取百分之百的自由',
      author: '鄭南榕',
      authorId: 'cheng-nan-jung',
      isEditorial: true,
      isNylonSigned: true,
      quote: '爭取100%自由',
      legalRisk: undefined,
    },
  ],
};

/**
 * Issue 88 — "guns pointed at us, we still fight for 100% free speech."
 *
 * On 1985-09-21, police on the highway and in Taichung intercepted the
 * magazine's delivery trucks and drew guns on staff. Cheng published an
 * editorial the same day.
 *
 * Source: [基金會] E14 §Section0007
 */
export const issue88: Issue = {
  number: 88,
  date: '1985-09-21',
  rocdDate: '民國74年9月21日',
  mastheadName: '民主天地',
  isKeyIssue: true,
  prosecutionTarget: false,
  notes:
    '同日，公路警察在高速公路及台中攔截《自由時代》運書車、拔槍威嚇員工。' +
    '鄭南榕當天即發文記錄此事並宣示繼續抗爭。',
  keyArticles: [
    {
      title: '槍口之下，我們依然爭取100%的言論自由',
      author: '鄭南榕',
      authorId: 'cheng-nan-jung',
      isEditorial: true,
      isNylonSigned: true,
      quote:
        '我們要的是徹頭徹尾、不折不扣的自由。不論他們拔槍之後，何時開火，' +
        '我們總要周旋到底，爭取百分之百的自由。',
      legalRisk: undefined,
    },
  ],
};

/**
 * Issue 251 — Palestinian independence as analogy for Taiwan.
 *
 * Written the same week the Palestinian Declaration of Independence was
 * recognised internationally (November 1988). Cheng argues Taiwan's
 * independence is "moderate, flexible, and realistic."
 *
 * Source: [基金會] E14 §Section0031
 */
export const issue251: Issue = {
  number: 251,
  date: '1988-11-19',
  rocdDate: '民國77年11月19日',
  mastheadName: '全元時代',
  isKeyIssue: false,
  prosecutionTarget: false,
  keyArticles: [
    {
      title: '獨立建國是溫和、彈性、現實的政治決定',
      author: '鄭南榕',
      authorId: 'cheng-nan-jung',
      isEditorial: true,
      isNylonSigned: true,
      quote:
        '臺獨，是臺灣人民自決的選擇之一，不能主張臺獨，「自決」就變成「劃地自限」的假民主。',
      legalRisk:
        '台灣獨立主張在1988年仍受刑法第100條規制，但此期未被起訴。[來源：基金會 E14]',
    },
  ],
};

// ─── All Key Issues (consolidated export) ────────────────────────────────────

/**
 * All documented key issues, ordered chronologically.
 * Non-key issues are not included — only issues with specific
 * historical significance or direct evidentiary value.
 */
export const keyIssues: Issue[] = [
  issue1,
  issue88,
  issue251,
  issue254,
  issue259,
  issues262263,
  issue266,
  issue267,
];

// ─── Notable Quotes (by issue) ───────────────────────────────────────────────

/**
 * Selected quotes from 《自由時代》 articles, indexed by context.
 * All quotes are sourced from [基金會] E14 unless otherwise noted.
 */
export const notableQuotes = [
  {
    text: '本刊文責一律由總編輯鄭南榕負責',
    context: '刊載於每期封面的固定標語',
    source: '基金會 — 《自由時代》各期封面',
    chapter: 'ch0-prologue' as const,
  },
  {
    text: '我們要的是徹頭徹尾、不折不扣的自由。不論他們拔槍之後，何時開火，我們總要周旋到底，爭取百分之百的自由。',
    date: '1985-09-21',
    issue: 88,
    mastheadName: '民主天地',
    context: '公路警察拔槍威嚇運書車員工後，鄭南榕當天發表的社論',
    source: '基金會 E14 §Section0007',
    chapter: 'ch1-context' as const,
  },
  {
    text: '你們今天審判我，就是審判新聞自由。',
    date: '1986-07-21',
    context: '鄭南榕因選罷法言論官司出庭受審時的聲明',
    source: '基金會 E14 §語錄 Section0040',
    chapter: 'ch1-context' as const,
  },
  {
    text: '戒嚴是不折不扣的軍事統治。蔣經國雖然矢口否認軍事統治臺灣，但是不必相信他的話。三十八個年頭以來，蔣家政權又何嘗不是建立在槍炮、刑具、鎮暴車的恐怖陰影上面。這是十足的軍事統治，是最沒有人道的那一種。',
    date: '1986-01-06',
    issue: 102,
    mastheadName: '先鋒時代',
    context: '〈戒嚴就是軍事統治〉',
    source: '基金會 E14 §Section0011',
    chapter: 'ch1-context' as const,
  },
  {
    text: '我們深信，所有的自由裡，第一個應該爭取的是言論自由，有了言論自由以後，才有可能保住其他的自由。',
    date: '1988-03-12',
    context: '創刊四周年社論',
    source: '基金會 E14 §Section0028',
    chapter: 'ch1-context' as const,
  },
  {
    text: '本刊雖是這場多事之秋的直接受害者，但「新憲案」絕不只是自由時代一家，或鄭南榕一人的事而已……刊登一篇文章，竟然會涉嫌「叛亂」，竟然會面臨少則七年重刑、多則槍斃死刑的生命威脅。',
    date: '1989-01-14',
    issue: 259,
    mastheadName: '捍衛時代',
    context: '〈面對叛亂案的重刑，我們只有不敢怠懈而已！〉',
    source: '基金會 E14 §Section0033',
    chapter: 'ch2-seventyOnedays' as const,
  },
  {
    text: '鄭南榕堅信在民主國家中，刊登一篇憲法草案根本不可能涉嫌叛亂，因此拒絕這種非法傳訊……鄭南榕將不惜一切行使他的抵抗權。',
    date: '1989-02-04',
    issue: 262,
    mastheadName: '捍衛時代',
    context: '〈這是考驗「人性」與「理性」的時刻！〉春節特刊',
    source: '基金會 E14 §Section0034',
    chapter: 'ch2-seventyOnedays' as const,
  },
  {
    text: '但是最可悲的，是進行這項殺人工程的竟然都是有血有肉的人。包括檢察官、推事、法警、霹靂小組、甚至於獄吏在內，他們都將執行一項「上級」交代的任務：解決鄭南榕。他們在政治黑手指揮之下，必須環環相扣地把鄭南榕辦到底，不容許任何細節因為「良心」因素而逸出控制，否則他們會失去飯碗。甚至他們也必須說服自己：鄭南榕罪有應得。這樣一個人性備受扭曲的極權統治體系，才真正是「臺獨人士」終身反對的對象。',
    date: '1989-02-04',
    issue: 262,
    mastheadName: '捍衛時代',
    context: '〈這是考驗「人性」與「理性」的時刻！〉——「殺人工程」段落',
    source: '基金會 E14 §Section0034',
    chapter: 'ch3-investigation' as const,
  },
  {
    text: '終於，自由時代週刊昂然邁進第六個年頭，在多事之秋的此刻。回首來時路，五年的奮鬥歷程……本刊自創刊迄今，歷經四十次停刊、百餘次查禁。十次言論官司，一次槍口對準人身……環視臺灣的反對派刊物，能延續言論自由的香火而五年不斷者，也只有自由時代碩果僅存而已。',
    date: '1989-03-11',
    issue: 267,
    mastheadName: '鄉土時代',
    context: '〈落實對臺灣命運的終極關懷〉創刊五周年社論',
    source: '基金會 E14 §Section0036',
    chapter: 'ch2-seventyOnedays' as const,
  },
  {
    text: '在這個時代，愛上臺灣與為臺灣痛苦往往是同一剎那伴隨而生的兩種感情。然後，如果誰忍不住要為臺灣打拚，就註定要走上孤獨的路。',
    date: '1989-02-04',
    issue: 262,
    mastheadName: '捍衛時代',
    context: '〈這是考驗「人性」與「理性」的時刻！〉',
    source: '基金會 E14 §語錄 Section0034',
    chapter: 'ch6-callToAction' as const,
  },
  {
    text: '漠視弱勢者的受難，就是迫害人權的同謀。',
    date: '1989-04-09',
    context: '自焚後第二天發表（預寫稿）；《自由時代》最後刊出的文字之一',
    source: '基金會 E14 §語錄「今昔對映，言猶在耳」',
    chapter: 'ch6-callToAction' as const,
  },
] as const;

export type QuoteChapter = typeof notableQuotes[number]['chapter'];
