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
