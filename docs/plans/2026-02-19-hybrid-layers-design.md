# Design: 混合層 (Hybrid Layers) — 軍綠檔案室 × CRT 終端機互動

**Date:** 2026-02-19
**Status:** Approved
**Approach:** Approach C (Hybrid Layers) — selected over pure CRT terminal (A) and pure archive room (B)

---

## Design Summary

The base layer is a military-green archive room (dark olive backgrounds, filing cabinet textures, aged paper documents). Mini-interactions switch to a CRT terminal overlay — visitors briefly sit at an intelligence workstation. Pixel art scenes appear as framed「場景重現」(scene reconstructions) at key narrative moments.

**Emotional arc:** Browse cold archival documents (passive witness) → forced into the surveillance agent's role via CRT interactions (active participant) → return to archive, changed.

---

## 1. Color Palette: 軍綠檔案室

### Base Backgrounds (replacing pure black)

```css
--void: #0A0F0A;          /* greenish black — prologue, deepest dark */
--ink: #0D120D;           /* dark olive — main backgrounds */
--ash: #1A211A;           /* military green — card backgrounds */
--smoke: #242E24;         /* olive grey — secondary surfaces */
```

### CRT Terminal (mini-interactions only)

```css
--crt-green: #33FF33;              /* phosphor green — CRT text accents */
--crt-green-dim: #1A8C1A;         /* dim green — secondary CRT elements */
--crt-amber: #FFB000;             /* amber CRT variant — warnings/highlights */
--crt-glow: rgba(51,255,51,0.08); /* scanline overlay tint */
```

### Surveillance Accent

```css
--surveillance-green: #4A6741;  /* muted olive — nav dots, progress bars, UI chrome */
--fluorescent: #E8F0D8;        /* cold fluorescent office light — sparse highlight */
```

### Filing Cabinet

```css
--cabinet-green: #1C2A1C;  /* filing cabinet surface — alternate card bg */
--folder-tab: #8B9D6B;     /* manila folder with green tint — tab labels */
```

### Unchanged

All fire palette (`--flame-core`, `--flame-edge`, `--ember`, `--blood-*`, `--seal-red`), char palette (`--char-*`), paper tones (`--paper-*`), and warmth palette (`--incense`, `--amber`, `--dawn`) remain as-is. The cold green → hot orange/red contrast drives the visual narrative.

### CRT Overlay CSS

```css
.crt-overlay {
  background: repeating-linear-gradient(
    transparent 0px,
    rgba(51,255,51,0.03) 1px,
    transparent 2px
  );
  box-shadow: inset 0 0 80px rgba(51,255,51,0.05);
  border-radius: 8px;
}
```

---

## 2. Pixel Art Scene Illustrations: 場景重現

Five Papers Please-inspired pixel art scenes at 320x180 native resolution, scaled with `image-rendering: pixelated`. Muted palette matching each chapter's mood.

| # | Chapter | Scene | Composition | Palette |
|---|---------|-------|-------------|---------|
| 1 | Ch.0 序章 | **編輯桌** — Empty editor's desk: typewriter, manuscript stack, gasoline can in corner | Centered desk, single overhead light, deep shadows | `--void`, `--ash`, single warm light |
| 2 | Ch.1 時代背景 | **法庭** — Judge behind elevated desk, defendant standing below, 「唯一死刑」stamp on document | Papers Please border-checkpoint: authority above, subject below, paperwork between | `--cabinet-green`, `--paper-aged`, `--seal-red` |
| 3 | Ch.2 案發經過 | **對峙** — Split scene: left=office interior (figure at desk, calendar on wall); right=police surrounding building | Vertical split, interior warmth vs. exterior cold | Left: `--flame-edge` warm; Right: `--surveillance-green` cold |
| 4 | Ch.4 監控真相 | **情報辦公室** — Agent hunched over desk writing report, filing cabinet, rotary phone, ashtray, stacked folders | Bird's-eye view (Papers Please desk angle). Introduces surveillance report mini-game. | `--crt-green-dim`, `--smoke`, `--folder-tab` |
| 5 | Ch.5 未解之謎 | **燒毀的辦公室** — Charred interior, collapsed furniture silhouettes, single shaft of light from broken window | Abstracted — pixel art allows dignified distance. No figure shown. | `--char-black`, `--char-brown`, `--scorch`, single `--dawn` beam |

### Frame Treatment

```
┌─── 場景重現 ───────────────────┐
│  ┌──────────────────────────┐  │
│  │      [pixel art]         │  │
│  └──────────────────────────┘  │
│  Caption text in monospace     │
└────────────────────────────────┘
```

- Border: `1px solid var(--surveillance-green)` with subtle `box-shadow` glow
- Label「場景重現」in monospace, top-left, `color: var(--surveillance-green)`
- Caption in `--dust` color with scene context
- Mobile: full-width, aspect ratio preserved
- `prefers-reduced-motion`: static display, no entrance animation

---

## 3. Mini-Interactions: CRT 終端機互動

Three interactions, each ~30 seconds. CRT terminal overlay boots up on entry, powers down on exit.

### 3a. 監控報告填寫 (Surveillance Report Filing)

**Location:** Chapter 4 (監控真相), after pixel art intelligence office scene

**Premise:** 「你是一名情治人員。根據線民回報，填寫這份監控報告。」

**Form fields** (based on 青谷專案 intelligence report format):

| Field | Input Type | Options |
|-------|-----------|---------|
| 案號 (Case No.) | Pre-filled | Auto-generated |
| 監控對象 (Subject) | Pre-filled | 鄭南榕 |
| 日期 (Date) | Pre-filled | Random date from 1988-1989 |
| 來源可靠性 (Source Reliability) | Select | 甲(absolutely reliable) / 乙(usually reliable) / 丙(unreliable) |
| 內容正確性 (Content Accuracy) | Select | 一(confirmed) / 二(probably true) / 三(possibly true) |
| 動態摘要 (Movement Summary) | Multiple choice | 3 mundane daily movement options |
| 建議處置 (Recommended Action) | Select | 繼續監控 / 加強監控 / 報請上級 |

**Completion:** Report files into stack → paper-shuffle sound → counter: 「已建檔 1/5,000 份」→ message: 「這只是5000頁中的一頁。每一頁的另一端，都是一個人的日常。」

### 3b. 法條適用判斷 (Statute Application Judgment)

**Location:** Chapter 1 (時代背景), after 「二條一」statute display

**Premise:** 「以下是三起案件。請判定適用法條與刑罰。」

**Scenarios:**

| Case | Description | Correct Statute | Sentence |
|------|-------------|-----------------|----------|
| A | 雜誌社總編輯刊登《台灣共和國憲法草案》 | 刑法§100 → 懲治叛亂條例§2-1 | 唯一死刑 |
| B | 三名大學生組織讀書會討論台獨書籍 | 懲治叛亂條例§5 | 十年以上有期徒刑 |
| C | 民眾公開演講主張台灣獨立 | 刑法§100 → 懲治叛亂條例§2-1 | 唯一死刑 |

**Completion:** Red stamp slams down for each → after all three: 「以上三個案例，在今天的台灣都完全合法。但在1989年，每一個都足以讓你被判死刑。」

### 3c. 解密互動 (Declassification Reveal)

**Location:** Chapter 3 (調查歷程) and Chapter 4 (監控真相), multiple instances

**Mechanic:** Black bars overlay key phrases → tap/click → 「解密」stamp → text reveals in `--crt-green-dim` → fades to `--paper-aged`

**Example pairs:**

| Document | Redacted | Revealed |
|----------|----------|----------|
| 起訴書 | ██████████████ | 「涉嫌叛亂」 |
| 監控報告 | 對象於██前往██ | 對象於09:15前往印刷廠 |
| 限制出境令 | 因██████不予出境 | 因發表台灣獨立言論不予出境 |
| 電話監聽紀錄 | ██委員會電話██ | 治喪委員會電話遭干擾 |

**Completion (5+ reveals):** 「你剛解密的，是政府花了數十年試圖隱藏的真相。」

### CRT Terminal Shared UX

- **Boot-up:** 200ms black → green phosphor flicker → form renders line-by-line
- **During:** Scanline overlay, slight screen curvature, monospace font
- **Ambient:** Faint CRT hum (optional, respects `prefers-reduced-motion`)
- **Exit:** Screen shrinks to center dot → fade back to archive
- **Mobile:** Full-screen modal with close button; CRT styling without curvature

---

## 4. Design Decisions Log

| Decision | Chosen | Rejected | Rationale |
|----------|--------|----------|-----------|
| Background color | Dark olive green | Pure black, navy | Military green = historically accurate ROC government office color + CRT monitor feel |
| Pixel art scope | 5 key scene illustrations | Full-site pixel art / No pixel art | Scene illustrations at narrative peaks; main body stays bureaucratic horror |
| Mini-game approach | Multiple 30-second interactions | Single long game / No games | Scattered interactions maintain narrative flow without breaking immersion |
| CRT terminal | Overlay for interactions only | Site-wide CRT / No CRT | Overlay creates distinct "you are the agent" moment without visual fatigue |
| Interaction types | Report filing + statute judgment + declassification | Other options considered | These three map directly to the surveillance system's actual mechanisms |

---

## 5. Source Material Informing Design

- **青谷專案 paper** → Surveillance report form fields, reliability grading system (甲乙丙 / 一二三)
- **Archive files 4.5.17-1 through 4.5.17-5** → Declassification reveal content, prosecution document text
- **國家人權記憶庫 二條一 article** → Statute judgment scenarios, legal chain logic
- **懲治叛亂條例 full text** → Article references for all three judgment scenarios
- **促轉會 Final Report** → Intelligence agency organizational structure informing pixel art scene 4
