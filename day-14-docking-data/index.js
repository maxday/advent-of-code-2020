const { readLines, sum } = require('../helpers')

const readInput = () => {
  const lines = readLines(process.argv[2])
  return lines.map((line) => {
    const [, mask] = line.match(/^mask = (.*)$/) || []
    if (mask) {
      return { setMask: mask }
    }
    const [, mem, value] = line.match(/^mem\[(\d+)\] = (\d+)$/) || []
    if (mem && value) {
      return { setMem: Number(mem), value: Number(value) }
    }
  })
}

const toBin = (number, size = 36) => {
  const res = []
  for (let i = 0; i < size; i++) {
    res.unshift(String(number % 2))
    number >>= 1
  }
  return res
}

const fromBin = (bits) =>
  [...bits].reverse().reduce((n, b, i) => n + b * 2 ** i, 0)

const fromBinWithFloating = (bits) =>
  [...bits].reverse().reduce(
    (ns, b, i) => {
      if (b === 'X') return ns.flatMap((n) => [n, n + 2 ** i])
      else return ns.map((n) => n + b * 2 ** i)
    },
    [0]
  )

const run = (instructions, applyMemInstruction) => {
  const memory = {}
  let mask
  instructions.forEach((ins) => {
    if (ins.setMask) mask = ins.setMask
    if (ins.setMem) applyMemInstruction(ins, memory, mask)
  })
  console.log(sum(Object.values(memory)))
}

const applyMemInstructionV1 = (ins, memory, mask) => {
  const bits = toBin(ins.value)
  const newValue = fromBin([...mask].map((m, i) => (m === 'X' ? bits[i] : m)))
  memory[ins.setMem] = newValue
}

const applyMemInstructionV2 = (ins, memory, mask) => {
  const memBits = toBin(ins.setMem)
  const mems = fromBinWithFloating(
    [...mask].map((m, i) => (m === '0' ? memBits[i] : m === '1' ? '1' : 'X'))
  )
  for (const mem of mems) memory[mem] = ins.value
}

const lines = readInput()
run(lines, applyMemInstructionV1)
run(lines, applyMemInstructionV2)
