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
