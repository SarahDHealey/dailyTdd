'use strict';
var assert = require('assert');
var myFuncs = require('../lib/day_1');
describe('Checks if this stuff works', () => {
  it('returns "YUP"', () => {
    assert.equal(myFuncs.testFunc(), "YUP!")
  })
})
