const { testInput, input } = require('./input')

const parseInput = (input) => input.split('\n').map((row) => [...row].map((c) => c === '#'))

const countTrees = (input, hMove = 3, vMove = 1) => {
  const rows = parseInput(input)

  let row = 0
  let col = 0
  let nb = 0

  do {
    row = row + vMove
    col = (col + hMove) % rows[row].length
    if (rows[row][col]) nb++
  } while (row < rows.length - vMove)

  return nb
}

const puzzle1 = (input) => {
  console.log(countTrees(input))
}

const puzzle2 = (input) => {
  console.log(
    countTrees(input, 1, 1) *
      countTrees(input, 3, 1) *
      countTrees(input, 5, 1) *
      countTrees(input, 7, 1) *
      countTrees(input, 1, 2)
  )
}

puzzle1(testInput)
puzzle1(input)
puzzle2(testInput)
puzzle2(input)
