// ── day 3 · the fog word ("semantle-ish") ───────────────────────────
// guesses are scored by hand-curated *meaning* closeness to the answer.
// ✏️ you can tweak scores, add words, or add easter-egg SPECIALS below.

export const ANSWER = 'golden'

export const SEED = { word: 'fog', score: 26 } // daniel's freebie guess

export const HINTS = [
  { at: 10, text: 'hint № 1: it\'s what the hills, the bridge, and max all are ☀️' },
  { at: 18, text: 'hint № 2: "the ___ state" · "___ gate bridge" · "___ retriever"' },
]
export const REVEAL_AT = 26

export const SIMS: Record<string, number> = {
  gold: 96, gilded: 93, gilt: 90, aureate: 92,
  yellow: 85, amber: 86, honey: 83, blond: 80, blonde: 80,
  shiny: 79, glowing: 84, radiant: 83, gleaming: 85, shimmering: 82,
  glittering: 83, sparkling: 78, luminous: 79, lustrous: 81, dazzling: 64,
  bronze: 77, brass: 74, copper: 73, silver: 75, platinum: 70, metallic: 69, metal: 62,
  treasure: 72, precious: 72, riches: 70, rich: 66, wealth: 67, wealthy: 65,
  fortune: 68, jackpot: 63, money: 51, coin: 58, nugget: 66, ore: 59,
  mine: 44, miner: 52, mining: 48, rush: 50, prospector: 55, karat: 68,
  carat: 60, bullion: 71, ingot: 65, goldfish: 62,
  jewel: 64, gem: 65, crown: 64, halo: 66, medal: 70, trophy: 63, prize: 61,
  champion: 57, winner: 56,
  sunshine: 75, sunny: 73, sunlit: 76, sun: 65, sunset: 71, sunrise: 69,
  dawn: 60, dusk: 52, daylight: 58,
  glow: 77, shine: 76, sparkle: 71, glitter: 74, gleam: 78, shimmer: 75,
  retriever: 74, labrador: 55, goose: 56, egg: 48, ticket: 57, ratio: 52,
  rule: 49, hour: 58, age: 54, era: 42, anniversary: 51, wedding: 46, jubilee: 55,
  gate: 69, bridge: 60, state: 57, california: 70, poppy: 64, hills: 50,
  coast: 46, west: 47, pacific: 41, bay: 39, francisco: 45, san: 30,
  orange: 55, saffron: 60, mustard: 51, butter: 50, buttery: 53, corn: 45,
  wheat: 50, straw: 47, hay: 40, harvest: 49, autumn: 46, maize: 48,
  lemon: 42, banana: 37, daffodil: 49, sunflower: 53, marigold: 62,
  dandelion: 44, tulip: 41, flower: 40, bloom: 42, blossom: 41,
  light: 52, bright: 63, brilliant: 61, flame: 44, fire: 42, ember: 47,
  candle: 39, lantern: 40, torch: 38,
  beach: 36, sand: 43, desert: 33, summer: 48, warm: 45, warmth: 46, cozy: 35,
  star: 44, moon: 34, sky: 30, cloud: 24, rainbow: 38, aura: 43,
  color: 36, colour: 36, hue: 38, paint: 27, art: 25,
  olden: 58, old: 35, ancient: 32, vintage: 37, classic: 33, antique: 36,
  lucky: 43, magic: 34, magical: 36, dream: 29, dreamy: 30, perfect: 38,
  beautiful: 37, lovely: 35, glorious: 54, splendid: 45, divine: 39,
  caramel: 49, syrup: 41, toast: 31, toasted: 33, crispy: 28, bread: 22, fried: 26,
  fog: 26, ocean: 29, water: 21, sea: 25, wave: 23, blue: 26, green: 24,
  pink: 28, purple: 22, red: 27, black: 18, white: 20, gray: 19, grey: 19, brown: 34,
  cat: 32, kitten: 28, dog: 38, puppy: 33, rabbit: 17, bunny: 18, bird: 23, fish: 15,
  cold: 12, ice: 10, snow: 13, winter: 14, rain: 16, storm: 11,
  phone: 6, computer: 4, keyboard: 3, internet: 5, homework: 2, taxes: 2,
  monday: 7, meeting: 3, email: 4, traffic: 8,
  love: 47, heart: 40, kiss: 31, hug: 29, cuddle: 27,
  happy: 39, joy: 41, joyful: 40, blissful: 37, blessed: 38,
}

export const SPECIALS: Record<string, { score: number; quip: string }> = {
  birdie: { score: 99, quip: 'wrong kind of golden — but honestly? closest anything gets.' },
  daniel: { score: 88, quip: 'flattered. keep guessing.' },
  max: { score: 51, quip: 'he IS golden-ish. warmer than you\'d think 🐈' },
  stinky: { score: 11, quip: 'sorry stinky. cold. so cold. 🐇' },
  giants: { score: 59, quip: 'right colors, right city ⚾ keep going' },
}

export function scoreGuess(raw: string): { score: number; quip?: string } {
  const w = raw.trim().toLowerCase()
  if (w === ANSWER) return { score: 100 }
  if (SPECIALS[w]) return SPECIALS[w]
  if (SIMS[w] != null) return { score: SIMS[w] }
  const sing = w.endsWith('es') ? w.slice(0, -2) : w.endsWith('s') ? w.slice(0, -1) : null
  if (sing && SIMS[sing] != null) return { score: SIMS[sing] }
  let h = 0
  for (let i = 0; i < w.length; i++) h = (h * 31 + w.charCodeAt(i)) >>> 0
  return { score: 2 + (h % 17) }
}

export function tierLabel(score: number): string {
  if (score >= 100) return '🌉 THAT\'S IT'
  if (score >= 80) return '🌋 scorching'
  if (score >= 65) return '🔥 hot'
  if (score >= 50) return '🌤️ warm'
  if (score >= 35) return '😐 lukewarm'
  if (score >= 20) return '❄️ chilly'
  return '🧊 arctic'
}
