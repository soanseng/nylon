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
const Investigation = lazy(() =>
  import('./chapters/Investigation').then((m) => ({ default: m.Investigation })),
)
const SurveillanceTruth = lazy(() =>
  import('./chapters/SurveillanceTruth').then((m) => ({ default: m.SurveillanceTruth })),
)
const UnansweredQuestions = lazy(() =>
  import('./chapters/UnansweredQuestions').then((m) => ({ default: m.UnansweredQuestions })),
)
const CallToAction = lazy(() =>
  import('./chapters/CallToAction').then((m) => ({ default: m.CallToAction })),
)

const navItems = [
  { id: 'content-warning', label: '內容警告', labelEn: 'Content Warning', num: '—' },
  { id: 'prologue', label: '序章', labelEn: 'Prologue', num: '00' },
  { id: 'historical-context', label: '時代背景', labelEn: 'When Words Were Treason', num: '01' },
  { id: 'the-71-days', label: '案發經過', labelEn: 'The 71 Days', num: '02' },
  { id: 'investigation', label: '調查歷程', labelEn: 'Investigation', num: '03' },
  { id: 'surveillance-truth', label: '監控真相', labelEn: 'Surveillance Truth', num: '04' },
  { id: 'unanswered-questions', label: '未解之謎', labelEn: 'Unanswered Questions', num: '05' },
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
      {/* Skip to content link for screen readers */}
      <a
        href="#prologue"
        className="fixed top-0 left-0 z-[9999] -translate-y-full bg-void px-4 py-2 font-document text-sm text-crt-green transition-transform focus:translate-y-0"
      >
        跳至主要內容
      </a>
      <Navigation items={navItems} />
      <main className="scroll-snap-container" aria-label="主要內容">
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
        <ChapterTransition variant="ink" />
        <Suspense fallback={<ChapterFallback />}>
          <Investigation />
        </Suspense>
        <ChapterTransition variant="ink" />
        <Suspense fallback={<ChapterFallback />}>
          <SurveillanceTruth />
        </Suspense>
        <ChapterTransition variant="fire" />
        <Suspense fallback={<ChapterFallback />}>
          <UnansweredQuestions />
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
