import { useEffect, useRef, useState } from 'react'
import { PLAYLIST } from '../content'

function embedUrl(url: string): string | null {
  const m = url.match(/open\.spotify\.com\/(playlist|album|track)\/([A-Za-z0-9]+)/)
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}` : null
}

export default function Playlist({ onComplete }: { onComplete: () => void }) {
  const [hasSong, setHasSong] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let alive = true
    fetch(PLAYLIST.songFile, { method: 'HEAD' })
      .then((r) => {
        const type = r.headers.get('content-type') || ''
        if (!alive || !r.ok || type.includes('text/html')) return
        setHasSong(true)
        const a = new Audio(PLAYLIST.songFile)
        a.loop = false
        audioRef.current = a
        // try to autoplay (the petting gesture usually unlocks audio on ios) —
        // if safari says no, the big play button is right there
        a.play()
          .then(() => setPlaying(true))
          .catch(() => {})
        a.addEventListener('ended', () => setPlaying(false))
      })
      .catch(() => {})
    return () => {
      alive = false
      audioRef.current?.pause()
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  const linkReady = !PLAYLIST.url.includes('PASTE')
  const embed = linkReady ? embedUrl(PLAYLIST.url) : null

  return (
    <div className="game">
      <h2 className="g-title">a mix for the plane 🎧</h2>
      <p className="g-sub">max was keeping it warm for you</p>

      <div className="vinyl-stage" onClick={hasSong ? toggle : undefined}>
        <div className={'vinyl' + (playing ? ' spinning' : '')}>
          <div className="vinyl-label">
            b's
            <br />
            mix
          </div>
        </div>
        {hasSong && <div className="vinyl-btn">{playing ? '❚❚' : '▶'}</div>}
      </div>
      {hasSong ? (
        <p className="pl-caption">
          now spinning: <strong>{PLAYLIST.songLabel}</strong>
        </p>
      ) : (
        <p className="pl-caption">first track loading soon — daniel is still agonizing over the order 🫣</p>
      )}

      {embed && (
        <iframe
          className="spotify-embed"
          src={embed}
          title="the playlist"
          allow="encrypted-media"
          loading="lazy"
        />
      )}
      {linkReady && (
        <a className="btn secondary" href={PLAYLIST.url} target="_blank" rel="noreferrer">
          open the whole playlist ↗
        </a>
      )}

      <button className="btn" onClick={onComplete}>
        open your postcard 💌
      </button>
    </div>
  )
}
