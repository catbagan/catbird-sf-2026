import { useRef, useState } from 'react'
import { MaxCat } from '../components/Sprites'
import { heartPop } from '../lib/confetti'

const NEEDED = 420 // px of petting — about three good strokes

type Heart = { id: number; x: number; y: number; e: string }

export default function PetGate({ onOpen }: { onOpen: () => void }) {
  const [dist, setDist] = useState(0)
  const [hearts, setHearts] = useState<Heart[]>([])
  const distRef = useRef(0)
  const lastX = useRef<number | null>(null)
  const sinceHeart = useRef(0)
  const idc = useRef(0)
  const popped = useRef(false)

  const done = dist >= NEEDED

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (lastX.current == null || distRef.current >= NEEDED) return
    const dx = Math.abs(e.clientX - lastX.current)
    lastX.current = e.clientX
    distRef.current = Math.min(NEEDED, distRef.current + dx)
    sinceHeart.current += dx
    setDist(distRef.current)
    if (sinceHeart.current > 80) {
      sinceHeart.current = 0
      const rect = e.currentTarget.getBoundingClientRect()
      const h: Heart = {
        id: idc.current++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        e: ['🧡', '💛', '✨', '🎀'][idc.current % 4],
      }
      setHearts((hs) => [...hs.slice(-7), h])
    }
    if (distRef.current >= NEEDED && !popped.current) {
      popped.current = true
      heartPop()
    }
  }

  return (
    <div className="gate">
      <p className="gate-hint">
        {done ? 'MRRP!! okay okay, he\'s moving 🐾' : 'max fell asleep on your present. pet him until he moves.'}
      </p>
      <div
        className={'max-stage ' + (done ? 'max-done' : '')}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          lastX.current = e.clientX
        }}
        onPointerMove={onMove}
        onPointerUp={() => (lastX.current = null)}
        onPointerCancel={() => (lastX.current = null)}
      >
        <span className="max-gift">🎁</span>
        <div className={'max-wrap ' + (done ? 'hop-off' : '')}>
          <MaxCat mood={done ? 'happy' : 'sleep'} />
          {!done && <i className="zzz">z z z</i>}
        </div>
        {hearts.map((h) => (
          <span key={h.id} className="heart-float" style={{ left: h.x, top: h.y }}>
            {h.e}
          </span>
        ))}
      </div>
      <div className="purr-meter">
        <div style={{ width: `${(dist / NEEDED) * 100}%` }} />
      </div>
      <p className="purr-label">{done ? 'purr level: MAXIMUM' : `purr-o-meter ${'r'.repeat(Math.floor((dist / NEEDED) * 8))}`}</p>
      {done ? (
        <button className="btn" onClick={onOpen}>
          see what he was napping on →
        </button>
      ) : (
        <p className="gate-sub">long, slow strokes. back only. he has rules.</p>
      )}
    </div>
  )
}
