'use strict'

let debug = false
let magic = {
  new_line: '\n',
  number_after_operation: 1,
  string_start: 0,
}

module.exports = {
  handler: _handler,
}

function _handler(data, callback) {
  let frequency = 0

  if (data.includes(magic.new_line)) {
    data.split(magic.new_line).forEach(function(delta) {
      let current = frequency
      let delta_operation = delta.charAt(magic.string_start)
      let delta_amount = Number(delta.substring(magic.number_after_operation))

      switch (delta_operation) {
        case '+':
          frequency = frequency + delta_amount
          break
        case '-':
          frequency = frequency - delta_amount
          break
        case '':
          break
        default:
          console.log('error: unexpected operation ' + delta_operation)
      }
      debug && console.log(
        [
          'Current frequency ' + current + ',',
          'change of ' + delta + ';',
          'resulting frequency  ' + frequency + '.',
        ].join(' ')
      )
    })
  } else {
    frequency = data
  }

  callback(null, frequency)
}
