const { input: puzzle1Input } = require('./input')

const testInput = [1721, 979, 366, 299, 675, 1456]

const puzzle1 = (input) => {
  for (const i1 of input) {
    for (const i2 of input) {
      if (i1 !== i2 && i1 + i2 === 2020) {
        return i1 * i2
      }
    }
  }
}

console.log(puzzle1(testInput))
console.log(puzzle1(puzzle1Input))

const puzzle2 = (input) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      for (let k = j + 1; k < input.length; k++) {
        if (input[i] + input[j] + input[k] === 2020) {
          return input[i] * input[j] * input[k]
        }
      }
    }
  }
}

console.log(puzzle2(testInput))
console.log(puzzle2(puzzle1Input))
