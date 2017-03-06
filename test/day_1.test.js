'use strict';
var assert = require('assert');
var myFuncs = require('../lib/day_1');

describe('blocksFromStart', () => {
  it('determines the number of blocks Santa would walk', () => {
    var input = "R2, L3"
    var expected = 5
    assert.equal(myFuncs.getBlocks(input), expected)
  })
})
