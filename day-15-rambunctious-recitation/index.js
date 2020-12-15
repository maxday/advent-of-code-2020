const { readLines } = require('../helpers')

const readInputs = () => {
  const lines = readLines(process.argv[2])
  return lines.map((line) => line.split(',').map(Number))
}

const getLast = (numbers, size) => {
  const indexesMap = new Map(
    numbers.slice(0, numbers.length - 1).map((v, i) => [v, i])
  )
  let last = numbers[numbers.length - 1]
  for (let i = numbers.length - 1; i < size - 1; i++) {
    const previous = indexesMap.get(last)
    indexesMap.set(last, i)
    last = previous !== undefined ? i - previous : 0
  }
  return last
}

const input = readInputs()[0]
console.log(getLast(input, 30000000))
