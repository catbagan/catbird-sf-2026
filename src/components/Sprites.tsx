// hand-drawn friends 🐈 🐇 🌷 🌉

export function MaxCat({ mood = 'sleep', className = '' }: { mood?: 'sleep' | 'happy'; className?: string }) {
  return (
    <svg viewBox="0 0 120 92" className={'max-cat ' + className} aria-label="max the cat">
      {/* tail */}
      <path d="M98 64 q18 2 13 -17" fill="none" stroke="#E07B27" strokeWidth="9" strokeLinecap="round" />
      {/* ears (under head) */}
      <path d="M42 24 l6 -14 9 11 z" fill="#F59E42" />
      <path d="M61 21 l8 -12 6 13 z" fill="#F59E42" />
      <path d="M45.5 22 l3.5 -8 5 6.5 z" fill="#FBCFE8" />
      <path d="M63.5 20 l4.5 -7 3.5 8 z" fill="#FBCFE8" />
      {/* body loaf */}
      <ellipse cx="62" cy="63" rx="42" ry="26" fill="#F59E42" />
      {/* stripes */}
      <path d="M36 46 q5 8 0 16" stroke="#E07B27" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M88 48 q4 7 0 14" stroke="#E07B27" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* head */}
      <circle cx="58" cy="36" r="21" fill="#F59E42" />
      <path d="M46 26 q4 7 0 14 M70 27 q3 6 0 12" stroke="#E07B27" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".7" />
      {/* face */}
      {mood === 'sleep' ? (
        <g stroke="#7C2D12" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d="M46 36 q4 3.5 8 0" />
          <path d="M62 36 q4 3.5 8 0" />
        </g>
      ) : (
        <g stroke="#7C2D12" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d="M46 37 q4 -4 8 0" />
          <path d="M62 37 q4 -4 8 0" />
        </g>
      )}
      <path d="M56 42 l5 0 -2.5 3.4 z" fill="#F472B6" />
      <path d="M58.5 45.4 q-3 3.6 -6.5 2 M58.5 45.4 q3 3.6 6.5 2" stroke="#7C2D12" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* whiskers */}
      <g stroke="#7C2D12" strokeWidth="1.4" opacity=".45" strokeLinecap="round">
        <path d="M38 40 l-12 -2 M38 44 l-11 2" />
        <path d="M78 40 l12 -2 M78 44 l11 2" />
      </g>
      {/* blush */}
      <circle cx="42" cy="43" r="3.4" fill="#F9A8D4" opacity=".65" />
      <circle cx="74" cy="43" r="3.4" fill="#F9A8D4" opacity=".65" />
      {/* front paws */}
      <ellipse cx="48" cy="84" rx="9" ry="5" fill="#F8AE5C" />
      <ellipse cx="70" cy="84" rx="9" ry="5" fill="#F8AE5C" />
    </svg>
  )
}

export function Stinky({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 92" className={'stinky-svg ' + className} aria-label="stinky the rabbit">
      {/* legendary stink */}
      <g className="stink-lines" stroke="#9CB86F" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".7">
        <path d="M16 34 q-4 -6 0 -12 q4 -6 0 -12" />
        <path d="M8 44 q-4 -5 0 -10" />
      </g>
      {/* ears */}
      <path d="M44 28 q-4 -22 8 -25 q7 9 1 27" fill="#C9B29B" />
      <path d="M60 28 q-1 -24 11 -23 q5 10 -4 26" fill="#C9B29B" />
      <path d="M49 25 q-2 -15 5 -18 q3.5 7 0 19" fill="#EED9C9" />
      {/* body */}
      <ellipse cx="57" cy="64" rx="31" ry="22" fill="#D8C3AE" />
      {/* fluff tail */}
      <circle cx="90" cy="66" r="9" fill="#F4E9DD" />
      {/* head */}
      <circle cx="52" cy="42" r="19" fill="#D8C3AE" />
      {/* face */}
      <circle cx="45" cy="40" r="2.3" fill="#2B2018" />
      <circle cx="59" cy="40" r="2.3" fill="#2B2018" />
      <path d="M49.5 46.5 l5.5 0 -2.75 3.4 z" fill="#F472B6" />
      <path d="M52.2 49.8 q-3 3.8 -6.5 2 M52.2 49.8 q3 3.8 6.5 2" stroke="#2B2018" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="47" r="3" fill="#F9A8D4" opacity=".6" />
      <circle cx="64" cy="47" r="3" fill="#F9A8D4" opacity=".6" />
      {/* feet */}
      <ellipse cx="42" cy="84" rx="11" ry="5" fill="#C9B29B" />
      <ellipse cx="68" cy="84" rx="11" ry="5" fill="#C9B29B" />
    </svg>
  )
}

export function Tulip({ color = '#F472B6', className = '' }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 100" className={'tulip ' + className} aria-hidden="true">
      <path d="M30 96 V48" stroke="#5B8C5A" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M30 78 Q10 72 8 54 Q26 60 30 70 Z" fill="#7BA878" />
      <path d="M30 84 Q50 78 52 60 Q34 66 30 76 Z" fill="#7BA878" />
      <path d="M14 44 Q12 18 22 12 Q30 20 30 33 Q30 20 38 12 Q48 18 46 44 Q38 53 30 51 Q22 53 14 44 Z" fill={color} />
      <path d="M23 14 Q29 25 29.5 38" stroke="rgba(43,32,24,.12)" strokeWidth="2" fill="none" />
    </svg>
  )
}

export function BridgeArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 92" className={'bridge-art ' + className} aria-label="the golden gate bridge">
      {/* happy sun */}
      <circle cx="186" cy="21" r="12" fill="#FDBA74" />
      <path d="M181 20 q2 3 4 0 M189 20 q2 3 4 0" stroke="#B45309" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M184 25 q2 2 5 0" stroke="#B45309" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* water */}
      <rect x="0" y="64" width="220" height="28" rx="5" fill="#C4DCEA" />
      <path d="M12 73 q6 -4 12 0 M44 78 q6 -4 12 0 M96 75 q6 -4 12 0 M168 76 q6 -4 12 0" stroke="#9EC3D8" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* cables */}
      <path d="M0 32 Q34 54 64 19 M64 19 Q110 64 156 19 M156 19 Q186 54 220 32" stroke="#E4570F" strokeWidth="3" fill="none" />
      {/* deck */}
      <rect x="0" y="55" width="220" height="5" rx="2.5" fill="#E4570F" />
      {/* towers */}
      <g fill="#E4570F">
        <rect x="60" y="16" width="9" height="46" rx="3" />
        <rect x="151" y="16" width="9" height="46" rx="3" />
        <rect x="56" y="28" width="17" height="4" rx="2" />
        <rect x="147" y="28" width="17" height="4" rx="2" />
        <rect x="56" y="42" width="17" height="4" rx="2" />
        <rect x="147" y="42" width="17" height="4" rx="2" />
      </g>
      {/* karl */}
      <g fill="#FFFFFF" opacity=".85">
        <ellipse cx="30" cy="63" rx="27" ry="9" />
        <ellipse cx="106" cy="67" rx="36" ry="10" />
        <ellipse cx="192" cy="64" rx="25" ry="8" />
      </g>
    </svg>
  )
}
