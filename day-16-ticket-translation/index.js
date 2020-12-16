const fs = require('fs')
const { sum } = require('../helpers')

const readInput = () => {
  const content = fs.readFileSync(process.argv[2], 'utf-8').trim()
  const [, rulesContent, myTicketContent, nearbyTicketsContent] =
    content
      .replace(/\n/g, '%')
      .match(/^(.*)%%your ticket:%(.*)%%nearby tickets:%(.*)$/m) || []
  const rules = rulesContent.split('%').map((ruleContent) => {
    const [field, valueContent] = ruleContent.split(': ')
    const ranges = valueContent.split(' or ').map((rangeText) => {
      const [min, max] = rangeText.split('-').map(Number)
      return { min, max }
    })
    return { field, ranges }
  })
  const myTicket = myTicketContent.split(',').map(Number)
  const nearbyTickets = nearbyTicketsContent
    .split('%')
    .map((ticketContent) => ticketContent.split(',').map(Number))
  return { rules, myTicket, nearbyTickets }
}

const getRangeRules = (rules) => rules.flatMap((rule) => rule.ranges)

const numberIsOkWithRangeRules = (rangeRules) => (number) =>
  rangeRules.some(({ min, max }) => number >= min && number <= max)

const getFieldRangeRules = (field) =>
  rules.find((rule) => rule.field === field).ranges

const numberIsOkWithFieldRules = (rules, field, number) =>
  numberIsOkWithRangeRules(getFieldRangeRules(field))(number)

const getInvalidNumbersInTicket = (rangeRules) => (ticket) =>
  ticket.filter((number) => !numberIsOkWithRangeRules(rangeRules)(number))

const getAllInvalidNumbersInTickets = (rangeRules) => (tickets) =>
  tickets.flatMap(getInvalidNumbersInTicket(rangeRules))

const isTicketValid = (rangeRules) => (ticket) =>
  ticket.every(numberIsOkWithRangeRules(rangeRules))

const getValidTickets = (rangeRules) => (tickets) =>
  tickets.filter(isTicketValid(rangeRules))

const cleanPossible = (possible, i) => {
  for (let j = 0; j < possible.length; j++) {
    if (j !== i && possible[j].length !== 1) {
      const newFields = possible[j].filter((field) => field !== possible[i][0])
      setPossible(possible, j, newFields)
    }
  }
}

const setPossible = (possible, i, fields) => {
  possible[i] = fields
  if (fields.length === 1) cleanPossible(possible, i)
}

const getFieldsOrder = (tickets, rules) => {
  const possible = Array(myTicket.length).fill(rules.map((r) => r.field))
  for (const ticket of tickets) {
    for (let i = 0; i < ticket.length; i++) {
      if (possible[i].length !== 1) {
        const fields = possible[i].filter((field) =>
          numberIsOkWithFieldRules(rules, field, ticket[i])
        )
        setPossible(possible, i, fields)
      }
    }
  }
  return possible.flat()
}

const { rules, myTicket, nearbyTickets } = readInput()
const rangeRules = getRangeRules(rules)
const invalidNumbers = getAllInvalidNumbersInTickets(rangeRules)(nearbyTickets)
console.log('Star 1:', sum(invalidNumbers))

const validTickets = getValidTickets(rangeRules)(nearbyTickets)
const order = getFieldsOrder([myTicket, ...validTickets], rules)
const res = order.reduce(
  (acc, field, index) =>
    field.startsWith('departure ') ? acc * myTicket[index] : acc,
  1
)
console.log('Star 2:', res)
