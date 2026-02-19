import { useState } from 'react'
import { CRTOverlay } from './CRTOverlay'
import { legalScenarios, legalScenariosConclusion } from '../../data/legal'

interface StatuteJudgmentProps {
  open: boolean
  onClose: () => void
}

// Statute options the user can choose from (matches data in legal.ts)
const statuteOptions = [
  { value: 'pra-art-2-1', label: '刑法\u00A7100 \u2192 懲治叛亂條例\u00A72-1（唯一死刑）' },
  { value: 'pra-art-5', label: '懲治叛亂條例\u00A75（無期徒刑或十年以上）' },
  { value: 'pra-art-7', label: '懲治叛亂條例\u00A77（五年以下有期徒刑）' },
]

export function StatuteJudgment({ open, onClose }: StatuteJudgmentProps) {
  const [currentCase, setCurrentCase] = useState(0)
  const [selectedStatute, setSelectedStatute] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)

  const scenario = legalScenarios[currentCase]
  // Check if user's selection matches the scenario's applicable statute
  const isCorrect = scenario.applicableStatuteIds.includes(selectedStatute)

  const handleSubmit = () => {
    if (!selectedStatute) return
    setSubmitted(true)
  }

  const handleNext = () => {
    if (currentCase < legalScenarios.length - 1) {
      setCurrentCase((prev) => prev + 1)
      setSelectedStatute('')
      setSubmitted(false)
    } else {
      setCompleted(true)
    }
  }

  const handleReset = () => {
    setCurrentCase(0)
    setSelectedStatute('')
    setSubmitted(false)
    setCompleted(false)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  return (
    <CRTOverlay open={open} onClose={handleClose} title="法條適用判斷系統">
      {completed ? (
        <div className="space-y-6 text-center">
          <p className="whitespace-pre-line text-[1.1rem] leading-[2] text-crt-green">
            {legalScenariosConclusion.zh}
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
        <div className="space-y-6">
          {/* Case header */}
          <div className="text-[0.7rem] tracking-[0.2em] text-crt-green-dim">
            案件 {String.fromCharCode(65 + currentCase)} / {legalScenarios.length}
          </div>

          {/* Scenario description */}
          <div className="border border-crt-green-dim/20 bg-void/50 p-4 leading-[2] text-crt-green">
            {scenario.description}
          </div>

          {/* Statute selection */}
          {!submitted && (
            <div className="space-y-3">
              <div className="text-[0.8rem] text-crt-green-dim">請判定適用法條：</div>
              {statuteOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 border p-3 transition-colors ${
                    selectedStatute === option.value
                      ? 'border-crt-green bg-crt-green/5'
                      : 'border-crt-green-dim/20 hover:border-crt-green-dim/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="statute"
                    value={option.value}
                    checked={selectedStatute === option.value}
                    onChange={(e) => setSelectedStatute(e.target.value)}
                    className="accent-crt-green"
                  />
                  <span className="text-[0.85rem] text-crt-green">{option.label}</span>
                </label>
              ))}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedStatute}
                className="mt-2 w-full cursor-pointer border border-crt-green bg-crt-green/10 px-6 py-3 font-heading text-[0.9rem] tracking-[0.1em] text-crt-green transition-all hover:bg-crt-green/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                蓋章判決
              </button>
            </div>
          )}

          {/* Result */}
          {submitted && (
            <div className="space-y-4">
              <div className={`border p-4 ${isCorrect ? 'border-crt-green' : 'border-crt-amber'}`}>
                <div className="mb-2 text-[0.8rem] text-crt-green-dim">
                  {isCorrect ? '判定正確' : '判定有誤，正確答案：'}
                </div>
                <div className="text-crt-green">
                  適用法條：{scenario.applicableStatuteLabel}
                </div>
                <div className={`mt-1 text-[1.2rem] font-bold ${
                  scenario.isDeathSentence ? 'text-seal-red' : 'text-crt-amber'
                }`}>
                  {scenario.sentence}
                </div>
              </div>
              <p className="whitespace-pre-line text-[0.85rem] leading-[1.8] text-crt-green-dim">
                {scenario.explanation}
              </p>
              <button
                type="button"
                onClick={handleNext}
                className="w-full cursor-pointer border border-crt-green-dim/50 bg-transparent px-6 py-2 text-crt-green-dim transition-colors hover:border-crt-green hover:text-crt-green"
              >
                {currentCase < legalScenarios.length - 1 ? '下一個案件 \u2192' : '查看結語'}
              </button>
            </div>
          )}
        </div>
      )}
    </CRTOverlay>
  )
}
