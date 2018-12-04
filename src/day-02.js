
let debug = false
let magic = {
  array_empty: 0,
  new_line: '\n',
  not_found: -1,
  string_start: 0,
  result_two: 3,
  result_three: 4,
}

module.exports = {
  handler: _handler,
}

function _handler(data, callback) {
  let count_two = 0
  let count_three = 0

  if (data.includes(magic.new_line)) {
    data.split(magic.new_line).forEach(function(line) {
      let found_two = false
      let found_three = false

      while (line.length > magic.array_empty) {
        let focus = line.charAt(magic.string_start)
        let line_split = line.split(focus) // this doesn't seem very efficient
        //if line_split.length
        if (!found_two && line_split.length === magic.result_two) {
          count_two++
          found_two = true
        } else if (! found_three && line_split.length === magic.result_three) {
          count_three++
          found_three = true
        }
        line = line_split.join('')
        debug && console.log(line)
      }
    })
  }

  callback(null, count_two * count_three)
}
