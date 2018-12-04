'use strict'

const debug = (process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'true') || false
const magic = {
  message: 'template for future days',
  result: 0,
}

module.exports = {
  handler: _handler,
}

function _handler(data, callback) {
  debug && console.log(data)

  callback(null, magic.result)
}

