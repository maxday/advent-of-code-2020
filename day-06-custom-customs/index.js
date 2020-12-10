const { sum, uniq } = require('../helpers')
const { testInput, input } = require('./input')

const parseInput = (input) =>
  input
    .split('\n\n')
    .map((s) => s.split('\n'))
    .map((a) => a.map((e) => [...e]))

const puzzle1 = (input) => sum(parseInput(input).map((arr) => uniq(arr.flat()).length))

console.log(puzzle1(testInput))
console.log(puzzle1(input))

const intersect = (arr) => {
  let answers = [...arr[0]]
  for (let i = 1; i < arr.length; i++) {
    answers = answers.filter((a) => arr[i].includes(a))
  }
  return answers
}

const puzzle2 = (input) =>
  sum(
    parseInput(input)
      .map(intersect)
      .map((a) => a.length)
  )

console.log(puzzle2(testInput))
console.log(puzzle2(input))
