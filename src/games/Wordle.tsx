import { useEffect, useState } from 'react'
import Keyboard, { KeyState } from '../components/Keyboard'
import { WORDLE } from '../content'
import { bigPop } from '../lib/confetti'

type Mark = 'hit' | 'near' | 'miss'

function evaluate(guess: string, answer: string): Mark[] {
  const res: Mark[] = Array(5).fill('miss')
  const remaining: Record<string, number> = {}
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) res[i] = 'hit'
    else remaining[answer[i]] = (remaining[answer[i]] || 0) + 1
  }
  for (let i = 0; i < 5; i++) {
    if (res[i] !== 'hit' && remaining[guess[i]] > 0) {
      res[i] = 'near'
      remaining[guess[i]]--
    }
  }
  return res
}

export default function Wordle({
  saved,
  onSave,
  onComplete,
}: {
  saved: string[] | undefined
  onSave: (g: string[]) => void
  onComplete: () => void
}) {
  const answer = WORDLE.answer.toUpperCase()
  const [guesses, setGuesses] = useState<string[]>(saved ?? [])
  const [current, setCurrent] = useState('')
  const [revealCount, setRevealCount] = useState(5) // tiles shown in newest row
  const [shakeRow, setShakeRow] = useState(false)

  const won = guesses.includes(answer)
  const finished = won || guesses.length >= 6
  const fullyRevealed = revealCount >= 5

  useEffect(() => {
    if (fullyRevealed) return
    const t = setTimeout(() => setRevealCount((c) => c + 1), 230)
    return () => clearTimeout(t)
  }, [revealCount, fullyRevealed])

  useEffect(() => {
    if (fullyRevealed && won) bigPop()
  }, [fullyRevealed, won])

  const submit = () => {
    if (finished || !fullyRevealed) return
    if (current.length < 5) {
      setShakeRow(true)
      setTimeout(() => setShakeRow(false), 450)
      return
    }
    const next = [...guesses, current]
    setGuesses(next)
    onSave(next)
    setCurrent('')
    setRevealCount(0)
  }

  // keyboard coloring — only from fully revealed rows
  const settled = fullyRevealed ? guesses : guesses.slice(0, -1)
  const keyStates: Record<string, KeyState | undefined> = {}
  const rank = { miss: 0, near: 1, hit: 2 }
  for (const g of settled) {
    const marks = evaluate(g, answer)
    for (let i = 0; i < 5; i++) {
      const prev = keyStates[g[i]]
      if (!prev || rank[marks[i]] > rank[prev]) keyStates[g[i]] = marks[i]
    }
  }

  return (
    <div className="game">
      <h2 className="g-title">birdle 🐦</h2>
      <p className="g-sub">{WORDLE.subtitle}</p>
      <div className="w-board">
        {Array.from({ length: 6 }, (_, r) => {
          const committed = r < guesses.length
          const isLast = r === guesses.length - 1
          const word = committed ? guesses[r] : r === guesses.length ? current : ''
          const marks = committed ? evaluate(guesses[r], answer) : null
          return (
            <div key={r} className={'w-row' + (shakeRow && r === guesses.length ? ' shake-row' : '')}>
              {Array.from({ length: 5 }, (_, c) => {
                const ch = word[c] ?? ''
                const show = committed && (!isLast || c < revealCount)
                const cls =
                  'w-tile' +
                  (ch ? ' filled' : '') +
                  (show && marks ? ' ' + marks[c] + ' pop' : '')
                return (
                  <div key={c} className={cls}>
                    {ch}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      {finished && fullyRevealed ? (
        <div className="g-banner">
          {won ? (
            <p>
              🌸 <strong>{answer}</strong> — california's state flower. nailed it.
            </p>
          ) : (
            <p>
              it was <strong>{answer}</strong> — the state flower! consider it learned 🧡
            </p>
          )}
          <button className="btn" onClick={onComplete}>
            open your postcard 💌
          </button>
        </div>
      ) : (
        <Keyboard
          onChar={(c) => {
            if (!finished && fullyRevealed && current.length < 5) setCurrent(current + c)
          }}
          onEnter={submit}
          onBack={() => setCurrent(current.slice(0, -1))}
          states={keyStates}
        />
      )}
    </div>
  )
}
