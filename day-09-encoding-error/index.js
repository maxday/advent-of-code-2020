const { testInput, input } = require('./input')

const parseInput = (str) => str.split('\n').map(Number)

const isSumOf = (num, arr) => {
  for (let j = 0; j < arr.length; j++) {
    for (let k = j + 1; k < arr.length; k++) {
      if (arr[j] + arr[k] === num) {
        return true
      }
    }
  }
  return false
}

const getInvalidNumber = (input, n) => {
  for (let i = n; i < input.length; i++) {
    const previous = input.slice(i - n, i)
    if (!isSumOf(input[i], previous)) {
      return input[i]
    }
  }
}

const puzzle1 = (input, n) => {
  console.log(getInvalidNumber(input, n))
}

const findSumArray = (input, number) => {
  for (let i = 0; i < input.length; i++) {
    let sum = 0
    for (let j = i; j < input.length && sum < number; j++) {
      sum += input[j]
      if (sum === number) {
        const arr = input.slice(i, j + 1)
        return Math.min(...arr) + Math.max(...arr)
      }
    }
  }
}

const puzzle2 = (input, n) => {
  const number = getInvalidNumber(input, n)
  const sumArray = findSumArray(input, number)
  console.log(sumArray)
}

puzzle1(parseInput(testInput))
puzzle1(parseInput(input))
puzzle2(parseInput(testInput), 5)
puzzle2(parseInput(input), 25)
