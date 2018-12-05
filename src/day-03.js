'use strict'

const debug = (process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'true') || false
const magic = {
  coordinates_ref_id: 1,
  coordinates_ref_x: 3,
  coordinates_ref_y: 4,
  coordinates_ref_w: 6,
  coordinates_ref_h: 7,
  coordinates_split_re: /[#;:,x\s]/,
  result: 0,
  new_line: '\n',
}

module.exports = {
  handler: _handler,
}

function _handler(data, callback) {
  debug && console.log(data)

  let fabric = []
  let fabric_overlap = []

  if (data.includes(magic.new_line)) {
    data.split(magic.new_line).forEach(function(line) {
      let coordinates = convert_coordinates(line)
      debug && console.log(coordinates)

      // plot each order
      for (let plot_x = coordinates.x; plot_x < (Number(coordinates.x) + Number(coordinates.width)); plot_x++) {
        for (let plot_y = coordinates.y; plot_y < (Number(coordinates.y) + Number(coordinates.height)); plot_y++) {
          let coordinate = plot_x + '/' + plot_y

          if (fabric.includes(coordinate)) {
            fabric_overlap.push(coordinate)
          } else {
            fabric.push(coordinate)
          }
        }
      }
    })
  }

  callback(null, fabric_overlap.length)
}

function convert_coordinates(raw_data) {
  debug && console.log(raw_data)

  // expected format #<id> @ <x>,<y>: <width>x<height>
  let cordinates_split = raw_data.split(magic.coordinates_split_re)

  return {
    id: cordinates_split[magic.coordinates_ref_id],
    x: cordinates_split[magic.coordinates_ref_x],
    y: cordinates_split[magic.coordinates_ref_y],
    width: cordinates_split[magic.coordinates_ref_w],
    height: cordinates_split[magic.coordinates_ref_h],
  }
}