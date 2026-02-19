# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**鄭南榕事件互動體驗網站** — An immersive, interactive web experience about Nylon Deng (鄭南榕, 1947–1989), the Taiwanese publisher and free speech martyr who self-immolated on April 7, 1989, to resist prosecution under the sedition law (懲治叛亂條例第二條第一項, "二條一"). The site aims to recreate the **suffocating atmosphere of state surveillance and the terror of "death-by-statute"** — making visitors viscerally feel what it meant to live under a legal regime where publishing words could be a capital offense.

### Purpose

- Present factual, government-sourced materials (surveillance files, prosecution documents, court records) in an atmospheric narrative format
- Make visitors **feel** the weight of 5,000+ pages of surveillance — the paranoia, the absurdity, the relentlessness
- Convey the horror of 二條一: a law where the only sentence was death, with no judicial discretion
- Demonstrate that martial law's lifting (1987.7.15) did NOT end political persecution — 《懲治叛亂條例》remained active until 1991
- Provide action items (April 7 Freedom of Speech Day, Nylon Deng Liberty Foundation, Transitional Justice resources)

### Core Emotional Design Concept: 「紙上死刑」(Death Sentence on Paper)

The horror is not fire — it is **bureaucracy**. The site should make visitors feel:
1. **Surveillance paranoia** — scrolling through redacted files that watched someone's every move
2. **Legal absurdity** — a law that says "publish these words → death, no alternatives"
3. **Institutional suffocation** — 71 days of self-imprisonment, knowing the state is outside your door
4. **The weight of a single choice** — "國民黨只能抓到我的屍體" (The KMT can only arrest my corpse)

## Source Materials (Public Government Documents & Foundation Archives)

All content must be sourced from and attributed to one of the following categories:

### 「政府檔案」(Government Documents)
- 促轉會監控檔案 — Transitional Justice Commission surveillance files (~5,000 pages of intelligence monitoring records on 鄭南榕)
- 高檢署偵查報告 — Supreme Prosecutors Office investigation reports
- 懲治叛亂條例全文 — Full text of the Punishment of Rebellion Act (1949–1991)
- 刑法第100條舊條文 — Old Article 100 of the Criminal Code (pre-1992 revision)
- 1989年涉嫌叛亂傳票 — The sedition summons issued to 鄭南榕
- 國安局/調查局/警總情報檔案 — Intelligence agency files (NSB, Investigation Bureau, Taiwan Garrison Command)

### 「基金會/鄭南榕親筆」(Foundation & Primary Sources)
- 鄭南榕基金會典藏 — Nylon Deng Liberty Foundation archives
- 《自由時代》週刊原件 — Original copies of Freedom Era Weekly (especially Issue #254, 1988.12.10)
- 許世楷《台灣共和國憲法草案》刊載頁 — The published Taiwan Republic Constitution Draft
- 鄭南榕親筆書信/聲明 — Handwritten letters and public statements
- 自囚71天期間紀錄 — Records from the 71-day self-imprisonment (1989.1.27–4.7)
- 葉菊蘭口述/回憶 — Oral histories from Yeh Chu-lan (wife)
- 現場保存照片 — Preserved scene photographs (Foundation archives)

### Attribution Rules
- Every factual claim must include a source tag: `[來源：政府檔案]` or `[來源：基金會]`
- Clearly label analysis/interpretation vs. documented fact
- When quoting 鄭南榕's words, use exact quotes with source attribution
- Surveillance file excerpts must note the originating agency (國安局/調查局/警總)

## Tech Stack

- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui (as needed)
- **Build Tool:** Vite
- **Deployment:** Static site (GitHub Pages or similar)
- **Language:** Traditional Chinese (繁體中文) as primary; UI chrome in both zh-TW and en

## Build & Dev Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
npm run type-check   # TypeScript type checking
```

## Architecture

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── narrative/       # Story-telling components (scroll-driven, reveal effects)
│   ├── surveillance/    # Surveillance file viewer, redaction interactions
│   ├── legal/           # 二條一 statute display, "paper death sentence" effects
│   ├── timeline/        # Interactive timeline (71 days, minute-level events)
│   ├── interactive/     # Interactive elements (file drawer, stamp reveal, burning edge)
│   ├── pixel/           # PixiJS pixel art system (from Chen-Wen-chen project)
│   │   ├── PixelScene.tsx    # Shared wrapper (lazy loading, scaling, reduced-motion)
│   │   ├── PixiCanvas.tsx    # PixiJS v8 Canvas renderer
│   │   ├── usePixiApp.ts     # React hook for PixiJS Application
│   │   └── scenes/           # Procedural pixel art scenes (PixiJS Graphics API)
│   ├── crt/             # CRT terminal overlay (boot/shutdown, scanlines, mini-interactions)
│   └── layout/          # Page layout, navigation, mobile menu
├── chapters/            # Chapter-based page components (one per narrative section)
├── data/
│   ├── timeline.ts      # Chronological events (1947–1989–1991–present)
│   ├── characters.ts    # Key figures (鄭南榕, 葉菊蘭, 許世楷, 侯友宜, etc.)
│   ├── surveillance.ts  # Structured surveillance record entries
│   ├── legal.ts         # Legal statutes, prosecution documents
│   ├── selfImprisonment.ts  # 71-day self-imprisonment daily log
│   └── publications.ts  # 《自由時代》issues and key articles
├── hooks/
│   ├── useScrollReveal.ts    # IntersectionObserver-based reveal
│   ├── useSurveillance.ts    # Surveillance file browsing state
│   ├── useRedaction.ts       # Redacted text reveal interaction
│   ├── useCountdown.ts       # 71-day countdown display
│   └── useAudio.ts           # Ambient audio (if any)
├── lib/
│   ├── utils.ts         # General utilities
│   ├── constants.ts     # Site-wide constants
│   └── types.ts         # TypeScript type definitions
├── styles/
│   └── globals.css      # Global styles, CSS custom properties, Tailwind extensions
└── assets/
    ├── documents/       # Scanned document images (surveillance files, summons)
    ├── photos/          # Historical photographs
    └── textures/        # Paper textures, burn marks, stamp overlays
```

## Design Philosophy

- **Mobile-first:** All layouts designed for phone reading experience first
- **「檔案恐怖」(Bureaucratic Horror):** Horror emerges from institutional surveillance and legal machinery, not from the fire
- **Surveillance immersion:** Visitors should feel watched — the files pile up, the language is cold, clinical
- **「二條一」terror:** The statute itself is the weapon — display it with the gravity of a death warrant
- **Deep reporting style:** Long-form scrollytelling, progressive disclosure
- **Factual integrity:** All content sourced from government documents or Foundation archives; clearly distinguish fact vs. analysis
- **Sensitivity:** The self-immolation is presented with dignity and restraint — atmospheric tension over graphic imagery
- **Burnt-edge aesthetic:** Subtle charred/singed paper edges as a recurring visual motif (connecting bureaucracy → fire → consequence)
- **「雙層體驗」(Two-layer experience):** Archival browsing (passive witness) → CRT terminal interactions (forced into the surveillance agent's role) → return to archive, changed by the experience

## Key Narrative Structure

### Chapter Flow

#### 1. 序章：1989年4月7日 (Prologue: April 7, 1989)
- **Visual:** Olive-black void → **pixel art scene: 編輯桌** (empty desk, typewriter, gasoline can) → date fades in character by character → flame flicker (subtle, not graphic)
- **Audio hint:** Distant sirens, paper rustling
- **Key quote:** 「國民黨只能抓到我的屍體，抓不到我的人。」
- **Emotional beat:** Shock, gravity, a single irreversible moment

#### 2. 時代背景：言論即叛亂 (Context: When Words Were Treason)
- **Visual:** Military green background, surveillance document aesthetic → **pixel art scene: 法庭** (judge, defendant, death stamp)
- **Content:**
  - 解嚴 ≠ 自由：martial law lifted 1987, but 《懲治叛亂條例》and 刑法100條 remained
  - 「二條一」條文全文展示 — the death-only statute
  - Interactive: tap/click the statute text → red 「唯一死刑」stamp slams down
  - **Mini-interaction: 法條適用判斷** — CRT terminal overlay; 3 scenarios (magazine, reading group, speech) → apply correct statute → stamp verdict
  - Context: what books/magazines/speeches could get you killed
  - 促轉會監控檔案 excerpts showing surveillance of intellectuals/publishers
- **Emotional beat:** Dawning horror — "this was AFTER martial law ended?"

#### 3. 案發經過：從傳票到自焚的71天 (The 71 Days: From Summons to Fire)
- **Visual:** Day-counter (Day 1 → Day 71), **pixel art scene: 對峙** (split: office interior / police outside), clock-like precision for April 7
- **Content:**
  - 1988.12.10: 《自由時代》第254期刊登《台灣共和國憲法草案》
  - 1989.1.21: 高檢署發出涉嫌叛亂傳票
  - 1989.1.27: 鄭南榕宣布自囚於《自由時代》雜誌社
  - 71 days of daily life inside the office (letters, visitors, statements)
  - 1989.4.7: 警方攻堅 → minute-by-minute timeline → self-immolation
- **Interactive:** Scrollable 71-day calendar; April 7 expands to minute-level detail
- **Emotional beat:** Slow-building dread, the inevitability, countdown to collision

#### 4. 調查歷程：紙上的正義 (Investigation: Justice on Paper)
- **Visual:** Government document aesthetic (paper bg, stamps, official headers)
- **Content:**
  - 高檢署偵查報告 analysis
  - 《懲治叛亂條例》application to the case
  - The legal theory: publishing a constitution draft = 「意圖竊據國土」= death
  - Post-mortem legal changes: 1991 廢除懲治叛亂條例, 1992 修正刑法100條
- **Interactive:** Side-by-side: old statute vs. revised statute, with changes highlighted
- **Mini-interaction: 解密互動** — CRT overlay; tap redacted bars on prosecution documents (起訴書, 限制出境令) to reveal hidden text with「解密」stamp
- **Emotional beat:** Cold institutional machinery — how law becomes a weapon

#### 5. 監控真相：5000頁的凝視 (Surveillance Truth: 5,000 Pages of Watching)
- **Visual:** This is the HORROR PEAK — **pixel art scene: 情報辦公室** (agent at desk, bird's-eye view) → full surveillance document immersion
- **Content:**
  - Surveillance file browser: scroll through reproduced intelligence reports
  - Redacted sections that reveal on interaction (click/tap to "declassify")
  - Monitoring of daily movements, visitor logs, phone records
  - Multiple agencies tracking simultaneously (國安局, 調查局, 警總)
  - The absurdity: surveillance continued even after the subject's death
- **Interactive:**
  - **Mini-interaction: 監控報告填寫** — CRT terminal overlay; fill intelligence report using 青谷專案 format (source reliability 甲/乙/丙, content accuracy 一/二/三, movement summary). Completion: 「已建檔 1/5,000 份」
  - File drawer: pull open to reveal stacked documents
  - Redaction reveal (解密互動): tap black bars to show hidden text underneath
  - Counter: "您已閱覽第 ___/5000 頁" (You have viewed page ___/5,000)
  - 「解密」stamp animation when revealing classified content
- **Emotional beat:** Suffocation, paranoia, the relentless mechanical eye of the state

#### 6. 未解之謎：燒焦的真相 (Unanswered Questions: Charred Truth)
- **Visual:** **Pixel art scene: 燒毀的辦公室** (charred interior, no figure, single light beam) → burnt-edge paper cards, expandable mystery panels with charred borders
- **Content:**
  - 警方攻堅過程爭議 — disputes about the police raid procedures
  - Evidence preservation: Foundation maintained the burned office scene
  - Responsibility questions: who ordered the raid? Why that day?
  - 侯友宜角色 — the role of the police commander
  - Why surveillance files were classified for decades
- **Interactive:** Expandable cards with burnt-edge animation; hover reveals hidden layers
- **Emotional beat:** Anger, unresolved tension, the wound that won't close

#### 7. 行動呼籲：讓自由不再需要殉道 (Call to Action: Freedom Without Martyrdom)
- **Visual:** Gradual shift from dark to warm amber tones — dawn breaking
- **Content:**
  - 4月7日言論自由日 — April 7 as Freedom of Speech Day (officially designated 2016)
  - 鄭南榕基金會參觀資訊 — Foundation visit information
  - 促轉會資源連結 — Transitional Justice Commission resources
  - GitHub 貢獻史料 — Contribute to digitizing historical materials
  - 《自由時代》數位典藏 — Digital archive of Freedom Era Weekly
- **Emotional beat:** Purpose, agency, "what can I do?"

## Design System: 檔案恐怖 × 燒焦邊緣 (Bureaucratic Horror × Charred Edges)

### Color Palette

```css
/* Core — dark olive-green backgrounds (military green / CRT monitor aesthetic) */
--void: #0A0F0A;          /* Greenish black — prologue, deepest dark */
--ink: #0D120D;           /* Dark olive — main backgrounds */
--ash: #1A211A;           /* Military green — card backgrounds */
--smoke: #242E24;         /* Olive grey — secondary surfaces */

/* CRT Terminal (mini-interactions only) */
--crt-green: #33FF33;              /* Phosphor green — CRT text accents */
--crt-green-dim: #1A8C1A;         /* Dim green — secondary CRT elements */
--crt-amber: #FFB000;             /* Amber CRT variant — warnings/highlights */
--crt-glow: rgba(51,255,51,0.08); /* Scanline overlay tint */

/* Surveillance Accent */
--surveillance-green: #4A6741;  /* Muted olive — nav dots, progress bars, UI chrome */
--fluorescent: #E8F0D8;        /* Cold fluorescent office light — sparse highlight */

/* Filing Cabinet */
--cabinet-green: #1C2A1C;  /* Filing cabinet surface — alternate card bg */
--folder-tab: #8B9D6B;     /* Manila folder with green tint — tab labels */

/* Mid-tones (WCAG AA compliant on dark backgrounds) */
--stone: #7D7772;
--stone-light: #8B8680;
--dust: #9D9892;
--dust-light: #ADA8A3;

/* Paper & Document */
--paper-aged: #E8DCC4;    /* Yellowed old paper */
--paper-burnt: #D4C4A0;   /* Darker aged paper */
--paper-fresh: #F4F1E8;   /* Clean document paper */

/* Fire & Danger — the defining accent (cold green → hot orange/red contrast drives visual arc) */
--flame-core: #FF6B00;    /* Inner flame orange */
--flame-edge: #FF8C00;    /* Outer flame */
--ember: #CC4400;         /* Dying ember */
--blood-dark: #7F1D1D;    /* Deep blood red */
--blood: #991B1B;         /* Primary blood */
--seal-red: #DC2626;      /* Official seal stamp red */
--blood-muted: #B45454;   /* Faded blood */

/* Char & Burn */
--char-black: #1A1008;    /* Charred paper edge */
--char-brown: #3D2B1A;    /* Burnt paper transition */
--scorch: #5C3A1E;        /* Scorched zone */

/* Incense & Warmth (for Call to Action chapter) */
--incense: #D4834F;
--amber: #B45309;
--dawn: #FEF3C7;          /* Hope / warmth in final chapter */
```

### Typography

| Purpose | Font | Usage |
|---------|------|-------|
| Narrative body | Noto Serif TC | Main reading text, chapter content |
| Headings / UI | Noto Sans TC | Chapter titles, labels, buttons |
| Literary / quotes | LXGW WenKai TC | 鄭南榕 quotes, emotional passages |
| Government docs | Courier New / monospace | Surveillance files, statutes, timestamps, official codes |
| Statute text | Source Han Serif (思源宋體) Heavy | 《懲治叛亂條例》display — imposing, authoritative |

### Key Visual Elements

#### Shared with 林宅血案 project
- **Film grain overlay:** Subtle animated noise on `body::after`, `opacity: 0.035`
- **Vignette:** `box-shadow: inset 0 0 250px 80px rgba(0,0,0,0.6)` on immersive sections
- **Redacted text:** Black bars (`background: #000; color: transparent`) that reveal on click/hover
- **Classification stamps:** Rotated semi-transparent overlay text (「解密」/「極機密」)
- **Document pages:** Aged paper background with margin notes and header borders
- **Scroll-triggered reveals:** IntersectionObserver with `threshold: 0.15`

#### Unique to 鄭南榕 project
- **Burnt edges:** CSS/SVG charred paper effect on document cards — singed, curling edges with gradient from paper → char-brown → char-black → transparent
- **「唯一死刑」stamp:** Red official stamp that slams onto the statute text with animation (scale from 1.5 → 1.0, slight rotation, shake)
- **Surveillance page counter:** Persistent floating counter showing pages viewed out of 5,000
- **71-day countdown:** Visual day counter that progresses as user scrolls through Chapter 3
- **Fire gradient:** Subtle animated gradient at chapter transitions (ember → flame-core → flame-edge → transparent)
- **Typewriter effect:** For 鄭南榕's quotes — characters appear one by one, as if being typed on the Freedom Era typewriter
- **Intelligence agency headers:** Reproduced file headers for 國安局/調查局/警總 documents

#### Pixel Art Scene Illustrations (場景重現)
Five Papers Please-inspired pixel art scenes at key narrative moments. Native resolution 320x180, scaled with `image-rendering: pixelated`.

**共用基礎設施（from ~/projects/Chen-Wen-chen/）：** PixiJS v8 程序化渲染系統。直接複製 `src/components/pixel/` 下的 `PixelScene.tsx`（viewport lazy loading + responsive scaling + reduced-motion 降級）、`PixiCanvas.tsx`（Canvas renderer）、`usePixiApp.ts`（React hook）。15 個已完成場景（6K–12K 行 PixiJS Graphics 各）可作為繪製語法與構圖參考。

| # | Chapter | Scene | Composition |
|---|---------|-------|-------------|
| 1 | Ch.0 序章 | **編輯桌** — Empty editor's desk: typewriter, manuscript stack, gasoline can | Centered desk, single overhead light, deep shadows |
| 2 | Ch.1 時代背景 | **法庭** — Judge behind elevated desk, defendant below, 「唯一死刑」stamp | Papers Please border-checkpoint composition |
| 3 | Ch.2 案發經過 | **對峙** — Split: office interior (left) / police surrounding building (right) | Vertical split, interior warmth vs. exterior cold |
| 4 | Ch.4 監控真相 | **情報辦公室** — Agent at desk, filing cabinet, rotary phone, ashtray | Bird's-eye view (Papers Please desk angle) |
| 5 | Ch.5 未解之謎 | **燒毀的辦公室** — Charred interior, collapsed silhouettes, single light beam | Abstracted — no figure shown, dignified distance |

Frame treatment: `1px solid var(--surveillance-green)` border with glow, 「場景重現」label in monospace at top-left, caption in `--dust`.

#### Mini-Interactions (CRT Terminal Overlay)
Three ~30-second interactions. CRT terminal overlay boots up on entry (phosphor flicker → line-by-line render), powers down on exit (shrink to center dot).

**1. 監控報告填寫 (Ch.4):** Fill an intelligence report using 青谷專案 format — select source reliability (甲/乙/丙), content accuracy (一/二/三), movement summary from options. Completion: 「已建檔 1/5,000 份」counter.

**2. 法條適用判斷 (Ch.1):** Three scenarios based on real cases — determine applicable statute and sentence. Red「唯一死刑」stamp slams for death-sentence cases. Completion: 「在今天的台灣都完全合法。但在1989年，每一個都足以讓你被判死刑。」

**3. 解密互動 (Ch.3 & Ch.4):** Tap/click redacted bars on prosecution/surveillance documents → 「解密」stamp → text reveals. Content from actual archive files (起訴書, 監控報告, 限制出境令, 電話監聽紀錄).

CRT shared UX: scanline overlay (`repeating-linear-gradient`), slight screen curvature (`border-radius: 8px`), monospace font. Mobile: full-screen modal. Respects `prefers-reduced-motion`.

### Chapter Visual Progression

1. **序章:** Olive-black void → **pixel art: 編輯桌** → single flame flicker → date materializes → 「國民黨只能抓到我的屍體」
2. **時代背景:** Military green background, surveillance document aesthetic, statute text in imposing serif → **pixel art: 法庭** → **mini-interaction: 法條適用判斷** (CRT overlay)
3. **案發經過:** 71-day counter, calendar grid, **pixel art: 對峙 (split scene)** → April 7 minute-by-minute blocks — tension builds via red/orange
4. **調查歷程:** Government document aesthetic (paper bg, stamps, official letterhead), legal comparison layouts → **mini-interaction: 解密互動** (CRT overlay on prosecution documents)
5. **監控真相:** PEAK HORROR — **pixel art: 情報辦公室** → **mini-interaction: 監控報告填寫** (CRT overlay) → full surveillance immersion, file drawers, redaction bars, page counter, 「解密」stamps
6. **未解之謎:** **Pixel art: 燒毀的辦公室** → burnt-edge cards, charred paper borders, expandable mystery panels with smoldering animation
7. **行動呼籲:** Warm gradient shift (olive-green → amber → dawn), action grid, hopeful but determined tone

## Mobile-First Principles

- `font-size: 16px` on mobile, `18px` on desktop
- `clamp()` for all responsive font sizes
- Touch-friendly tap targets (min `44px`)
- Nav dots hidden on mobile (`display: none` under `640px`)
- `scroll-snap-type: y proximity` for chapter alignment
- Surveillance file viewer: swipe-to-browse on mobile
- Redaction reveal: tap (not just hover) interaction required
- 71-day calendar: horizontal scroll on mobile, grid on desktop

## Content Guidelines

- All historical claims must be traceable to government documents or Foundation archives
- Use ROC calendar dates (民國) alongside Western dates where the source does
- 鄭南榕's direct quotes must be exact and sourced
- Sensitive content (self-immolation) should be presented with dignity — atmospheric tension over graphic detail
- The fire is the CONSEQUENCE; the horror is the SYSTEM that made it "necessary"
- Never sensationalize the self-immolation — frame it as an act of political conviction
- The tone should evoke institutional dread and righteous anger, not exploitation
- Always contextualize: 解嚴 ≠ 自由; the legal apparatus of oppression persisted

## Key Legal Context (Must Be Accurate)

### 懲治叛亂條例 第二條第一項 (The "二條一")
- Published 1949, minor revisions 1950/1958, **remained in force until May 22, 1991**
- Original text: 「犯刑法第一百條第一項、第一百零一條第一項、第一百零三條第一項、第一百零四條第一項之罪者，處死刑。」
- This was a **mandatory death sentence** — judges had NO discretion for lesser penalties
- Applied to 鄭南榕 via 刑法第100條「意圖竊據國土」(intent to seize national territory)
- The charge: publishing 許世楷's 《台灣共和國憲法草案》= sedition = death

### Why Still Active After Martial Law?
- 解嚴 (July 15, 1987) only lifted the martial law decree itself
- 《懲治叛亂條例》, 《動員戡亂時期臨時條款》, and old 《刑法第100條》remained in force
- Used to suppress Taiwan independence speech even after "democratization"
- Abolished only after: 鄭南榕 (1989) → 獨台會案 (1991) → public outcry → repeal

### Timeline of Legal Reform
- 1987.7.15 — 解嚴 (martial law lifted)
- 1989.4.7 — 鄭南榕自焚
- 1991.5.1 — 動員戡亂時期終止
- 1991.5.22 — 懲治叛亂條例廢止
- 1991.5 — 獨台會案 (arrests that triggered final push for reform)
- 1992.5.15 — 刑法第100條修正 (added 「以強暴脅迫」requirement — pure speech no longer criminal)

## Performance & Accessibility

- Target Lighthouse score: 90+ on all metrics
- `prefers-reduced-motion`: Disable animations, show content statically
- `prefers-color-scheme`: No light mode (intentional — the darkness IS the narrative)
- Screen reader: All images have descriptive alt text; redacted text has `aria-label` with revealed content
- Content warnings: Displayed before Chapter 1, with option to skip graphic descriptions
- Font loading: Use `font-display: swap` with appropriate fallbacks
