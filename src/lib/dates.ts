export function parseLocalDate(d: string): Date {
  const [y, m, day] = d.split('-').map(Number)
  return new Date(y, m - 1, day)
}

export function isUnlocked(dateStr: string, now = new Date()): boolean {
  return now.getTime() >= parseLocalDate(dateStr).getTime()
}

export function isToday(dateStr: string, now = new Date()): boolean {
  const d = parseLocalDate(dateStr)
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

export function weekdayShort(dateStr: string): string {
  return parseLocalDate(dateStr).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase()
}

export function longLabel(dateStr: string): string {
  return parseLocalDate(dateStr)
    .toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    .toLowerCase()
}
