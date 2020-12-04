const { testInput, input } = require('./input')

const parseInput = (input) => input.split('\n\n').map((p) => Object.fromEntries(p.split(/\s/).map((v) => v.split(':'))))

const requiredProps = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const isPassportValidPuzzle1 = (passport) => requiredProps.every((prop) => passport[prop])

const isPassportValidPuzzle2 = (passport) => {
  const byr = Number(passport.byr)
  if (!byr || byr < 1920 || byr > 2002) return false

  const iyr = Number(passport.iyr)
  if (!iyr || iyr < 2010 || iyr > 2020) return false

  const eyr = Number(passport.eyr)
  if (!eyr || eyr < 2020 || eyr > 2030) return false

  const [, hgt, unit] = (passport.hgt && passport.hgt.match(/^(\d+)(cm|in)$/)) || []
  if (unit === 'cm') {
    if (hgt < 150 || hgt > 193) return false
  } else if (unit === 'in') {
    if (hgt < 59 || hgt > 76) return false
  } else return false

  if (!passport.hcl || !passport.hcl.match(/^#[0-9a-f]{6}$/)) return false

  if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl)) return false

  if (!passport.pid || !passport.pid.match(/^\d{9}$/)) return false

  return true
}

const puzzle1 = (input) => {
  const passports = parseInput(input)
  console.log(passports.filter(isPassportValidPuzzle1).length)
}

const puzzle2 = (input) => {
  const passports = parseInput(input)
  console.log(passports.filter(isPassportValidPuzzle2).length)
}

puzzle1(testInput)
puzzle1(input)
puzzle2(testInput)
puzzle2(input)
