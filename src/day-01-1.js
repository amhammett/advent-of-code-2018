'use strict'

let debug = false
let magic = {
  array_start: 0,
  init_frequency: 0,
  new_line: '\n',
  number_after_operation: 1,
  string_start: 0,
}

module.exports = {
  handler: _handler,
}

function _handler(data, callback) {
  let frequencies = [magic.init_frequency]
  let frequency = magic.init_frequency

  if (data.includes(magic.new_line)) {
    let data_lines = data.split(magic.new_line)
    let index = magic.array_start
    let frequency_found = false

    while (!frequency_found) {
      let current = frequency
      let delta_operation = data_lines[index].charAt(magic.string_start)
      let delta_amount = Number(data_lines[index].substring(magic.number_after_operation))

      switch (delta_operation) {
        case '+':
          frequency = frequency + delta_amount
          break
        case '-':
          frequency = frequency - delta_amount
          break
        case '':
          debug && console.log('Restart sequence')
          debug && console.log('Restart sequence')
          index = magic.array_start
          index-- // decrement before increment
          continue
        default:
          debug && console.log('error: unexpected operation: ' + delta_operation )
      }

      debug && console.log(
        [
          'Current frequency ' + current + ',',
          'change of ' + data_lines[index] + ';',
          'resulting frequency ' + frequency + '.',
        ].join(' ')
      )

      if (frequencies.includes(frequency)) {
        frequency_found = true
      } else {
        frequencies.push(frequency)
      }

      if (index < data_lines.length - magic.number_after_operation) {
        index++
      } else {
        index = magic.array_start
      }
    }
  }

  callback(null, frequency)
}
