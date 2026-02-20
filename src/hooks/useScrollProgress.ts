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
