import { useCallback, useRef } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import { PixelScene, type PixelSceneProps, BASE_WIDTH, BASE_HEIGHT } from '../PixelScene'

// Colors — charred, devastated, muted
const VOID = 0x0a0808
const CHAR_BROWN = 0x3d2b1a
const SCORCH = 0x5c3a1e
const ASH_GREY = 0x4a4440
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
    deskRuin.moveTo(80, 110).lineTo(76, 130).lineTo(80, 130).closePath().fill(0x1a1008)
    deskRuin.rect(155, 114, 3, 20).fill(0x1a1008)
    // Debris on and around desk
    deskRuin.rect(90, 106, 12, 4).fill(DEBRIS)
    deskRuin.rect(110, 108, 8, 3).fill(DEBRIS)
    deskRuin.rect(130, 104, 14, 6).fill(DEBRIS)
    charredContent.addChild(deskRuin)

    // Collapsed shelving
    const shelfRuin = new Graphics()
    shelfRuin.rect(10, 70, 50, 3).fill(CHAR_BROWN)
    // Fallen at an angle
    shelfRuin.moveTo(10, 73).lineTo(8, 130).lineTo(12, 130).closePath().fill(0x1a1008)
    // Scattered burnt items
    shelfRuin.rect(15, 80, 8, 6).fill(0x1a1008)
    shelfRuin.rect(30, 78, 6, 8).fill(CHAR_BROWN)
    shelfRuin.rect(44, 76, 10, 4).fill(0x1a1008)
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
    floorDebris.rect(160, 145, 14, 4).fill(0x1a1008)
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
