# 文檔提取計畫 — 鄭南榕事件互動體驗網站

> 參照 `~/projects/Chen-Wen-chen/docs/extracted/` 的兩層模式：
> - **Layer 1 — `docs/extracted/*.md`**：每份來源文件提取為一份結構化 Markdown（摘要 + 嵌入 JSON）
> - **Layer 2 — `src/data/*.ts`**：整合所有 extracted files，產出應用層 TypeScript 資料

本計畫只處理 Layer 1。每個任務獨立執行，可分次進行。

---

## 輸出格式規範

每份 `docs/extracted/XX-<name>.md` 須包含以下章節（依 Chen-Wen-chen 慣例）：

```markdown
## 基本資訊
| 欄位 | 值 |
|------|----|
| 標題 | ... |
| 作者/機關 | ... |
| 日期 | ... |
| 性質 | 政府檔案 / 學術論文 / 基金會出版 / 百科條目 |
| 語言 | 繁體中文 |
| 原始檔案 | sources/路徑 |

## 核心內容摘要
（10–20 條要點，每條附頁碼引用）

## 時間線事件
```json
[
  {
    "date": "1989-01-21",
    "time": null,
    "event": "高檢署以涉嫌叛亂發出傳票",
    "source": "檔案名, p. X",
    "significance": "high",
    "category": "incident"
  }
]
```

## 人物資料
```json
[
  {
    "id": "cheng-nan-jung",
    "name": "鄭南榕",
    "nameEn": "Nylon Cheng / Cheng Nan-jung",
    "role": "protagonist",
    "description": "...",
    "source": "檔案名, p. X"
  }
]
```

## 關鍵引述
（原文逐字引用 + 頁碼）

## 與其他文檔的交叉比對
（標記一致/矛盾/補充之處）

## 適合網站呈現的內容
（標註建議用於哪個章節、哪個互動元件）
```

`category` 值域：`background` | `legal` | `incident` | `surveillance` | `investigation` | `aftermath`
`significance` 值域：`high` | `medium` | `low`
`role` 值域：`protagonist` | `family` | `ally` | `prosecutor` | `intelligence` | `police` | `politician` | `journalist` | `academic`

---

## 提取任務列表

### Tier 1 — 可直接提取（文字檔 / HTML，無需 PDF 工具）

| # | 來源檔案 | 輸出 | 大小 | 預計產出 | 對應章節 |
|---|---------|------|------|---------|---------|
| E01 | `sources/wiki/國家人權記憶庫_二條一.htm` | `docs/extracted/01-article-2-1.md` | 38 KB | 二條一法條全文、唯一死刑機制、適用案例、廢除時間線 | Ch.1 時代背景 |
| E02 | `sources/wiki/國家人權記憶庫_懲治叛亂條例.htm` | `docs/extracted/02-punishment-rebellion-act.md` | 47 KB | 全部13條逐條摘要、立法沿革、軍事審判、財產沒收、廢除過程 | Ch.1 時代背景、Ch.3 調查歷程 |
| E03 | `sources/wiki/鄭南榕 - 維基百科，自由的百科全書.htm` | `docs/extracted/03-wikipedia-biography.md` | 363 KB | 完整年表、人物關係、71天自囚細節、監控紀錄概述、各方評價 | 全站（主時間線骨架） |
| E04 | `sources/檔案局/*/4.5.17-1.txt` + JPG | `docs/extracted/04-archive-travel-ban.md` | ~1 KB+280 KB | 限制出境令：高檢處發文內政部出入境管理局 | Ch.3 調查歷程 |
| E05 | `sources/檔案局/*/4.5.17-2.txt` + JPG | `docs/extracted/05-archive-kaohsiung-speech.md` | ~1 KB+506 KB | 高雄獨立演講監控紀錄 | Ch.4 監控真相 |
| E06 | `sources/檔案局/*/4.5.17-3.txt` + JPG | `docs/extracted/06-archive-indictment.md` | ~1 KB+622 KB | 正式叛亂起訴：刊登憲法草案→叛亂罪 | Ch.2 案發經過、Ch.3 調查歷程 |
| E07 | `sources/檔案局/*/4.5.17-4.txt` + JPG | `docs/extracted/07-archive-case-closed.md` | ~1 KB+449 KB | 撤銷起訴：因自焚身亡不予起訴處分 | Ch.3 調查歷程 |
| E08 | `sources/檔案局/*/4.5.17-5.txt` + JPG | `docs/extracted/08-archive-phone-tap.md` | ~1 KB+436 KB | 治喪委員會電話干擾：死後仍遭監控的證據 | Ch.4 監控真相 |

### Tier 2 — 需 PDF 提取（中小型，可逐份處理）

| # | 來源檔案 | 輸出 | 大小 | 預計產出 | 對應章節 |
|---|---------|------|------|---------|---------|
| E09 | `sources/論文/監視怎麼做？以《青谷專案》中陳菊的動態為例.PDF` | `docs/extracted/09-qinggu-surveillance-method.md` | 488 KB | 青谷專案監控方法論：來源可靠性(甲乙丙)、內容正確性(一二三)、報告格式欄位 | Ch.4 監控真相（CRT迷你互動核心依據） |
| E10 | `sources/論文/鄭南榕政治主張與行動之研究.pdf` | `docs/extracted/10-cheng-political-research.md` | 1.1 MB | 政治主張分析、行動年表、與黨外運動關係 | Ch.1 時代背景、Ch.2 案發經過 |
| E11 | `sources/論文/「100_言論自由」之時代意義與當今所面臨之挑戰.pdf` | `docs/extracted/11-article-100-free-speech.md` | 1.2 MB | 刑法第100條歷史分析、修正前後對照、言論自由演進 | Ch.1 時代背景、Ch.3 調查歷程 |
| E12 | `sources/論文/威權體制與失控的執行者：從情治檔案重探臺大哲學系事件.PDF` | `docs/extracted/12-authoritarian-surveillance-ntu.md` | 1.5 MB | 情治機關運作機制、執行者角色、監控檔案結構（平行參照） | Ch.4 監控真相 |

### Tier 3 — 大型文件（需分段處理）

| # | 來源檔案 | 輸出 | 大小 | 預計產出 | 對應章節 |
|---|---------|------|------|---------|---------|
| E13 | `sources/論文/探求歷史真相與責任的開端.pdf` | `docs/extracted/13-tjc-truth-responsibility.md` | 68 MB | 促轉會報告：監控檔案統計、真相追求歷程（需先確認內容再決定提取範圍） | Ch.3、Ch.4、Ch.5 |
| E14 | `sources/books/本刊文責一律由總編輯鄭南榕負責.epub` | `docs/extracted/14-cheng-writings.md` | 987 KB | 鄭南榕親筆文章、社論、聲明（原始引述來源） | Ch.0 序章、Ch.2 案發經過 |
| E15 | `sources/books/認識鄭南榕：看見《自由時代》總編輯的十一個面向.epub` | `docs/extracted/15-eleven-facets.md` | 19 MB | 基金會認證傳記：11個面向、71天自囚紀錄、家屬回憶、同事證詞 | 全站（權威傳記來源） |

---

## 建議執行順序

```
Phase A — 法律基礎（E01 → E02 → E11）
  先建立法條知識基底，後續提取才能正確標注法律引用

Phase B — 人物與時間線骨架（E03）
  維基百科提供全案時間線框架，作為其他文件的錨點

Phase C — 檔案局原始文件（E04 → E05 → E06 → E07 → E08）
  五份檔案局紀錄，每份很短但含掃描圖檔需 OCR/描述

Phase D — 監控方法論（E09 → E12）
  青谷專案格式是 CRT 迷你互動的設計依據，優先提取

Phase E — 政治研究與傳記（E10 → E14 → E15）
  補充深度敘事內容、鄭南榕原始文字

Phase F — 大型促轉會報告（E13）
  最後處理 68MB 報告，此時已有足夠上下文判斷提取範圍
```

---

## 執行方式

每個任務以獨立 subagent 執行：

```
指令模板：
「請提取 sources/<路徑> 至 docs/extracted/XX-<name>.md，
  依照 docs/plans/2026-02-19-source-extraction-plan.md 的輸出格式規範。
  對應章節：Ch.X。
  特別注意提取：<該文件的重點項目>。」
```

- 每份獨立執行、獨立 commit
- 大型 PDF（E13, E15）可能需要分頁讀取（`pages: "1-20"` 等）
- EPUB 需先轉檔或用工具讀取
- JPG 掃描檔需用 Read 工具視覺辨識內容

---

## 提取完成後 — Layer 2 整合

所有 extracted files 完成後，再執行整合任務：

1. `docs/extracted/characters.json` — 合併所有人物資料，去重，加入跨文件引用
2. `docs/extracted/timeline.json` — 合併所有時間線事件，排序，標注衝突
3. `src/data/timeline.ts` — 應用層時間線（typed）
4. `src/data/characters.ts` — 應用層人物資料（typed）
5. `src/data/legal.ts` — 法條全文 + 適用案例 + 法條適用判斷互動資料
6. `src/data/surveillance.ts` — 監控紀錄結構化資料 + 青谷專案格式
7. `src/data/selfImprisonment.ts` — 71天自囚日誌
8. `src/data/publications.ts` — 《自由時代》期刊資料
