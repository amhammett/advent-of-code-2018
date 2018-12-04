'use strict'

const assert = require('assert')
const async = require('async')
const expect = require('chai').expect
const fs = require('fs')

var magic = {
  dotenv_path: './.env',
  empty_length: 0,
  test_data_path: './test/data',
  test_timeout: 5000,
}

//const debug = (process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'true') || false

require('dotenv').config({path: magic.dotenv_path})

describe('Santity test', function() {
  it('Assert True', function() {
    assert.ok(true)
  })
})

fs.readdir(magic.test_data_path, (err, files) => {
  async.forEach(files, function(test_data_file) {
    const test_data = require('../' + magic.test_data_path + '/' + test_data_file)

    describe(test_data.title, function() {
      async.forEach(test_data.scenarios, function (scenario) {
        describe(scenario.name + ' - ' + scenario.function, function() {
          async.forEach(scenario.test_cases, function (test_case) {
            it(test_case.description, function(done) {
              let fn = require('../' + scenario.function)

              fn.handler(test_case.input, function(error, result) {
                expect(error).to.not.exist
                expect(result).to.exist
                expect(result.toString()).deep.equal(test_case.result)
                done()
              })
            })
          })
        })
      })
    })
  })
})