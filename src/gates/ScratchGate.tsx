import ScratchCanvas from './ScratchCanvas'
import { pop } from '../lib/confetti'

function sparkle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath()
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i
    const rr = i % 2 ? r : r * 2.4
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr)
  }
  ctx.closePath()
  ctx.fill()
}

function paintTicket(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, '#FDBA74')
  g.addColorStop(0.5, '#F97316')
  g.addColorStop(1, '#FB923C')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(255,255,255,.55)'
  const pts: [number, number][] = [
    [0.12, 0.2], [0.85, 0.14], [0.5, 0.09], [0.2, 0.78], [0.9, 0.62], [0.66, 0.88], [0.33, 0.42], [0.78, 0.36],
  ]
  for (const [px, py] of pts) sparkle(ctx, px * w, py * h, 4)
  ctx.strokeStyle = 'rgba(255,255,255,.8)'
  ctx.setLineDash([8, 7])
  ctx.lineWidth = 3
  ctx.strokeRect(10, 10, w - 20, h - 20)
  ctx.setLineDash([])
  ctx.fillStyle = '#7C2D12'
  ctx.textAlign = 'center'
  ctx.font = '800 21px Nunito, sans-serif'
  ctx.fillText('🎟️ golden ticket 🎟️', w / 2, h / 2 - 12)
  ctx.font = '700 15px Nunito, sans-serif'
  ctx.fillText('scratch me with your finger', w / 2, h / 2 + 16)
}

export function ScratchGate({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="gate">
      <p className="gate-hint">day one arrived with a lottery ticket 👀</p>
      <div className="gate-stage">
        <div className="gate-under">
          <span className="gate-under-emoji">🧩</span>
          <strong>a tiny crossword!</strong>
          <span>sf-themed · 5×5 · no pressure</span>
        </div>
        <ScratchCanvas
          paint={paintTicket}
          onCleared={() => {
            pop()
            setTimeout(onOpen, 900)
          }}
        />
      </div>
      <p className="gate-sub">rub the whole thing — you might win big</p>
    </div>
  )
}

function paintFog(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#E9E5DE'
  ctx.fillRect(0, 0, w, h)
  const blobs: [number, number, number, number][] = [
    [0.2, 0.3, 0.5, 0.5], [0.7, 0.2, 0.55, 0.45], [0.5, 0.7, 0.6, 0.5],
    [0.9, 0.8, 0.5, 0.4], [0.1, 0.85, 0.45, 0.45], [0.45, 0.45, 0.7, 0.35],
  ]
  for (const [px, py, pr, o] of blobs) {
    const r = pr * Math.max(w, h)
    const g = ctx.createRadialGradient(px * w, py * h, 8, px * w, py * h, r)
    g.addColorStop(0, `rgba(255,255,255,${o + 0.35})`)
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(px * w, py * h, r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.fillStyle = '#8A8478'
  ctx.textAlign = 'center'
  ctx.font = '800 20px Nunito, sans-serif'
  ctx.fillText('karl the fog rolled in 🌫️', w / 2, h / 2 - 12)
  ctx.font = '700 15px Nunito, sans-serif'
  ctx.fillText('wipe him away (he understands)', w / 2, h / 2 + 16)
}

export function FogGate({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="gate">
      <p className="gate-hint">day three is out there… somewhere 🌁</p>
      <div className="gate-stage">
        <div className="gate-under">
          <span className="gate-under-emoji">☀️</span>
          <strong>the fog lifted!</strong>
          <span>a secret word was hiding in there</span>
        </div>
        <ScratchCanvas
          paint={paintFog}
          brush={34}
          threshold={0.5}
          onCleared={() => {
            pop()
            setTimeout(onOpen, 900)
          }}
        />
      </div>
      <p className="gate-sub">karl always comes back. it's fine.</p>
    </div>
  )
}
