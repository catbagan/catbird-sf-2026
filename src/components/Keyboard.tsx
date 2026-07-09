const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

export type KeyState = 'hit' | 'near' | 'miss'

export default function Keyboard({
  onChar,
  onEnter,
  onBack,
  states = {},
  showEnter = true,
}: {
  onChar: (c: string) => void
  onEnter?: () => void
  onBack: () => void
  states?: Record<string, KeyState | undefined>
  showEnter?: boolean
}) {
  return (
    <div className="kb">
      {ROWS.map((row, ri) => (
        <div className="kb-row" key={ri}>
          {ri === 2 && showEnter && (
            <button
              className="kb-key kb-wide"
              onPointerDown={(e) => {
                e.preventDefault()
                onEnter?.()
              }}
            >
              go!
            </button>
          )}
          {row.split('').map((ch) => (
            <button
              key={ch}
              className={'kb-key ' + (states[ch] ?? '')}
              onPointerDown={(e) => {
                e.preventDefault()
                onChar(ch)
              }}
            >
              {ch}
            </button>
          ))}
          {ri === 2 && (
            <button
              className="kb-key kb-wide"
              onPointerDown={(e) => {
                e.preventDefault()
                onBack()
              }}
            >
              ⌫
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
