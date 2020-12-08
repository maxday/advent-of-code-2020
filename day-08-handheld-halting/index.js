const { testInput, input } = require('./input')

const parseInput = (input) =>
  input.split('\n').map((l) => {
    const [cmd, arg] = l.split(' ')
    return { cmd, arg: Number(arg) }
  })

const execProg = (instructions) => {
  const executed = []
  let currentInstruction = 0
  let acc = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    executed.push(currentInstruction)
    const { cmd, arg } = instructions[currentInstruction]
    switch (cmd) {
      case 'acc':
        acc += arg
        currentInstruction++
        break
      case 'jmp':
        currentInstruction += arg
        break
      case 'nop':
        currentInstruction++
        break
    }
    if (executed.includes(currentInstruction)) return { type: 'infinite_loop', acc }
    else if (currentInstruction === instructions.length) return { type: 'terminates \\o/', acc }
  }
}

const puzzle1 = (input) => {
  const instructions = parseInput(input)
  console.log(execProg(instructions))
}

const puzzle2 = (input) => {
  const instructions = parseInput(input)
  for (let i = 0; i < instructions.length; i++) {
    const newInstructions = instructions.map((ins, index) =>
      index === i
        ? {
            cmd: ins.cmd === 'jmp' ? 'nop' : ins.cmd === 'nop' ? 'jmp' : ins.cmd,
            arg: ins.arg,
          }
        : ins
    )
    const { type, acc } = execProg(newInstructions)
    if (type === 'terminates \\o/') {
      console.log(acc)
      break
    }
  }
}

puzzle1(testInput)
puzzle1(input)
puzzle2(testInput)
puzzle2(input)
