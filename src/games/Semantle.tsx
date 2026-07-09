import { useState } from 'react'
import { ANSWER, HINTS, REVEAL_AT, SEED, scoreGuess, tierLabel } from './semantleData'
import type { SemGuess } from '../lib/storage'
import { bigPop } from '../lib/confetti'
import { TRIP } from '../content'

export default function Semantle({
  saved,
  onSave,
  onComplete,
}: {
  saved: SemGuess[] | undefined
  onSave: (g: SemGuess[]) => void
  onComplete: () => void
}) {
  const [guesses, setGuesses] = useState<SemGuess[]>(saved ?? [SEED])
  const [input, setInput] = useState('')
  const [latest, setLatest] = useState<(SemGuess & { quip?: string }) | null>(null)
  const [dupe, setDupe] = useState<string | null>(null)
  const [gaveUp, setGaveUp] = useState(false)

  const won = guesses.some((g) => g.score >= 100)
  const finished = won || gaveUp
  const best = guesses.reduce((m, g) => Math.max(m, g.score), 0)
  const tries = guesses.length - 1 // seed doesn't count

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const w = input.trim().toLowerCase().replace(/[^a-z]/g, '')
    setInput('')
    if (!w || finished) return
    if (guesses.some((g) => g.word === w)) {
      setDupe(w)
      setTimeout(() => setDupe(null), 1600)
      return
    }
    setDupe(null)
    const { score, quip } = scoreGuess(w)
    const g = { word: w, score }
    const next = [...guesses, g]
    setGuesses(next)
    onSave(next)
    setLatest({ ...g, quip })
    if (score >= 100) bigPop()
  }

  const shownHints = HINTS.filter((h) => tries >= h.at)
  const sorted = [...guesses].sort((a, b) => b.score - a.score).slice(0, 10)

  return (
    <div className="game">
      <h2 className="g-title">unfog the word 🌫️</h2>
      <p className="g-sub">
        guess the secret word — scores measure closeness in <em>meaning</em>, not spelling.{' '}
        {TRIP.me} spent your free guess on “{SEED.word}” ({SEED.score}/100, brrr).
      </p>

      {finished ? (
        <div className="g-banner">
          {won ? (
            <p>
              🌉 <strong>{ANSWER.toUpperCase()}</strong> — the gate, the state, the hour, the retriever.
              got it in {tries} guesses!
            </p>
          ) : (
            <p>
              it was <strong>{ANSWER.toUpperCase()}</strong> — the gate, the state, the hour, the
              retriever. karl fought hard today 🌫️
            </p>
          )}
          <button className="btn" onClick={onComplete}>
            open your postcard 💌
          </button>
        </div>
      ) : (
        <>
          <form className="sem-form" onSubmit={submit}>
            <input
              className="sem-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="one word…"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="go"
            />
            <button className="btn sem-go" type="submit">
              guess
            </button>
          </form>
          {dupe && <p className="sem-dupe">you already tried “{dupe}” — karl remembers everything</p>}
          {latest && (
            <div className="sem-latest">
              <span className="sem-word">{latest.word}</span>
              <span className="sem-score">{latest.score}</span>
              <span className="sem-tier">{tierLabel(latest.score)}</span>
              {latest.quip && <span className="sem-quip">{latest.quip}</span>}
            </div>
          )}
          {shownHints.map((h) => (
            <p className="sem-hint" key={h.at}>
              {h.text}
            </p>
          ))}
          <div className="sem-bar">
            <div style={{ width: `${best}%` }} />
            <span className="sem-bar-tulip" style={{ left: `${best}%` }}>
              🌷
            </span>
          </div>
          <p className="sem-count">
            {tries} {tries === 1 ? 'guess' : 'guesses'} · best so far: {best}/100
          </p>
          <ul className="sem-list">
            {sorted.map((g) => (
              <li key={g.word} className={'sem-row' + (g.score === best ? ' best' : '')}>
                <span>{g.word}</span>
                <i style={{ width: `${g.score}%` }} />
                <b>{g.score}</b>
              </li>
            ))}
          </ul>
          {tries >= REVEAL_AT && (
            <button className="link-btn" onClick={() => setGaveUp(true)}>
              i surrender to karl 🏳️
            </button>
          )}
        </>
      )}
    </div>
  )
}
