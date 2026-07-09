import { useMemo, useState } from 'react'
import Keyboard from '../components/Keyboard'
import { CROSSWORD } from '../content'
import { bigPop } from '../lib/confetti'

const N = 5

type Slot = { num: number; dir: 'A' | 'D'; cells: number[]; clue: string }

function buildSlots(sol: string[], acrossClues: string[], downClues: string[]): Slot[] {
  const black = (r: number, c: number) => r < 0 || c < 0 || r >= N || c >= N || sol[r][c] === '#'
  let num = 0
  const across: Slot[] = []
  const down: Slot[] = []
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (black(r, c)) continue
      const startsA = black(r, c - 1) && !black(r, c + 1)
      const startsD = black(r - 1, c) && !black(r + 1, c)
      if (startsA || startsD) num++
      if (startsA) {
        const cells: number[] = []
        let cc = c
        while (!black(r, cc)) {
          cells.push(r * N + cc)
          cc++
        }
        across.push({ num, dir: 'A', cells, clue: '' })
      }
      if (startsD) {
        const cells: number[] = []
        let rr = r
        while (!black(rr, c)) {
          cells.push(rr * N + c)
          rr++
        }
        down.push({ num, dir: 'D', cells, clue: '' })
      }
    }
  }
  across.forEach((s, i) => (s.clue = acrossClues[i] ?? ''))
  down.forEach((s, i) => (s.clue = downClues[i] ?? ''))
  return [...across, ...down]
}

export default function Crossword({
  saved,
  onSave,
  onComplete,
}: {
  saved: string[] | undefined
  onSave: (rows: string[]) => void
  onComplete: () => void
}) {
  const sol = CROSSWORD.solution
  const isBlack = (i: number) => sol[Math.floor(i / N)][i % N] === '#'
  const solAt = (i: number) => sol[Math.floor(i / N)][i % N]

  const slots = useMemo(() => buildSlots(sol, CROSSWORD.across, CROSSWORD.down), [sol])
  const numAt = useMemo(() => {
    const m: Record<number, number> = {}
    for (const s of slots) if (!(s.cells[0] in m)) m[s.cells[0]] = s.num
    return m
  }, [slots])

  const [letters, setLetters] = useState<string[]>(() =>
    saved && saved.length === N ? saved.join('').split('') : Array(N * N).fill(' ')
  )
  const [active, setActive] = useState(slots[0].cells[0])
  const [dir, setDir] = useState<'A' | 'D'>('A')
  const [wrong, setWrong] = useState<Set<number>>(new Set())
  const [checks, setChecks] = useState(0)
  const [done, setDone] = useState(() => {
    if (!saved || saved.length !== N) return false
    const flat = saved.join('')
    if (flat.length !== N * N) return false
    return flat
      .split('')
      .every((ch, i) => sol[Math.floor(i / N)][i % N] === '#' || ch === sol[Math.floor(i / N)][i % N])
  })
  const [revealed, setRevealed] = useState(false)

  const slotAt = (cell: number, d: 'A' | 'D') => slots.find((s) => s.dir === d && s.cells.includes(cell))
  const current = slotAt(active, dir) ?? slotAt(active, dir === 'A' ? 'D' : 'A')!
  const ordered = slots

  const commit = (next: string[]) => {
    setLetters(next)
    const rows = Array.from({ length: N }, (_, r) => next.slice(r * N, r * N + N).join(''))
    onSave(rows)
    const full = next.every((ch, i) => isBlack(i) || ch !== ' ')
    if (full) {
      const correct = next.every((ch, i) => isBlack(i) || ch === solAt(i))
      if (correct && !done) {
        setDone(true)
        bigPop()
      }
    }
  }

  const tapCell = (i: number) => {
    if (isBlack(i) || done) return
    if (i === active) {
      const other = dir === 'A' ? 'D' : 'A'
      if (slotAt(i, other)) setDir(other)
    } else {
      setActive(i)
      if (!slotAt(i, dir)) setDir(dir === 'A' ? 'D' : 'A')
    }
  }

  const onChar = (c: string) => {
    if (done) return
    const next = [...letters]
    next[active] = c
    setWrong(new Set())
    commit(next)
    const idx = current.cells.indexOf(active)
    if (idx >= 0 && idx < current.cells.length - 1) setActive(current.cells[idx + 1])
  }

  const onBack = () => {
    if (done) return
    const next = [...letters]
    if (next[active] !== ' ') {
      next[active] = ' '
      commit(next)
    } else {
      const idx = current.cells.indexOf(active)
      if (idx > 0) {
        const prev = current.cells[idx - 1]
        next[prev] = ' '
        setActive(prev)
        commit(next)
      }
    }
    setWrong(new Set())
  }

  const check = () => {
    const bad = new Set<number>()
    letters.forEach((ch, i) => {
      if (!isBlack(i) && ch !== ' ' && ch !== solAt(i)) bad.add(i)
    })
    setWrong(bad)
    setChecks(checks + 1)
  }

  const reveal = () => {
    const next = sol.join('').split('').map((ch) => (ch === '#' ? ' ' : ch))
    setRevealed(true)
    commit(next)
  }

  const cycle = (delta: number) => {
    const i = ordered.indexOf(current)
    const nxt = ordered[(i + delta + ordered.length) % ordered.length]
    setDir(nxt.dir)
    setActive(nxt.cells.find((c) => letters[c] === ' ') ?? nxt.cells[0])
  }

  return (
    <div className="game">
      <h2 className="g-title">the tiny sf crossword 🧩</h2>
      {!done && <p className="g-sub">tap a square twice to switch direction</p>}
      <div className={'cw-grid' + (done ? ' locked' : '')}>
        {Array.from({ length: N * N }, (_, i) => {
          if (isBlack(i))
            return (
              <div key={i} className="cw-cell black">
                <span className="cw-dot">✿</span>
              </div>
            )
          const inWord = current.cells.includes(i)
          const cls =
            'cw-cell' +
            (i === active && !done ? ' active' : '') +
            (inWord && !done ? ' word' : '') +
            (wrong.has(i) ? ' wrong' : '')
          return (
            <div key={i} className={cls} onClick={() => tapCell(i)}>
              {numAt[i] != null && <span className="cw-num">{numAt[i]}</span>}
              {letters[i] !== ' ' && letters[i]}
            </div>
          )
        })}
      </div>
      {done ? (
        <div className="g-banner">
          <p>
            {revealed ? 'revealed 🤫 our secret. ' : '🎉 solved!! '}
            welcome to ocean beach, where the hills are steep and the pets are famous.
          </p>
          <button className="btn" onClick={onComplete}>
            open your postcard 💌
          </button>
        </div>
      ) : (
        <>
          <div className="cw-cluebar">
            <button className="cw-nav" onClick={() => cycle(-1)}>
              ‹
            </button>
            <span>
              <b>
                {current.num}
                {current.dir}
              </b>{' '}
              {current.clue}
            </span>
            <button className="cw-nav" onClick={() => cycle(1)}>
              ›
            </button>
          </div>
          <Keyboard onChar={onChar} onBack={onBack} showEnter={false} />
          <div className="cw-actions">
            <button className="link-btn" onClick={check}>
              check my letters
            </button>
            {checks >= 2 && (
              <button className="link-btn" onClick={reveal}>
                just show me 🙈
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
