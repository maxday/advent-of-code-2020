/* eslint-disable no-constant-condition */
const process = require('process')
const { readLines } = require('../helpers')

const getRows = () => readLines(process.argv[2]).map((line) => [...line])

const rowsToString = (seatRows) =>
  seatRows.map((row) => row.join('')).join('\n')

const areEqual = (rows1, rows2) => rowsToString(rows1) === rowsToString(rows2)

// eslint-disable-next-line no-unused-vars
const printRows = (seatRows) => console.log(rowsToString(seatRows) + '\n')

const dims = (seatRows) => [seatRows.length, seatRows[0].length]

const dirs = [-1, 0, 1]
  .flatMap((di) => [-1, 0, 1].map((dj) => [di, dj]))
  .filter(([di, dj]) => di !== 0 || dj !== 0)

const getVisible = (seatRows, i, j, maxIter = Infinity) => {
  const [n, m] = dims(seatRows)
  return dirs
    .map(([di, dj]) => {
      let [ni, nj] = [i, j]
      for (let iter = 1; iter <= maxIter; iter++) {
        ;[ni, nj] = [ni + di, nj + dj]
        if (ni < 0 || ni >= n || nj < 0 || nj >= m) break
        if (seatRows[ni][nj] !== '.') return [ni, nj]
      }
    })
    .filter(Boolean)
}

const getAdjacent = (seatRows, i, j) => getVisible(seatRows, i, j, 1)

const iterate = (seatRows, nbOccMax, adjacentFn) =>
  seatRows.map((row, i) =>
    row.map((seat, j) => {
      const nbAdjOcc = adjacentFn(seatRows, i, j)
        .map(([a, b]) => seatRows[a][b])
        .filter((s) => s === '#').length
      return seat === 'L' && nbAdjOcc === 0
        ? '#'
        : seat === '#' && nbAdjOcc >= nbOccMax
        ? 'L'
        : seat
    })
  )

const iterateWhileDifferent = (seatRows, nbOccMax, adjacentFn) => {
  const next = iterate(seatRows, nbOccMax, adjacentFn)
  return areEqual(next, seatRows)
    ? next
    : iterateWhileDifferent(next, nbOccMax, adjacentFn)
}

const nbOccupied = (seatRows) =>
  seatRows.reduce(
    (nb, row) =>
      row.reduce((nbInRow, seat) => (seat === '#' ? nbInRow + 1 : nbInRow), nb),
    0
  )

const puzzle1 = (rows) => {
  // printSeatRows(rows)
  const final = iterateWhileDifferent(rows, 4, getAdjacent)
  // printSeatRows(final)
  console.log(nbOccupied(final))
}

const puzzle2 = (rows) => {
  // printSeatRows(rows)
  const final = iterateWhileDifferent(rows, 5, getVisible)
  // printSeatRows(final)
  console.log(nbOccupied(final))
}

const rows = getRows()
puzzle1(rows)
puzzle2(rows)
