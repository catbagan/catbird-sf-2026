import { useState } from 'react'
import { DAYS, TRIP } from '../content'
import { BridgeArt, Tulip } from './Sprites'

export default function Postcard({ index, onHome }: { index: number; onHome: () => void }) {
  const day = DAYS[index]
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="pc-scene">
      <p className="gate-hint">{flipped ? '🧡' : 'a postcard slid out — tap it over'}</p>
      <div className={'postcard' + (flipped ? ' flipped' : '')} onClick={() => setFlipped((f) => !f)}>
        <div className="pc-inner">
          <div className="pc-face pc-front">
            <div className="pc-banner">greetings from</div>
            <div className="pc-city">san francisco</div>
            <BridgeArt />
            <div className="pc-day">postcard № {index + 1} of 5</div>
          </div>
          <div className="pc-face pc-back">
            <div className="pc-left">
              <p className="pc-note">{day.note}</p>
              <p className="pc-sign">xo, {TRIP.me}</p>
              <p className="pc-ps">p.s. {day.ps}</p>
            </div>
            <div className="pc-right">
              <div className="pc-stamp">
                <Tulip color={index % 2 ? '#FB923C' : '#F472B6'} />
              </div>
              <div className="pc-postmark">sfo · jul 2026</div>
              <div className="pc-to">
                to: {TRIP.her} 🐦
                <br />
                the window seat
                <br />
                next to {TRIP.me}
              </div>
            </div>
            <div className="pc-fact">
              <strong>sf lore № {index + 1}:</strong> {day.fact}
            </div>
          </div>
        </div>
      </div>
      <button className="btn secondary" onClick={onHome}>
        back to the calendar 🌷
      </button>
    </div>
  )
}
