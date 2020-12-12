const { readLines } = require('../helpers')

const getInstructions = () => {
  return readLines(process.argv[2]).map((line) => {
    const action = line.slice(0, 1)
    const value = Number(line.slice(1))
    return [action, value]
  })
}

const manhattan = ([x, y]) => Math.abs(x) + Math.abs(y)

const puzzle1 = (instructions) => {
  const rotateRight = (f, value) => {
    const fs = ['N', 'E', 'S', 'W']
    const offset = value / 90
    return fs[(fs.indexOf(f) + offset) % fs.length]
  }

  const rotateLeft = (f, value) => rotateRight(f, 360 - value)

  const applyInstruction = ([x, y, f], [action, value]) => {
    switch (action) {
      case 'N':
        return [x, y + value, f]
      case 'S':
        return [x, y - value, f]
      case 'E':
        return [x + value, y, f]
      case 'W':
        return [x - value, y, f]
      case 'L':
        return [x, y, rotateLeft(f, value)]
      case 'R':
        return [x, y, rotateRight(f, value)]
      case 'F':
        return applyInstruction([x, y, f], [f, value])
    }
  }

  const applyInstructions = (instructions, initial) =>
    instructions.reduce(applyInstruction, initial)

  const final = applyInstructions(instructions, [0, 0, 'E'])
  console.log(manhattan(final))
}

const puzzle2 = (instructions) => {
  const rotateRight = ([wx, wy], value) => {
    if (value === 0) return [wx, wy]
    return rotateRight([wy, -wx], value - 90)
  }

  const rotateLeft = (f, value) => rotateRight(f, 360 - value)

  const applyInstruction = ([x, y, wx, wy], [action, value]) => {
    switch (action) {
      case 'N':
        return [x, y, wx, wy + value]
      case 'S':
        return [x, y, wx, wy - value]
      case 'E':
        return [x, y, wx + value, wy]
      case 'W':
        return [x, y, wx - value, wy]
      case 'L':
        return [x, y, ...rotateLeft([wx, wy], value)]
      case 'R':
        return [x, y, ...rotateRight([wx, wy], value)]
      case 'F':
        return [x + wx * value, y + wy * value, wx, wy]
    }
  }

  const applyInstructions = (instructions, initial) =>
    instructions.reduce(applyInstruction, initial)

  const final = applyInstructions(instructions, [0, 0, 10, 1])
  console.log(manhattan(final))
}

const instructions = getInstructions()

puzzle1(instructions)
puzzle2(instructions)
