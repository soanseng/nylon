# April 7 Expanded Timeline Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a two-part April 7 expanded section at the end of Ch.2 (TheSeventyOneDays) — a scene-setting paragraph followed by a minute-by-minute countdown strip with special treatment for the 09:10 climax event.

**Architecture:** New component `AprilSeventhTimeline.tsx` consumes `getAprilSeventhTimeline()` from the existing `selfImprisonment.ts` data layer (no new data needed). Integrated at the bottom of `TheSeventyOneDays.tsx` after the DayCounter. The component renders two sections: italic scene-setting text, then a two-column time/event strip where the 09:10 row breaks into full-width climax treatment.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, existing ScrollReveal component, existing design tokens in `src/index.css`

---

### Task 1: Create `AprilSeventhTimeline.tsx` shell and verify build

**Files:**
- Create: `src/components/timeline/AprilSeventhTimeline.tsx`

**Step 1: Create the component file**

```tsx
// src/components/timeline/AprilSeventhTimeline.tsx
import { getAprilSeventhTimeline } from '../../data/selfImprisonment'
import { ScrollReveal } from '../narrative/ScrollReveal'

const events = getAprilSeventhTimeline()

export function AprilSeventhTimeline() {
  return (
    <div className="space-y-10">
      <p className="font-document text-[0.75rem] text-surveillance-green">placeholder</p>
    </div>
  )
}
```

**Step 2: Verify build passes**

```bash
npm run build
```

Expected: clean build, no TypeScript errors.

**Step 3: Commit**

```bash
git add src/components/timeline/AprilSeventhTimeline.tsx
git commit -m "feat: scaffold AprilSeventhTimeline component shell"
```

---

### Task 2: Implement scene-setting header (Part 1)

**Files:**
- Modify: `src/components/timeline/AprilSeventhTimeline.tsx`

**Step 1: Replace placeholder with Part 1 content**

Replace the entire return body with:

```tsx
return (
  <div className="space-y-10">
    {/* Visual separator from preceding 71-day list */}
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-surveillance-green/20" />
      <span className="font-document text-[0.65rem] tracking-[0.2em] text-surveillance-green/60">
        第71天
      </span>
      <div className="h-px flex-1 bg-surveillance-green/20" />
    </div>

    {/* Part 1: Scene-setting */}
    <div className="space-y-3">
      <div className="font-document text-[0.7rem] tracking-[0.18em] text-surveillance-green">
        1989年4月7日（民國78年，星期五）
      </div>
      <p className="font-literary italic leading-[2.2] text-[clamp(0.95rem,2.2vw,1.05rem)] text-dust">
        深夜至拂曉——雜誌社裡還有10個人熬夜留宿：<br />
        鄭南榕一家、4名員工、5名志工。<br />
        沒有人知道今天是最後一天。
      </p>
    </div>
  </div>
)
```

**Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

**Step 3: Commit**

```bash
git add src/components/timeline/AprilSeventhTimeline.tsx
git commit -m "feat: add April 7 scene-setting header to AprilSeventhTimeline"
```

---

### Task 3: Implement countdown strip (Part 2)

**Files:**
- Modify: `src/components/timeline/AprilSeventhTimeline.tsx`

**Step 1: Add the AFTERMATH_TIMES constant and timeline strip after Part 1**

Add this constant at module level (below the `events` declaration):

```tsx
const AFTERMATH_TIMES = new Set(['09:15', '10:00', '22:00'])
```

Then extend the return JSX — add this block after the Part 1 `</div>`:

```tsx
{/* Part 2: Countdown strip */}
<div className="space-y-6">
  {events.map((event, i) => {
    const isClimax = event.time === '09:10'
    const isAftermath = event.time !== undefined && AFTERMATH_TIMES.has(event.time)
    const timeLabel = event.time ?? '深夜'
    const hasExactTime = event.time !== undefined

    if (isClimax) {
      return (
        <div key={i} className="py-6 text-center space-y-4">
          <div className="h-px bg-ember/60" />
          <p className="font-narrative text-[clamp(1.05rem,2.5vw,1.25rem)] font-bold leading-[2] text-paper-aged">
            {event.description}
          </p>
          <div className="h-px bg-ember/60" />
        </div>
      )
    }

    return (
      <ScrollReveal key={i}>
        <div
          className={`grid grid-cols-[4.5rem_1fr] gap-4 ${
            isAftermath ? 'opacity-60' : ''
          }`}
        >
          {/* Time column */}
          <div
            className={`pt-0.5 text-right font-document tracking-wider ${
              hasExactTime
                ? 'text-[0.72rem] text-dust'
                : 'text-[0.65rem] text-stone'
            }`}
          >
            {timeLabel}
          </div>

          {/* Event column */}
          <div className="border-l border-surveillance-green/30 pl-5">
            <p className="font-narrative text-[0.9rem] leading-[1.9] text-dust-light">
              {event.description}
            </p>
          </div>
        </div>
      </ScrollReveal>
    )
  })}
</div>
```

**Step 2: Verify build**

```bash
npm run build
```

Expected: clean build, no TypeScript errors.

**Step 3: Commit**

```bash
git add src/components/timeline/AprilSeventhTimeline.tsx
git commit -m "feat: implement April 7 countdown strip with climax treatment"
```

---

### Task 4: Integrate into TheSeventyOneDays.tsx

**Files:**
- Modify: `src/chapters/TheSeventyOneDays.tsx`

**Step 1: Add import**

After the existing imports, add:

```tsx
import { AprilSeventhTimeline } from '../components/timeline/AprilSeventhTimeline'
```

**Step 2: Insert component before source attribution**

In the JSX, find the source attribution block:

```tsx
{/* Source attribution */}
<ScrollReveal>
  <div className="font-document text-[0.65rem] tracking-wider text-stone/50">
    [來源：國家發展委員會檔案管理局、鄭南榕基金會]
  </div>
</ScrollReveal>
```

Insert `<AprilSeventhTimeline />` immediately before it:

```tsx
{/* April 7 expanded timeline */}
<AprilSeventhTimeline />

{/* Source attribution */}
<ScrollReveal>
  <div className="font-document text-[0.65rem] tracking-wider text-stone/50">
    [來源：國家發展委員會檔案管理局、鄭南榕基金會]
  </div>
</ScrollReveal>
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: clean build.

**Step 4: Commit**

```bash
git add src/chapters/TheSeventyOneDays.tsx
git commit -m "feat: integrate AprilSeventhTimeline into Ch.2 TheSeventyOneDays"
```

---

### Task 5: Final verification

**Step 1: Lint check**

```bash
npm run lint
```

Expected: no errors or warnings.

**Step 2: Production build**

```bash
npm run build
```

Expected: clean build with no warnings about unused imports.

**Step 3: Spot-check the data**

Run this in the browser console (or add a temporary `console.log`) to confirm the data loads correctly:

```js
// In browser dev tools after npm run dev:
// Navigate to Ch.2 and check the April 7 section renders 9 event rows
// (1 pre-dawn + 7 timed + 1 climax = 9 total, but climax is full-width)
```

**Step 4: Verify `font-literary` exists in Tailwind config**

The scene-setting text uses `font-literary` (LXGW WenKai TC). Confirm this class is defined in `src/index.css`. If it maps to a different class name in this project, update the component accordingly.

```bash
grep -n "font-literary\|lxgw\|wenkai" src/index.css
```

If absent, use `font-quote` or whatever the project uses for literary/quote text. Check existing usage:

```bash
grep -rn "font-literary\|font-quote" src/chapters/
```

**Step 5: Commit if any font class fixes were needed**

```bash
git add -A
git commit -m "fix: correct font class for April 7 scene-setting text"
```
