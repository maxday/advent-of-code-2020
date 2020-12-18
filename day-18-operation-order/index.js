const { sum, readLines } = require('../helpers')

const replace = (str, regexp, replacer) => {
  let orig
  do {
    orig = str
    str = str.replace(regexp, replacer)
  } while (str !== orig)
  return str
}

const evaluateV1 = (str) => {
  str = str.replace(/\s/g, '')
  let orig
  do {
    orig = str
    str = replace(str, /\((\d+)\)/g, (_, a) => a)
    str = replace(
      str,
      /(^|\()(\d+)(\*|\+)(\d+)/,
      (_1, sep1, a, op, b) =>
        sep1 + (op === '+' ? Number(a) + Number(b) : Number(a) * Number(b))
    )
  } while (orig !== str)
  return Number(str)
}

const evaluateV2 = (str) => {
  let orig
  do {
    orig = str
    str = replace(str, /\((\d+)\)/g, (_, a) => a)
    str = replace(str, /(\d+)\s\+\s(\d+)/, (_, a, b) => Number(a) + Number(b))
    str = replace(
      str,
      /(^|\()(\d+)\s*\*\s*(\d+)\s*($|\*|\))/,
      (_1, sep1, a, b, sep2) => sep1 + Number(a) * Number(b) + sep2
    )
  } while (orig !== str)
  return Number(str)
}

const exprs = readLines(process.argv[2])
console.log(sum(exprs.map(evaluateV1)))
console.log(sum(exprs.map(evaluateV2)))
