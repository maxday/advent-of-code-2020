const util = require('util')

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
