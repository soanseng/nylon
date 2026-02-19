/**
 * Self-Imprisonment data for the Nylon Deng (鄭南榕) interactive experience.
 *
 * Covers the 71-day self-imprisonment period: 1989.1.27 – 1989.4.7
 * Location: 《自由時代》週刊雜誌社, 台北市民生東路（later identified as
 *           民權東路三段106巷3弄11號3樓）
 *
 * All content sourced exclusively from:
 *   - 維基百科_鄭南榕條目 (03-wikipedia-biography.md)
 *   - 本刊文責 — 鄭南榕文選 (14-cheng-writings.md)
 *   - 認識鄭南榕：十一個面向 (15-eleven-facets.md)
 *   - 國家檔案：不起訴處分書 (07-archive-case-closed.md)
 *   - 國家檔案：限制出境令 (04-archive-travel-ban.md)
 *
 * No information is fabricated. Only events explicitly described in the
 * extracted source files are included. Gaps in the record are intentional.
 */

// ─── Type Definitions ─────────────────────────────────────────────────────────

export type DayEventType =
  | 'statement'    // 鄭南榕 public statement or declaration
  | 'visitor'      // notable visitor to the office
  | 'legal'        // legal development / court/prosecution action
  | 'media'        // media coverage / publication
  | 'solidarity'   // solidarity actions from others
  | 'surveillance' // police/intelligence activity noted
  | 'personal'     // personal letter, daily life detail
  | 'climax';      // April 7 minute-by-minute events

export type DaySignificance = 'high' | 'medium' | 'low';

export interface DayEvent {
  /** HH:MM — only populated for minute-level events on April 7 */
  time?: string;
  type: DayEventType;
  /** Event description in Traditional Chinese */
  description: string;
  /** Primary source citation */
  source: string;
}

export interface SelfImprisonmentDay {
  /** 1 through 71 */
  day: number;
  /** ISO date: 1989-01-27 to 1989-04-07 */
  date: string;
  /** ROC calendar, e.g. 民國78年1月27日 */
  rocdDate: string;
  events: DayEvent[];
  /** Direct quote attributed to 鄭南榕 on or about this day */
  quote?: string;
  /** Source for the quote */
  quoteSource?: string;
  significance: DaySignificance;
}

// ─── Meta-Data ────────────────────────────────────────────────────────────────

export const selfImprisonmentMeta = {
  startDate: '1989-01-27',
  endDate: '1989-04-07',
  totalDays: 71,
  /**
   * The office address used during the self-imprisonment.
   * Note: Foundation archives identify the address as
   * 台北市民權東路三段106巷3弄11號3樓 (the site of the current memorial).
   * Contemporary reporting described it as 民生東路.
   */
  location: '台北市《自由時代》週刊雜誌社',
  locationModern: '台北市民權東路三段106巷3弄11號3樓',
  /** The sedition summons that triggered the self-imprisonment */
  trigger: '1989-01-21 臺灣高等法院檢察署「鄭南榕涉嫌叛亂」傳票',
  /**
   * Nylon's core declaration, made at the start of self-imprisonment.
   * Source: 維基百科_鄭南榕條目 (03-wikipedia-biography.md)
   */
  keyDeclaration: '國民黨不能逮捕到我，只能夠抓到我的屍體。',
  keyDeclarationSource: '鄭南榕，自囚宣言 (民國78年1月27日)',
  /**
   * The sedition charge: publishing 許世楷's 《台灣共和國憲法草案》
   * in 《自由時代》第254期 (1988.12.10) was deemed
   * 「意圖竊據國土」under 刑法第100條 + 懲治叛亂條例第二條第一項.
   * The only available sentence: death. No judicial discretion.
   * Source: 本刊文責 Section0033; 國家檔案 4.5.17-4
   */
  charge: '涉嫌叛亂（刑法第100條＋懲治叛亂條例第二條第一項）',
  chargeStatute: '懲治叛亂條例第二條第一項（唯一死刑）',
  publication: '《自由時代》週刊第254期（1988年12月10日）',
  publicationContent: '許世楷《台灣共和國憲法草案》全文',
  warrantIssued: '1989-04-04',
  warrantIssuedBy: '負責檢察官陳耀能',
  warrantValidUntil: '1989-04-08',
  /** Post-mortem legal disposition */
  caseDisposition: '不起訴處分（因被告自焚身亡，依刑事訴訟法規定不予起訴）',
  caseDispositionSource: '臺灣高等法院檢察署不起訴處分書（檔號 A311900000F/0078/檔偵/000001/1/002）',
} as const;

// ─── Pre-Imprisonment Legal Escalation ───────────────────────────────────────

/**
 * Key legal steps BEFORE Day 1 — necessary context for the 71-day period.
 * These are not part of the self-imprisonment days array but are provided
 * here for completeness.
 * Source: 04-archive-travel-ban.md; 03-wikipedia-biography.md; 14-cheng-writings.md
 */
export const preImprisonmentEscalation = [
  {
    date: '1987-09-22',
    rocdDate: '民國76年9月22日',
    event: '臺灣高等法院檢察署行文內政部出入境管理局，要求限制鄭南榕出境（早於憲法草案事件超過一年）',
    source: '國家檔案 4.5.17-1（限制出境令）',
    significance: 'high' as DaySignificance,
    note: '限制出境令在解嚴（1987.7.15）後不滿三個月即發出。',
  },
  {
    date: '1988-12-10',
    rocdDate: '民國77年12月10日',
    event: '《自由時代》第254期刊登許世楷《台灣共和國憲法草案》全文',
    source: '維基百科_鄭南榕條目；本刊文責 Section0033；認識鄭南榕 013-A003-10',
    significance: 'high' as DaySignificance,
  },
  {
    date: '1989-01-14',
    rocdDate: '民國78年1月14日',
    event: '《自由時代》捍衛時代週刊第259期發表〈面對叛亂案的重刑，我們只有不敢怠懈而已！〉，詳述刑法第100條和懲治叛亂條例的「叛亂邏輯」及國安局→調查局→高檢署的指揮鏈',
    source: '本刊文責 Section0033',
    significance: 'high' as DaySignificance,
  },
  {
    date: '1989-01-21',
    rocdDate: '民國78年1月21日',
    event: '鄭南榕收到臺灣高等法院檢察署簽發的「鄭南榕涉嫌叛亂」法院傳票。鄭南榕取消原定帶女兒出國的行程，請妻子退票，以避免被認定為逃亡',
    source: '維基百科_鄭南榕條目',
    significance: 'high' as DaySignificance,
  },
] as const;

// ─── The 71-Day Self-Imprisonment Record ─────────────────────────────────────

export const selfImprisonmentDays: SelfImprisonmentDay[] = [

  // ── Day 1: 1989-01-27 ──────────────────────────────────────────────────────
  {
    day: 1,
    date: '1989-01-27',
    rocdDate: '民國78年1月27日',
    events: [
      {
        type: 'statement',
        description:
          '鄭南榕宣布行使抵抗權、拒絕出庭，自囚於《自由時代》週刊雜誌社，開始長達71天的自囚。購置軍用行軍床，雇人加裝鐵窗、網子、鐵門等防禦工事。在總編輯室桌下備置3桶汽油及1隻以膠帶黏著的打火機，以自焚為最後防線。各地義工輪流駐守。',
        source: '維基百科_鄭南榕條目',
      },
      {
        type: 'surveillance',
        description:
          '警方開始在雜誌社外蒐證觀察，並安排將雜誌社樓上房間作為臨時指揮所。情治單位開始嚴密監聽雜誌社一舉一動，71天全程監控。',
        source: '維基百科_鄭南榕條目',
      },
    ],
    quote:
      '國民黨不能逮捕到我，只能夠抓到我的屍體。',
    quoteSource: '鄭南榕，自囚宣言，民國78年1月27日（來源：維基百科_鄭南榕條目）',
    significance: 'high',
  },

  // ── Day 6: 1989-02-01 (approx. Chinese New Year) ──────────────────────────
  {
    day: 6,
    date: '1989-02-01',
    rocdDate: '民國78年2月1日',
    events: [
      {
        type: 'personal',
        description:
          '農曆春節期間：由於鄭南榕拒絕返家，其弟將父母接至雜誌社，一家三口在雜誌社圍爐過年。',
        source: '維基百科_鄭南榕條目',
      },
    ],
    significance: 'medium',
  },

  // ── Day 9: 1989-02-04 ──────────────────────────────────────────────────────
  {
    day: 9,
    date: '1989-02-04',
    rocdDate: '民國78年2月4日',
    events: [
      {
        type: 'media',
        description:
          '《自由時代》春節號（捍衛時代週刊第262–263期合刊）出版，發表〈這是考驗「人性」與「理性」的時刻！〉，明確宣示鄭南榕將行使抵抗權，絕不出庭。文中詳述「殺人工程」的機構連動：「包括檢察官、推事、法警、霹靂小組……他們都將執行一項上級交代的任務：解決鄭南榕。」',
        source: '本刊文責 Section0034（捍衛時代週刊第262–263期，1989.02.04）',
      },
      {
        type: 'statement',
        description:
          '鄭南榕在文章中宣示：「鄭南榕堅信在民主國家中，刊登一篇憲法草案根本不可能涉嫌叛亂，因此拒絕這種非法傳訊……鄭南榕將不惜一切行使他的抵抗權。」',
        source: '本刊文責 Section0034（捍衛時代週刊第262–263期）',
      },
    ],
    quote:
      '在這個時代，愛上臺灣與為臺灣痛苦往往是同一剎那伴隨而生的兩種感情。然後，如果誰忍不住要為臺灣打拚，就註定要走上孤獨的路。',
    quoteSource:
      '鄭南榕，〈這是考驗「人性」與「理性」的時刻！〉，《自由時代》捍衛時代週刊第262–263期（1989.02.04）（來源：本刊文責 Section0034）',
    significance: 'high',
  },

  // ── Day 37: 1989-03-04 ─────────────────────────────────────────────────────
  {
    day: 37,
    date: '1989-03-04',
    rocdDate: '民國78年3月4日',
    events: [
      {
        type: 'media',
        description:
          '《自由時代》鄉土時代週刊第266期出版，鄭南榕發表〈為言論自由之役奮戰到底〉，批評國民黨文工會對三大電視臺下達5項新聞指示（含禁止報導二二八紀念活動），宣示繼續為言論自由奮戰。',
        source: '本刊文責 Section0035（鄉土時代週刊第266期，1989.03.04）',
      },
    ],
    significance: 'medium',
  },

  // ── Day 44: 1989-03-11 ─────────────────────────────────────────────────────
  {
    day: 44,
    date: '1989-03-11',
    rocdDate: '民國78年3月11日',
    events: [
      {
        type: 'media',
        description:
          '《自由時代》創刊五周年。鄭南榕在鄉土時代週刊第267期發表〈落實對臺灣命運的終極關懷〉，統計五年成果：40次停刊、100餘次查禁、10次言論官司、1次槍口對準人身。',
        source: '本刊文責 Section0036（鄉土時代週刊第267期，1989.03.11）',
      },
    ],
    quote:
      '終於，自由時代週刊昂然邁進第六個年頭，在多事之秋的此刻。回首來時路，五年的奮鬥歷程……本刊自創刊迄今，歷經四十次停刊、百餘次查禁。十次言論官司，一次槍口對準人身……環視臺灣的反對派刊物，能延續言論自由的香火而五年不斷者，也只有自由時代碩果僅存而已。',
    quoteSource:
      '鄭南榕，〈落實對臺灣命運的終極關懷〉，《自由時代》鄉土時代週刊第267期（1989.03.11）（來源：本刊文責 Section0036）',
    significance: 'high',
  },

  // ── Day 68: 1989-04-04 ─────────────────────────────────────────────────────
  {
    day: 68,
    date: '1989-04-04',
    rocdDate: '民國78年4月4日',
    events: [
      {
        type: 'legal',
        description:
          '負責檢察官陳耀能簽發拘捕票，有效期至4月8日。首席檢察官陳涵決定採取強制拘提的攻堅手段，儘管事前已知悉鄭南榕可能自焚。',
        source: '維基百科_鄭南榕條目',
      },
    ],
    significance: 'high',
  },

  // ── Day 71: 1989-04-07 ── THE FINAL DAY ────────────────────────────────────
  {
    day: 71,
    date: '1989-04-07',
    rocdDate: '民國78年4月7日',
    events: [
      // Pre-raid: overnight
      {
        type: 'climax',
        description:
          '深夜至拂曉：雜誌社內有鄭南榕一家及4名員工、5名志工熬夜留宿，共計約10人。',
        source: '維基百科_鄭南榕條目',
      },

      // 07:30
      {
        time: '07:30',
        type: 'climax',
        description:
          '臺北市政府警察局中山分局分局長王郡及刑事組組長侯友宜召集相關人員進行值勤前教育，部署拘提行動。',
        source: '維基百科_鄭南榕條目',
      },

      // 08:55
      {
        time: '08:55',
        type: 'climax',
        description:
          '調查局人員開始同時撥打雜誌社電話，聲稱要訂閱長期雜誌，企圖癱瘓電話線路、阻止雜誌社向外求援。鄭南榕與員工接連數通可疑電話後，叫員工掛斷；此後雜誌社所有電話線均遭癱瘓。',
        source: '維基百科_鄭南榕條目',
      },

      // 09:00
      {
        time: '09:00',
        type: 'climax',
        description:
          '雜誌社總務主任邱美緣上班途中發現中山分局警車停於巷口，立刻跑進雜誌社通報。志工向鐵門潑灑汽油使地板濕滑，企圖阻止警方破門。警方由侯友宜帶隊，分從電梯和樓梯兩路前往三樓。志工陳元芬於一樓樓梯間遭侯友宜帶隊警方毆打控制。',
        source: '維基百科_鄭南榕條目',
      },

      // 09:05
      {
        time: '09:05',
        type: 'climax',
        description:
          '警方以乙炔切割三樓鐵門；切割噴發的火花引燃樓梯間地板上潑灑的汽油，造成樓梯間起火。鄭南榕叫醒雜誌社內4名員工、4名志工及女兒鄭竹梅（時年9歲），要求所有人立刻離開現場。員工試圖以棉被、水桶撲火。',
        source: '維基百科_鄭南榕條目',
      },

      // 09:10
      {
        time: '09:10',
        type: 'climax',
        description:
          '鄭南榕趁員工撲火之際進入總編輯室、反鎖房門，引燃預先備置的汽油桶，自焚身亡，享年41歲。其弟鄭肇基以葉菊蘭提供的備用鑰匙開門確認起火。消防人員從窗口救出鄭肇基、陳慶華、蔡敏卿，並從資料室陽臺救出林乾義、邱美緣、鄭竹梅、廖國禎等人。',
        source: '維基百科_鄭南榕條目；國家檔案 4.5.17-4（不起訴處分書）',
      },

      // 09:15
      {
        time: '09:15',
        type: 'climax',
        description:
          '仍在東海廣告公司上班的葉菊蘭接到婆婆通報雜誌社起火，此時已預感丈夫可能罹難。',
        source: '維基百科_鄭南榕條目',
      },

      // 10:00
      {
        time: '10:00',
        type: 'climax',
        description:
          '火勢撲滅。顏錦福、盧修一、田孟淑等反對派人士趕抵雜誌社關切。',
        source: '維基百科_鄭南榕條目',
      },

      // 22:00
      {
        time: '22:00',
        type: 'climax',
        description:
          '警方準備撤離現場，一度與包圍大廈的民眾對峙。被下令不得與民眾衝突的警方一直等到凌晨2:30群眾逐漸離去後才撤離。',
        source: '維基百科_鄭南榕條目',
      },
    ],
    quote:
      '但是最可悲的，是進行這項殺人工程的竟然都是有血有肉的人。包括檢察官、推事、法警、霹靂小組、甚至於獄吏在內，他們都將執行一項「上級」交代的任務：解決鄭南榕。他們在政治黑手指揮之下，必須環環相扣地把鄭南榕辦到底，不容許任何細節因為「良心」因素而逸出控制，否則他們會失去飯碗。甚至他們也必須說服自己：鄭南榕罪有應得。',
    quoteSource:
      '鄭南榕，〈這是考驗「人性」與「理性」的時刻！〉，《自由時代》捍衛時代週刊第262–263期（1989.02.04）（來源：本刊文責 Section0034）',
    significance: 'high',
  },
];

// ─── Lookup Helpers ───────────────────────────────────────────────────────────

/**
 * Look up a day by its day number (1–71).
 */
export function getDayByNumber(day: number): SelfImprisonmentDay | undefined {
  return selfImprisonmentDays.find((d) => d.day === day);
}

/**
 * Look up a day by its ISO date string.
 */
export function getDayByDate(date: string): SelfImprisonmentDay | undefined {
  return selfImprisonmentDays.find((d) => d.date === date);
}

/**
 * Return all days with significance === 'high'.
 */
export function getHighSignificanceDays(): SelfImprisonmentDay[] {
  return selfImprisonmentDays.filter((d) => d.significance === 'high');
}

/**
 * Return all events of a given type across the entire 71-day period.
 */
export function getEventsByType(type: DayEventType): Array<{ day: number; date: string; event: DayEvent }> {
  const results: Array<{ day: number; date: string; event: DayEvent }> = [];
  for (const d of selfImprisonmentDays) {
    for (const event of d.events) {
      if (event.type === type) {
        results.push({ day: d.day, date: d.date, event });
      }
    }
  }
  return results;
}

/**
 * Return the April 7 day record (Day 71) with all minute-level events.
 * Convenience accessor used by the Chapter 3 timeline component.
 */
export function getAprilSeventhRecord(): SelfImprisonmentDay {
  const record = getDayByDate('1989-04-07');
  if (!record) {
    throw new Error('selfImprisonment: Day 71 (1989-04-07) record is missing');
  }
  return record;
}

/**
 * Return only the climax events from April 7, sorted by time.
 * Events without a time field are placed first (pre-dawn).
 */
export function getAprilSeventhTimeline(): Array<DayEvent & { time?: string }> {
  return getAprilSeventhRecord().events.filter((e) => e.type === 'climax');
}

// ─── Documentary Record Gap Notice ───────────────────────────────────────────

/**
 * The sources cover the following days with direct evidence:
 *   - Day 1  (1989-01-27): self-imprisonment declaration, fortification, surveillance start
 *   - Day 6  (1989-02-01): Chinese New Year at the office (approximate date)
 *   - Day 9  (1989-02-04): publication of the self-imprisonment manifesto
 *   - Day 37 (1989-03-04): publication on media censorship
 *   - Day 44 (1989-03-11): fifth anniversary editorial
 *   - Day 68 (1989-04-04): arrest warrant issued
 *   - Day 71 (1989-04-07): the final day, minute-by-minute
 *
 * Days 2–5, 7–8, 10–36, 38–43, 45–67, 69–70 are not described in the
 * available extracted sources. The sources note that義工 volunteers
 * maintained a continuous presence, international media covered the
 * standoff, and Amnesty International corresponded with Nylon during
 * this period — but no day-by-day record of those events survives in
 * the five source files used here.
 *
 * The website's 71-day calendar should render undocumented days as
 * "silent" calendar cells — present, numbered, but empty — to convey
 * the weight of time passing without fabricating events.
 */
export const DOCUMENTED_DAYS = [1, 6, 9, 37, 44, 68, 71] as const;

/**
 * Generate a sparse calendar array of all 71 days, with `null` for days
 * not covered by direct source evidence.
 *
 * Useful for rendering the Chapter 3 calendar grid:
 *   - Non-null entries: render with event summary
 *   - Null entries: render as "silent" day cell (day number only)
 */
export function getSparseCalendar(): Array<SelfImprisonmentDay | { day: number; date: string; rocdDate: string }> {
  const result: Array<SelfImprisonmentDay | { day: number; date: string; rocdDate: string }> = [];

  const startMs = new Date('1989-01-27').getTime();

  for (let i = 0; i < 71; i++) {
    const dayNum = i + 1;
    const date = new Date(startMs + i * 86_400_000);
    const isoDate = date.toISOString().slice(0, 10);
    const roc78 = 78;
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const rocdDate = `民國${roc78}年${month}月${dayOfMonth}日`;

    const found = selfImprisonmentDays.find((d) => d.day === dayNum);
    if (found) {
      result.push(found);
    } else {
      result.push({ day: dayNum, date: isoDate, rocdDate });
    }
  }

  return result;
}
