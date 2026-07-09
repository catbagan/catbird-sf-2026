import { useState } from 'react'
import Home from './components/Home'
import DayView from './components/DayView'
import { loadProgress, saveProgress, DayProgress } from './lib/storage'

export default function App() {
  const [dayOpen, setDayOpen] = useState<number | null>(null)
  const [progress, setProgress] = useState<DayProgress[]>(loadProgress)

  const update = (i: number, patch: Partial<DayProgress>) =>
    setProgress((prev) => {
      const next = prev.map((d, j) => (j === i ? { ...d, ...patch } : d))
      saveProgress(next)
      return next
    })

  return dayOpen === null ? (
    <Home progress={progress} onOpenDay={setDayOpen} />
  ) : (
    <DayView
      index={dayOpen}
      progress={progress[dayOpen]}
      update={(patch) => update(dayOpen, patch)}
      onHome={() => setDayOpen(null)}
    />
  )
}
