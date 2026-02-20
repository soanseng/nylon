import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — courtroom: dark wood, military green, institutional
const BG = 0x0d120d
const WALL = 0x1a211a
const WOOD_DARK = 0x2a2018
const WOOD_MEDIUM = 0x3d3229
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
