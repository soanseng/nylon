# PixiJS Pixel Art Scenes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all 5 static PNG pixel art placeholders with procedural PixiJS v8 scenes — animated, scroll-progress-driven, responsive, and accessible.

**Architecture:** Copy the proven `PixelScene.tsx` wrapper from the Chen-Wen-chen reference project (`~/projects/Chen-Wen-chen/src/components/pixel/`). Create a new `useScrollProgress` hook providing continuous scroll progress (0–1) and `isInView` boolean. Wrap each PixiJS canvas in a `PixelSceneFrame` component that preserves the existing visual treatment (surveillance-green border, 「場景重現」label, caption). Each scene is a self-contained file using PixiJS Graphics API at 320×180 native resolution with `image-rendering: pixelated`.

**Tech Stack:** PixiJS v8 (`pixi.js@^8`), React 19, TypeScript 5.9, Vite

**Reference patterns:** See `/home/scipio/projects/Chen-Wen-chen/src/components/pixel/scenes/` — 15 working scenes using identical infrastructure (InterrogationRoomScene, LastFreeNightScene, SurveillanceWebScene are the closest references).

---

## Batch 1: Infrastructure (Tasks 1–3)

### Task 1: Install pixi.js and create directory structure

**Files:**
- Modify: `package.json`
- Create: `src/components/pixel/PixelScene.tsx`
- Create: `src/components/pixel/scenes/` (directory)

**Step 1: Install pixi.js**

Run: `cd /home/scipio/projects/nylon && npm install pixi.js@^8`
Expected: pixi.js added to package.json dependencies

**Step 2: Copy PixelScene.tsx from reference project**

Create `src/components/pixel/PixelScene.tsx` — copy from `/home/scipio/projects/Chen-Wen-chen/src/components/pixel/PixelScene.tsx` with two changes:
1. Replace the reduced-motion fallback Tailwind classes (which use Chen-Wen-chen's `ink-*` palette) with nylon's palette classes
2. Replace the normal render wrapper classes similarly

```tsx
import { useRef, useEffect, useState, useCallback } from 'react'
import { Application, Container } from 'pixi.js'

/** Standard pixel art base resolution */
export const BASE_WIDTH = 320
export const BASE_HEIGHT = 180

export interface PixelSceneProps {
  progress: number
  isInView: boolean
}

interface PixelSceneWrapperProps extends PixelSceneProps {
  ariaLabel: string
  onSetup: (app: Application, container: Container) => (() => void) | void
  onProgress?: (progress: number, container: Container) => void
  fallbackText?: string
}

export function PixelScene({
  progress,
  isInView,
  ariaLabel,
  onSetup,
  onProgress,
  fallbackText,
}: PixelSceneWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const sceneRef = useRef<Container | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const initializedRef = useRef(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const onSetupRef = useRef(onSetup)
  onSetupRef.current = onSetup
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  const cancelledRef = useRef(false)

  const initApp = useCallback(async () => {
    const el = containerRef.current
    if (!el || appRef.current || reducedMotion) return

    cancelledRef.current = false
    const app = new Application()

    try {
      await app.init({
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        backgroundAlpha: 0,
        resolution: 1,
        antialias: false,
      })
    } catch {
      return
    }

    if (cancelledRef.current) {
      app.destroy(true)
      return
    }

    const canvas = app.canvas as HTMLCanvasElement
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.imageRendering = 'pixelated'
    el.appendChild(canvas)

    appRef.current = app

    const scene = new Container()
    app.stage.addChild(scene)
    sceneRef.current = scene

    const cleanup = onSetupRef.current(app, scene)
    if (cleanup) cleanupRef.current = cleanup

    initializedRef.current = true
  }, [reducedMotion])

  const destroyApp = useCallback(() => {
    cancelledRef.current = true
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
    if (appRef.current) {
      appRef.current.destroy(true)
      appRef.current = null
      sceneRef.current = null
    }
    initializedRef.current = false
  }, [])

  useEffect(() => {
    if (isInView && !initializedRef.current) {
      initApp()
    } else if (!isInView && initializedRef.current) {
      destroyApp()
    }
    return () => destroyApp()
  }, [isInView, initApp, destroyApp])

  useEffect(() => {
    if (sceneRef.current && onProgressRef.current && initializedRef.current) {
      onProgressRef.current(progress, sceneRef.current)
    }
  }, [progress])

  if (reducedMotion) {
    return (
      <div
        className="w-full overflow-hidden bg-void/40 border border-smoke/60"
        style={{ aspectRatio: `${BASE_WIDTH}/${BASE_HEIGHT}` }}
        role="img"
        aria-label={ariaLabel}
      >
        <div className="w-full h-full flex flex-col items-center justify-center px-6 py-4 text-center">
          <div className="w-8 h-px bg-smoke mb-3" />
          <p className="text-stone text-sm leading-relaxed">
            {fallbackText ?? ariaLabel}
          </p>
          <div className="w-8 h-px bg-smoke mt-3" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full"
      style={{ aspectRatio: `${BASE_WIDTH}/${BASE_HEIGHT}` }}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        role="img"
        aria-label={ariaLabel}
      />
    </div>
  )
}
```

**Step 3: Create scenes directory**

Run: `mkdir -p /home/scipio/projects/nylon/src/components/pixel/scenes`

**Step 4: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS (PixelScene not yet imported anywhere)

**Step 5: Commit**

```bash
git add package.json package-lock.json src/components/pixel/PixelScene.tsx
git commit -m "feat: add pixi.js dependency and PixelScene wrapper infrastructure"
```

---

### Task 2: Create useScrollProgress hook

**Files:**
- Create: `src/hooks/useScrollProgress.ts`

**Step 1: Write the hook**

This hook provides `progress` (0–1 based on element scroll position through viewport) and `isInView` (boolean) — exactly what `PixelScene` needs. Uses IntersectionObserver for visibility and scroll listener for progress.

```tsx
import { useRef, useState, useEffect, useCallback } from 'react'

interface ScrollProgress {
  ref: React.RefObject<HTMLDivElement | null>
  progress: number
  isInView: boolean
}

/**
 * Tracks an element's scroll progress through the viewport.
 * Returns progress 0.0 (just entering bottom) to 1.0 (just leaving top),
 * and isInView boolean for lazy PixiJS init/destroy.
 */
export function useScrollProgress(): ScrollProgress {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(() => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // progress: 0 when element top is at viewport bottom
    //           1 when element bottom is at viewport top
    const totalTravel = windowHeight + rect.height
    const traveled = windowHeight - rect.top
    const p = Math.max(0, Math.min(1, traveled / totalTravel))
    setProgress(p)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '100px 0px 100px 0px' },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const onScroll = () => {
      requestAnimationFrame(updateProgress)
    }
    // Initial calculation
    updateProgress()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isInView, updateProgress])

  return { ref, progress, isInView }
}
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add src/hooks/useScrollProgress.ts
git commit -m "feat: add useScrollProgress hook for PixiJS scene scroll tracking"
```

---

### Task 3: Create PixelSceneFrame wrapper component

**Files:**
- Create: `src/components/pixel/PixelSceneFrame.tsx`

**Step 1: Write the frame component**

This preserves the existing `PixelArtScene` visual treatment (surveillance-green border, glow, 「場景重現」label, caption) but wraps a PixiJS canvas child instead of an `<img>`.

```tsx
import type { ReactNode } from 'react'

interface PixelSceneFrameProps {
  caption: string
  children: ReactNode
  className?: string
}

/**
 * Visual frame for PixiJS pixel art scenes.
 * Matches the existing PixelArtScene border/label/caption treatment.
 */
export function PixelSceneFrame({ caption, children, className = '' }: PixelSceneFrameProps) {
  return (
    <figure className={`relative mx-auto w-full max-w-[640px] border border-surveillance-green/60 bg-void p-3 shadow-[0_0_20px_rgba(74,103,65,0.1)] sm:p-4 ${className}`}>
      <div className="absolute top-[-0.6rem] left-3 bg-void px-2 font-document text-[0.65rem] tracking-[0.2em] text-surveillance-green">
        場景重現
      </div>
      <div className="overflow-hidden bg-ink">
        {children}
      </div>
      <figcaption className="mt-2 font-document text-[0.75rem] leading-relaxed tracking-wide text-dust sm:mt-3">
        {caption}
      </figcaption>
    </figure>
  )
}
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add src/components/pixel/PixelSceneFrame.tsx
git commit -m "feat: add PixelSceneFrame wrapper for PixiJS scene visual treatment"
```

---

## Batch 2: Scenes (Tasks 4–8)

Each scene follows the established pattern from Chen-Wen-chen:
- Color constants at top
- `useCallback` for `onSetup` (draw static + animated elements, register ticker, return cleanup)
- `useCallback` for `onProgress` (scroll-driven reveal phases)
- Render `<PixelScene>` with props

### Task 4: EditorsDesk scene (Ch.0 序章)

**Files:**
- Create: `src/components/pixel/scenes/EditorsDeskScene.tsx`

**Step 1: Write the scene**

Composition per CLAUDE.md: Centered desk, single overhead light, deep shadows. Objects: typewriter, manuscript stack, gasoline can. Mood: somber, the weight of a final choice.

Animation: Overhead lamp sways gently (like InterrogationRoomScene). Subtle gasoline can glint. Progress-driven fade in.

```tsx
import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — deep olive-black, single warm light
const VOID = 0x0a0f0a
const DESK_TOP = 0x3d3229
const DESK_LEG = 0x2a2118
const LAMP_WIRE = 0x4a4a4a
const LAMP_SHADE = 0x5a5a50
const LAMP_BULB = 0xf0e8d0
const LIGHT_CONE = 0xf0e8d0
const TYPEWRITER_BODY = 0x2a2a2a
const TYPEWRITER_KEYS = 0x1a1a1a
const TYPEWRITER_PAPER = 0xe8e4db
const TYPEWRITER_ROLLER = 0x3a3a3a
const MANUSCRIPT_BASE = 0xd4c4a0
const MANUSCRIPT_LINE = 0x9a8f7d
const GASOLINE_CAN = 0x4a5a3a
const GASOLINE_CAP = 0x6a7a5a
const GASOLINE_LABEL = 0x8a4a2a
const FLOOR = 0x0d120d
const CHAIR_COLOR = 0x2a2218

export function EditorsDeskScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const lampRef = useRef<Graphics | null>(null)
  const lightConeRef = useRef<Graphics | null>(null)
  const gasolineGlintRef = useRef<Graphics | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Background — deep olive void
    const bg = new Graphics()
    bg.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill(VOID)
    scene.addChild(bg)

    // Floor
    const floor = new Graphics()
    floor.rect(0, 130, BASE_WIDTH, 50).fill(FLOOR)
    scene.addChild(floor)

    // Light cone (drawn behind desk, updated per frame)
    const lightCone = new Graphics()
    lightConeRef.current = lightCone
    scene.addChild(lightCone)

    // === DESK (centered) ===
    const desk = new Graphics()
    // Desktop surface
    desk.rect(100, 95, 120, 5).fill(DESK_TOP)
    // Desk legs
    desk.rect(108, 100, 4, 30).fill(DESK_LEG)
    desk.rect(210, 100, 4, 30).fill(DESK_LEG)
    // Cross-brace
    desk.rect(112, 118, 98, 2).fill(DESK_LEG)
    scene.addChild(desk)

    // === TYPEWRITER (center of desk) ===
    const typewriter = new Graphics()
    // Base
    typewriter.rect(140, 82, 40, 13).fill(TYPEWRITER_BODY)
    // Paper guide / roller
    typewriter.rect(145, 74, 30, 8).fill(TYPEWRITER_ROLLER)
    // Paper sticking up
    typewriter.rect(152, 62, 16, 16).fill(TYPEWRITER_PAPER)
    // Text lines on paper
    typewriter.rect(154, 65, 12, 1).fill(MANUSCRIPT_LINE)
    typewriter.rect(154, 68, 10, 1).fill(MANUSCRIPT_LINE)
    typewriter.rect(154, 71, 8, 1).fill(MANUSCRIPT_LINE)
    // Key rows
    typewriter.rect(143, 88, 34, 2).fill(TYPEWRITER_KEYS)
    typewriter.rect(144, 91, 32, 2).fill(TYPEWRITER_KEYS)
    scene.addChild(typewriter)

    // === MANUSCRIPT STACK (left of typewriter) ===
    const manuscripts = new Graphics()
    // Stack of papers (slightly offset for depth)
    manuscripts.rect(108, 88, 24, 2).fill(MANUSCRIPT_BASE)
    manuscripts.rect(109, 86, 24, 2).fill({ color: MANUSCRIPT_BASE, alpha: 0.9 })
    manuscripts.rect(110, 84, 24, 2).fill({ color: MANUSCRIPT_BASE, alpha: 0.8 })
    manuscripts.rect(109, 82, 24, 2).fill({ color: MANUSCRIPT_BASE, alpha: 0.7 })
    // Text lines on top page
    manuscripts.rect(111, 83, 16, 1).fill(MANUSCRIPT_LINE)
    manuscripts.rect(111, 85, 14, 1).fill(MANUSCRIPT_LINE)
    manuscripts.rect(111, 87, 12, 1).fill(MANUSCRIPT_LINE)
    scene.addChild(manuscripts)

    // === CHAIR (behind desk, partially visible) ===
    const chair = new Graphics()
    chair.rect(148, 100, 24, 3).fill(CHAIR_COLOR)
    chair.rect(150, 103, 2, 14).fill(CHAIR_COLOR)
    chair.rect(170, 103, 2, 14).fill(CHAIR_COLOR)
    // Chair back
    chair.rect(168, 82, 3, 20).fill(CHAIR_COLOR)
    scene.addChild(chair)

    // === GASOLINE CAN (right side, on floor) ===
    const gasoline = new Graphics()
    // Can body
    gasoline.rect(224, 108, 16, 22).fill(GASOLINE_CAN)
    // Cap/spout
    gasoline.rect(228, 104, 8, 4).fill(GASOLINE_CAP)
    gasoline.rect(230, 100, 4, 4).fill(GASOLINE_CAP)
    // Label
    gasoline.rect(226, 114, 12, 6).fill(GASOLINE_LABEL)
    scene.addChild(gasoline)

    // Gasoline glint overlay (animated)
    const gasolineGlint = new Graphics()
    gasolineGlintRef.current = gasolineGlint
    scene.addChild(gasolineGlint)

    // === LAMP (overhead, animated) ===
    const lamp = new Graphics()
    lampRef.current = lamp
    scene.addChild(lamp)

    // Animation ticker
    const tickerFn = () => {
      frameRef.current += 1
      const t = frameRef.current

      // Lamp sway
      const sway = Math.sin(t * 0.012) * 1.5
      const lampX = 160 + sway

      // Draw lamp
      if (lampRef.current) {
        lampRef.current.clear()
        // Wire
        lampRef.current.rect(lampX, 0, 1, 24).fill(LAMP_WIRE)
        // Shade (trapezoid)
        lampRef.current.moveTo(lampX - 10, 24)
          .lineTo(lampX + 11, 24)
          .lineTo(lampX + 7, 32)
          .lineTo(lampX - 6, 32)
          .closePath()
          .fill(LAMP_SHADE)
        // Bulb
        lampRef.current.rect(lampX - 1, 32, 3, 3).fill(LAMP_BULB)
      }

      // Draw light cone
      if (lightConeRef.current) {
        lightConeRef.current.clear()
        // Outer cone
        lightConeRef.current.moveTo(lampX - 8, 35)
          .lineTo(lampX + 9, 35)
          .lineTo(lampX + 55, BASE_HEIGHT)
          .lineTo(lampX - 54, BASE_HEIGHT)
          .closePath()
          .fill({ color: LIGHT_CONE, alpha: 0.04 })
        // Inner cone (brighter)
        lightConeRef.current.moveTo(lampX - 4, 35)
          .lineTo(lampX + 5, 35)
          .lineTo(lampX + 35, BASE_HEIGHT)
          .lineTo(lampX - 34, BASE_HEIGHT)
          .closePath()
          .fill({ color: LIGHT_CONE, alpha: 0.03 })
      }

      // Gasoline can glint (subtle, periodic)
      if (gasolineGlintRef.current) {
        gasolineGlintRef.current.clear()
        const glint = Math.sin(t * 0.02) * 0.5 + 0.5
        if (glint > 0.7) {
          gasolineGlintRef.current.rect(225, 109, 1, 8).fill({ color: 0xffffff, alpha: (glint - 0.7) * 0.3 })
        }
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      lampRef.current = null
      lightConeRef.current = null
      gasolineGlintRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    scene.alpha = Math.min(1, _progress * 2.5)
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="鄭南榕的編輯桌——打字機、稿件堆、角落的汽油桶，頭頂吊燈緩緩搖擺"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：《自由時代》雜誌社總編輯室——打字機、稿件與汽油桶 ]"
    />
  )
}
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS (scene not yet imported by any chapter)

**Step 3: Commit**

```bash
git add src/components/pixel/scenes/EditorsDeskScene.tsx
git commit -m "feat: add EditorsDeskScene — Ch.0 pixel art (typewriter, manuscripts, gasoline can)"
```

---

### Task 5: Courtroom scene (Ch.1 時代背景)

**Files:**
- Create: `src/components/pixel/scenes/CourtroomScene.tsx`

**Step 1: Write the scene**

Composition per CLAUDE.md: Papers Please border-checkpoint composition. Judge behind elevated desk, defendant below, 「唯一死刑」stamp. Mood: imposing, authoritative, the weight of an unjust law.

Animation: Subtle paper flutter on judge's desk. Progress: fade in → judge area → defendant → stamp area glows red.

```tsx
import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — courtroom: dark wood, military green, institutional
const BG = 0x0d120d
const WALL = 0x1a211a
const WOOD_DARK = 0x2a2018
const WOOD_MEDIUM = 0x3d3229
const WOOD_LIGHT = 0x4a3d30
const JUDGE_ROBE = 0x1a1a2a
const JUDGE_COLLAR = 0xd4d0c3
const JUDGE_SKIN = 0xc9a882
const JUDGE_HAIR = 0x3a3a3a
const DEFENDANT_SHIRT = 0xd4d0c8
const DEFENDANT_SKIN = 0xc9a882
const DEFENDANT_HAIR = 0x1c1814
const DEFENDANT_PANTS = 0x4a4a50
const PAPER = 0xe8e4db
const TEXT_LINE = 0x9a8f7d
const STAMP_RED = 0xdc2626
const STAMP_RED_DIM = 0x7f1d1d
const GAVEL = 0x3d2b1a
const FLAG_RED = 0x991b1b
const FLAG_BLUE = 0x1a1a5a
const LIGHT = 0xf0e8d0
const RAILING = 0x5a5a50
const GUARD_UNIFORM = 0x3a4a3a

export function CourtroomScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const stampRef = useRef<Graphics | null>(null)
  const paperRef = useRef<Graphics | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Background wall
    const bg = new Graphics()
    bg.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill(BG)
    bg.rect(0, 0, BASE_WIDTH, 100).fill(WALL)
    scene.addChild(bg)

    // === ELEVATED JUDGE'S BENCH (top area) ===
    // Platform
    const platform = new Graphics()
    platform.rect(80, 55, 160, 6).fill(WOOD_DARK)
    platform.rect(85, 48, 150, 7).fill(WOOD_MEDIUM)
    // Front panel
    platform.rect(85, 55, 150, 20).fill(WOOD_DARK)
    // National emblem area (abstract circle)
    platform.rect(152, 10, 16, 16).fill({ color: FLAG_BLUE, alpha: 0.6 })
    platform.circle(160, 18, 6).fill({ color: FLAG_RED, alpha: 0.5 })
    scene.addChild(platform)

    // Judge figure (upper body visible above bench)
    const judge = new Graphics()
    // Head
    judge.rect(156, 28, 8, 7).fill(JUDGE_SKIN)
    judge.rect(156, 28, 8, 2).fill(JUDGE_HAIR)
    // Robe (wide, imposing)
    judge.rect(148, 35, 24, 14).fill(JUDGE_ROBE)
    // White collar
    judge.rect(154, 35, 12, 3).fill(JUDGE_COLLAR)
    scene.addChild(judge)

    // Papers on judge's desk
    const judgePapers = new Graphics()
    judgePapers.rect(120, 46, 14, 8).fill(PAPER)
    judgePapers.rect(122, 47, 10, 1).fill(TEXT_LINE)
    judgePapers.rect(122, 49, 8, 1).fill(TEXT_LINE)
    // Second document
    judgePapers.rect(190, 45, 12, 8).fill(PAPER)
    judgePapers.rect(192, 46, 8, 1).fill(TEXT_LINE)
    judgePapers.rect(192, 48, 6, 1).fill(TEXT_LINE)
    scene.addChild(judgePapers)

    // Animated paper (subtle flutter)
    const paper = new Graphics()
    paperRef.current = paper
    scene.addChild(paper)

    // Gavel
    const gavel = new Graphics()
    gavel.rect(140, 46, 3, 8).fill(GAVEL)
    gavel.rect(137, 44, 9, 3).fill(GAVEL)
    scene.addChild(gavel)

    // Overhead lights
    const lights = new Graphics()
    lights.rect(100, 0, 1, 8).fill(RAILING)
    lights.rect(96, 8, 9, 3).fill(RAILING)
    lights.rect(99, 11, 3, 2).fill(LIGHT)
    lights.rect(220, 0, 1, 8).fill(RAILING)
    lights.rect(216, 8, 9, 3).fill(RAILING)
    lights.rect(219, 11, 3, 2).fill(LIGHT)
    scene.addChild(lights)

    // === RAILING / BARRIER ===
    const railing = new Graphics()
    railing.rect(60, 90, 200, 3).fill(RAILING)
    // Vertical bars
    for (let x = 70; x <= 250; x += 20) {
      railing.rect(x, 82, 2, 8).fill(RAILING)
    }
    scene.addChild(railing)

    // === DEFENDANT (lower area, small, vulnerable) ===
    const defendant = new Graphics()
    // Head
    defendant.rect(156, 100, 8, 7).fill(DEFENDANT_SKIN)
    defendant.rect(156, 100, 8, 2).fill(DEFENDANT_HAIR)
    // Shoulders hunched
    defendant.rect(150, 107, 20, 14).fill(DEFENDANT_SHIRT)
    // Arms (hands together — restrained posture)
    defendant.rect(154, 118, 12, 3).fill(DEFENDANT_SKIN)
    // Legs
    defendant.rect(152, 121, 7, 16).fill(DEFENDANT_PANTS)
    defendant.rect(161, 121, 7, 16).fill(DEFENDANT_PANTS)
    scene.addChild(defendant)

    // Guards flanking
    const guards = new Graphics()
    // Left guard
    guards.rect(110, 98, 8, 7).fill(DEFENDANT_SKIN)
    guards.rect(106, 105, 16, 18).fill(GUARD_UNIFORM)
    guards.rect(107, 123, 6, 14).fill(GUARD_UNIFORM)
    guards.rect(115, 123, 6, 14).fill(GUARD_UNIFORM)
    // Right guard
    guards.rect(202, 98, 8, 7).fill(DEFENDANT_SKIN)
    guards.rect(198, 105, 16, 18).fill(GUARD_UNIFORM)
    guards.rect(199, 123, 6, 14).fill(GUARD_UNIFORM)
    guards.rect(207, 123, 6, 14).fill(GUARD_UNIFORM)
    scene.addChild(guards)

    // Floor
    const floor = new Graphics()
    floor.rect(0, 140, BASE_WIDTH, 40).fill(0x0a0f0a)
    scene.addChild(floor)

    // === STAMP AREA (reveals with progress) ===
    const stamp = new Graphics()
    stampRef.current = stamp
    stamp.alpha = 0
    scene.addChild(stamp)

    // Animation
    const tickerFn = () => {
      frameRef.current += 1
      const t = frameRef.current

      // Subtle paper flutter
      if (paperRef.current) {
        paperRef.current.clear()
        const flutter = Math.sin(t * 0.03) * 0.3
        paperRef.current.rect(170, 46 + flutter, 14, 8).fill({ color: PAPER, alpha: 0.8 })
        paperRef.current.rect(172, 47 + flutter, 10, 1).fill(TEXT_LINE)
        paperRef.current.rect(172, 49 + flutter, 7, 1).fill(TEXT_LINE)
      }

      // Stamp glow pulse (when visible)
      if (stampRef.current && stampRef.current.alpha > 0) {
        stampRef.current.clear()
        const pulse = Math.sin(t * 0.04) * 0.15 + 0.85
        // Stamp block
        stampRef.current.rect(130, 62, 60, 14).fill({ color: STAMP_RED, alpha: 0.2 * pulse })
        // 唯一死刑 text representation (4 character blocks)
        stampRef.current.rect(134, 65, 10, 8).fill({ color: STAMP_RED, alpha: 0.7 * pulse })
        stampRef.current.rect(148, 65, 10, 8).fill({ color: STAMP_RED, alpha: 0.7 * pulse })
        stampRef.current.rect(162, 65, 10, 8).fill({ color: STAMP_RED, alpha: 0.7 * pulse })
        stampRef.current.rect(176, 65, 10, 8).fill({ color: STAMP_RED, alpha: 0.7 * pulse })
        // Red border
        stampRef.current.rect(128, 60, 64, 2).fill({ color: STAMP_RED_DIM, alpha: 0.5 * pulse })
        stampRef.current.rect(128, 78, 64, 2).fill({ color: STAMP_RED_DIM, alpha: 0.5 * pulse })
        stampRef.current.rect(128, 60, 2, 20).fill({ color: STAMP_RED_DIM, alpha: 0.5 * pulse })
        stampRef.current.rect(190, 60, 2, 20).fill({ color: STAMP_RED_DIM, alpha: 0.5 * pulse })
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      stampRef.current = null
      paperRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    // Phase 1 (0–0.4): Scene fades in
    scene.alpha = Math.min(1, _progress * 3)

    // Phase 2 (0.6–1.0): Stamp fades in
    if (stampRef.current) {
      if (_progress < 0.6) {
        stampRef.current.alpha = 0
      } else {
        stampRef.current.alpha = (_progress - 0.6) / 0.4
      }
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="軍事法庭——法官高坐審判台上，被告渺小地站在欄杆之後，「唯一死刑」印章浮現"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：懲治叛亂條例下的軍事法庭——法官沒有從輕量刑的選擇 ]"
    />
  )
}
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add src/components/pixel/scenes/CourtroomScene.tsx
git commit -m "feat: add CourtroomScene — Ch.1 pixel art (judge, defendant, death stamp)"
```

---

### Task 6: Standoff scene (Ch.2 案發經過)

**Files:**
- Create: `src/components/pixel/scenes/StandoffScene.tsx`

**Step 1: Write the scene**

Composition per CLAUDE.md: Vertical split — office interior (left, warm tones) / police surrounding building (right, cold tones). 71-day self-imprisonment standoff.

Animation: Warm flickering light inside office, cold flashing police lights outside. Progress: left side fades in first (warm interior), then right side (cold exterior), building tension.

```tsx
import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — warm interior vs cold exterior
// LEFT (warm — inside office)
const INTERIOR_BG = 0x1a1608
const INTERIOR_WALL = 0x2a2418
const DESK_COLOR = 0x3d3229
const LAMP_WARM = 0xf0d890
const PAPER_COLOR = 0xe8e4db
const TEXT_LINE = 0x9a8f7d
const FIGURE_HAIR = 0x1c1814
const FIGURE_SKIN = 0xc9a882
const FIGURE_SHIRT = 0xd4d0c8
const SHELF_COLOR = 0x3a3020
const BOOK_1 = 0x5a3a2a
const BOOK_2 = 0x4a5a3a
const BOOK_3 = 0x3a3a5a

// RIGHT (cold — police outside)
const EXTERIOR_BG = 0x0a0e14
const BUILDING = 0x1a1a20
const BUILDING_WINDOW = 0x0a0a10
const POLICE_BLUE = 0x1a2a4a
const POLICE_UNIFORM = 0x2a3a5a
const POLICE_SKIN = 0xc9a882
const POLICE_HELMET = 0x3a3a4a
const POLICE_LIGHT_RED = 0xcc2222
const POLICE_LIGHT_BLUE = 0x2244cc
const STREET = 0x1a1a1a
const BARRICADE = 0x5a5a50

// Center
const DIVIDER = 0x0a0a0a
const WINDOW_GLASS = 0x1a2a3a

export function StandoffScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const interiorLightRef = useRef<Graphics | null>(null)
  const policeLightsRef = useRef<Graphics | null>(null)
  const rightSideRef = useRef<Container | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // === LEFT HALF: INTERIOR ===
    const leftBg = new Graphics()
    leftBg.rect(0, 0, BASE_WIDTH / 2, BASE_HEIGHT).fill(INTERIOR_BG)
    leftBg.rect(0, 0, BASE_WIDTH / 2, 120).fill(INTERIOR_WALL)
    scene.addChild(leftBg)

    // Warm light overlay
    const interiorLight = new Graphics()
    interiorLightRef.current = interiorLight
    scene.addChild(interiorLight)

    // Bookshelf (left wall)
    const shelf = new Graphics()
    shelf.rect(8, 30, 40, 4).fill(SHELF_COLOR)
    shelf.rect(8, 55, 40, 4).fill(SHELF_COLOR)
    shelf.rect(8, 80, 40, 4).fill(SHELF_COLOR)
    // Books
    shelf.rect(10, 20, 6, 10).fill(BOOK_1)
    shelf.rect(17, 22, 5, 8).fill(BOOK_2)
    shelf.rect(23, 18, 7, 12).fill(BOOK_3)
    shelf.rect(31, 21, 5, 9).fill(BOOK_1)
    shelf.rect(37, 19, 6, 11).fill(BOOK_2)
    // Second row
    shelf.rect(10, 35, 7, 16).fill(BOOK_3)
    shelf.rect(18, 38, 5, 13).fill(BOOK_1)
    shelf.rect(24, 36, 6, 15).fill(BOOK_2)
    shelf.rect(31, 40, 8, 11).fill(BOOK_3)
    scene.addChild(shelf)

    // Desk (center-right of left half)
    const desk = new Graphics()
    desk.rect(60, 100, 80, 5).fill(DESK_COLOR)
    desk.rect(68, 105, 3, 20).fill(DESK_COLOR)
    desk.rect(132, 105, 3, 20).fill(DESK_COLOR)
    scene.addChild(desk)

    // Papers scattered on desk
    const papers = new Graphics()
    papers.rect(70, 92, 14, 10).fill(PAPER_COLOR)
    papers.rect(72, 93, 10, 1).fill(TEXT_LINE)
    papers.rect(72, 95, 8, 1).fill(TEXT_LINE)
    papers.rect(90, 94, 12, 8).fill(PAPER_COLOR)
    papers.rect(92, 95, 8, 1).fill(TEXT_LINE)
    papers.rect(92, 97, 6, 1).fill(TEXT_LINE)
    scene.addChild(papers)

    // 鄭南榕 figure (sitting at desk, facing right toward window)
    const nylon = new Graphics()
    // Head
    nylon.rect(108, 76, 8, 7).fill(FIGURE_SKIN)
    nylon.rect(108, 76, 8, 2).fill(FIGURE_HAIR)
    // Glasses
    nylon.rect(113, 78, 3, 2).fill(0x332b25)
    // Body (sitting, hunched over desk)
    nylon.rect(104, 83, 16, 14).fill(FIGURE_SHIRT)
    // Arms on desk
    nylon.rect(100, 94, 8, 3).fill(FIGURE_SKIN)
    nylon.rect(116, 94, 8, 3).fill(FIGURE_SKIN)
    scene.addChild(nylon)

    // Desk lamp (small)
    const deskLamp = new Graphics()
    deskLamp.rect(128, 86, 2, 8).fill(0x5a5a50)
    deskLamp.rect(124, 84, 10, 3).fill(0x5a5a50)
    deskLamp.rect(127, 87, 4, 2).fill(LAMP_WARM)
    scene.addChild(deskLamp)

    // Floor
    const leftFloor = new Graphics()
    leftFloor.rect(0, 130, BASE_WIDTH / 2, 50).fill(0x0d0d08)
    scene.addChild(leftFloor)

    // === DIVIDER LINE ===
    const divider = new Graphics()
    divider.rect(BASE_WIDTH / 2 - 1, 0, 2, BASE_HEIGHT).fill(DIVIDER)
    scene.addChild(divider)

    // Window at divider (connecting inside/outside)
    const window_ = new Graphics()
    window_.rect(BASE_WIDTH / 2 - 8, 40, 16, 40).fill(WINDOW_GLASS)
    window_.rect(BASE_WIDTH / 2 - 1, 40, 2, 40).fill(0x3a3a3a) // frame center
    window_.rect(BASE_WIDTH / 2 - 8, 59, 16, 2).fill(0x3a3a3a) // frame cross
    scene.addChild(window_)

    // === RIGHT HALF: EXTERIOR ===
    const rightSide = new Container()
    rightSideRef.current = rightSide
    scene.addChild(rightSide)

    const rightBg = new Graphics()
    rightBg.rect(BASE_WIDTH / 2, 0, BASE_WIDTH / 2, BASE_HEIGHT).fill(EXTERIOR_BG)
    rightSide.addChild(rightBg)

    // Building exterior (the magazine office from outside)
    const building = new Graphics()
    building.rect(162, 15, 60, 115).fill(BUILDING)
    // Windows (dark)
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        building.rect(168 + col * 18, 25 + row * 22, 10, 12).fill(BUILDING_WINDOW)
      }
    }
    // One lit window (Nylon's office — 2nd floor, leftmost)
    building.rect(168, 47, 10, 12).fill({ color: LAMP_WARM, alpha: 0.3 })
    rightSide.addChild(building)

    // Street
    const street = new Graphics()
    street.rect(BASE_WIDTH / 2, 130, BASE_WIDTH / 2, 50).fill(STREET)
    rightSide.addChild(street)

    // Barricade
    const barricade = new Graphics()
    barricade.rect(230, 118, 30, 3).fill(BARRICADE)
    barricade.rect(235, 112, 3, 6).fill(BARRICADE)
    barricade.rect(255, 112, 3, 6).fill(BARRICADE)
    rightSide.addChild(barricade)

    // Police officers (3 figures in formation)
    const policeGroup = new Graphics()
    const positions = [
      { x: 240, y: 96 },
      { x: 258, y: 100 },
      { x: 278, y: 94 },
    ]
    for (const pos of positions) {
      // Helmet
      policeGroup.rect(pos.x, pos.y, 8, 4).fill(POLICE_HELMET)
      // Head
      policeGroup.rect(pos.x + 1, pos.y + 4, 6, 4).fill(POLICE_SKIN)
      // Body
      policeGroup.rect(pos.x - 2, pos.y + 8, 12, 14).fill(POLICE_UNIFORM)
      // Legs
      policeGroup.rect(pos.x - 1, pos.y + 22, 5, 10).fill(POLICE_BLUE)
      policeGroup.rect(pos.x + 5, pos.y + 22, 5, 10).fill(POLICE_BLUE)
    }
    rightSide.addChild(policeGroup)

    // Police car (simplified)
    const policeCar = new Graphics()
    policeCar.rect(275, 122, 36, 14).fill(POLICE_BLUE)
    policeCar.rect(278, 118, 12, 4).fill(POLICE_BLUE)
    policeCar.rect(295, 118, 12, 4).fill(POLICE_BLUE)
    // Wheels
    policeCar.circle(282, 136, 3).fill(0x1a1a1a)
    policeCar.circle(304, 136, 3).fill(0x1a1a1a)
    rightSide.addChild(policeCar)

    // Police lights (animated)
    const policeLights = new Graphics()
    policeLightsRef.current = policeLights
    rightSide.addChild(policeLights)

    // Animation
    const tickerFn = () => {
      frameRef.current += 1
      const t = frameRef.current

      // Interior warm light flicker
      if (interiorLightRef.current) {
        interiorLightRef.current.clear()
        const flicker = 0.03 + Math.sin(t * 0.08) * 0.01
        interiorLightRef.current.rect(60, 60, 80, 70).fill({ color: LAMP_WARM, alpha: flicker })
      }

      // Police lights (alternating red/blue flash)
      if (policeLightsRef.current) {
        policeLightsRef.current.clear()
        const phase = Math.floor(t / 15) % 2
        // Light bar on car
        if (phase === 0) {
          policeLightsRef.current.rect(288, 116, 6, 3).fill({ color: POLICE_LIGHT_RED, alpha: 0.8 })
          // Red wash on nearby surfaces
          policeLightsRef.current.rect(270, 110, 50, 30).fill({ color: POLICE_LIGHT_RED, alpha: 0.03 })
        } else {
          policeLightsRef.current.rect(294, 116, 6, 3).fill({ color: POLICE_LIGHT_BLUE, alpha: 0.8 })
          policeLightsRef.current.rect(270, 110, 50, 30).fill({ color: POLICE_LIGHT_BLUE, alpha: 0.03 })
        }
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      interiorLightRef.current = null
      policeLightsRef.current = null
      rightSideRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    // Phase 1 (0–0.4): Left side (interior) fades in
    scene.alpha = Math.min(1, _progress * 3)

    // Phase 2 (0.3–0.7): Right side (exterior) fades in
    if (rightSideRef.current) {
      if (_progress < 0.3) {
        rightSideRef.current.alpha = 0
      } else if (_progress < 0.7) {
        rightSideRef.current.alpha = (_progress - 0.3) / 0.4
      } else {
        rightSideRef.current.alpha = 1
      }
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="對峙場景——左側辦公室內鄭南榕伏案寫作，暖色燈光；右側警方包圍建築，警車閃燈"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：1989年1月27日至4月7日——71天的自囚與包圍 ]"
    />
  )
}
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add src/components/pixel/scenes/StandoffScene.tsx
git commit -m "feat: add StandoffScene — Ch.2 pixel art (warm interior vs cold police exterior)"
```

---

### Task 7: IntelligenceOffice scene (Ch.4 監控真相)

**Files:**
- Create: `src/components/pixel/scenes/IntelligenceOfficeScene.tsx`

**Step 1: Write the scene**

Composition per CLAUDE.md: Bird's-eye view (Papers Please desk angle). Agent at desk, filing cabinet, rotary phone, ashtray. Mood: bureaucratic, clinical, suffocating.

Animation: Agent pen movement (writing), cigarette smoke wisps, progress reveals stacked surveillance files.

```tsx
import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — overhead perspective, fluorescent office
const FLOOR = 0x1a211a
const DESK_TOP = 0x5a5040
const DESK_EDGE = 0x3d3229
const PAPER = 0xe8e4db
const TEXT_LINE = 0x9a8f7d
const STAMP_RED = 0xc23b22
const AGENT_HAIR = 0x1c1814
const AGENT_SHIRT = 0x4a5a4a
const AGENT_ARM = 0xc9a882
const PEN_COLOR = 0x1a1a1a
const CABINET_BODY = 0x3a4a3a
const CABINET_DRAWER = 0x4a5a4a
const CABINET_HANDLE = 0x8a8a7a
const PHONE_BODY = 0x2a2a2a
const PHONE_DIAL = 0x3a3a3a
const PHONE_HANDSET = 0x1a1a1a
const ASHTRAY = 0x5a5a5a
const ASH = 0x8a8a8a
const CIGARETTE = 0xe8e4db
const SMOKE = 0x9a9a9a
const FLUORESCENT = 0xe8f0d8
const FILE_GREEN = 0x4a6a4a
const FILE_MANILA = 0xc4b480
const RUBBER_STAMP = 0x5a3020
const INK_PAD = 0x2a1a2a

export function IntelligenceOfficeScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const penRef = useRef<Graphics | null>(null)
  const smokeRef = useRef<Graphics | null>(null)
  const filesRef = useRef<Graphics | null>(null)

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Floor (bird's eye view)
    const bg = new Graphics()
    bg.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill(FLOOR)
    scene.addChild(bg)

    // Fluorescent light reflection on floor
    const floorLight = new Graphics()
    floorLight.rect(40, 20, 200, 140).fill({ color: FLUORESCENT, alpha: 0.02 })
    scene.addChild(floorLight)

    // === DESK (large, center — bird's eye) ===
    const desk = new Graphics()
    desk.rect(60, 30, 160, 100).fill(DESK_TOP)
    // Edge shadow
    desk.rect(60, 30, 160, 3).fill(DESK_EDGE)
    desk.rect(60, 30, 3, 100).fill(DESK_EDGE)
    desk.rect(217, 30, 3, 100).fill(DESK_EDGE)
    desk.rect(60, 127, 160, 3).fill(DESK_EDGE)
    scene.addChild(desk)

    // === DOCUMENTS ON DESK ===
    // Main document being written
    const mainDoc = new Graphics()
    mainDoc.rect(110, 55, 50, 65).fill(PAPER)
    // Header area (agency marking)
    mainDoc.rect(115, 58, 40, 6).fill({ color: FILE_GREEN, alpha: 0.3 })
    // Written text lines
    for (let y = 68; y < 110; y += 4) {
      const lineLen = 30 + Math.random() * 10
      mainDoc.rect(115, y, lineLen, 1).fill(TEXT_LINE)
    }
    scene.addChild(mainDoc)

    // Classification stamp on document
    const classStamp = new Graphics()
    classStamp.rect(130, 58, 16, 5).fill({ color: STAMP_RED, alpha: 0.5 })
    scene.addChild(classStamp)

    // Other papers scattered
    const otherPapers = new Graphics()
    // Left stack
    otherPapers.rect(68, 40, 30, 40).fill({ color: PAPER, alpha: 0.8 })
    otherPapers.rect(70, 42, 26, 1).fill(TEXT_LINE)
    otherPapers.rect(70, 46, 22, 1).fill(TEXT_LINE)
    otherPapers.rect(70, 50, 18, 1).fill(TEXT_LINE)
    // Right reference doc
    otherPapers.rect(170, 45, 35, 45).fill({ color: PAPER, alpha: 0.9 })
    otherPapers.rect(172, 48, 28, 1).fill(TEXT_LINE)
    otherPapers.rect(172, 52, 24, 1).fill(TEXT_LINE)
    otherPapers.rect(172, 56, 20, 1).fill(TEXT_LINE)
    scene.addChild(otherPapers)

    // Rubber stamp and ink pad (top-right of desk)
    const stampItems = new Graphics()
    stampItems.rect(190, 95, 14, 8).fill(INK_PAD)
    stampItems.rect(192, 97, 10, 4).fill({ color: STAMP_RED, alpha: 0.6 })
    stampItems.rect(208, 92, 6, 12).fill(RUBBER_STAMP)
    scene.addChild(stampItems)

    // === AGENT (bird's eye view — top of head and shoulders) ===
    const agent = new Graphics()
    // Hair (top-down view = larger circle/square)
    agent.rect(132, 102, 16, 14).fill(AGENT_HAIR)
    // Shoulders (spread out from bird's eye)
    agent.rect(118, 116, 44, 14).fill(AGENT_SHIRT)
    // Arms reaching to desk
    agent.rect(108, 80, 8, 40).fill(AGENT_SHIRT)
    agent.rect(164, 80, 8, 40).fill(AGENT_SHIRT)
    // Hands
    agent.rect(108, 74, 6, 8).fill(AGENT_ARM)
    agent.rect(164, 74, 6, 8).fill(AGENT_ARM)
    scene.addChild(agent)

    // Pen (animated — writing motion)
    const pen = new Graphics()
    penRef.current = pen
    scene.addChild(pen)

    // === FILING CABINET (left side, floor level) ===
    const cabinet = new Graphics()
    cabinet.rect(4, 40, 44, 100).fill(CABINET_BODY)
    // Drawers
    for (let i = 0; i < 4; i++) {
      const dy = 44 + i * 24
      cabinet.rect(6, dy, 40, 20).fill(CABINET_DRAWER)
      // Handle
      cabinet.rect(22, dy + 8, 10, 3).fill(CABINET_HANDLE)
    }
    scene.addChild(cabinet)

    // === ROTARY PHONE (top-left of desk) ===
    const phone = new Graphics()
    phone.rect(70, 95, 20, 16).fill(PHONE_BODY)
    // Dial
    phone.circle(80, 103, 6).fill(PHONE_DIAL)
    phone.circle(80, 103, 2).fill(PHONE_BODY)
    // Handset
    phone.rect(66, 90, 8, 4).fill(PHONE_HANDSET)
    phone.rect(86, 90, 8, 4).fill(PHONE_HANDSET)
    phone.rect(66, 88, 28, 3).fill(PHONE_HANDSET)
    scene.addChild(phone)

    // === ASHTRAY (near right hand) ===
    const ashtray = new Graphics()
    ashtray.circle(176, 102, 8).fill(ASHTRAY)
    ashtray.circle(176, 102, 6).fill(ASH)
    // Cigarette
    ashtray.rect(172, 96, 10, 2).fill(CIGARETTE)
    ashtray.rect(172, 96, 3, 2).fill(0xff6b00)
    scene.addChild(ashtray)

    // Smoke wisps (animated)
    const smoke = new Graphics()
    smokeRef.current = smoke
    scene.addChild(smoke)

    // Stacked files reveal (progress-driven)
    const files = new Graphics()
    filesRef.current = files
    files.alpha = 0
    // Stacks on cabinet top
    files.rect(8, 30, 14, 10).fill(FILE_GREEN)
    files.rect(24, 28, 12, 12).fill(FILE_MANILA)
    files.rect(38, 32, 8, 8).fill(FILE_GREEN)
    // Overflow files on floor
    files.rect(4, 145, 20, 14).fill(FILE_MANILA)
    files.rect(26, 148, 18, 10).fill(FILE_GREEN)
    files.rect(280, 50, 24, 16).fill(FILE_MANILA)
    files.rect(278, 70, 28, 14).fill(FILE_GREEN)
    files.rect(282, 88, 20, 12).fill(FILE_MANILA)
    scene.addChild(files)

    // Animation
    const tickerFn = () => {
      frameRef.current += 1
      const t = frameRef.current

      // Pen writing motion
      if (penRef.current) {
        penRef.current.clear()
        const penX = 120 + Math.sin(t * 0.1) * 8
        const penY = 80 + Math.cos(t * 0.07) * 2
        penRef.current.rect(penX, penY, 2, 8).fill(PEN_COLOR)
        penRef.current.rect(penX, penY + 8, 1, 2).fill(0x1a1a5a) // ink tip
      }

      // Smoke wisps
      if (smokeRef.current) {
        smokeRef.current.clear()
        for (let i = 0; i < 3; i++) {
          const age = (t * 0.5 + i * 20) % 60
          if (age < 40) {
            const sx = 174 + Math.sin(age * 0.15 + i) * 3
            const sy = 94 - age * 0.5
            const alpha = Math.max(0, 0.3 - age * 0.008)
            smokeRef.current.circle(sx, sy, 1 + age * 0.03).fill({ color: SMOKE, alpha })
          }
        }
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      penRef.current = null
      smokeRef.current = null
      filesRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    scene.alpha = Math.min(1, _progress * 3)

    // Files overflow reveals at later progress
    if (filesRef.current) {
      if (_progress < 0.5) {
        filesRef.current.alpha = 0
      } else {
        filesRef.current.alpha = (_progress - 0.5) / 0.5
      }
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="情報辦公室鳥瞰——情治人員伏案撰寫監控報告，周圍是檔案櫃、轉盤電話、冒煙的菸灰缸"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：青谷專案下的情報辦公室——每一份報告的另一端，都是一個人的日常 ]"
    />
  )
}
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add src/components/pixel/scenes/IntelligenceOfficeScene.tsx
git commit -m "feat: add IntelligenceOfficeScene — Ch.4 pixel art (bird's-eye desk, files, smoke)"
```

---

### Task 8: CharredOffice scene (Ch.5 未解之謎)

**Files:**
- Create: `src/components/pixel/scenes/CharredOfficeScene.tsx`

**Step 1: Write the scene**

Composition per CLAUDE.md: Charred interior, collapsed furniture silhouettes, single light beam through broken window. NO figure shown — dignified distance. Mood: aftermath, devastation, silence.

Animation: Dust particles floating in light beam, subtle ember glow. Progress: light beam first, then gradually reveal charred surroundings.

```tsx
import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — charred, devastated, muted
const VOID = 0x0a0808
const CHAR_BLACK = 0x1a1008
const CHAR_BROWN = 0x3d2b1a
const SCORCH = 0x5c3a1e
const ASH_GREY = 0x4a4440
const ASH_LIGHT = 0x6a6460
const WALL_BURNT = 0x1a1410
const WALL_STAIN = 0x2a2018
const BEAM_COLOR = 0xf0e8d0
const BEAM_DUST = 0xe8dcc4
const WINDOW_FRAME = 0x3a3a3a
const EMBER_CORE = 0xff6b00
const EMBER_DIM = 0xcc4400
const METAL_DARK = 0x3a3a3a
const METAL_RUST = 0x5a3a2a
const DEBRIS = 0x2a2018

export function CharredOfficeScene({ progress, isInView }: PixelSceneProps) {
  const frameRef = useRef(0)
  const dustRef = useRef<Graphics | null>(null)
  const emberRef = useRef<Graphics | null>(null)
  const charredContentRef = useRef<Container | null>(null)

  // Persistent dust particle positions
  const dustParticles = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      x: 165 + (i % 4) * 8 - 12,
      y: 30 + (i * 11) % 100,
      speed: 0.2 + (i * 0.07) % 0.3,
      drift: (i * 0.13) % 0.4,
      phase: i * 1.3,
      size: 1,
    })),
  )

  const onSetup = useCallback((app: Application, scene: Container) => {
    // Background — near-black charred void
    const bg = new Graphics()
    bg.rect(0, 0, BASE_WIDTH, BASE_HEIGHT).fill(VOID)
    scene.addChild(bg)

    // Burnt walls (barely visible)
    const walls = new Graphics()
    walls.rect(0, 0, BASE_WIDTH, 130).fill(WALL_BURNT)
    // Burn stains and damage
    walls.rect(20, 30, 40, 60).fill(WALL_STAIN)
    walls.rect(240, 20, 50, 80).fill(WALL_STAIN)
    walls.rect(100, 10, 30, 40).fill({ color: SCORCH, alpha: 0.3 })
    walls.alpha = 0.4
    scene.addChild(walls)

    // === BROKEN WINDOW (right side — source of light beam) ===
    const windowArea = new Graphics()
    // Window frame (damaged)
    windowArea.rect(240, 20, 40, 50).fill(WINDOW_FRAME)
    // Broken glass — irregular opening
    windowArea.rect(244, 24, 32, 42).fill(0x2a3a4a) // sky through window
    // Jagged glass edges
    windowArea.rect(244, 24, 4, 8).fill(WINDOW_FRAME)
    windowArea.rect(268, 24, 8, 6).fill(WINDOW_FRAME)
    windowArea.rect(244, 58, 10, 8).fill(WINDOW_FRAME)
    windowArea.rect(270, 50, 6, 16).fill(WINDOW_FRAME)
    scene.addChild(windowArea)

    // === LIGHT BEAM (diagonal, from broken window to floor) ===
    const lightBeam = new Graphics()
    // Main beam — trapezoid from window to floor
    lightBeam.moveTo(244, 30)
      .lineTo(276, 30)
      .lineTo(200, BASE_HEIGHT)
      .lineTo(140, BASE_HEIGHT)
      .closePath()
      .fill({ color: BEAM_COLOR, alpha: 0.06 })
    // Brighter core
    lightBeam.moveTo(252, 34)
      .lineTo(268, 34)
      .lineTo(185, BASE_HEIGHT)
      .lineTo(155, BASE_HEIGHT)
      .closePath()
      .fill({ color: BEAM_COLOR, alpha: 0.04 })
    scene.addChild(lightBeam)

    // Dust particles in beam (animated)
    const dust = new Graphics()
    dustRef.current = dust
    scene.addChild(dust)

    // === CHARRED CONTENT (progress-reveal) ===
    const charredContent = new Container()
    charredContentRef.current = charredContent
    charredContent.alpha = 0
    scene.addChild(charredContent)

    // Collapsed desk (charred, broken)
    const deskRuin = new Graphics()
    deskRuin.rect(80, 110, 80, 4).fill(CHAR_BROWN)
    // Broken/tilted
    deskRuin.moveTo(80, 110).lineTo(76, 130).lineTo(80, 130).closePath().fill(CHAR_BLACK)
    deskRuin.rect(155, 114, 3, 20).fill(CHAR_BLACK)
    // Debris on and around desk
    deskRuin.rect(90, 106, 12, 4).fill(DEBRIS)
    deskRuin.rect(110, 108, 8, 3).fill(DEBRIS)
    deskRuin.rect(130, 104, 14, 6).fill(DEBRIS)
    charredContent.addChild(deskRuin)

    // Collapsed shelving
    const shelfRuin = new Graphics()
    shelfRuin.rect(10, 70, 50, 3).fill(CHAR_BROWN)
    // Fallen at an angle
    shelfRuin.moveTo(10, 73).lineTo(8, 130).lineTo(12, 130).closePath().fill(CHAR_BLACK)
    // Scattered burnt items
    shelfRuin.rect(15, 80, 8, 6).fill(CHAR_BLACK)
    shelfRuin.rect(30, 78, 6, 8).fill(CHAR_BROWN)
    shelfRuin.rect(44, 76, 10, 4).fill(CHAR_BLACK)
    charredContent.addChild(shelfRuin)

    // Charred typewriter remains (recognizable silhouette)
    const typewriterRuin = new Graphics()
    typewriterRuin.rect(100, 102, 30, 8).fill(METAL_DARK)
    typewriterRuin.rect(106, 96, 18, 6).fill(METAL_RUST)
    // Warped paper guide
    typewriterRuin.rect(110, 92, 10, 4).fill(METAL_DARK)
    charredContent.addChild(typewriterRuin)

    // Filing cabinet (toppled)
    const cabinetRuin = new Graphics()
    // Fallen on its side
    cabinetRuin.rect(200, 100, 24, 40).fill(METAL_DARK)
    // Drawers pulled out / scattered
    cabinetRuin.rect(202, 104, 20, 8).fill(METAL_RUST)
    cabinetRuin.rect(204, 120, 18, 8).fill(METAL_RUST)
    // Spilled papers (charred)
    cabinetRuin.rect(195, 140, 30, 4).fill(ASH_GREY)
    cabinetRuin.rect(220, 138, 20, 6).fill(ASH_GREY)
    charredContent.addChild(cabinetRuin)

    // Ash and debris on floor
    const floorDebris = new Graphics()
    for (let x = 20; x < 280; x += 15) {
      const y = 135 + (x * 7) % 15
      const w = 4 + (x * 3) % 8
      floorDebris.rect(x, y, w, 2).fill(ASH_GREY)
    }
    // Larger debris chunks
    floorDebris.rect(60, 140, 10, 6).fill(CHAR_BROWN)
    floorDebris.rect(160, 145, 14, 4).fill(CHAR_BLACK)
    floorDebris.rect(240, 142, 8, 5).fill(DEBRIS)
    charredContent.addChild(floorDebris)

    // Ember spots (animated glow)
    const embers = new Graphics()
    emberRef.current = embers
    charredContent.addChild(embers)

    // Animation
    const tickerFn = () => {
      frameRef.current += 1
      const t = frameRef.current

      // Dust particles floating in light beam
      if (dustRef.current) {
        dustRef.current.clear()
        for (const p of dustParticles.current) {
          // Float upward, drift sideways
          const py = (p.y - t * p.speed + p.phase * 30) % 140 + 20
          const px = p.x + Math.sin(t * p.drift + p.phase) * 6

          // Only show if within the light beam area (roughly)
          const beamLeft = 244 - (py / BASE_HEIGHT) * 104
          const beamRight = 276 - (py / BASE_HEIGHT) * 76
          if (px > beamLeft && px < beamRight) {
            const brightness = 0.3 + Math.sin(t * 0.05 + p.phase) * 0.2
            dustRef.current.rect(px, py, p.size, p.size).fill({ color: BEAM_DUST, alpha: brightness })
          }
        }
      }

      // Ember glow spots
      if (emberRef.current) {
        emberRef.current.clear()
        const emberSpots = [
          { x: 95, y: 108 },
          { x: 130, y: 112 },
          { x: 42, y: 82 },
        ]
        for (let i = 0; i < emberSpots.length; i++) {
          const glow = Math.sin(t * 0.03 + i * 2.1) * 0.5 + 0.5
          if (glow > 0.3) {
            const alpha = (glow - 0.3) * 0.4
            emberRef.current.rect(emberSpots[i].x, emberSpots[i].y, 2, 2).fill({ color: EMBER_CORE, alpha })
            emberRef.current.rect(emberSpots[i].x - 1, emberSpots[i].y - 1, 4, 4).fill({ color: EMBER_DIM, alpha: alpha * 0.3 })
          }
        }
      }
    }
    app.ticker.add(tickerFn)

    return () => {
      app.ticker.remove(tickerFn)
      dustRef.current = null
      emberRef.current = null
      charredContentRef.current = null
    }
  }, [])

  const onProgress = useCallback((_progress: number, scene: Container) => {
    // Phase 1 (0–0.3): Light beam area fades in (scene alpha)
    scene.alpha = Math.min(1, _progress * 3)

    // Phase 2 (0.3–0.8): Charred content gradually revealed
    if (charredContentRef.current) {
      if (_progress < 0.3) {
        charredContentRef.current.alpha = 0
      } else if (_progress < 0.8) {
        charredContentRef.current.alpha = (_progress - 0.3) / 0.5
      } else {
        charredContentRef.current.alpha = 1
      }
    }
  }, [])

  return (
    <PixelScene
      progress={progress}
      isInView={isInView}
      ariaLabel="燒毀的辦公室——焦黑殘骸中，一道光從破窗射入，塵埃在光束中浮動，餘燼微微閃爍"
      onSetup={onSetup}
      onProgress={onProgress}
      fallbackText="[ 場景：《自由時代》雜誌社內部——基金會保存了現場原貌至今 ]"
    />
  )
}
```

**Step 2: Create scenes index file**

Create `src/components/pixel/scenes/index.ts`:

```ts
export { EditorsDeskScene } from './EditorsDeskScene'
export { CourtroomScene } from './CourtroomScene'
export { StandoffScene } from './StandoffScene'
export { IntelligenceOfficeScene } from './IntelligenceOfficeScene'
export { CharredOfficeScene } from './CharredOfficeScene'
```

**Step 3: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 4: Commit**

```bash
git add src/components/pixel/scenes/CharredOfficeScene.tsx src/components/pixel/scenes/index.ts
git commit -m "feat: add CharredOfficeScene — Ch.5 pixel art (charred ruins, light beam, dust particles)"
```

---

## Batch 3: Chapter Integration (Tasks 9–13)

Each task: replace `PixelArtScene` (static PNG) with `PixelSceneFrame` + `useScrollProgress` + the new PixiJS scene.

### Task 9: Integrate EditorsDeskScene into Prologue (Ch.0)

**Files:**
- Modify: `src/chapters/Prologue.tsx`

**Step 1: Update imports and add scroll progress**

Replace the static PixelArtScene with the PixiJS scene. The Prologue currently wraps the scene in `<ScrollReveal>`. We replace with `useScrollProgress` driving the PixiJS scene.

In `src/chapters/Prologue.tsx`, make these changes:

1. Remove: `import { PixelArtScene } from '../components/pixel-art/PixelArtScene'`
2. Remove: `import editorsDesk from '../assets/pixel-art/editors-desk.png'`
3. Add: `import { EditorsDeskScene } from '../components/pixel/scenes'`
4. Add: `import { PixelSceneFrame } from '../components/pixel/PixelSceneFrame'`
5. Add: `import { useScrollProgress } from '../hooks/useScrollProgress'`

Replace the PixelArtScene JSX block:

```tsx
// OLD:
<ScrollReveal>
  <PixelArtScene
    src={editorsDesk}
    alt="鄭南榕的編輯桌——打字機、稿件堆、角落的汽油桶"
    caption="《自由時代》雜誌社總編輯室"
  />
</ScrollReveal>

// NEW:
<div ref={sceneScroll.ref}>
  <PixelSceneFrame caption="《自由時代》雜誌社總編輯室">
    <EditorsDeskScene progress={sceneScroll.progress} isInView={sceneScroll.isInView} />
  </PixelSceneFrame>
</div>
```

Add inside the component body (before the return):

```tsx
const sceneScroll = useScrollProgress()
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 3: Verify in browser (manual)**

Run: `cd /home/scipio/projects/nylon && npm run dev`
Check: Prologue shows animated pixel art scene instead of static PNG.

**Step 4: Commit**

```bash
git add src/chapters/Prologue.tsx
git commit -m "feat: integrate EditorsDeskScene PixiJS into Prologue chapter"
```

---

### Task 10: Integrate CourtroomScene into HistoricalContext (Ch.1)

**Files:**
- Modify: `src/chapters/HistoricalContext.tsx`

**Step 1: Update the chapter**

Same pattern as Task 9:

1. Remove: `import { PixelArtScene } from '../components/pixel-art/PixelArtScene'`
2. Remove: `import courtroom from '../assets/pixel-art/courtroom.png'`
3. Add: `import { CourtroomScene } from '../components/pixel/scenes'`
4. Add: `import { PixelSceneFrame } from '../components/pixel/PixelSceneFrame'`
5. Add: `import { useScrollProgress } from '../hooks/useScrollProgress'`

Add in component body:

```tsx
const sceneScroll = useScrollProgress()
```

Replace JSX:

```tsx
// OLD:
<ScrollReveal>
  <PixelArtScene
    src={courtroom}
    alt="法庭場景——法官高坐，被告站立，桌上「唯一死刑」印章"
    caption="懲治叛亂條例下的軍事法庭：法官沒有從輕量刑的選擇"
  />
</ScrollReveal>

// NEW:
<div ref={sceneScroll.ref}>
  <PixelSceneFrame caption="懲治叛亂條例下的軍事法庭：法官沒有從輕量刑的選擇">
    <CourtroomScene progress={sceneScroll.progress} isInView={sceneScroll.isInView} />
  </PixelSceneFrame>
</div>
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add src/chapters/HistoricalContext.tsx
git commit -m "feat: integrate CourtroomScene PixiJS into HistoricalContext chapter"
```

---

### Task 11: Integrate StandoffScene into TheSeventyOneDays (Ch.2)

**Files:**
- Modify: `src/chapters/TheSeventyOneDays.tsx`

**Step 1: Update the chapter**

1. Remove: `import { PixelArtScene } from '../components/pixel-art/PixelArtScene'`
2. Remove: `import standoff from '../assets/pixel-art/standoff.png'`
3. Add: `import { StandoffScene } from '../components/pixel/scenes'`
4. Add: `import { PixelSceneFrame } from '../components/pixel/PixelSceneFrame'`
5. Add: `import { useScrollProgress } from '../hooks/useScrollProgress'`

Add in component body:

```tsx
const sceneScroll = useScrollProgress()
```

Replace JSX:

```tsx
// OLD:
<ScrollReveal>
  <PixelArtScene
    src={standoff}
    alt="對峙——左：辦公室內鄭南榕伏案；右：警方包圍建築"
    caption="1989年1月27日至4月7日——71天的自囚與包圍"
  />
</ScrollReveal>

// NEW:
<div ref={sceneScroll.ref}>
  <PixelSceneFrame caption="1989年1月27日至4月7日——71天的自囚與包圍">
    <StandoffScene progress={sceneScroll.progress} isInView={sceneScroll.isInView} />
  </PixelSceneFrame>
</div>
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add src/chapters/TheSeventyOneDays.tsx
git commit -m "feat: integrate StandoffScene PixiJS into TheSeventyOneDays chapter"
```

---

### Task 12: Integrate IntelligenceOfficeScene into SurveillanceTruth (Ch.4)

**Files:**
- Modify: `src/chapters/SurveillanceTruth.tsx`

**Step 1: Update the chapter**

1. Remove: `import { PixelArtScene } from '../components/pixel-art/PixelArtScene'`
2. Remove: `import intelligenceOffice from '../assets/pixel-art/intelligence-office.png'`
3. Add: `import { IntelligenceOfficeScene } from '../components/pixel/scenes'`
4. Add: `import { PixelSceneFrame } from '../components/pixel/PixelSceneFrame'`
5. Add: `import { useScrollProgress } from '../hooks/useScrollProgress'`

Add in component body:

```tsx
const sceneScroll = useScrollProgress()
```

Replace JSX:

```tsx
// OLD:
<ScrollReveal>
  <PixelArtScene
    src={intelligenceOffice}
    alt="情報辦公室鳥瞰——情治人員伏案撰寫報告，檔案櫃，轉盤電話，菸灰缸"
    caption="青谷專案下的情報辦公室：每一份報告的另一端，都是一個人的日常"
  />
</ScrollReveal>

// NEW:
<div ref={sceneScroll.ref}>
  <PixelSceneFrame caption="青谷專案下的情報辦公室：每一份報告的另一端，都是一個人的日常">
    <IntelligenceOfficeScene progress={sceneScroll.progress} isInView={sceneScroll.isInView} />
  </PixelSceneFrame>
</div>
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add src/chapters/SurveillanceTruth.tsx
git commit -m "feat: integrate IntelligenceOfficeScene PixiJS into SurveillanceTruth chapter"
```

---

### Task 13: Integrate CharredOfficeScene into UnansweredQuestions (Ch.5)

**Files:**
- Modify: `src/chapters/UnansweredQuestions.tsx`

**Step 1: Update the chapter**

1. Remove: `import { PixelArtScene } from '../components/pixel-art/PixelArtScene'`
2. Remove: `import charredOffice from '../assets/pixel-art/charred-office.png'`
3. Add: `import { CharredOfficeScene } from '../components/pixel/scenes'`
4. Add: `import { PixelSceneFrame } from '../components/pixel/PixelSceneFrame'`
5. Add: `import { useScrollProgress } from '../hooks/useScrollProgress'`

Add in component body:

```tsx
const sceneScroll = useScrollProgress()
```

Replace JSX:

```tsx
// OLD:
<ScrollReveal>
  <PixelArtScene
    src={charredOffice}
    alt="燒毀的辦公室——焦黑內部，倒塌傢俱剪影，一道從破窗射入的光束；無人物"
    caption="《自由時代》雜誌社內部：基金會保存了現場原貌至今"
  />
</ScrollReveal>

// NEW:
<div ref={sceneScroll.ref}>
  <PixelSceneFrame caption="《自由時代》雜誌社內部：基金會保存了現場原貌至今">
    <CharredOfficeScene progress={sceneScroll.progress} isInView={sceneScroll.isInView} />
  </PixelSceneFrame>
</div>
```

**Step 2: Verify build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add src/chapters/UnansweredQuestions.tsx
git commit -m "feat: integrate CharredOfficeScene PixiJS into UnansweredQuestions chapter"
```

---

## Batch 4: Verification & Cleanup (Task 14)

### Task 14: Final build verification and cleanup

**Files:**
- Possibly modify: `src/components/pixel-art/PixelArtScene.tsx` (keep — may still be used as fallback reference)
- Modify: `CLAUDE.md` (update project status)

**Step 1: Verify full build**

Run: `cd /home/scipio/projects/nylon && npm run build`
Expected: PASS with all PixiJS scenes compiled

**Step 2: Verify lint**

Run: `cd /home/scipio/projects/nylon && npm run lint`
Expected: PASS

**Step 3: Check if PixelArtScene is still imported anywhere**

Run: `grep -r "PixelArtScene" src/`

If NO results: the static component and PNG imports are fully replaced. The `PixelArtScene.tsx` and PNG files can be kept as reduced-motion fallback reference or deleted. Decision: **keep** them — the PNGs are tiny (1-4KB each) and serve as documentation of the intended compositions.

If SOME results: those chapters still need updating — go back and fix.

**Step 4: Check if PNG imports are still used**

Run: `grep -r "assets/pixel-art" src/`

Expected: No results (all PNG imports replaced by PixiJS scenes).

**Step 5: Update CLAUDE.md project status**

Add to the "Completed" sections in CLAUDE.md:

```markdown
### Completed: PixiJS Pixel Art Scenes (2026-02-20)

All 5 static PNG placeholder scenes replaced with procedural PixiJS v8 animated scenes:

**Infrastructure** (`src/components/pixel/`):
- `PixelScene.tsx` — Shared wrapper (lazy loading, scroll progress, reduced-motion fallback)
- `PixelSceneFrame.tsx` — Visual frame (surveillance-green border, 「場景重現」label, caption)
- `useScrollProgress` hook — Continuous scroll progress (0–1) and viewport visibility tracking

**Scenes** (`src/components/pixel/scenes/`):
| Scene | Chapter | Key Elements | Animation |
|-------|---------|-------------|-----------|
| EditorsDeskScene | Ch.0 序章 | Desk, typewriter, manuscripts, gasoline can | Lamp sway, can glint |
| CourtroomScene | Ch.1 時代背景 | Judge, defendant, guards, stamp | Paper flutter, stamp pulse |
| StandoffScene | Ch.2 案發經過 | Split: warm interior / cold exterior | Interior flicker, police lights |
| IntelligenceOfficeScene | Ch.4 監控真相 | Bird's-eye desk, cabinet, phone, ashtray | Pen writing, cigarette smoke |
| CharredOfficeScene | Ch.5 未解之謎 | Charred ruins, light beam, no figure | Dust particles, ember glow |
```

**Step 6: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with PixiJS scenes completion status"
```

---

## Summary

| Batch | Tasks | Purpose |
|-------|-------|---------|
| 1 | 1–3 | Infrastructure: pixi.js, PixelScene, useScrollProgress, PixelSceneFrame |
| 2 | 4–8 | 5 PixiJS scenes (EditorsDesk, Courtroom, Standoff, IntelligenceOffice, CharredOffice) |
| 3 | 9–13 | Chapter integration (replace PNG PixelArtScene with PixiJS in each chapter) |
| 4 | 14 | Build verification, lint, cleanup, CLAUDE.md update |

**Total commits:** 14 (one per task)
**New files:** 8 (`PixelScene.tsx`, `PixelSceneFrame.tsx`, `useScrollProgress.ts`, 5 scene files, `scenes/index.ts`)
**Modified files:** 6 (5 chapter files + CLAUDE.md)
**New dependency:** `pixi.js@^8`
