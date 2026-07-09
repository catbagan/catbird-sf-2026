import { useState } from 'react'
import { DAYS } from '../content'
import type { DayProgress } from '../lib/storage'
import { weekdayShort } from '../lib/dates'
import { ScratchGate, FogGate } from '../gates/ScratchGate'
import ShakeGate from '../gates/ShakeGate'
import PetGate from '../gates/PetGate'
import ZipGate from '../gates/ZipGate'
import Crossword from '../games/Crossword'
import Wordle from '../games/Wordle'
import Semantle from '../games/Semantle'
import Playlist from '../games/Playlist'
import BoardingPass from '../games/BoardingPass'
import Postcard from './Postcard'

type Phase = 'gate' | 'game' | 'postcard'

export default function DayView({
  index,
  progress,
  update,
  onHome,
}: {
  index: number
  progress: DayProgress
  update: (patch: Partial<DayProgress>) => void
  onHome: () => void
}) {
  const day = DAYS[index]
  const [phase, setPhase] = useState<Phase>(
    progress.completed ? 'postcard' : progress.opened ? 'game' : 'gate'
  )

  const openGate = () => {
    update({ opened: true })
    setPhase('game')
  }
  const finishGame = () => {
    update({ completed: true })
    setPhase('postcard')
  }

  const gate = {
    scratch: <ScratchGate onOpen={openGate} />,
    shake: <ShakeGate onOpen={openGate} />,
    fog: <FogGate onOpen={openGate} />,
    pet: <PetGate onOpen={openGate} />,
    zip: <ZipGate onOpen={openGate} />,
  }[day.gate]

  const game = (() => {
    switch (day.game) {
      case 'crossword':
        return (
          <Crossword saved={progress.cross} onSave={(cross) => update({ cross })} onComplete={finishGame} />
        )
      case 'wordle':
        return (
          <Wordle saved={progress.wordle} onSave={(wordle) => update({ wordle })} onComplete={finishGame} />
        )
      case 'semantle':
        return (
          <Semantle
            saved={progress.semantle}
            onSave={(semantle) => update({ semantle })}
            onComplete={finishGame}
          />
        )
      case 'playlist':
        return <Playlist onComplete={finishGame} />
      case 'pass':
        return <BoardingPass onComplete={finishGame} />
    }
  })()

  return (
    <div className="dayview screen">
      <header className="day-top">
        <button className="back-btn" onClick={onHome}>
          ‹ calendar
        </button>
        <span className="day-crumb">
          day {index + 1} · {weekdayShort(day.date)} {day.emoji}
        </span>
        <span className="day-dots">
          {(['gate', 'game', 'postcard'] as Phase[]).map((p) => (
            <i key={p} className={phase === p ? 'on' : ''} />
          ))}
        </span>
      </header>
      <div className="phase-in" key={phase}>
        {phase === 'gate' && gate}
        {phase === 'game' && game}
        {phase === 'postcard' && (
          <>
            <Postcard index={index} onHome={onHome} />
            <button className="link-btn center" onClick={() => setPhase('game')}>
              revisit the puzzle 🧩
            </button>
          </>
        )}
      </div>
    </div>
  )
}
