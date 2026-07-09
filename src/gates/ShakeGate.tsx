import { useEffect, useRef, useState } from 'react'
import { pop } from '../lib/confetti'
import { FORTUNE } from '../content'

const NEEDED = 12

function CookieSvg({ progress, open }: { progress: number; open: boolean }) {
  return (
    <svg viewBox="0 0 200 140" className={'cookie ' + (open ? 'cookie-open' : '')}>
      <g className="cookie-half half-l">
        <path
          d="M100 26 Q55 26 30 96 Q68 78 100 104 Z"
          fill="#EBB878"
          stroke="#D19A55"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
      <g className="cookie-half half-r">
        <path
          d="M100 26 Q145 26 170 96 Q132 78 100 104 Z"
          fill="#E3AC66"
          stroke="#D19A55"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
      {!open && (
        <g stroke="#8A5A22" strokeWidth="2.5" fill="none" strokeLinecap="round">
          {progress > 0.25 && <path d="M100 34 l-4 16 5 12" />}
          {progress > 0.55 && <path d="M96 62 l7 12 -3 14" />}
          {progress > 0.8 && <path d="M88 40 l-8 14 M108 44 l6 12" />}
        </g>
      )}
    </svg>
  )
}

export default function ShakeGate({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'shaking' | 'open'>('intro')
  const [units, setUnits] = useState(0)
  const [motionOn, setMotionOn] = useState(false)
  const unitsRef = useRef(0)
  const lastShake = useRef(0)

  const bump = (n: number) => {
    if (unitsRef.current >= NEEDED) return
    unitsRef.current = Math.min(NEEDED, unitsRef.current + n)
    setUnits(unitsRef.current)
    if (unitsRef.current >= NEEDED) {
      setPhase('open')
      pop()
    }
  }

  useEffect(() => {
    if (phase !== 'shaking' || !motionOn) return
    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity
      if (!a || a.x == null || a.y == null || a.z == null) return
      const mag = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z)
      if (Math.abs(mag - 9.81) > 11 && Date.now() - lastShake.current > 260) {
        lastShake.current = Date.now()
        bump(2)
      }
    }
    window.addEventListener('devicemotion', onMotion)
    return () => window.removeEventListener('devicemotion', onMotion)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, motionOn])

  const start = async () => {
    const DME = DeviceMotionEvent as any
    if (typeof DME?.requestPermission === 'function') {
      try {
        const res = await DME.requestPermission()
        setMotionOn(res === 'granted')
      } catch {
        setMotionOn(false)
      }
    } else {
      setMotionOn('DeviceMotionEvent' in window)
    }
    setPhase('shaking')
  }

  const wobble =
    units >= NEEDED ? '' : units > 7 ? 'wobble-3' : units > 3 ? 'wobble-2' : units > 0 ? 'wobble-1' : ''

  return (
    <div className="gate">
      {phase === 'intro' && (
        <>
          <p className="gate-hint">day two came with a cookie from the tea garden 🍵</p>
          <div className="cookie-stage">
            <CookieSvg progress={0} open={false} />
          </div>
          <button className="btn" onClick={start}>
            🥠 crack it open
          </button>
          <p className="gate-sub">(it will ask to feel your shakes — say yes)</p>
        </>
      )}
      {phase === 'shaking' && (
        <>
          <p className="gate-hint">{motionOn ? 'shake your phone!! harder!!' : 'tap the cookie!! fast!!'}</p>
          <div className={'cookie-stage ' + wobble} onPointerDown={() => bump(1)}>
            <CookieSvg progress={units / NEEDED} open={false} />
          </div>
          <div className="crack-meter">
            <div style={{ width: `${(units / NEEDED) * 100}%` }} />
          </div>
          {motionOn && <p className="gate-sub">(tapping works too, if shaking feels silly in public)</p>}
        </>
      )}
      {phase === 'open' && (
        <>
          <p className="gate-hint">CRACK! 🥠</p>
          <div className="cookie-stage">
            <CookieSvg progress={1} open />
          </div>
          <div className="fortune-slip">{FORTUNE}</div>
          <button className="btn" onClick={onOpen}>
            so what's the word →
          </button>
        </>
      )}
    </div>
  )
}
