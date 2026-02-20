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
      const lineLen = 30 + ((y * 7) % 10)
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
