import { useState } from 'react'
import { CRTOverlay } from './CRTOverlay'
import type { SourceReliability, ContentAccuracy } from '../../data/surveillance'
import { surveillanceReportTemplates } from '../../data/surveillance'

interface SurveillanceReportFormProps {
  open: boolean
  onClose: () => void
}

const reliabilityOptions: { value: SourceReliability; label: string }[] = [
  { value: '甲', label: '甲 — 可靠 (Reliable)' },
  { value: '乙', label: '乙 — 通常可靠 (Usually reliable)' },
  { value: '丙', label: '丙 — 不確定 (Uncertain)' },
]

const accuracyOptions: { value: ContentAccuracy; label: string }[] = [
  { value: '一', label: '一 — 已確認 (Confirmed)' },
  { value: '二', label: '二 — 可能屬實 (Probably true)' },
  { value: '三', label: '三 — 不確定 (Uncertain)' },
]

export function SurveillanceReportForm({ open, onClose }: SurveillanceReportFormProps) {
  const [currentTemplate, setCurrentTemplate] = useState(0)
  const [reliability, setReliability] = useState<SourceReliability | ''>('')
  const [accuracy, setAccuracy] = useState<ContentAccuracy | ''>('')
  const [selectedMovement, setSelectedMovement] = useState(-1)
  const [submitted, setSubmitted] = useState(false)
  const [showNote, setShowNote] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [filesLogged, setFilesLogged] = useState(0)

  const template = surveillanceReportTemplates[currentTemplate]

  const handleSubmit = () => {
    if (!reliability || !accuracy || selectedMovement < 0) return
    setSubmitted(true)
    setFilesLogged((prev) => prev + 1)
  }

  const handleNext = () => {
    if (!showNote) {
      setShowNote(true)
      return
    }
    if (currentTemplate < surveillanceReportTemplates.length - 1) {
      setCurrentTemplate((prev) => prev + 1)
      resetForm()
    } else {
      setCompleted(true)
    }
  }

  const resetForm = () => {
    setReliability('')
    setAccuracy('')
    setSelectedMovement(-1)
    setSubmitted(false)
    setShowNote(false)
  }

  const handleReset = () => {
    setCurrentTemplate(0)
    resetForm()
    setCompleted(false)
    setFilesLogged(0)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  return (
    <CRTOverlay open={open} onClose={handleClose} title="情報報告填寫系統">
      {completed ? (
        <div className="space-y-6 text-center">
          <div className="font-document text-[0.7rem] tracking-[0.2em] text-crt-green-dim">
            █████████████████████ 作業完成
          </div>
          <p className="text-[1.1rem] text-crt-green">
            已建檔 {filesLogged}/5,000 份
          </p>
          <p className="whitespace-pre-line text-[0.9rem] leading-[2] text-crt-green-dim">
            {'這只是5000頁中的' + filesLogged + '頁。\n每一頁的另一端，都是一個人的日常。'}
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
        <div className="space-y-5">
          {/* Agency header */}
          <div className="whitespace-pre-line border border-crt-green-dim/20 bg-void/80 p-3 text-[0.7rem] leading-[1.8] tracking-[0.1em] text-crt-green-dim">
            {template.agencyHeader}
          </div>

          <div className="text-[0.7rem] text-crt-green-dim">
            報告 {currentTemplate + 1}/{surveillanceReportTemplates.length} — {template.date}
          </div>

          <div className="text-[0.8rem] text-crt-green">
            監控對象：{template.subject}
          </div>

          {!submitted ? (
            <div className="space-y-5">
              {/* Source reliability */}
              <div className="space-y-2">
                <div className="text-[0.75rem] text-crt-green-dim">來源可靠性鑑定：</div>
                {reliabilityOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-3 border p-2 text-[0.8rem] transition-colors ${
                      reliability === opt.value
                        ? 'border-crt-green bg-crt-green/5 text-crt-green'
                        : 'border-crt-green-dim/20 text-crt-green-dim hover:border-crt-green-dim/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reliability"
                      value={opt.value}
                      checked={reliability === opt.value}
                      onChange={() => setReliability(opt.value)}
                      className="accent-crt-green"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {/* Content accuracy */}
              <div className="space-y-2">
                <div className="text-[0.75rem] text-crt-green-dim">內容正確性鑑定：</div>
                {accuracyOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-3 border p-2 text-[0.8rem] transition-colors ${
                      accuracy === opt.value
                        ? 'border-crt-green bg-crt-green/5 text-crt-green'
                        : 'border-crt-green-dim/20 text-crt-green-dim hover:border-crt-green-dim/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="accuracy"
                      value={opt.value}
                      checked={accuracy === opt.value}
                      onChange={() => setAccuracy(opt.value)}
                      className="accent-crt-green"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {/* Movement summary */}
              <div className="space-y-2">
                <div className="text-[0.75rem] text-crt-green-dim">動態摘要（請選擇正確紀錄）：</div>
                {template.movementOptions.map((opt, i) => (
                  <label
                    key={i}
                    className={`flex cursor-pointer items-start gap-3 border p-2 text-[0.8rem] leading-[1.8] transition-colors ${
                      selectedMovement === i
                        ? 'border-crt-green bg-crt-green/5 text-crt-green'
                        : 'border-crt-green-dim/20 text-crt-green-dim hover:border-crt-green-dim/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="movement"
                      checked={selectedMovement === i}
                      onChange={() => setSelectedMovement(i)}
                      className="mt-1 accent-crt-green"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!reliability || !accuracy || selectedMovement < 0}
                className="w-full cursor-pointer border border-crt-green bg-crt-green/10 px-6 py-3 font-heading text-[0.9rem] tracking-[0.1em] text-crt-green transition-all hover:bg-crt-green/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                送出報告
              </button>
            </div>
          ) : !showNote ? (
            <div className="space-y-4">
              {/* Result */}
              <div className="whitespace-pre-line border border-crt-green/30 bg-void/50 p-4 text-[0.85rem] leading-[1.8] text-crt-green">
                {template.completionMessage}
              </div>

              {/* Correctness feedback */}
              {(reliability !== template.correctSourceReliability ||
                accuracy !== template.correctContentAccuracy ||
                selectedMovement !== template.correctMovementIndex) && (
                <div className="border border-crt-amber/30 p-3 text-[0.8rem] text-crt-amber">
                  正確答案：來源 {template.correctSourceReliability}，
                  內容 {template.correctContentAccuracy}，
                  動態摘要第 {template.correctMovementIndex + 1} 項
                </div>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="w-full cursor-pointer border border-crt-green-dim/50 bg-transparent px-6 py-2 text-crt-green-dim transition-colors hover:border-crt-green hover:text-crt-green"
              >
                查看歷史背景 →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border border-crt-green-dim/20 bg-void/50 p-4 text-[0.85rem] leading-[2] text-crt-green-dim">
                {template.historicalNote}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full cursor-pointer border border-crt-green-dim/50 bg-transparent px-6 py-2 text-crt-green-dim transition-colors hover:border-crt-green hover:text-crt-green"
              >
                {currentTemplate < surveillanceReportTemplates.length - 1
                  ? '下一份報告 →'
                  : '查看結語'}
              </button>
            </div>
          )}
        </div>
      )}
    </CRTOverlay>
  )
}
