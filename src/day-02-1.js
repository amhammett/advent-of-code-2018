
let debug = false
let magic = {
  array_empty: 0,
  diff_init: 0,
  diff_max: 1,
  new_line: '\n',
  next: 1,
  not_found: -1,
  previous: -1,
  string_start: 0,
}

module.exports = {
  handler: _handler,
}

function _handler(data, callback) {
  let diff_result

  if (data.includes(magic.new_line)) {
    let word_list = data.split(magic.new_line)
    let compare_list = []

    // iterate over words
    for (let index = 0; index < word_list.length; index++) {
      let base_word = word_list[index]
      debug && console.log('base word: ' + base_word)

      // compare against remaining words
      for (let index_remaining = index + magic.next; index_remaining < word_list.length; index_remaining++) {
        let compare_word = word_list[index_remaining]
        debug && console.log(' compare to: ' + compare_word)
        let diff_count = magic.diff_init
        let diff_index = magic.diff_init

        if (base_word.length !== compare_word.length) {
          debug && console.log('string lengths differ. ignore comparison')
          continue
        }

        // compare strings
        for (let index_string = magic.string_start; index_string < base_word.length; index_string++) {
          if (base_word.charAt(index_string) !== compare_word.charAt(index_string)) {
            diff_count++
            diff_index = index_string
          }
        }

        if (diff_count > magic.diff_max) {
          continue
        } else if (diff_count <= magic.diff_max && diff_count > magic.diff_init) {
          compare_list = {
            base_word: base_word,
            compare_word: compare_word,
            diff_index: diff_index,
          }
          break
        }
      }
    }

    // take first result
    diff_result = (
      compare_list.base_word.slice(magic.string_start, compare_list.diff_index)
      + compare_list.base_word.slice(compare_list.diff_index + magic.next)
    )
  }

  callback(null, diff_result)
}
