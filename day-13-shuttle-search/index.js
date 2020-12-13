const { readLines, sum } = require('../helpers')

const readInput = () => {
  const [line1, line2] = readLines(process.argv[2])
  return [Number(line1), line2.split(',').map(Number)]
}

const puzzle1 = (minTime, busIds) => {
  const nextTime = (busId, minTime) => Math.ceil(minTime / busId) * busId
  const busNextTimes = busIds.map((busId) => nextTime(busId, minTime))
  const earliest = Math.min(...busNextTimes.filter((n) => !isNaN(n)))
  const earliestBusId = busIds[busNextTimes.indexOf(earliest)]
  console.log((earliest - minTime) * earliestBusId)
}

const lcm = (a, b) => {
  ;[a, b] = [Math.min(a, b), Math.max(a, b)]
  let m = b
  while (m % a !== 0) m += b
  return m
}

const puzzle2 = (busIds) => {
  let t = 0
  let increment = 1
  let valid
  do {
    t += increment
    valid = true
    busIds.forEach((id, i) => {
      if ((t + i) % id === 0) increment = lcm(increment, id)
      else if (!Number.isNaN(id)) valid = false
    })
  } while (!valid)
  console.log(t)
}

const [minTime, busIds] = readInput()
puzzle1(minTime, busIds)
puzzle2(busIds)
