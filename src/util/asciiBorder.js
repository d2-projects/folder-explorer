import width from 'string-width'

export default function (textArray, { padding = [1, 2] } = {}) {
  let max = textArray.reduce((max, row) => {
    return width(row) > max ? width(row) : max
  }, 0)
  max += padding[1] * 2
  return [
    '┌' + '─'.repeat(max) + '┐',
    ...[...Array(padding[0])].map(e => `│${' '.padEnd(max, ' ')}│`),
    ...textArray.map(e => `│${' '.repeat(padding[1])}${e.padEnd(max - padding[1] * 2, ' ')}${' '.repeat(padding[1])}│`),
    ...[...Array(padding[0])].map(e => `│${' '.padEnd(max, ' ')}│`),
    '└' + '─'.repeat(max) + '┘'
  ]
}
