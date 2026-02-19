# 鄭南榕事件互動體驗網站 — Phase 0 & Phase 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Scaffold the project from zero and build core chapters (0, 1, 2, 6) with pixel art scenes, CRT mini-interactions, and the military-green surveillance aesthetic.

**Architecture:** Single-page scrollytelling app mirroring the-lin project structure. Lazy-loaded chapter components, shared design system CSS with olive-green palette, reusable components migrated from the-lin (ScrollReveal, Redacted, DocumentPage, Navigation, Section, ChapterHeader, ChapterTransition). New components: PixelArtScene, CRTOverlay, StatuteJudgment, StampAnimation.

**Tech Stack:** React 19, TypeScript 5.9, Tailwind CSS 4 (via @tailwindcss/vite), Vite, deployed as static site.

**Reference project:** `/home/scipio/projects/the-lin/` — same tech stack, same design language. Copy patterns directly.

---

## Phase 0: Project Initialization

### Task 1: Scaffold Vite + React + TypeScript + Tailwind project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `eslint.config.js`
- Create: `src/main.tsx`, `src/App.tsx`

**Step 1: Create project with Vite**

```bash
cd /home/scipio/projects/nylon
npm create vite@latest . -- --template react-ts
```

If directory not empty, answer yes to overwrite (only CLAUDE.md and plan files exist, they won't be overwritten).

**Step 2: Install dependencies**

```bash
npm install tailwindcss @tailwindcss/vite
```

**Step 3: Configure Vite**

Update `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/nylon/',
})
```

**Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 5: Commit**

```bash
git init
git add package.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json index.html eslint.config.js src/main.tsx src/App.tsx src/vite-env.d.ts .gitignore
git commit -m "chore: scaffold Vite + React + TypeScript + Tailwind project"
```

---

### Task 2: Set up design system CSS with olive-green palette

**Files:**
- Create: `src/index.css`
- Modify: `src/main.tsx` (add CSS import)

**Step 1: Create `src/index.css`**

Copy the base structure from `/home/scipio/projects/the-lin/src/index.css` and apply these changes:

1. Replace core palette colors with olive-green variants:
   - `--color-void: #0A0F0A` (was `#080808`)
   - `--color-ink: #0D120D` (was `#0D0A0A`)
   - `--color-ash: #1A211A` (was `#1C1917`)
   - `--color-smoke: #242E24` (was `#292524`)

2. Add new color groups after the core palette:
   ```css
   /* CRT Terminal */
   --color-crt-green: #33FF33;
   --color-crt-green-dim: #1A8C1A;
   --color-crt-amber: #FFB000;
   --color-crt-glow: rgba(51,255,51,0.08);

   /* Surveillance Accent */
   --color-surveillance-green: #4A6741;
   --color-fluorescent: #E8F0D8;

   /* Filing Cabinet */
   --color-cabinet-green: #1C2A1C;
   --color-folder-tab: #8B9D6B;

   /* Fire & Danger */
   --color-flame-core: #FF6B00;
   --color-flame-edge: #FF8C00;
   --color-ember: #CC4400;

   /* Char & Burn */
   --color-char-black: #1A1008;
   --color-char-brown: #3D2B1A;
   --color-scorch: #5C3A1E;

   /* Warmth */
   --color-dawn: #FEF3C7;
   ```

3. Keep: film grain overlay, scroll reveal base, redacted bar styles, vignette, reduced motion, scroll snap from the-lin.

4. Add new CRT overlay base styles:
   ```css
   /* CRT Terminal Overlay */
   .crt-overlay {
     background: repeating-linear-gradient(
       transparent 0px,
       rgba(51,255,51,0.03) 1px,
       transparent 2px
     );
     box-shadow: inset 0 0 80px rgba(51,255,51,0.05);
     border-radius: 8px;
   }

   .crt-scanlines {
     background: repeating-linear-gradient(
       transparent 0px,
       rgba(51,255,51,0.03) 1px,
       transparent 2px
     );
     pointer-events: none;
     position: absolute;
     inset: 0;
     z-index: 10;
   }

   @keyframes crt-boot {
     0% { opacity: 0; transform: scaleY(0.01); }
     30% { opacity: 1; transform: scaleY(0.01); }
     35% { transform: scaleY(1); }
     100% { transform: scaleY(1); }
   }

   @keyframes crt-shutdown {
     0% { transform: scale(1); opacity: 1; }
     70% { transform: scaleY(0.01) scaleX(1); opacity: 1; }
     100% { transform: scale(0); opacity: 0; }
   }
   ```

**Step 2: Ensure `src/main.tsx` imports CSS**

```tsx
import './index.css'
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/index.css src/main.tsx
git commit -m "feat: design system CSS with olive-green surveillance palette and CRT overlay"
```

---

### Task 3: Migrate shared components from the-lin

**Files:**
- Create: `src/components/narrative/ScrollReveal.tsx` (copy from the-lin)
- Create: `src/components/narrative/Redacted.tsx` (copy, modify colors)
- Create: `src/components/narrative/DocumentPage.tsx` (copy from the-lin)
- Create: `src/components/narrative/SourceRef.tsx` (copy from the-lin)
- Create: `src/components/layout/Section.tsx` (copy from the-lin)
- Create: `src/components/layout/ChapterHeader.tsx` (copy from the-lin)
- Create: `src/components/layout/ChapterTransition.tsx` (copy, add `fire` variant)
- Create: `src/components/layout/Navigation.tsx` (copy, update footer text)
- Create: `src/hooks/useScrollReveal.ts` (copy from the-lin)

**Step 1: Create directory structure**

```bash
mkdir -p src/components/{narrative,layout,surveillance,legal,timeline,interactive,pixel-art,crt,ui}
mkdir -p src/{chapters,data,hooks,lib,styles,assets/{documents,photos,textures}}
```

**Step 2: Copy files from the-lin**

```bash
cp -f /home/scipio/projects/the-lin/src/components/narrative/ScrollReveal.tsx src/components/narrative/
cp -f /home/scipio/projects/the-lin/src/components/narrative/Redacted.tsx src/components/narrative/
cp -f /home/scipio/projects/the-lin/src/components/narrative/DocumentPage.tsx src/components/narrative/
cp -f /home/scipio/projects/the-lin/src/components/narrative/SourceRef.tsx src/components/narrative/
cp -f /home/scipio/projects/the-lin/src/components/layout/Section.tsx src/components/layout/
cp -f /home/scipio/projects/the-lin/src/components/layout/ChapterHeader.tsx src/components/layout/
cp -f /home/scipio/projects/the-lin/src/components/layout/ChapterTransition.tsx src/components/layout/
cp -f /home/scipio/projects/the-lin/src/components/layout/Navigation.tsx src/components/layout/
cp -f /home/scipio/projects/the-lin/src/hooks/useScrollReveal.ts src/hooks/
```

**Step 3: Modify Navigation.tsx**

Change the footer text from `林宅血案 — 1980.02.28` to `鄭南榕 — 1989.04.07`.

Update `navItems` reference color from `blood` to `surveillance-green` for dot navigation (or keep `blood` if it works with the green palette).

**Step 4: Add `fire` variant to ChapterTransition.tsx**

Add a new variant after the `blood` variant:

```tsx
{variant === 'fire' && (
  <div className="relative z-[1] flex items-center gap-4">
    <div className="h-px w-8 bg-gradient-to-r from-transparent to-ember" />
    <div className="h-2 w-2 rounded-full bg-flame-core shadow-[0_0_12px_rgba(255,107,0,0.4)]" />
    <div className="h-px w-8 bg-gradient-to-l from-transparent to-ember" />
  </div>
)}
```

Update the `variant` type to include `'fire'`.

**Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Some components may have unused imports — that's fine for now.

**Step 6: Commit**

```bash
git add src/components/ src/hooks/
git commit -m "feat: migrate shared components from the-lin project"
```

---

### Task 4: Create PixelArtScene component

**Files:**
- Create: `src/components/pixel-art/PixelArtScene.tsx`

**Step 1: Write the component**

```tsx
interface PixelArtSceneProps {
  src: string
  alt: string
  caption: string
  className?: string
}

export function PixelArtScene({ src, alt, caption, className = '' }: PixelArtSceneProps) {
  return (
    <figure
      className={`relative mx-auto w-full max-w-[640px] border border-surveillance-green/60 bg-void p-3 shadow-[0_0_20px_rgba(74,103,65,0.1)] sm:p-4 ${className}`}
    >
      {/* Label */}
      <div className="absolute top-[-0.6rem] left-3 bg-void px-2 font-document text-[0.65rem] tracking-[0.2em] text-surveillance-green">
        場景重現
      </div>

      {/* Pixel art image */}
      <div className="overflow-hidden bg-ink">
        <img
          src={src}
          alt={alt}
          className="block w-full"
          style={{ imageRendering: 'pixelated' }}
          loading="lazy"
        />
      </div>

      {/* Caption */}
      <figcaption className="mt-2 font-document text-[0.75rem] leading-relaxed tracking-wide text-dust sm:mt-3">
        {caption}
      </figcaption>
    </figure>
  )
}
```

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add src/components/pixel-art/
git commit -m "feat: add PixelArtScene component with surveillance-green frame"
```

---

### Task 5: Create CRTOverlay component

**Files:**
- Create: `src/components/crt/CRTOverlay.tsx`

**Step 1: Write the component**

```tsx
import { useEffect, useState } from 'react'

interface CRTOverlayProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function CRTOverlay({ open, onClose, title, children }: CRTOverlayProps) {
  const [phase, setPhase] = useState<'closed' | 'booting' | 'ready' | 'shutting-down'>('closed')

  useEffect(() => {
    if (open && phase === 'closed') {
      setPhase('booting')
      const timer = setTimeout(() => setPhase('ready'), 600)
      return () => clearTimeout(timer)
    }
    if (!open && phase === 'ready') {
      setPhase('shutting-down')
      const timer = setTimeout(() => setPhase('closed'), 400)
      return () => clearTimeout(timer)
    }
  }, [open, phase])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (phase === 'closed') return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-void/90 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'CRT Terminal'}
    >
      {/* CRT Screen */}
      <div
        className={`relative mx-4 w-full max-w-[600px] overflow-hidden rounded-lg border border-crt-green-dim/40 bg-void font-document text-crt-green shadow-[0_0_40px_rgba(51,255,51,0.08)] ${
          phase === 'booting' ? 'animate-[crt-boot_0.6s_ease-out_forwards]' :
          phase === 'shutting-down' ? 'animate-[crt-shutdown_0.4s_ease-in_forwards]' : ''
        }`}
      >
        {/* Scanlines */}
        <div className="crt-scanlines" />

        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-crt-green-dim/30 px-4 py-2">
          <div className="text-[0.7rem] tracking-[0.2em] text-crt-green-dim">
            {title ?? 'TERMINAL'}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center border border-crt-green-dim/30 bg-transparent text-crt-green-dim transition-colors hover:border-crt-green hover:text-crt-green"
            aria-label="關閉"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="relative max-h-[70vh] overflow-y-auto p-4 sm:p-6">
          {phase === 'ready' && children}
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add src/components/crt/
git commit -m "feat: add CRTOverlay component with boot/shutdown animations"
```

---

### Task 6: Create StampAnimation component

**Files:**
- Create: `src/components/interactive/StampAnimation.tsx`

**Step 1: Write the component**

```tsx
import { useState } from 'react'

interface StampAnimationProps {
  text: string
  color?: 'red' | 'green'
  onStamp?: () => void
  className?: string
}

export function StampAnimation({ text, color = 'red', onStamp, className = '' }: StampAnimationProps) {
  const [stamped, setStamped] = useState(false)

  const handleStamp = () => {
    if (stamped) return
    setStamped(true)
    onStamp?.()
  }

  const colorClasses = color === 'red'
    ? 'border-seal-red text-seal-red'
    : 'border-crt-green text-crt-green'

  return (
    <button
      type="button"
      onClick={handleStamp}
      disabled={stamped}
      className={`relative inline-block cursor-pointer border-0 bg-transparent p-0 ${className}`}
      aria-label={stamped ? text : `點擊蓋章：${text}`}
    >
      <span
        className={`inline-block rounded-sm border-2 px-4 py-2 font-heading text-[clamp(1.2rem,4vw,2rem)] font-black tracking-[0.15em] transition-all duration-200 ${colorClasses} ${
          stamped
            ? 'rotate-[-6deg] scale-100 opacity-90'
            : 'scale-150 opacity-0'
        }`}
        style={{
          transition: stamped ? 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
        }}
      >
        {text}
      </span>
    </button>
  )
}
```

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add src/components/interactive/
git commit -m "feat: add StampAnimation component with slam effect"
```

---

### Task 7: Set up App shell with chapter routing and navigation

**Files:**
- Modify: `src/App.tsx`
- Create: `src/chapters/Prologue.tsx` (placeholder)
- Create: `src/chapters/HistoricalContext.tsx` (placeholder)
- Create: `src/chapters/TheSeventyOneDays.tsx` (placeholder)
- Create: `src/chapters/CallToAction.tsx` (placeholder)
- Create: `src/chapters/ContentWarning.tsx` (placeholder)

**Step 1: Create placeholder chapters**

Each placeholder chapter follows this pattern:

```tsx
// src/chapters/Prologue.tsx
import { Section } from '../components/layout/Section'

export function Prologue() {
  return (
    <Section id="prologue" background="void" vignette>
      <div className="text-center font-heading text-stone">
        序章 — 1989年4月7日
      </div>
    </Section>
  )
}
```

Create similar placeholders for `HistoricalContext`, `TheSeventyOneDays`, `CallToAction`, and `ContentWarning`.

**Step 2: Wire up App.tsx**

Follow the-lin's pattern: lazy-load chapters, add Navigation with navItems for nylon's 7 chapters, wrap in scroll-snap container.

```tsx
import { lazy, Suspense, useRef } from 'react'
import { useScrollReveal } from './hooks/useScrollReveal'
import { Navigation } from './components/layout/Navigation'
import { ChapterTransition } from './components/layout/ChapterTransition'

const ContentWarning = lazy(() =>
  import('./chapters/ContentWarning').then((m) => ({ default: m.ContentWarning })),
)
const Prologue = lazy(() =>
  import('./chapters/Prologue').then((m) => ({ default: m.Prologue })),
)
const HistoricalContext = lazy(() =>
  import('./chapters/HistoricalContext').then((m) => ({ default: m.HistoricalContext })),
)
const TheSeventyOneDays = lazy(() =>
  import('./chapters/TheSeventyOneDays').then((m) => ({ default: m.TheSeventyOneDays })),
)
const CallToAction = lazy(() =>
  import('./chapters/CallToAction').then((m) => ({ default: m.CallToAction })),
)

const navItems = [
  { id: 'content-warning', label: '內容警告', labelEn: 'Content Warning', num: '—' },
  { id: 'prologue', label: '序章', labelEn: 'Prologue', num: '00' },
  { id: 'historical-context', label: '時代背景', labelEn: 'When Words Were Treason', num: '01' },
  { id: 'the-71-days', label: '案發經過', labelEn: 'The 71 Days', num: '02' },
  { id: 'call-to-action', label: '行動呼籲', labelEn: 'Call to Action', num: '06' },
]

function ChapterFallback() {
  return (
    <div className="chapter-loading">
      <div className="chapter-loading-indicator" />
    </div>
  )
}

function App() {
  useScrollReveal()
  const prologueRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    prologueRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navigation items={navItems} />
      <main className="scroll-snap-container">
        <Suspense fallback={<ChapterFallback />}>
          <ContentWarning onEnter={handleEnter} />
        </Suspense>
        <ChapterTransition variant="fade" />
        <div ref={prologueRef}>
          <Suspense fallback={<ChapterFallback />}>
            <Prologue />
          </Suspense>
        </div>
        <ChapterTransition variant="fire" />
        <Suspense fallback={<ChapterFallback />}>
          <HistoricalContext />
        </Suspense>
        <ChapterTransition variant="ink" />
        <Suspense fallback={<ChapterFallback />}>
          <TheSeventyOneDays />
        </Suspense>
        <ChapterTransition variant="fire" />
        <Suspense fallback={<ChapterFallback />}>
          <CallToAction />
        </Suspense>
      </main>
    </>
  )
}

export default App
```

**Step 3: Verify dev server**

```bash
npm run dev
```

Expected: App loads with content warning, placeholder chapters, and navigation working.

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/App.tsx src/chapters/
git commit -m "feat: app shell with lazy-loaded chapter placeholders and navigation"
```

---

### Task 8: Create placeholder pixel art assets

**Files:**
- Create: `src/assets/pixel-art/editors-desk.png` (320x180 placeholder)
- Create: `src/assets/pixel-art/courtroom.png` (320x180 placeholder)
- Create: `src/assets/pixel-art/standoff.png` (320x180 placeholder)

**Step 1: Generate placeholder images**

Use a simple script or create 320x180 solid-color PNGs as placeholders until real pixel art is commissioned. Each placeholder should be a different shade to distinguish scenes:

```bash
mkdir -p src/assets/pixel-art
```

For now, create simple HTML canvas-generated placeholders or use ImageMagick if available:

```bash
# If ImageMagick is available:
convert -size 320x180 xc:'#0A0F0A' -fill '#1A211A' -draw 'rectangle 80,60 240,150' -fill '#4A6741' -font Courier -pointsize 14 -gravity center -annotate 0 'editors-desk\n320x180' src/assets/pixel-art/editors-desk.png
convert -size 320x180 xc:'#1C2A1C' -fill '#E8DCC4' -draw 'rectangle 100,30 220,80' -fill '#DC2626' -font Courier -pointsize 14 -gravity center -annotate 0 'courtroom\n320x180' src/assets/pixel-art/courtroom.png
convert -size 320x180 xc:'#0D120D' -fill '#FF8C00' -draw 'rectangle 0,0 160,180' -fill '#242E24' -draw 'rectangle 160,0 320,180' -fill '#4A6741' -font Courier -pointsize 14 -gravity center -annotate 0 'standoff\n320x180' src/assets/pixel-art/standoff.png
```

If ImageMagick is not available, skip this task and use CSS-only colored divs as placeholders in the chapter components.

**Step 2: Commit**

```bash
git add src/assets/pixel-art/
git commit -m "chore: add placeholder pixel art assets (320x180)"
```

---

### Task 9: Create data files for legal statutes

**Files:**
- Create: `src/data/legal.ts`
- Create: `src/lib/types.ts`

**Step 1: Create types**

```ts
// src/lib/types.ts
export interface LegalStatute {
  id: string
  name: string
  fullName: string
  article: string
  originalText: string
  explanation: string
  penalty: string
  source: string
}

export interface JudgmentScenario {
  id: string
  description: string
  correctStatute: string
  correctPenalty: string
  explanation: string
}

export interface RedactedPair {
  id: string
  document: string
  redactedText: string
  revealedText: string
  source: string
}

export interface TimelineEvent {
  date: string
  dateROC?: string
  title: string
  description: string
  source: string
  chapter: number
}
```

**Step 2: Create legal data**

```ts
// src/data/legal.ts
import type { LegalStatute, JudgmentScenario } from '../lib/types'

export const statuteArticle2_1: LegalStatute = {
  id: 'article-2-1',
  name: '二條一',
  fullName: '懲治叛亂條例 第二條第一項',
  article: '第二條第一項',
  originalText: '犯刑法第一百條第一項、第一百零一條第一項、第一百零三條第一項、第一百零四條第一項之罪者，處死刑。',
  explanation: '法官沒有選擇，只能判你死刑。無論情節輕重，唯一刑罰就是死刑。',
  penalty: '唯一死刑',
  source: '[來源：國家人權記憶庫]',
}

export const judgmentScenarios: JudgmentScenario[] = [
  {
    id: 'case-a',
    description: '某雜誌社總編輯於週刊第254期刊登《台灣共和國憲法草案》全文。',
    correctStatute: '刑法§100「意圖竊據國土」→ 懲治叛亂條例§2-1',
    correctPenalty: '唯一死刑',
    explanation: '刊登憲法草案被視為「意圖竊據國土」，適用刑法第100條，再由懲治叛亂條例第二條第一項加重為唯一死刑。',
  },
  {
    id: 'case-b',
    description: '三名大學生組織讀書會，閱讀並討論台灣獨立相關書籍。',
    correctStatute: '懲治叛亂條例§5「參加叛亂組織」',
    correctPenalty: '十年以上有期徒刑',
    explanation: '讀書會被視為「叛亂組織」，參加者依懲治叛亂條例第五條處十年以上有期徒刑。',
  },
  {
    id: 'case-c',
    description: '一名民眾在公開場合演講，主張台灣應脫離中華民國獨立建國。',
    correctStatute: '刑法§100「意圖竊據國土」→ 懲治叛亂條例§2-1',
    correctPenalty: '唯一死刑',
    explanation: '公開主張台灣獨立被視為「意圖竊據國土」，同樣適用唯一死刑。',
  },
]
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/lib/types.ts src/data/legal.ts
git commit -m "feat: add legal statute data and judgment scenarios"
```

---

## Phase 1: Core Content + MVP Interactions

### Task 10: Build ContentWarning chapter

**Files:**
- Modify: `src/chapters/ContentWarning.tsx`

**Step 1: Implement**

```tsx
import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'

interface ContentWarningProps {
  onEnter: () => void
}

export function ContentWarning({ onEnter }: ContentWarningProps) {
  return (
    <Section id="content-warning" background="void" vignette>
      <div className="mx-auto max-w-[480px] text-center">
        <ScrollReveal>
          <div className="mb-6 font-document text-[0.7rem] tracking-[0.4em] text-surveillance-green">
            CONTENT WARNING
          </div>
          <h1 className="mb-8 font-heading text-[clamp(1.2rem,4vw,1.8rem)] font-bold tracking-[0.08em] text-paper-aged">
            內容警告
          </h1>
          <p className="mb-4 font-narrative text-[clamp(0.9rem,2.5vw,1.05rem)] leading-[2] text-dust">
            本網站涉及政治迫害、國家監控、以及自焚事件。
          </p>
          <p className="mb-10 font-narrative text-[clamp(0.9rem,2.5vw,1.05rem)] leading-[2] text-dust">
            所有內容均源自政府解密檔案及基金會公開史料。
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <button
            type="button"
            onClick={onEnter}
            className="cursor-pointer border border-surveillance-green/50 bg-transparent px-8 py-3 font-heading text-[0.9rem] tracking-[0.15em] text-surveillance-green transition-all duration-300 hover:border-surveillance-green hover:bg-surveillance-green/10"
          >
            進入
          </button>
        </ScrollReveal>
      </div>
    </Section>
  )
}
```

**Step 2: Verify dev server**

```bash
npm run dev
```

Expected: Content warning page renders with green-tinted styling.

**Step 3: Commit**

```bash
git add src/chapters/ContentWarning.tsx
git commit -m "feat: implement ContentWarning chapter with surveillance-green styling"
```

---

### Task 11: Build Prologue chapter (Ch.0)

**Files:**
- Modify: `src/chapters/Prologue.tsx`

**Step 1: Implement**

The prologue shows:
1. Olive-black void
2. Pixel art scene: editor's desk (placeholder for now)
3. Date「1989.4.7」fades in character by character
4. Key quote: 「國民黨只能抓到我的屍體，抓不到我的人。」

```tsx
import { useState, useEffect } from 'react'
import { Section } from '../components/layout/Section'
import { PixelArtScene } from '../components/pixel-art/PixelArtScene'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import editorsDesk from '../assets/pixel-art/editors-desk.png'

export function Prologue() {
  const [dateVisible, setDateVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDateVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Section id="prologue" background="void" vignette>
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-12 text-center">
        {/* Pixel art scene */}
        <ScrollReveal>
          <PixelArtScene
            src={editorsDesk}
            alt="鄭南榕的編輯桌——打字機、稿件堆、角落的汽油桶"
            caption="《自由時代》雜誌社總編輯室"
          />
        </ScrollReveal>

        {/* Date reveal */}
        <div
          className={`font-document text-[clamp(2rem,8vw,4rem)] tracking-[0.3em] text-paper-aged transition-opacity duration-[2000ms] ${
            dateVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          1989.4.7
        </div>

        {/* Key quote */}
        <ScrollReveal delay={500}>
          <blockquote className="font-literary text-[clamp(1.1rem,3.5vw,1.6rem)] leading-[2.2] tracking-[0.06em] text-paper-aged">
            「國民黨只能抓到我的屍體，抓不到我的人。」
          </blockquote>
          <div className="mt-4 font-document text-[0.7rem] tracking-[0.15em] text-stone">
            —— 鄭南榕 [來源：基金會]
          </div>
        </ScrollReveal>

        {/* Scroll hint */}
        <ScrollReveal delay={1000}>
          <div className="mt-8 font-document text-[0.6rem] tracking-[0.3em] text-stone/50">
            ↓ 向下捲動
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
```

**Step 2: Verify dev server**

```bash
npm run dev
```

Expected: Prologue renders with pixel art placeholder, date animation, and quote.

**Step 3: Commit**

```bash
git add src/chapters/Prologue.tsx
git commit -m "feat: implement Prologue chapter with pixel art scene and date reveal"
```

---

### Task 12: Build HistoricalContext chapter (Ch.1) with StatuteJudgment

**Files:**
- Modify: `src/chapters/HistoricalContext.tsx`
- Create: `src/components/crt/StatuteJudgment.tsx`

**Step 1: Create StatuteJudgment component**

This is the CRT mini-interaction for Chapter 1. Player reviews 3 scenarios, selects the applicable statute, and receives the verdict with a stamp animation.

```tsx
// src/components/crt/StatuteJudgment.tsx
import { useState } from 'react'
import { CRTOverlay } from './CRTOverlay'
import { judgmentScenarios } from '../../data/legal'

interface StatuteJudgmentProps {
  open: boolean
  onClose: () => void
}

const statuteOptions = [
  { value: 'article-2-1', label: '刑法§100 → 懲治叛亂條例§2-1（唯一死刑）' },
  { value: 'article-5', label: '懲治叛亂條例§5（十年以上有期徒刑）' },
  { value: 'article-7', label: '懲治叛亂條例§7（五年以下有期徒刑）' },
]

export function StatuteJudgment({ open, onClose }: StatuteJudgmentProps) {
  const [currentCase, setCurrentCase] = useState(0)
  const [selectedStatute, setSelectedStatute] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)

  const scenario = judgmentScenarios[currentCase]
  const isCorrect = (selectedStatute === 'article-2-1' && scenario.correctPenalty === '唯一死刑') ||
    (selectedStatute === 'article-5' && scenario.correctPenalty === '十年以上有期徒刑')

  const handleSubmit = () => {
    if (!selectedStatute) return
    setSubmitted(true)
  }

  const handleNext = () => {
    if (currentCase < judgmentScenarios.length - 1) {
      setCurrentCase((prev) => prev + 1)
      setSelectedStatute('')
      setSubmitted(false)
    } else {
      setCompleted(true)
    }
  }

  const handleReset = () => {
    setCurrentCase(0)
    setSelectedStatute('')
    setSubmitted(false)
    setCompleted(false)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  return (
    <CRTOverlay open={open} onClose={handleClose} title="法條適用判斷系統">
      {completed ? (
        <div className="space-y-6 text-center">
          <p className="text-[1.1rem] leading-[2] text-crt-green">
            以上三個案例，在今天的台灣都完全合法。
          </p>
          <p className="text-[1.1rem] leading-[2] text-crt-amber">
            但在1989年，每一個都足以讓你被判死刑。
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-4 cursor-pointer border border-crt-green-dim/50 bg-transparent px-6 py-2 text-crt-green-dim transition-colors hover:border-crt-green hover:text-crt-green"
          >
            關閉終端機
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Case header */}
          <div className="text-[0.7rem] tracking-[0.2em] text-crt-green-dim">
            案件 {String.fromCharCode(65 + currentCase)} / {judgmentScenarios.length}
          </div>

          {/* Scenario description */}
          <div className="border border-crt-green-dim/20 bg-void/50 p-4 leading-[2] text-crt-green">
            {scenario.description}
          </div>

          {/* Statute selection */}
          {!submitted && (
            <div className="space-y-3">
              <div className="text-[0.8rem] text-crt-green-dim">請判定適用法條：</div>
              {statuteOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 border p-3 transition-colors ${
                    selectedStatute === option.value
                      ? 'border-crt-green bg-crt-green/5'
                      : 'border-crt-green-dim/20 hover:border-crt-green-dim/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="statute"
                    value={option.value}
                    checked={selectedStatute === option.value}
                    onChange={(e) => setSelectedStatute(e.target.value)}
                    className="accent-crt-green"
                  />
                  <span className="text-[0.85rem] text-crt-green">{option.label}</span>
                </label>
              ))}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedStatute}
                className="mt-2 w-full cursor-pointer border border-crt-green bg-crt-green/10 px-6 py-3 font-heading text-[0.9rem] tracking-[0.1em] text-crt-green transition-all hover:bg-crt-green/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                蓋章判決
              </button>
            </div>
          )}

          {/* Result */}
          {submitted && (
            <div className="space-y-4">
              <div className={`border p-4 ${isCorrect ? 'border-crt-green' : 'border-crt-amber'}`}>
                <div className="mb-2 text-[0.8rem] text-crt-green-dim">
                  {isCorrect ? '判定正確' : '判定有誤，正確答案：'}
                </div>
                <div className="text-crt-green">
                  適用法條：{scenario.correctStatute}
                </div>
                <div className={`mt-1 text-[1.2rem] font-bold ${
                  scenario.correctPenalty === '唯一死刑' ? 'text-seal-red' : 'text-crt-amber'
                }`}>
                  {scenario.correctPenalty}
                </div>
              </div>
              <p className="text-[0.85rem] leading-[1.8] text-crt-green-dim">
                {scenario.explanation}
              </p>
              <button
                type="button"
                onClick={handleNext}
                className="w-full cursor-pointer border border-crt-green-dim/50 bg-transparent px-6 py-2 text-crt-green-dim transition-colors hover:border-crt-green hover:text-crt-green"
              >
                {currentCase < judgmentScenarios.length - 1 ? '下一個案件 →' : '查看結語'}
              </button>
            </div>
          )}
        </div>
      )}
    </CRTOverlay>
  )
}
```

**Step 2: Implement HistoricalContext chapter**

```tsx
// src/chapters/HistoricalContext.tsx
import { useState } from 'react'
import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'
import { DocumentPage } from '../components/narrative/DocumentPage'
import { PixelArtScene } from '../components/pixel-art/PixelArtScene'
import { StampAnimation } from '../components/interactive/StampAnimation'
import { StatuteJudgment } from '../components/crt/StatuteJudgment'
import { statuteArticle2_1 } from '../data/legal'
import courtroom from '../assets/pixel-art/courtroom.png'

export function HistoricalContext() {
  const [judgmentOpen, setJudgmentOpen] = useState(false)

  return (
    <Section id="historical-context" background="ink">
      <div className="mx-auto max-w-[640px] space-y-16">
        <ScrollReveal>
          <ChapterHeader
            label="CHAPTER 01"
            title="時代背景：言論即叛亂"
            labelColor="text-surveillance-green"
          />
        </ScrollReveal>

        {/* 1a: 解嚴的假象 */}
        <ScrollReveal>
          <div className="space-y-4">
            <h3 className="font-heading text-[clamp(1.1rem,3vw,1.4rem)] font-bold text-paper-aged">
              解嚴 ≠ 自由
            </h3>
            <p className="font-narrative leading-[2] text-dust">
              1987年7月15日，台灣宣布解嚴。但以下法律仍然有效——
            </p>
            <div className="space-y-2 border-l-2 border-surveillance-green/50 pl-4">
              <div className="font-document text-[0.85rem] text-surveillance-green">
                《懲治叛亂條例》（1949–1991）
              </div>
              <div className="font-document text-[0.85rem] text-surveillance-green">
                《動員戡亂時期臨時條款》
              </div>
              <div className="font-document text-[0.85rem] text-surveillance-green">
                《刑法第100條》舊條文
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pixel art: courtroom */}
        <ScrollReveal>
          <PixelArtScene
            src={courtroom}
            alt="法庭場景——法官高坐，被告站立，桌上「唯一死刑」印章"
            caption="懲治叛亂條例下的軍事法庭：法官沒有從輕量刑的選擇"
          />
        </ScrollReveal>

        {/* 1b: 二條一 statute display */}
        <ScrollReveal>
          <DocumentPage
            classification="極機密"
            title="懲治叛亂條例 第二條第一項"
            stampText="唯一死刑"
          >
            <p className="mb-6 font-document leading-[2.2] text-ink">
              {statuteArticle2_1.originalText}
            </p>
            <div className="border-t border-ink/20 pt-4">
              <p className="text-[0.85rem] leading-[1.8] text-smoke">
                {statuteArticle2_1.explanation}
              </p>
            </div>
          </DocumentPage>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex justify-center">
            <StampAnimation text="唯一死刑" color="red" />
          </div>
        </ScrollReveal>

        {/* CRT mini-interaction trigger */}
        <ScrollReveal>
          <div className="text-center">
            <p className="mb-6 font-narrative leading-[2] text-dust">
              什麼行為會觸犯「二條一」？試試看——
            </p>
            <button
              type="button"
              onClick={() => setJudgmentOpen(true)}
              className="cursor-pointer border border-crt-green-dim/50 bg-void px-6 py-3 font-document text-[0.85rem] tracking-[0.15em] text-crt-green-dim transition-all duration-300 hover:border-crt-green hover:text-crt-green hover:shadow-[0_0_20px_rgba(51,255,51,0.1)]"
            >
              🖥️ 啟動法條適用判斷系統
            </button>
          </div>
        </ScrollReveal>

        <StatuteJudgment open={judgmentOpen} onClose={() => setJudgmentOpen(false)} />

        {/* Source attribution */}
        <ScrollReveal>
          <div className="font-document text-[0.65rem] tracking-wider text-stone/50">
            [來源：國家人權記憶庫、懲治叛亂條例全文]
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
```

**Step 3: Verify dev server**

```bash
npm run dev
```

Expected: Chapter 1 renders with statute display, stamp animation, and CRT judgment interaction.

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/chapters/HistoricalContext.tsx src/components/crt/StatuteJudgment.tsx
git commit -m "feat: implement HistoricalContext chapter with StatuteJudgment CRT interaction"
```

---

### Task 13: Build TheSeventyOneDays chapter (Ch.2)

**Files:**
- Modify: `src/chapters/TheSeventyOneDays.tsx`
- Create: `src/data/timeline.ts`
- Create: `src/components/timeline/DayCounter.tsx`

**Step 1: Create timeline data**

```ts
// src/data/timeline.ts
import type { TimelineEvent } from '../lib/types'

export const keyEvents: TimelineEvent[] = [
  {
    date: '1988-12-10',
    dateROC: '民國77年12月10日',
    title: '《自由時代》第254期刊登《台灣共和國憲法草案》',
    description: '世界人權日，鄭南榕在雜誌刊登許世楷草擬的憲法草案全文。',
    source: '[來源：檔案局 4.5.17-3]',
    chapter: 2,
  },
  {
    date: '1989-01-21',
    dateROC: '民國78年1月21日',
    title: '高檢署發出涉嫌叛亂傳票',
    description: '臺灣高等法院檢察署以「涉嫌叛亂」為由傳喚鄭南榕。涉嫌叛亂 = 二條一 = 唯一死刑。',
    source: '[來源：檔案局 4.5.17-1]',
    chapter: 2,
  },
  {
    date: '1989-01-27',
    dateROC: '民國78年1月27日',
    title: '鄭南榕宣布自囚',
    description: '「國民黨只能抓到我的屍體，抓不到我的人。」鄭南榕自此不再離開《自由時代》雜誌社。',
    source: '[來源：基金會]',
    chapter: 2,
  },
  {
    date: '1989-04-07',
    dateROC: '民國78年4月7日',
    title: '警方攻堅・鄭南榕自焚',
    description: '警方強行進入雜誌社，鄭南榕引火自焚。高檢署撤銷起訴。',
    source: '[來源：檔案局 4.5.17-4]',
    chapter: 2,
  },
]
```

**Step 2: Create DayCounter component**

```tsx
// src/components/timeline/DayCounter.tsx
interface DayCounterProps {
  day: number
  total: number
  className?: string
}

export function DayCounter({ day, total, className = '' }: DayCounterProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="font-document text-[0.65rem] tracking-[0.3em] text-surveillance-green">
        自囚第
      </div>
      <div className="font-heading text-[clamp(3rem,12vw,6rem)] font-black leading-none text-paper-aged">
        {day}
      </div>
      <div className="font-document text-[0.65rem] tracking-[0.3em] text-surveillance-green">
        / {total} 天
      </div>
    </div>
  )
}
```

**Step 3: Implement TheSeventyOneDays chapter**

```tsx
// src/chapters/TheSeventyOneDays.tsx
import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'
import { PixelArtScene } from '../components/pixel-art/PixelArtScene'
import { DayCounter } from '../components/timeline/DayCounter'
import { keyEvents } from '../data/timeline'
import standoff from '../assets/pixel-art/standoff.png'

export function TheSeventyOneDays() {
  return (
    <Section id="the-71-days" background="void">
      <div className="mx-auto max-w-[640px] space-y-16">
        <ScrollReveal>
          <ChapterHeader
            label="CHAPTER 02"
            title="案發經過：從傳票到自焚的71天"
            labelColor="text-surveillance-green"
          />
        </ScrollReveal>

        {/* Key events timeline */}
        {keyEvents.map((event, index) => (
          <ScrollReveal key={event.date} delay={index * 100}>
            <div className="border-l-2 border-surveillance-green/30 pl-6">
              <div className="mb-1 font-document text-[0.75rem] tracking-[0.15em] text-surveillance-green">
                {event.date}
              </div>
              <h3 className="mb-2 font-heading text-[clamp(1rem,2.5vw,1.2rem)] font-bold text-paper-aged">
                {event.title}
              </h3>
              <p className="mb-1 font-narrative text-[0.95rem] leading-[2] text-dust">
                {event.description}
              </p>
              <div className="font-document text-[0.6rem] text-stone/50">
                {event.source}
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* Day counter */}
        <ScrollReveal>
          <DayCounter day={71} total={71} />
        </ScrollReveal>

        {/* Pixel art: standoff */}
        <ScrollReveal>
          <PixelArtScene
            src={standoff}
            alt="對峙——左：辦公室內鄭南榕伏案；右：警方包圍建築"
            caption="1989年1月27日至4月7日——71天的自囚與包圍"
          />
        </ScrollReveal>

        {/* Source attribution */}
        <ScrollReveal>
          <div className="font-document text-[0.65rem] tracking-wider text-stone/50">
            [來源：國家發展委員會檔案管理局、鄭南榕基金會]
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
```

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/chapters/TheSeventyOneDays.tsx src/data/timeline.ts src/components/timeline/DayCounter.tsx
git commit -m "feat: implement TheSeventyOneDays chapter with timeline and DayCounter"
```

---

### Task 14: Build CallToAction chapter (Ch.6)

**Files:**
- Modify: `src/chapters/CallToAction.tsx`

**Step 1: Implement**

```tsx
import { Section } from '../components/layout/Section'
import { ScrollReveal } from '../components/narrative/ScrollReveal'
import { ChapterHeader } from '../components/layout/ChapterHeader'

const actionCards = [
  {
    title: '4月7日言論自由日',
    description: '2016年正式訂定。每年紀念鄭南榕為言論自由的犧牲。',
    icon: '📅',
  },
  {
    title: '參觀鄭南榕紀念館',
    description: '鄭南榕基金會保存了雜誌社原址，開放預約參觀。',
    icon: '🏛️',
  },
  {
    title: '促轉會資源',
    description: '線上查詢解密檔案，閱讀調查報告。',
    icon: '📁',
  },
  {
    title: '延伸閱讀',
    description: '《自由時代》數位典藏、相關書籍與紀錄片。',
    icon: '📚',
  },
]

export function CallToAction() {
  return (
    <Section id="call-to-action" background="ash" className="bg-gradient-to-b from-ash to-[#2A2418]">
      <div className="mx-auto max-w-[640px] space-y-12">
        <ScrollReveal>
          <ChapterHeader
            label="CHAPTER 06"
            title="行動呼籲：讓自由不再需要殉道"
            labelColor="text-amber"
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {actionCards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 100}>
              <div className="border border-amber/20 bg-void/30 p-5 transition-colors hover:border-amber/40">
                <div className="mb-2 text-[1.5rem]">{card.icon}</div>
                <h3 className="mb-2 font-heading text-[1rem] font-bold text-dawn">
                  {card.title}
                </h3>
                <p className="font-narrative text-[0.85rem] leading-[1.8] text-dust">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center font-document text-[0.65rem] tracking-[0.2em] text-stone/40">
            鄭南榕 (1947–1989) — 「剩下的，就是你們的事了。」
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
```

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add src/chapters/CallToAction.tsx
git commit -m "feat: implement CallToAction chapter with action cards grid"
```

---

### Task 15: Full integration test and mobile verification

**Step 1: Run dev server and verify all chapters**

```bash
npm run dev
```

Check in browser:
- [ ] Content warning renders with surveillance-green button
- [ ] Prologue: pixel art placeholder, date animation, quote
- [ ] Chapter 1: statute display, stamp, CRT judgment interaction works
- [ ] Chapter 2: timeline events, day counter, pixel art placeholder
- [ ] Chapter 6: action cards grid
- [ ] Navigation: hamburger menu, dot nav, progress bar
- [ ] ScrollReveal: elements fade in on scroll
- [ ] Chapter transitions: fire and ink variants

**Step 2: Test mobile viewport**

Use browser DevTools to test at 375px width:
- [ ] All text readable (16px minimum)
- [ ] Tap targets 44px minimum
- [ ] CRT overlay is full-screen modal
- [ ] Pixel art scenes are full-width
- [ ] No horizontal overflow

**Step 3: Production build**

```bash
npm run build && npm run preview
```

Expected: Build succeeds, preview server loads correctly.

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: Phase 0 + Phase 1 complete — core chapters and interactions"
```

---

## Summary

| Task | Component | Status |
|------|-----------|--------|
| 1 | Vite scaffold | Phase 0 |
| 2 | Design system CSS | Phase 0 |
| 3 | Shared component migration | Phase 0 |
| 4 | PixelArtScene | Phase 0 |
| 5 | CRTOverlay | Phase 0 |
| 6 | StampAnimation | Phase 0 |
| 7 | App shell + routing | Phase 0 |
| 8 | Placeholder pixel art | Phase 0 |
| 9 | Legal data files | Phase 0 |
| 10 | ContentWarning chapter | Phase 1 |
| 11 | Prologue chapter | Phase 1 |
| 12 | HistoricalContext + StatuteJudgment | Phase 1 |
| 13 | TheSeventyOneDays chapter | Phase 1 |
| 14 | CallToAction chapter | Phase 1 |
| 15 | Integration test + mobile | Phase 1 |

**Next phases** (separate plan): Phase 2 (Ch.3 調查歷程, Ch.4 監控真相 with SurveillanceReportForm, Ch.5 未解之謎), Phase 3 (polish + deploy).
