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
