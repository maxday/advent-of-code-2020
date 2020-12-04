const { testInput, input } = require('./input')

const parseInput = (input) => {
  return input
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.split(/[\s-:]+/))
    .map(([min, max, letter, password]) => ({
      min,
      max,
      letter,
      password,
    }))
}

const isPasswordValidPuzzle1 = (password, { min, max, letter }) => {
  const nb = [...password].filter((l) => l === letter).length
  return nb >= min && nb <= max
}

const isPasswordValidPuzzle2 = (password, { min: first, max: second, letter }) =>
  (password[first - 1] === letter) !== (password[second - 1] === letter)

const puzzle1 = (input) => {
  const parsedInput = parseInput(input)
  console.log(parsedInput.filter(({ password, ...philosophy }) => isPasswordValidPuzzle1(password, philosophy)).length)
}

const puzzle2 = (input) => {
  const parsedInput = parseInput(input)
  console.log(parsedInput.filter(({ password, ...philosophy }) => isPasswordValidPuzzle2(password, philosophy)).length)
}

puzzle1(testInput)
puzzle1(input)

puzzle2(testInput)
puzzle2(input)
