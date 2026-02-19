import { useState } from 'react'
import { CRTOverlay } from './CRTOverlay'
import { archiveDocuments } from '../../data/legal'

interface DecryptionInteractionProps {
  open: boolean
  onClose: () => void
}

export function DecryptionInteraction({ open, onClose }: DecryptionInteractionProps) {
  const [currentDoc, setCurrentDoc] = useState(0)
  const [revealedFields, setRevealedFields] = useState<Set<string>>(new Set())
  const [completed, setCompleted] = useState(false)

  const doc = archiveDocuments[currentDoc]
  const allRevealed = doc.redactedFields.every((_, i) =>
    revealedFields.has(`${currentDoc}-${i}`),
  )
  const hasParadox = 'paradoxText' in doc && doc.paradoxText
  const [showParadox, setShowParadox] = useState(false)

  const handleReveal = (fieldIndex: number) => {
    const key = `${currentDoc}-${fieldIndex}`
    if (revealedFields.has(key)) return
    setRevealedFields((prev) => new Set(prev).add(key))
  }

  const handleNext = () => {
    if (hasParadox && !showParadox) {
      setShowParadox(true)
      return
    }
    if (currentDoc < archiveDocuments.length - 1) {
      setCurrentDoc((prev) => prev + 1)
      setShowParadox(false)
    } else {
      setCompleted(true)
    }
  }

  const handleReset = () => {
    setCurrentDoc(0)
    setRevealedFields(new Set())
    setCompleted(false)
    setShowParadox(false)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  return (
    <CRTOverlay open={open} onClose={handleClose} title="解密系統 DECLASSIFY">
      {completed ? (
        <div className="space-y-6 text-center">
          <div className="font-document text-[0.7rem] tracking-[0.2em] text-crt-green-dim">
            解密完成 — {archiveDocuments.length}/{archiveDocuments.length} 文件
          </div>
          <p className="text-[1rem] leading-[2] text-crt-green">
            兩份公文，一個案號。一份追訴他至死，另一份用他的死結案。
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-4 cursor-pointer border border-crt-green-dim/50 bg-transparent px-6 py-2 text-crt-green-dim transition-colors hover:border-crt-green hover:text-crt-green"
          >
            關閉終端機
          </button>
        </div>
      ) : showParadox && hasParadox ? (
        <div className="space-y-6">
          <div className="border border-crt-amber/30 bg-void/50 p-6">
            <p className="whitespace-pre-line text-center text-[1.1rem] leading-[2.2] text-crt-amber">
              {(doc as (typeof archiveDocuments)[1]).paradoxText}
            </p>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="w-full cursor-pointer border border-crt-green-dim/50 bg-transparent px-6 py-2 text-crt-green-dim transition-colors hover:border-crt-green hover:text-crt-green"
          >
            {currentDoc < archiveDocuments.length - 1 ? '下一份文件 →' : '結束解密'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Document header */}
          <div className="space-y-1 text-[0.7rem] tracking-[0.15em] text-crt-green-dim">
            <div>文件 {currentDoc + 1}/{archiveDocuments.length}</div>
            <div>{doc.agency} — {doc.classification}</div>
            <div>案號：{doc.caseNo}</div>
          </div>

          <div className="border border-crt-green-dim/20 bg-void/50 p-4">
            <h4 className="mb-4 text-center text-[1rem] text-crt-green">
              {doc.title}
            </h4>

            {/* Redacted fields */}
            <div className="space-y-3">
              {doc.redactedFields.map((field, i) => {
                const key = `${currentDoc}-${i}`
                const isRevealed = revealedFields.has(key)

                return (
                  <div key={key} className="flex items-start gap-3">
                    <span className="mt-[2px] min-w-[5em] text-[0.75rem] text-crt-green-dim">
                      {field.fieldLabel}：
                    </span>
                    <button
                      type="button"
                      onClick={() => handleReveal(i)}
                      disabled={isRevealed}
                      className={`text-left transition-all duration-700 ${
                        isRevealed
                          ? 'cursor-default text-crt-amber'
                          : 'cursor-pointer bg-crt-green/10 px-2 py-[2px] text-transparent hover:bg-crt-green/20'
                      }`}
                      aria-label={isRevealed ? field.revealed : '點擊解密'}
                    >
                      {isRevealed ? (
                        <span>
                          <span className="mr-1 text-[0.7rem] text-seal-red">
                            [解密]
                          </span>
                          {field.revealed}
                        </span>
                      ) : (
                        field.redacted
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Reveal count */}
          <div className="text-center text-[0.75rem] text-crt-green-dim">
            已解密{' '}
            {doc.redactedFields.filter((_, i) => revealedFields.has(`${currentDoc}-${i}`)).length}
            /{doc.redactedFields.length} 欄位
          </div>

          {/* Next button (appears when all fields revealed) */}
          {allRevealed && (
            <button
              type="button"
              onClick={handleNext}
              className="w-full cursor-pointer border border-crt-green-dim/50 bg-transparent px-6 py-2 text-crt-green-dim transition-colors hover:border-crt-green hover:text-crt-green"
            >
              {hasParadox
                ? '繼續 →'
                : currentDoc < archiveDocuments.length - 1
                  ? '下一份文件 →'
                  : '結束解密'}
            </button>
          )}
        </div>
      )}
    </CRTOverlay>
  )
}
