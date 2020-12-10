const { uniq, sum } = require('../helpers')
const { testInput, input, secondTestInput } = require('./input')

const parseInput = (str) =>
  str
    .split('\n')
    .map((l) => {
      const [, color, strContains] = l.match(/(.*) bags contain (.*)\./)
      const contains =
        strContains === 'no other bags'
          ? []
          : strContains.split(', ').map((s) => {
              const [, nb, color] = s.match(/(\d+) (.*) bags?/)
              return { nb: Number(nb), color }
            })
      return { color, contains }
    })
    .reduce(
      (acc, { color, contains }) => ({
        ...acc,
        [color]: contains,
      }),
      {}
    )

const flat = (rules) => {
  return Object.entries(rules).flatMap(([containerColor, contains]) =>
    contains.map(({ nb, color: containedColor }) => ({
      containerColor,
      containedColor,
      nb,
    }))
  )
}

const canBeContainedRules = (flatRules) => {
  return flatRules.reduce(
    (acc, { containerColor, containedColor }) => ({
      ...acc,
      [containedColor]: [...(acc[containedColor] || []), containerColor],
    }),
    {}
  )
}

const getTreeColors = (tree) => uniq([tree.color, ...(tree.containers ? tree.containers.flatMap(getTreeColors) : [])])

const puzzle1 = (input) => {
  const memoizedTrees = {}
  const buildTree = (color, rules) => {
    if (!memoizedTrees[color])
      memoizedTrees[color] = {
        color,
        containers: (rules[color] || []).map((container) => buildTree(container, rules)),
      }
    return memoizedTrees[color]
  }

  const rules = canBeContainedRules(flat(parseInput(input)))
  const tree = buildTree('shiny gold', rules)
  console.log(getTreeColors(tree).length - 1)
}

const puzzle2 = (input) => {
  const memoizedTrees = {}
  const buildTree = (color, rules) => {
    if (!memoizedTrees[color])
      memoizedTrees[color] = rules[color]
        ? rules[color].map((contained) => ({
            nb: contained.nb,
            color: contained.color,
            contains: buildTree(contained.color, rules),
          }))
        : []
    return memoizedTrees[color]
  }

  const getNbBags = (tree) => {
    return tree.map((t) => t.nb * (1 + sum(getNbBags(t.contains))))
  }

  const rules = parseInput(input)
  const tree = buildTree('shiny gold', rules)
  // log(tree)
  console.log(sum(getNbBags(tree)))
}

puzzle1(testInput)
puzzle1(input)

puzzle2(secondTestInput)
puzzle2(input)
