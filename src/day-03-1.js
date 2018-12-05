'use strict'

const debug = (process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'true') || false
const magic = {
  first_element: 0,
  coordinates_ref_id: 1,
  coordinates_ref_x: 3,
  coordinates_ref_y: 4,
  coordinates_ref_w: 6,
  coordinates_ref_h: 7,
  coordinates_split_re: /[#;:,x\s]/,
  new_line: '\n',
  result: 0,
  single_elements: 1,
}

module.exports = {
  handler: _handler,
}

function _handler(data, callback) {
  debug && console.log(data)

  let fabric = []
  let fabric_overlap = []
  let fabric_intact_list = {}
  let fabric_intact = -1

  if (data.includes(magic.new_line)) {
    data.split(magic.new_line).forEach(function(line) {
      let coordinates = convert_coordinates(line)
      debug && console.log(coordinates)
      fabric_intact_list[coordinates.id] = true

      // plot each order
      for (let plot_x = coordinates.x; plot_x < (Number(coordinates.x) + Number(coordinates.width)); plot_x++) {
        for (let plot_y = coordinates.y; plot_y < (Number(coordinates.y) + Number(coordinates.height)); plot_y++) {
          let coordinate = plot_x + '/' + plot_y

          if (fabric[coordinate]) {
            if (!fabric_overlap.includes(coordinate)) {
              fabric_overlap.push(coordinate)
            }
            delete fabric_intact_list[fabric[coordinate]]
            delete fabric_intact_list[coordinates.id]
            // need to replace conflicting
          } else {
            fabric[coordinate] = coordinates.id
          }
        }
      }
    })
  }

  if (Object.keys(fabric_intact_list).length === magic.single_elements) {
    fabric_intact = Object.keys(fabric_intact_list)[magic.first_element]
  } else {
    debug && console.log('unexpected fabric_intact_list')
    debug && console.log(fabric_intact_list)
  }

  callback(null, fabric_intact)
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