const util = require('util')
const fs = require('fs')

exports.log = (v) => console.log(util.inspect(v, false, Infinity))

exports.sum = (arr) => arr.reduce((acc, e) => acc + e, 0)

exports.findIndices = (arr, fn) => {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) res.push(i)
  }
  return res
}

exports.uniq = (arr) => [...new Set([...arr])]

exports.readLines = (file) => require('fs').readFileSync(file, 'utf-8').trim().split('\n')
