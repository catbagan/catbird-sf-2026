// ═══════════════════════════════════════════════════════════════════
//  ✏️  DANIEL — EVERYTHING YOU'D WANT TO EDIT LIVES IN THIS ONE FILE
//  love notes · facts · playlist link · flight time · game answers
//  (semantle words live in src/games/semantleData.ts)
// ═══════════════════════════════════════════════════════════════════

export const TRIP = {
  her: 'birdie',
  me: 'daniel',
  // flight is 9:50pm eastern — parsed in her phone's local timezone (you're both ET, so this is right)
  departISO: '2026-07-13T21:50:00',
  // shown on day 5 with the boarding passes
  flightLabel: '✈️  → SFO · monday, july 13 · 9:50pm',
}

export type GateKind = 'scratch' | 'shake' | 'fog' | 'pet' | 'zip'
export type GameKind = 'crossword' | 'wordle' | 'semantle' | 'playlist' | 'pass'

export type DayContent = {
  date: string // YYYY-MM-DD — the door unlocks at midnight, her phone's time
  teaser: string
  emoji: string
  gate: GateKind
  game: GameKind
  note: string // ✏️ the love note on the back of the postcard
  ps: string
  fact: string // the SF/CA lore line
}

export const DAYS: DayContent[] = [
  {
    date: '2026-07-09',
    teaser: 'something scratchable…',
    emoji: '🎟️',
    gate: 'scratch',
    game: 'crossword',
    note: `my love. i'm so proud of you. your creative spark is contagious — i couldn't let this trip happen without some form of advent calendar.
i can't wait to show you my hometown and the inner layers of my 🧅`,
    ps: `i think i'm still 1a to max's 1b, but i can tell the gap is closing (he's on top of you right now)`,
    fact: `the golden gate bridge isn't golden — the color is literally named "international orange." the navy wanted it black with yellow stripes so ships could see it. the architect said absolutely not.`,
  },
  {
    date: '2026-07-10',
    teaser: 'shake-to-open technology',
    emoji: '🥠',
    gate: 'shake',
    game: 'wordle',
    note: `happy friday my sweet bird girl. i always thought orange was my fav color bc of the sf giants (baseball), but maybe it's also because i love the california golden poppy too.
every time i see one, it reminds me of spring. i had an electric spring with you ⚡`,
    ps: `don't worry… the gap between you as my 1a and stinky is still p wide.`,
    fact: `san francisco swears it invented the fortune cookie — at the japanese tea garden in golden gate park, around 1900. los angeles claims otherwise. los angeles is wrong.`,
  },
  {
    date: '2026-07-11',
    teaser: 'karl rolled in overnight',
    emoji: '🌁',
    gate: 'fog',
    game: 'semantle',
    note: `golden is the gate, the state, the hour, and the glimmer in your beautiful eyes.
counting down the days now eh? i can't wait to show you some big trees, eat some good food w you, and experience a west coast sunset together. i love you`,
    ps: `karl isn't rly that bad… he's just omnipresent`,
    fact: `the fog has a name: karl. he has his own social media, and he's named after the giant in "big fish" — the one everybody feared who turned out to be a total sweetheart.`,
  },
  {
    date: '2026-07-12',
    teaser: 'max is sitting on it. of course he is.',
    emoji: '🐈',
    gate: 'pet',
    game: 'playlist',
    note: `you showed me this song when we first started dating. you said it reminded you of me — not just because of california, but because of the car kazoo.
i can't wait to drive down the coast with you. i can't wait to have you in my arms on our flight to sf.`,
    ps: `i told buffett to send us pics of max… he better, or else!`,
    fact: `cable car operators hold a bell-ringing championship in union square every year — since 1949, real rivalries. this city will turn anything into music.`,
  },
  {
    date: '2026-07-13',
    teaser: 'the big one. pack your bags.',
    emoji: '✈️',
    gate: 'zip',
    game: 'pass',
    note: `today's the day baby girl. when we land, we're gonna grab our car, scoop some in-n-out, and drive down the 101.
my sister is gonna think you're even prettier in person and steven is gonna love your shit talk. i'm gonna love it all.
i want to be a part of your life and i want you in mine. i love you and i love us. wheels up! ✈️`,
    ps: `i'm sure some of max's fur is coming with us, so u can't miss him _that_ much!`,
    fact: `pack a layer: july in sf runs foggy and low-60s — locals know september is the real summer. if karl rolls over the bridge while we cross it, that's him saying hi.`,
  },
]

// ── day 1 · the tiny crossword ──────────────────────────────────────
// every across AND down entry is a real word — don't edit the grid
// unless you re-check the crossings. clues are fair game to edit.
export const CROSSWORD = {
  solution: ['ADS##', 'GOT##', 'OCEAN', '##EGO', '##PET'],
  across: [
    'stuff you skip before a youtube video',
    '“you\'ve ___ a friend in me” 🤠',
    '___ beach — where the city runs out of west',
    'max\'s is enormous (for a cat)',
    'max or stinky, e.g. 🐾',
  ],
  down: [
    'five days ___, this countdown began…',
    '___x, as in a word file',
    'like every single hill i\'m about to make you climb',
    'just a number, allegedly',
    'your ___-so-secret admirer made this puzzle',
  ],
}

// ── day 2 · birdle ──────────────────────────────────────────────────
export const WORDLE = {
  answer: 'POPPY', // ✏️ any 5 letters
  subtitle: 'six tries. the answer is peak california. 🧡',
}

export const FORTUNE =
  '“a golden, five-letter flower hides in your very near future.” · lucky numbers: 7 · 13 · 26'

// ── day 4 · the mix ────────────────────────────────────────────────
export const PLAYLIST = {
  // ✏️ paste your real playlist link (spotify links get a nice embedded player)
  url: 'https://open.spotify.com/playlist/PASTE_YOURS_HERE',
  // ✏️ drop an mp3 at public/song.mp3 and it'll autoplay (or show a play button)
  songFile: '/song.mp3',
  songLabel: '✏️ our song — the artist', // ✏️ EDIT ME
}

// ── day 5 · the boarding passes ────────────────────────────────────
// ✏️ sunday night: save screenshots as public/boarding-pass-1.png
// (and -2.png), redeploy, done. until then she sees a cute placeholder.
export const PASS = {
  images: ['/boarding-pass-1.png', '/boarding-pass-2.png'],
  placeholder: 'the golden tickets land here sunday night.\ndaniel has ONE job. 🫡',
  message: 'see you at the gate, b 🧡',
}
