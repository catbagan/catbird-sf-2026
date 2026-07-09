import { useRef, useState } from 'react'
import { pop } from '../lib/confetti'

export default function ZipGate({ onOpen }: { onOpen: () => void }) {
  const [prog, setProg] = useState(0)
  const [open, setOpen] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const progRef = useRef(0)

  const setFromClientX = (clientX: number) => {
    if (open) return
    const rect = trackRef.current!.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, (clientX - rect.left - 20) / (rect.width - 40)))
    if (p > progRef.current) {
      progRef.current = p
      setProg(p)
      if (p >= 0.96) {
        setOpen(true)
        pop()
      }
    }
  }

  return (
    <div className="gate">
      <p className="gate-hint">{open ? 'IT\'S OPEN!! 🧳' : 'day five. unzip the suitcase.'}</p>
      <div className={'case ' + (open ? 'case-open' : '')}>
        <div
          className="zip-track"
          ref={trackRef}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            setFromClientX(e.clientX)
          }}
          onPointerMove={(e) => {
            if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
            setFromClientX(e.clientX)
          }}
        >
          <div className="zip-opened" style={{ width: `${prog * 100}%` }} />
          <div className="zip-pull" style={{ left: `calc(${prog * 100}% - ${prog * 40}px)` }}>
            <span />
          </div>
        </div>
        <div className="case-body">
          <span className="sticker s1">🌉</span>
          <span className="sticker s2">🌷</span>
          <span className="sticker s3">⚾</span>
          <span className="sticker s4">🐈</span>
          <span className="case-tag">SFO ✈ or bust</span>
        </div>
        {open && <div className="case-peek">✈️</div>}
      </div>
      {open ? (
        <button className="btn" onClick={onOpen}>
          grab what's inside →
        </button>
      ) : (
        <p className="gate-sub">drag the zipper allllll the way right →</p>
      )}
    </div>
  )
}
