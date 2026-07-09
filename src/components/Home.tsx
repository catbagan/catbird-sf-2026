import { useEffect, useState } from 'react'
import { DAYS, TRIP } from '../content'
import { isUnlocked, isToday, weekdayShort, longLabel } from '../lib/dates'
import type { DayProgress } from '../lib/storage'
import { MaxCat, Stinky, Tulip, BridgeArt } from './Sprites'

export const PREVIEW = new URLSearchParams(location.search).has('preview')

const pad = (n: number) => String(n).padStart(2, '0')

function Countdown() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const ms = new Date(TRIP.departISO).getTime() - now.getTime()
  if (ms <= 0)
    return <div className="count-pill">🛫 wheels up!! welcome to california, {TRIP.her}</div>
  const d = Math.floor(ms / 86400000)
  const h = Math.floor(ms / 3600000) % 24
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return (
    <div className="count-pill">
      ✈️ t-minus {d}d {pad(h)}:{pad(m)}:{pad(s)} to takeoff
    </div>
  )
}

export default function Home({
  progress,
  onOpenDay,
}: {
  progress: DayProgress[]
  onOpenDay: (i: number) => void
}) {
  const [toast, setToast] = useState<string | null>(null)
  const [wiggle, setWiggle] = useState<number | null>(null)
  const [stinkyRun, setStinkyRun] = useState(false)

  useEffect(() => {
    let hide: number | undefined
    const t = window.setInterval(() => {
      setStinkyRun(true)
      hide = window.setTimeout(() => setStinkyRun(false), 5200)
    }, 13000)
    return () => {
      clearInterval(t)
      if (hide) clearTimeout(hide)
    }
  }, [])

  const nope = (i: number) => {
    setWiggle(i)
    setTimeout(() => setWiggle(null), 600)
    setToast(`not yet!! opens ${weekdayShort(DAYS[i].date)} — no peeking 🫣`)
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <div className="home screen">
      {PREVIEW && <div className="preview-banner">preview mode — every door is open, daniel 🤫</div>}
      <header className="home-head">
        <p className="kicker">a five-day countdown for {TRIP.her}</p>
        <h1 className="title">
          birdie <span className="amp">✕</span> san francisco
        </h1>
        <BridgeArt className="head-bridge" />
        <Countdown />
      </header>

      <main className="doors">
        {DAYS.map((day, i) => {
          const p = progress[i]
          const unlocked = PREVIEW || isUnlocked(day.date)
          const state = p.completed ? 'done' : !unlocked ? 'locked' : p.opened ? 'started' : 'ready'
          return (
            <button
              key={day.date}
              className={
                `door ${state}` + (wiggle === i ? ' wiggling' : '') + (i === 4 ? ' grand' : '')
              }
              onClick={() => (unlocked ? onOpenDay(i) : nope(i))}
            >
              <span className="door-num">{i + 1}</span>
              <span className="door-info">
                <span className="door-date">
                  {longLabel(day.date)}
                  {isToday(day.date) && <em className="today-badge">today 🧡</em>}
                </span>
                <span className="door-teaser">{state === 'locked' ? '· · · · ·' : day.teaser}</span>
                <span className="door-state">
                  {state === 'locked'
                    ? `🔒 opens ${weekdayShort(day.date)}`
                    : state === 'done'
                      ? '✓ opened — visit again'
                      : state === 'started'
                        ? '▶ keep going!'
                        : '✨ open me!'}
                </span>
              </span>
              <span className="door-emoji">{state === 'locked' ? '🔒' : day.emoji}</span>
              {i === 3 && !p.opened && (
                <span className="door-max">
                  <MaxCat mood="sleep" />
                  <i className="zzz">z z z</i>
                </span>
              )}
            </button>
          )
        })}
      </main>

      <footer className="home-foot">
        <div className="tulip-row">
          <Tulip color="#F472B6" />
          <Tulip color="#FB923C" />
          <Tulip color="#F9A8D4" />
          <Tulip color="#F97316" />
          <Tulip color="#F472B6" />
        </div>
        <p className="credit">made with 🧡 by {TRIP.me} · for {TRIP.her}</p>
      </footer>

      {stinkyRun && (
        <div className="stinky-run">
          <Stinky />
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
