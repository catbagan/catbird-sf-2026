import confetti from 'canvas-confetti'

const COLORS = ['#F97316', '#FDBA74', '#F472B6', '#FBCFE8', '#2B2018', '#FFF7EE']

export function pop() {
  confetti({ particleCount: 45, spread: 70, startVelocity: 32, origin: { y: 0.7 }, colors: COLORS, scalar: 0.9 })
}

export function bigPop() {
  confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 }, colors: COLORS })
  setTimeout(() => confetti({ particleCount: 70, angle: 60, spread: 65, origin: { x: 0, y: 0.8 }, colors: COLORS }), 250)
  setTimeout(() => confetti({ particleCount: 70, angle: 120, spread: 65, origin: { x: 1, y: 0.8 }, colors: COLORS }), 450)
}

export function heartPop() {
  const shapeFromText = (confetti as any).shapeFromText
  const shapes = shapeFromText ? [shapeFromText({ text: '🧡', scalar: 2 })] : undefined
  confetti({ particleCount: 22, spread: 80, scalar: 2, shapes, origin: { y: 0.6 }, colors: COLORS })
}
