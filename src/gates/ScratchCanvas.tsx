import { useEffect, useRef } from 'react'

type Props = {
  paint: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
  brush?: number
  threshold?: number
  onCleared: () => void
}

/** canvas overlay you rub away with a finger (scratch ticket, fog, …) */
export default function ScratchCanvas({ paint, brush = 26, threshold = 0.55, onCleared }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cleared = useRef(false)
  const last = useRef<{ x: number; y: number } | null>(null)
  const moves = useRef(0)

  useEffect(() => {
    const cv = canvasRef.current!
    const parent = cv.parentElement!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = parent.clientWidth
    const h = parent.clientHeight
    cv.width = w * dpr
    cv.height = h * dpr
    cv.style.width = w + 'px'
    cv.style.height = h + 'px'
    const ctx = cv.getContext('2d')!
    ctx.scale(dpr, dpr)
    paint(ctx, w, h)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const scratchTo = (p: { x: number; y: number }) => {
    const ctx = canvasRef.current!.getContext('2d')!
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = brush * 2
    ctx.beginPath()
    const from = last.current ?? { x: p.x + 0.1, y: p.y + 0.1 }
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    last.current = p
  }

  const checkProgress = () => {
    if (cleared.current) return
    const cv = canvasRef.current!
    const ctx = cv.getContext('2d')!
    const data = ctx.getImageData(0, 0, cv.width, cv.height).data
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 64) {
      total++
      if (data[i] < 16) clear++
    }
    if (clear / total >= threshold) {
      cleared.current = true
      cv.classList.add('is-cleared')
      setTimeout(onCleared, 550)
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className="scratch-canvas"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        last.current = null
        scratchTo(pos(e))
      }}
      onPointerMove={(e) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
        scratchTo(pos(e))
        if (++moves.current % 14 === 0) checkProgress()
      }}
      onPointerUp={() => {
        last.current = null
        checkProgress()
      }}
      onPointerCancel={() => {
        last.current = null
      }}
    />
  )
}
