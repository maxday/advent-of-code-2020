const { testInput, input } = require('./input')

const toBit = (c) => (c === 'B' || c === 'R' ? 1 : 0)

const parseInput = (str) =>
  str
    .split('\n')
    .map((l) => [...l].map(toBit))
    .map(([r6, r5, r4, r3, r2, r1, r0, c2, c1, c0]) => ({
      r6,
      r5,
      r4,
      r3,
      r2,
      r1,
      r0,
      c2,
      c1,
      c0,
    }))

const getSeat = ({ r6, r5, r4, r3, r2, r1, r0, c2, c1, c0 }) => ({
  row: r6 * 2 ** 6 + r5 * 2 ** 5 + r4 * 2 ** 4 + r3 * 2 ** 3 + r2 * 2 ** 2 + r1 * 2 + r0,
  col: c2 * 2 ** 2 + c1 * 2 + c0,
})

const getSeatId = ({ row, col }) => row * 8 + col

console.log(parseInput(testInput).map(getSeat).map(getSeatId))

const seats = parseInput(input).map(getSeat).map(getSeatId)

// Puzzle 1
console.log(Math.max(...seats))

// Puzzle 2
seats.sort((s1, s2) => s1 - s2)
for (let i = 1; i < seats.length - 1; i++) {
  if (seats[i] !== seats[i - 1] + 1) {
    console.log(seats[i - 1] + 1)
  }
}
