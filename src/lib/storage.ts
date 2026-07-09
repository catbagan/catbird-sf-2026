export type SemGuess = { word: string; score: number }

export type DayProgress = {
  opened: boolean
  completed: boolean
  wordle?: string[]
  semantle?: SemGuess[]
  cross?: string[] // 5 row-strings, ' ' = empty cell
}

const KEY = 'catbird-sf-v1'

export function loadProgress(): DayProgress[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const p = JSON.parse(raw)
      if (Array.isArray(p) && p.length === 5) return p
    }
  } catch {
    /* fresh start */
  }
  return Array.from({ length: 5 }, () => ({ opened: false, completed: false }))
}

export function saveProgress(all: DayProgress[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* private mode etc — the show goes on */
  }
}
