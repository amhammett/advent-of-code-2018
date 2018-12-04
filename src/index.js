'use strict'

var fs = require('fs')

let aoc_vars = {}
let debug = false
let magic = {
  split_index_name: 0,
  split_index_value: 1,
}

process.argv.forEach((value) => {
  if (value.includes('=')) {
    debug && console.log(value)
    let var_split = value.split('=')
    aoc_vars[var_split[magic.split_index_name]] = var_split[magic.split_index_value] // bad
  }
})

try {
  let fn = require('./day-' + aoc_vars['day'])
  let fn_data = fs.readFileSync('./data/day-' + aoc_vars['day'] + '.input', 'utf8')
  fn.handler(fn_data.toString(), function(error, data) {
    if (error) {
      console.log('error: ' + error)
    }
    console.log(data)
  })
} catch (error) {
  console.log('error:', error.stack)
}

