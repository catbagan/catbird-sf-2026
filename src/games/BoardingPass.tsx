import { useEffect, useRef, useState } from 'react'
import { PASS, TRIP } from '../content'
import { bigPop } from '../lib/confetti'

export default function BoardingPass({ onComplete }: { onComplete: () => void }) {
  const [images, setImages] = useState<string[] | null>(null) // null = probing
  const popped = useRef(false)

  useEffect(() => {
    let alive = true
    Promise.all(
      PASS.images.map(
        (src) =>
          new Promise<string | null>((resolve) => {
            const img = new Image()
            img.onload = () => resolve(src)
            img.onerror = () => resolve(null)
            img.src = src
          })
      )
    ).then((results) => {
      if (alive) setImages(results.filter((r): r is string => !!r))
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (images && images.length > 0 && !popped.current) {
      popped.current = true
      bigPop()
    }
  }, [images])

  if (images === null) return <div className="game" />

  return (
    <div className="game">
      <div className="plane-fly">✈️</div>
      {images.length > 0 ? (
        <>
          <h2 className="g-title">WE'RE GOING!! 🎉</h2>
          <p className="g-sub">{TRIP.flightLabel}</p>
          <div className="pass-imgs">
            {images.map((src, i) => (
              <img key={src} src={src} alt={`boarding pass ${i + 1}`} className="pass-img" />
            ))}
          </div>
          <p className="pass-msg">{PASS.message}</p>
        </>
      ) : (
        <>
          <h2 className="g-title">almost… 🛄</h2>
          <p className="pass-placeholder">{PASS.placeholder}</p>
          <p className="g-sub">{TRIP.flightLabel}</p>
        </>
      )}
      <button className="btn" onClick={onComplete}>
        one more thing… 💌
      </button>
    </div>
  )
}
