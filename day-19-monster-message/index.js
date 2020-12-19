const { readLines, log } = require('../helpers')

const parseRule = (str) => {
  const [, char] = str.match(/"([a-z])"/) || []
  if (char) return [char]
  const [, left, right] = str.match(/(.*) \| (.*)/) || []
  if (left && right) return [{ left: parseRule(left), right: parseRule(right) }]
  return str.split(' ').map(Number)
}

const readInput = () => {
  const lines = readLines(process.argv[2])
  const rules = new Map()
  let i
  for (i = 0; i < lines.length && lines[i] !== ''; i++) {
    const [idx, str] = lines[i].split(/:/)
    rules.set(Number(idx), parseRule(str.trim()))
  }
  const exprs = lines.slice(i + 1)
  return { rules, exprs }
}

const match = ([c, ...cs], [r, ...rs], rules) => {
  if (!c && !r) return true
  switch (typeof r) {
    case 'string':
      return c === r && match(cs, rs, rules)
    case 'object':
      return (
        match([c, ...cs], [...r.left, ...rs], rules) ||
        match([c, ...cs], [...r.right, ...rs], rules)
      )
    case 'number':
      return match([c, ...cs], [...rules.get(r), ...rs], rules)
  }
}

const { rules, exprs } = readInput()
log(rules)

const valid = exprs.map((line) => match(line, rules.get(0), rules))
console.log(valid.filter(Boolean).length)
