# Design: April 7 Expanded Timeline (Ch.2 結尾)

**Date:** 2026-02-20
**Status:** Approved
**Chapter:** Ch.2 案發經過 — TheSeventyOneDays.tsx

---

## Problem

April 7, 1989 is the narrative climax of the entire site, but the current `TheSeventyOneDays.tsx` treats it as just another date in a flat event list. The minute-by-minute data already exists in `selfImprisonment.ts` (Day 71, `type: 'climax'`) but is not rendered anywhere.

---

## Solution

Add a two-part dedicated section at the **end of Ch.2**, visually distinct from the preceding 71-day list.

---

## Structure

### Part 1 — Scene-setting text

A short narrative paragraph before the timeline strip. Text derived from the Day 71 pre-dawn event description:

```
1989年4月7日（民國78年，星期五）

深夜至拂曉——雜誌社裡還有10個人熬夜留宿：
鄭南榕一家、4名員工、5名志工。
沒有人知道今天是最後一天。
```

- Font: LXGW WenKai TC (literary/quote style), italic
- Color: `--dust` (slightly dimmer than main body)
- Date header: document monospace, `--surveillance-green`

### Part 2 — Countdown strip

Vertical two-column timeline. Left column: time label. Right column: event description. A continuous left-border line (`--surveillance-green/30`) connects all standard events via ScrollReveal on scroll.

**Time labels:**
- Precise times (07:30, 08:55, etc.): monospace document font, `--dust`
- No-time event: label shows `深夜`, smaller size, color `--stone` (visually distinct from precise times)

**Standard event rows** (all except 09:10):
```
[time] │ [description]
```

**09:10 — special treatment (climax):**
- Breaks the two-column grid: full-width centered layout
- Font size: larger (~1.2rem → 1.4rem)
- Color: `--paper-aged` (brightest text on the page)
- Upper and lower separator lines: 1px `--ember`
- No ScrollReveal delay — rendered statically, always visible once scrolled to
- Text: 「鄭南榕進入總編輯室，反鎖房門。」

**Post-climax events** (09:15, 10:00, 22:00):
- Resume two-column format, but color shifted to slightly cooler/dimmer — aftermath tone

---

## Data Source

Use `getAprilSeventhTimeline()` from `src/data/selfImprisonment.ts`.

This function returns all Day 71 events with `type === 'climax'`, already in chronological order (no-time entry first). Do NOT use `timeline.ts` for this section — it contains overlapping April 7 entries from multiple sources that would duplicate content.

**Events returned (8 total):**

| time | description summary |
|------|---------------------|
| (none) | 深夜至拂曉：10人留宿 |
| 07:30 | 警方值勤前教育 |
| 08:55 | 電話線癱瘓 |
| 09:00 | 邱美緣通報，志工汽油防禦，侯友宜帶隊 |
| 09:05 | 乙炔切割鐵門，火花引燃汽油 |
| **09:10** | **鄭南榕引火自焚** |
| 09:15 | 葉菊蘭接到通報 |
| 10:00 | 火勢撲滅 |
| 22:00 | 警方撤離，民眾對峙 |

---

## Implementation

**New component:** `src/components/timeline/AprilSeventhTimeline.tsx`

Reasons for extracting to a component (vs. inline in TheSeventyOneDays):
- The section is visually and logically complex enough to warrant isolation
- Keeps `TheSeventyOneDays.tsx` readable
- Potentially reusable if a standalone April 7 page is ever created

**Integration:** Import and render at the bottom of `TheSeventyOneDays.tsx`, after the existing key events list and DayCounter, before the source attribution line.

**No new data needed.** All content is already in `selfImprisonment.ts`.

---

## Visual Boundary

Add a subtle visual separator between the 71-day list and the April 7 section — a thin horizontal rule or a short centered text marker (e.g., `── 第71天 ──`) to signal the narrative shift from "overview" to "close-up."
