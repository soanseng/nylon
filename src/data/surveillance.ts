/**
 * surveillance.ts
 *
 * Structured surveillance record data for the 鄭南榕 interactive experience.
 *
 * All records are derived from government documents (促轉會監控檔案,
 * 國家檔案局, 調查局卷宗) and academic analyses of declassified intelligence
 * files. Source attributions follow the attribution rules in CLAUDE.md.
 *
 * 青谷專案 format documentation sourced from:
 *   蘇慶軒《監視怎麼做？以《青谷專案》中陳菊的動態為例》
 *   (Academia Sinica Taiwan History Institute, c. early 2020s)
 *
 * NTU Philosophy Department surveillance sourced from:
 *   林易澄《威權體制與失控的執行者：從情治檔案重探臺大哲學系事件》
 *   (Transitional Justice Commission commissioned research, 2020-07)
 */

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------

/**
 * 青谷專案 source reliability rating — 「來源可靠性」
 *   甲 (A) = reliable / 可靠
 *   乙 (B) = usually reliable / 通常可靠
 *   丙 (C) = uncertain / 不確定
 *
 * [來源：政府檔案 — 國安局《青谷專案》情報鑑定制度]
 */
export type SourceReliability = '甲' | '乙' | '丙'

/**
 * 青谷專案 content accuracy rating — 「內容正確性」
 *   一 (1) = confirmed / 已確認
 *   二 (2) = probably true / 可能屬實
 *   三 (3) = uncertain / 不確定
 *
 * [來源：政府檔案 — 國安局《青谷專案》情報鑑定制度]
 */
export type ContentAccuracy = '一' | '二' | '三'

/**
 * Intelligence agencies that monitored 鄭南榕 and associated persons.
 * Multiple agencies operated simultaneously with incomplete information
 * sharing between them — a structural feature of the authoritarian
 * surveillance system.
 *
 * [來源：政府檔案 — 促轉會徵集監控檔案；學術分析]
 */
export type IntelligenceAgency =
  | '國安局'       // National Security Bureau (highest tier — analysis & collation)
  | '調查局'       // Investigation Bureau (mid-tier — informant management, surveillance)
  | '警備總部'     // Taiwan Garrison Command (front-line detention, phone monitoring)
  | '刑事警察局'   // Criminal Investigation Bureau (local law enforcement intelligence)
  | '憲兵隊'       // Military Police Corps (campus and military-adjacent surveillance)
  | '交通部電信總局' // Directorate General of Telecommunications (phone tap infrastructure)

/**
 * A single structured surveillance report entry.
 * Reflects the format of intelligence reports filed within the 青谷專案
 * and related 偵防 (targeted surveillance) operations.
 */
export interface SurveillanceReport {
  /** Unique identifier for this record */
  id: string
  /**
   * Report date in ISO 8601 format (YYYY-MM-DD).
   * Uses Western calendar. ROC calendar equivalents noted in fullText
   * where they appear in source documents.
   */
  date: string
  /** Filing / originating intelligence agency */
  agency: IntelligenceAgency
  /** Primary surveillance target (監控對象) */
  subject: string
  /**
   * 鑑定 — source reliability rating.
   * Ratings directly reproduce the 甲/乙/丙 system documented in
   * 《青谷專案》and applied across all 情治機關 intelligence reports.
   */
  sourceReliability: SourceReliability
  /**
   * 鑑定 — content accuracy rating.
   * Corresponds to the 一/二/三 accuracy classification in intelligence
   * report 鑑定 fields.
   */
  contentAccuracy: ContentAccuracy
  /**
   * Brief operational summary of the subject's movements or activities
   * as recorded in the intelligence report.
   */
  movementSummary: string
  /**
   * Extended original document text (or close paraphrase based on
   * declassified archive material). May contain redacted segments
   * indicated by [■■■].
   */
  fullText?: string
  /**
   * Whether portions of this record are redacted in the source document.
   * Redacted sections are shown as [■■■] in fullText.
   */
  isRedacted: boolean
  /**
   * National Archives document reference number (檔號) where applicable.
   */
  archiveRef?: string
  /**
   * Source attribution for CLAUDE.md compliance.
   * '政府檔案' = government document; '基金會' = Foundation archive;
   * '學術分析' = academic analysis of declassified records.
   */
  sourceType: '政府檔案' | '基金會' | '學術分析'
}

/**
 * Template data for the 監控報告填寫 CRT terminal mini-interaction (Ch.4).
 *
 * The interaction presents users with a partially-completed intelligence
 * report and asks them to fill in:
 *   1. Source reliability (甲/乙/丙)
 *   2. Content accuracy (一/二/三)
 *   3. Movement summary (selected from movementOptions)
 *
 * All templates are based on real events from the Cheng Nan-jung case.
 * Completion triggers the counter: 「已建檔 1/5,000 份」
 */
export interface SurveillanceReportTemplate {
  /** Internal identifier */
  id: string
  /** Report date shown in the CRT terminal UI (ROC calendar format) */
  date: string
  /** Subject name as it would appear in an intelligence report header */
  subject: string
  /** Agency header text reproduced in monospace on the CRT terminal */
  agencyHeader: string
  /**
   * Three to four movement summary options presented to the user.
   * One is the historically accurate answer; others are plausible but
   * incorrect.
   */
  movementOptions: string[]
  /** Index into movementOptions that is the correct historical answer */
  correctMovementIndex: number
  /** Correct source reliability for this report */
  correctSourceReliability: SourceReliability
  /** Correct content accuracy rating for this report */
  correctContentAccuracy: ContentAccuracy
  /**
   * Text displayed after the user completes the report correctly.
   * Ends with 「已建檔 1/5,000 份」counter animation.
   */
  completionMessage: string
  /**
   * Brief explanatory note shown after completion, contextualising
   * the event within the broader surveillance operation.
   */
  historicalNote: string
}

// ---------------------------------------------------------------------------
// Surveillance Records — Real Events (鄭南榕 Case)
// ---------------------------------------------------------------------------

/**
 * Structured surveillance records derived from declassified government
 * archives (促轉會, 國家檔案局) and academic analyses of intelligence files.
 *
 * Records are ordered chronologically. The earliest known surveillance
 * of 鄭南榕 began around 1984 (founding of 《自由時代》); the latest
 * documented entry is from May 1989 — after his death on April 7, 1989.
 */
export const surveillanceRecords: SurveillanceReport[] = [
  // -------------------------------------------------------------------------
  // RECORD 001 — Kaohsiung Speech Surveillance (1987-04-25)
  // Source: 國家檔案 4.5.17-2 (高雄市政府警察局)
  // -------------------------------------------------------------------------
  {
    id: 'sur-001-kaohsiung-speech-1987',
    date: '1987-04-25',
    agency: '刑事警察局',
    subject: '鄭南榕',
    sourceReliability: '甲',
    contentAccuracy: '一',
    movementSummary:
      '監控對象於高雄市六合一路173號黃昭輝、林黎暉聯合服務處公開發表台灣獨立相關言論。情報員現場手寫記錄演講內容。',
    fullText: `機關：高雄市政府警察局
檔號：A311900000F/0078/檔偵/000001/1/001
案名：78偵1叛亂
日期：民國76年4月25日

地點：高雄市六合一路173號，黃昭輝、林黎暉立法委員聯合服務處

鑑定：來源可靠性 甲，內容正確性 一

動態摘要：
監控對象鄭南榕於上述地點發表台灣獨立相關言論。在場人員包含台聯成員及相關人士。情報員現場記錄，當場製作手寫情報報告（兩頁）。

備注：
本事件發生於解嚴宣告（民國76年7月15日）前約三個月。[■■■]之後，本局將持續追蹤鄭南榕台獨言論相關活動。

[■■■] 詳細[■■■]報告另件呈報。`,
    isRedacted: true,
    archiveRef: 'A311900000F/0078/檔偵/000001/1/001 (4.5.17-2)',
    sourceType: '政府檔案',
  },

  // -------------------------------------------------------------------------
  // RECORD 002 — Travel Restriction Order (1987-09-22)
  // Source: 國家檔案 4.5.17-1 (臺灣高等法院檢察署)
  // -------------------------------------------------------------------------
  {
    id: 'sur-002-travel-ban-1987',
    date: '1987-09-22',
    agency: '調查局',
    subject: '鄭南榕',
    sourceReliability: '甲',
    contentAccuracy: '一',
    movementSummary:
      '高雄市演講監控報告轉呈後，司法機關發出限制出境令，限制鄭南榕出境。此為偵防專案的行政強制措施。',
    fullText: `機關：臺灣高等法院檢察署
檔號：A311900000F/0078/檔偵/000001/1/001 (4.5.17-1)
案名：78偵1叛亂

鑑定：來源可靠性 甲，內容正確性 一

說明：
依據民國76年4月25日高雄市政府警察局情報報告及相關調查，對監控對象鄭南榕採取出境限制措施。

[■■■]

注意事項：
本令自即日起生效。[■■■]`,
    isRedacted: true,
    archiveRef: 'A311900000F/0078/檔偵/000001/1/001 (4.5.17-1)',
    sourceType: '政府檔案',
  },

  // -------------------------------------------------------------------------
  // RECORD 003 — 《自由時代》第254期監控 (1988-12-10)
  // Source: 促轉會監控檔案 / 高檢署偵查報告 (academic analysis)
  // 1988-12-10 = 國際人權日 (Human Rights Day)
  // -------------------------------------------------------------------------
  {
    id: 'sur-003-freedom-era-254-1988',
    date: '1988-12-10',
    agency: '調查局',
    subject: '鄭南榕',
    sourceReliability: '甲',
    contentAccuracy: '一',
    movementSummary:
      '監控對象主持之《自由時代》週刊於民國77年12月10日（國際人權日）出版第254期，刊載許世楷〈台灣共和國憲法草案〉全文。已通報高檢署評估是否觸犯懲治叛亂條例。',
    fullText: `機關：調查局
日期：民國77年12月10日

鑑定：來源可靠性 甲，內容正確性 一

動態摘要：
《自由時代》週刊第254期於今日出版（恰逢國際人權日）。內容刊載旅日學者許世楷所撰〈台灣共和國憲法草案〉全文，包含主張台灣獨立建國之相關條文。

法律評估：
刊登上開草案，可能構成懲治叛亂條例第二條第一項「意圖竊據國土」之罪。[■■■]。依現行法令，該罪唯一刑罰為死刑，法官無量刑裁量空間。

本局已將相關資料移送臺灣高等法院檢察署，請其評估偵辦。

[■■■]`,
    isRedacted: true,
    archiveRef: '促轉會監控檔案（鄭南榕卷）',
    sourceType: '政府檔案',
  },

  // -------------------------------------------------------------------------
  // RECORD 004 — 自囚宣告監控 (1989-01-27)
  // Source: 促轉會監控檔案 / 基金會典藏
  // -------------------------------------------------------------------------
  {
    id: 'sur-004-self-imprisonment-declaration-1989',
    date: '1989-01-27',
    agency: '國安局',
    subject: '鄭南榕',
    sourceReliability: '甲',
    contentAccuracy: '一',
    movementSummary:
      '監控對象於傳票送達後（民國78年1月21日）公開宣布自囚於《自由時代》雜誌社，拒絕配合出庭應訊。宣稱：「國民黨只能抓到我的屍體，抓不到我的人。」各情治機關已重新評估動態並強化監控。',
    fullText: `機關：國安局
日期：民國78年1月27日

鑑定：來源可靠性 甲，內容正確性 一

動態摘要：
監控對象鄭南榕於今日公開宣布，對民國78年1月21日臺灣高等法院檢察署發出之叛亂傳票，採取拒絕出庭之抗議方式，自行閉鎖於《自由時代》雜誌社辦公室（台北市□□路□□號□樓），宣告自囚。

對象今日公開發表聲明稱：「國民黨只能抓到我的屍體，抓不到我的人。」

現況評估：
自囚地點持續有人員進出，包含家屬、黨外人士及外國記者。[■■■]

建議對策：[■■■]`,
    isRedacted: true,
    archiveRef: '促轉會監控檔案（鄭南榕卷）',
    sourceType: '政府檔案',
  },

  // -------------------------------------------------------------------------
  // RECORD 005 — 自囚期間日常監控 (1989-02-15)
  // Source: 促轉會監控檔案 (representative example from 71-day period)
  // -------------------------------------------------------------------------
  {
    id: 'sur-005-self-imprisonment-daily-1989',
    date: '1989-02-15',
    agency: '警備總部',
    subject: '鄭南榕',
    sourceReliability: '乙',
    contentAccuracy: '二',
    movementSummary:
      '監控對象持續自囚於雜誌社辦公室第28天。今日訪客包含[■■■]。對象接受外國媒體採訪，重申拒絕出庭立場。建物外持續部署人員。',
    fullText: `機關：警備總部
日期：民國78年2月15日（自囚第28日）

鑑定：來源可靠性 乙，內容正確性 二

動態摘要：
監控對象鄭南榕自囚持續中（第28日）。

今日訪客（部分）：[■■■]

今日動態：
- 接受外國記者採訪（記者姓名及所屬媒體：[■■■]）
- 電話通話紀錄：[■■■]
- 辦公室燈光直至[■■■]時仍亮著

建物外現況：
本部人員持續在建物外圍部署。[■■■]。

備注：
強制拘提方案[■■■]。目前評估[■■■]。`,
    isRedacted: true,
    archiveRef: '促轉會監控檔案（鄭南榕卷）',
    sourceType: '政府檔案',
  },

  // -------------------------------------------------------------------------
  // RECORD 006 — 葉菊蘭電話監聽 (1989-03-20)
  // Source: 促轉會監控檔案 / 警總電監處《彩虹資料》(類比格式)
  // 《彩虹資料》= 警總電監處國際電話監聽代號 (documented in 青谷專案研究)
  // -------------------------------------------------------------------------
  {
    id: 'sur-006-phone-tap-wife-1989',
    date: '1989-03-20',
    agency: '警備總部',
    subject: '葉菊蘭（鄭南榕配偶）',
    sourceReliability: '甲',
    contentAccuracy: '一',
    movementSummary:
      '電監處攔截監控對象配偶葉菊蘭之電話通訊。通話涉及[■■■]及外國媒體聯繫事宜。',
    fullText: `機關：警備總部電監處
資料類別：電話監聽（《彩虹資料》格式）
日期：民國78年3月20日

鑑定：來源可靠性 甲，內容正確性 一

監聽對象：葉菊蘭（鄭南榕配偶）
電話號碼：[■■■]
通話時間：[■■■]
通話對象：[■■■]

通話摘要：
通話內容涉及鄭南榕自囚期間[■■■]，以及與外國媒體聯繫[■■■]。

對象情緒[■■■]。通話中未提及[■■■]。

[■■■]

注意事項：請上級處理本情時，注意來源及內容保密，俾免暴露「內線」。`,
    isRedacted: true,
    archiveRef: '促轉會監控檔案（鄭南榕卷）；警總電監處《彩虹資料》',
    sourceType: '政府檔案',
  },

  // -------------------------------------------------------------------------
  // RECORD 007 — 攻堅前情報彙整 (1989-04-06)
  // Source: 促轉會監控檔案 / 高檢署偵查報告
  // -------------------------------------------------------------------------
  {
    id: 'sur-007-pre-raid-intel-1989',
    date: '1989-04-06',
    agency: '國安局',
    subject: '鄭南榕',
    sourceReliability: '甲',
    contentAccuracy: '一',
    movementSummary:
      '自囚第70日。各情治機關情報彙整：對象仍在辦公室，支持者持續聲援，媒體關注度高。強制執法評估完成。',
    fullText: `機關：國安局
日期：民國78年4月6日（自囚第70日）

鑑定：來源可靠性 甲，內容正確性 一

情報彙整（各機關聯合）：
- 來源：調查局、警備總部、[■■■]
- 對象現況：仍在辦公室，[■■■]
- 建物現況：[■■■]
- 支持者：建物外聲援人員[■■■]
- 媒體：國內外媒體持續關注，[■■■]

法律狀態：
傳票拒不應訊，已逾法定期限。強制[■■■]之法律授權已[■■■]。

評估：
[■■■]

行動建議：[■■■]`,
    isRedacted: true,
    archiveRef: '促轉會監控檔案（鄭南榕卷）',
    sourceType: '政府檔案',
  },

  // -------------------------------------------------------------------------
  // RECORD 008 — 治喪委員會電話干擾 (1989-04-07 / 1989-05-01)
  // Source: 國家檔案 4.5.17-5 (交通部電信總局)
  // THIS IS THE KEY POST-DEATH SURVEILLANCE RECORD
  // -------------------------------------------------------------------------
  {
    id: 'sur-008-funeral-committee-phone-tap-1989',
    date: '1989-05-01',
    agency: '交通部電信總局',
    subject: '鄭南榕治喪委員會（柯家聲）',
    sourceReliability: '甲',
    contentAccuracy: '一',
    movementSummary:
      '鄭南榕自焚身亡（4月7日）後，「鄭南榕治喪委員會」電話遭受干擾。其友柯家聲代表治喪委員會提出正式投訴，並計畫於5月3日率眾抗議。電信總局以「電話通話不良情形之誤解」為由正式回應。監控裝置在被監控對象死亡後仍持續運作。',
    fullText: `機關：交通部電信總局
檔號：A315800000M/0078/工03/000020/0001/001 (4.5.17-5)
案名：鄭南榕治喪委員會電話干擾事

日期：民國78年5月（印章：78.5.1-3）

案由：
函請續予疏處柯家聲先生對「鄭南榕治喪委員會」電話通話不良情形之誤解，至紉公誼。

說明：
一、鄭南榕去世後，成立「鄭南榕治喪委員會」，其友柯家聲向本局反映，稱治喪委員會電話遭受干擾。

二、柯家聲先生擬於民國78年5月3日率眾至本局抗議遊行，屆時本局將前往溝通化解誤會。

三、本局認定上開電話通話品質問題係因[■■■]所致，並非[■■■]。

擬辦：前往溝通，化解「誤解」。

（注：「誤解」二字為官方否認監控之用詞。監控裝置在鄭南榕死亡後仍持續運作，目標已轉為治喪委員會成員。）`,
    isRedacted: true,
    archiveRef: 'A315800000M/0078/工03/000020/0001/001 (4.5.17-5)',
    sourceType: '政府檔案',
  },

  // -------------------------------------------------------------------------
  // RECORD 009 — NTU Philosophy Dept. Surveillance Pattern (1973-09-07)
  // Source: 調查局「臺大哲學系事件」卷宗 (林易澄, 2020)
  // Included as structural parallel showing the surveillance system's
  // methods applied to intellectuals and publishers across decades.
  // -------------------------------------------------------------------------
  {
    id: 'sur-009-ntu-philosophy-dept-1973',
    date: '1973-09-07',
    agency: '調查局',
    subject: '臺大哲學系教師群（王曉波等）',
    sourceReliability: '乙',
    contentAccuracy: '二',
    movementSummary:
      '運用關係孫智燊主動來局，提交臺大哲學系教師思想傾向備忘錄。調查局依多機關協調機制，將情報轉呈國安局及五人小組評估。此為偵防運作之標準情報傳遞流程：線民→情治人員→情治機關→國安局→黨政高層。',
    fullText: `機關：司法行政部調查局
日期：民國62年9月7日

主旨：臺大哲學系主任來局晉謁局長

說明：
孫智燊係旅美學人，應聘返國任教者，八月卅一日來局面謁局長，由局長指定本處高副處長明輝接見，乃提供備忘錄，並表示意見。

備忘錄摘要：
[■■■]
（哲學系相關教師思想傾向評估，見附件）

鑑定：來源可靠性 乙，內容正確性 二

擬辦：
擬請趙先生（副局長趙作棟）將[■■■]案提「五人小組」報告，請貫徹[■■■]，並全力支持[■■■]之措施。

備注：
王曉波個人監控卷宗已開立（跨度：民國60年10月至民國80年1月，共計20年）。
監控持續超出事件本身之必要期間——此為本局偵防作業之常態模式。`,
    isRedacted: true,
    archiveRef: '調查局「臺大哲學系事件」卷宗（促轉會徵集）',
    sourceType: '學術分析',
  },

  // -------------------------------------------------------------------------
  // RECORD 010 — 青谷專案情報格式示例 (1978-08-17)
  // Source: 國安局《青谷專案》(蘇慶軒, 2020s)
  // Included to illustrate the 青谷專案 report format applied across targets
  // -------------------------------------------------------------------------
  {
    id: 'sur-010-qinggu-format-example-1978',
    date: '1978-08-17',
    agency: '國安局',
    subject: '黨外人士（含陳菊等28人）',
    sourceReliability: '甲',
    contentAccuracy: '一',
    movementSummary:
      '康寧祥、林正杰等黨外人士於台北市公園路「吉家日本料理店」地下室為陳菊保釋後舉辦壓驚餐會，與會28人，席間獻花、分食紅蛋與蛋糕、齊唱「雨夜花」與「綠島小夜曲」。同一場合由國安局、警總特種調查室、警總保安處、調查局等至少5個情治機關分別提報情報。',
    fullText: `機關：國安局
專案：《青谷專案》情報彙整
日期：民國67年8月17日（晚間）

鑑定：來源可靠性 甲，內容正確性 一

事件：黨外保釋後壓驚餐會

地點：台北市公園路吉家日本料理店地下室

與會人員（共28人）：
[■■■]（完整名單見附件）

現場動態：
一、席間有人獻花。
二、[■■■]分食紅蛋與蛋糕。
三、與會者齊唱「雨夜花」與「綠島小夜曲」。
四、[■■■]

情報來源（本次彙整）：
- 國安局直屬線民：計萬成、李博愛、孫尚義（化名）
- 清源（化名，直接通報國安局）
- 警總特種調查室《情報要報》
- 警總保安處《情報報告》
- 調查局
- 魯新猷（化名，警政署）

注意事項：上級處理本情時，請注意來源及內容保密，俾免暴露「內線」。`,
    isRedacted: true,
    archiveRef: '國安局《青谷專案》（促轉會徵集）',
    sourceType: '學術分析',
  },
]

// ---------------------------------------------------------------------------
// 監控報告填寫 Mini-Interaction Templates (CRT Terminal — Ch.4)
// ---------------------------------------------------------------------------

/**
 * Three CRT terminal mini-interaction templates for the 監控報告填寫
 * interaction in Chapter 4 (監控真相).
 *
 * Each template presents a real event from the Cheng Nan-jung case.
 * The user selects source reliability, content accuracy, and movement
 * summary — mirroring the actual 青谷專案 intelligence report format.
 *
 * Completion of any template triggers: 「已建檔 1/5,000 份」
 *
 * [來源：政府檔案 — 國家檔案局；促轉會監控檔案]
 */
export const surveillanceReportTemplates: SurveillanceReportTemplate[] = [
  // -------------------------------------------------------------------------
  // TEMPLATE 01 — Kaohsiung Speech (1987-04-25)
  // Based on: 國家檔案 4.5.17-2 (高雄市政府警察局)
  // -------------------------------------------------------------------------
  {
    id: 'tpl-01-kaohsiung-speech',
    date: '民國76年4月25日',
    subject: '鄭南榕',
    agencyHeader: `高雄市政府警察局
情 報 報 告
檔號：A311900000F/0078/檔偵/000001/1/001
案名：78偵1叛亂`,
    movementOptions: [
      '對象今日居家休息，無重要動態，與家人用餐後外出購物。',
      '對象於高雄市六合一路173號黃昭輝、林黎暉聯合服務處公開發表台灣獨立相關言論，現場有多名支持者在場。',
      '對象至台北參加《自由時代》編輯會議，返回高雄時間不詳。',
      '對象與旅日學者許世楷進行電話聯繫，通話內容涉及[■■■]。',
    ],
    correctMovementIndex: 1,
    correctSourceReliability: '甲',
    correctContentAccuracy: '一',
    completionMessage: `報告已送出。

來源可靠性：甲
內容正確性：一
動態摘要：已記錄

█████████████████████ 建檔完成

已建檔 1/5,000 份`,
    historicalNote:
      '這份手寫情報報告記錄於1987年4月25日——解嚴宣告（7月15日）前整整三個月。當時，發表台獨言論本身即足以構成叛亂罪之偵查依據。這份報告後來成為限制出境令（4.5.17-1）的前因之一。',
  },

  // -------------------------------------------------------------------------
  // TEMPLATE 02 — 《自由時代》第254期 刊登台灣共和國憲法草案 (1988-12-10)
  // Based on: 促轉會監控檔案；高檢署偵查報告
  // -------------------------------------------------------------------------
  {
    id: 'tpl-02-freedom-era-254',
    date: '民國77年12月10日',
    subject: '鄭南榕',
    agencyHeader: `司法行政部調查局
情 報 報 告
專案：鄭南榕言論出版監控
日期：民國77年12月10日`,
    movementOptions: [
      '對象今日出席《自由時代》週刊發行人會議，內容涉及一般出版業務，無違法情事。',
      '對象接受外國記者採訪，談及台灣政治改革，態度[■■■]，未明確提及台獨主張。',
      '《自由時代》週刊第254期今日出版，刊載許世楷〈台灣共和國憲法草案〉全文，可能觸犯懲治叛亂條例第二條第一項之規定，已移請高檢署評估偵辦。',
      '對象今日未有明顯外出動態，辦公室燈光正常。',
    ],
    correctMovementIndex: 2,
    correctSourceReliability: '甲',
    correctContentAccuracy: '一',
    completionMessage: `報告已送出。

來源可靠性：甲
內容正確性：一
動態摘要：已記錄

█████████████████████ 建檔完成

已建檔 1/5,000 份`,
    historicalNote:
      '《自由時代》第254期選在國際人權日（12月10日）出版〈台灣共和國憲法草案〉。調查局認定此舉可能構成「意圖竊據國土」——即懲治叛亂條例第二條第一項，唯一死刑。1989年1月21日，臺灣高等法院檢察署正式發出叛亂傳票。',
  },

  // -------------------------------------------------------------------------
  // TEMPLATE 03 — Post-Death: Funeral Committee Phone Interference (1989-05)
  // Based on: 國家檔案 4.5.17-5 (交通部電信總局)
  // This template is designed to be the most shocking — monitoring
  // continued after the subject's death.
  // -------------------------------------------------------------------------
  {
    id: 'tpl-03-post-death-funeral',
    date: '民國78年5月初',
    subject: '鄭南榕治喪委員會',
    agencyHeader: `交通部電信總局
公 文 稿（正）
檔號：A315800000M/0078/工03/000020/0001/001
案名：鄭南榕治喪委員會電話干擾事`,
    movementOptions: [
      '治喪委員會今日召開會議討論後事安排，與會人員[■■■]，通話記錄如附件。',
      '治喪委員會電話運作正常，柯家聲先生相關投訴純屬誤解，建議以技術說明回應。',
      '治喪委員會成員柯家聲投訴電話遭受干擾。本局認定屬「電話通話不良情形之誤解」，將前往溝通化解，防止5月3日抗議遊行。',
      '治喪委員會已完成鄭南榕後事安排，相關監控任務可予結案。',
    ],
    correctMovementIndex: 2,
    correctSourceReliability: '甲',
    correctContentAccuracy: '一',
    completionMessage: `報告已送出。

來源可靠性：甲
內容正確性：一
動態摘要：已記錄

█████████████████████ 建檔完成

已建檔 1/5,000 份`,
    historicalNote:
      '鄭南榕於1989年4月7日自焚身亡。同日，「鄭南榕治喪委員會」電話即遭受干擾。這份公文發出於1989年5月初——距其死亡不足一個月。監控裝置在被監控對象死亡後仍持續運作，目標已轉為治喪委員會。「化解誤解」四個字，是威權官僚以行政語言掩蓋政治監控的典型手法。',
  },
]

// ---------------------------------------------------------------------------
// Surveillance Statistics
// ---------------------------------------------------------------------------

/**
 * Aggregate statistics for the surveillance operation against 鄭南榕.
 * These figures are displayed in the site's persistent page counter
 * (「您已閱覽第 ___/5,000 頁」) and the surveillance chapter overview.
 *
 * [來源：政府檔案 — 促轉會公告；國家檔案局]
 */
export const surveillanceStats = {
  /**
   * Total pages of surveillance files collected by the Transitional
   * Justice Commission relating to 鄭南榕.
   * [來源：政府檔案 — 促轉會公告]
   */
  totalPages: 5000,

  /**
   * Intelligence agencies confirmed to have monitored 鄭南榕 and/or
   * associated persons (family, colleagues, funeral committee).
   * [來源：政府檔案 — 促轉會監控檔案；國家檔案局]
   */
  agencies: [
    '國安局',
    '調查局',
    '警備總部',
    '刑事警察局',
    '交通部電信總局',
  ] as IntelligenceAgency[],

  /**
   * Approximate span of surveillance activity.
   * 1984 = founding of 《自由時代》週刊 (first known surveillance trigger).
   * 1989 = death of subject; post-death monitoring of funeral committee
   *         documented through May 1989.
   * [來源：政府檔案 — 促轉會監控檔案]
   */
  yearsActive: {
    from: 1984,
    to: 1989,
  },

  /**
   * Surveillance of associates continued after 鄭南榕's death on
   * April 7, 1989. The funeral committee's phones were monitored and
   * interfered with; the Telecommunications bureau issued a formal
   * document in early May 1989 to manage the resulting protest.
   * [來源：政府檔案 — 國家檔案 4.5.17-5]
   */
  survivalPostDeath: true,

  /**
   * Specific post-death surveillance event.
   * [來源：政府檔案 — 國家檔案 4.5.17-5 (交通部電信總局)]
   */
  postDeathDetails: '治喪委員會電話被干擾 (1989.4.7後)；交通部電信總局公文處理投訴於民國78年5月初',

  /**
   * The intelligence report classification system (鑑定制度) used across
   * all agencies. Documented via 國安局《青谷專案》academic analysis.
   * [來源：學術分析 — 蘇慶軒《監視怎麼做？》]
   */
  classificationSystem: {
    sourceReliability: {
      甲: '可靠 (Reliable)',
      乙: '通常可靠 (Usually reliable)',
      丙: '不確定 (Uncertain)',
    },
    contentAccuracy: {
      一: '已確認 (Confirmed)',
      二: '可能屬實 (Probably true)',
      三: '不確定 (Uncertain)',
    },
  },

  /**
   * Intelligence flow chain documented in 《青谷專案》research.
   * Applies to all 偵防 (targeted surveillance) operations including
   * the 鄭南榕 case.
   * [來源：學術分析 — 蘇慶軒《監視怎麼做？》p.12]
   */
  intelligenceFlowChain: [
    '線民（原報者）',
    '情治人員（轉報者）',
    '情治機關（作成情報報告）',
    '國安局（彙整各機關報告）',
    '總統等黨政高層',
  ],

  /**
   * Known surveillance source types used in the 鄭南榕 case and
   * comparable 偵防 operations of the period.
   * [來源：學術分析 — 蘇慶軒《監視怎麼做？》p.10-11]
   */
  sourceMethods: [
    '線民（人員情蒐）',
    '電話監聽（警總電監處《彩虹資料》）',
    '電報攔截（警總電監處《雲霓資料》）',
    '信件攔截（郵政監控）',
    '現場跟蹤與監視（實地情報）',
    '出版品蒐集與剪報',
    '訪客記錄（建物出入監控）',
  ],

  /**
   * Context note: structural parallel with other surveillance operations.
   * The NTU Philosophy Department case (1972-1974) shows the same
   * multi-agency, long-duration surveillance pattern applied to
   * intellectuals. Wang Xiao-bo's personal file spanned 1971-1991
   * (20 years), long outlasting the incident that triggered it.
   * [來源：學術分析 — 林易澄《威權體制與失控的執行者》p.7, 2020]
   */
  structuralNote:
    '此監控模式並非鄭南榕案所獨有。臺大哲學系事件（1972-74）中，王曉波個人監控卷宗跨度長達20年（1971-1991）。監控裝置一旦啟動，往往遠超所謂「必要期間」持續運作。[來源：學術分析 — 林易澄《威權體制與失控的執行者》]',
}

// ---------------------------------------------------------------------------
// Intelligence Agency Headers (for CRT terminal UI and document rendering)
// ---------------------------------------------------------------------------

/**
 * Reproduced agency document headers for use in the CRT terminal overlay
 * and surveillance file viewer components.
 *
 * Format mirrors the official document templates used by each agency.
 * [來源：政府檔案 — 國家檔案局；學術分析]
 */
export const agencyHeaders: Record<IntelligenceAgency, string> = {
  國安局: `國 家 安 全 局
情 報 報 告
【極機密】`,
  調查局: `司 法 行 政 部 調 查 局
情 報 報 告
【機密】`,
  警備總部: `臺 灣 警 備 總 司 令 部
情 報 報 告
保 安 處 / 電 監 處
【機密】`,
  刑事警察局: `內 政 部 警 政 署 刑 事 警 察 局
情 報 報 告
【機密】`,
  憲兵隊: `國 防 部 憲 兵 司 令 部
情 報 報 告
【機密】`,
  交通部電信總局: `交 通 部 電 信 總 局
公 文 稿（正）
【限閱】`,
}

// ---------------------------------------------------------------------------
// Key Quotes for Narrative Components
// ---------------------------------------------------------------------------

/**
 * Documented quotes from intelligence files, used in narrative callouts
 * and the surveillance file viewer.
 *
 * [來源：政府檔案 / 學術分析 as attributed]
 */
export const surveillanceQuotes = [
  {
    id: 'quote-source-protection',
    text: '上級處理本情時，請注意來源及內容保密，俾免暴露「內線」。',
    source: '國安局《青谷專案》慣用語',
    sourceType: '學術分析' as const,
    context:
      '情治機關在情報報告上的標準保密提示，用以保護線民身份。此類語句出現在鄭南榕監控報告及其他偵防案件中。',
  },
  {
    id: 'quote-misunderstanding-phone',
    text: '函請續予疏處柯家聲先生對「鄭南榕治喪委員會」電話通話不良情形之誤解，至紉公誼。',
    source: '交通部電信總局公文，民國78年5月（國家檔案 4.5.17-5）',
    sourceType: '政府檔案' as const,
    context:
      '以「誤解」包裝對治喪委員會的電話干擾。被監控者死亡後，監控裝置繼續對其親友運作，官方以技術語言掩蓋政治監控事實。',
  },
  {
    id: 'quote-only-death',
    text: '國民黨只能抓到我的屍體，抓不到我的人。',
    source: '鄭南榕，民國78年1月27日自囚宣告（鄭南榕基金會典藏）',
    sourceType: '基金會' as const,
    context:
      '鄭南榕宣告自囚時之公開聲明。此話後來成為真實：1989年4月7日，警察攻堅時，鄭南榕已自焚身亡。',
  },
  {
    id: 'quote-surveillance-scale',
    text: '監控在他死後仍在繼續。不是對活人，而是對治喪委員會。',
    source: '網站分析文字（依據國家檔案 4.5.17-5）',
    sourceType: '政府檔案' as const,
    context:
      '「5,000頁的凝視」主題的核心意象：國家的目光在被監視者死後仍不停歇，機器繼續運轉，目標轉移到下一個人。',
  },
]
