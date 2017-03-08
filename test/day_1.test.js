'use strict';
var assert = require('assert');
var myFuncs = require('../lib/day_1');

describe('blocksFromStart', () => {
  describe('#getBlocks', () => {
    it('determines the number of blocks Santa would walk if given R2, L3', () => {
      var input = "R2, L3"
      var expected = 5
      assert.equal(myFuncs.getBlocks(input), expected)
    })
    it('determines the number of blocks Santa would walk if given R2, R2, R2', () => {
      var input = "R2, R2, R2"
      var expected = 2
      assert.equal(myFuncs.getBlocks(input), expected)
    })
    it('determines the number of blocks Santa would walk if given R5, L5, R5, R3', () => {
      var input = "R5, L5, R5, R3"
      var expected = 12
      assert.equal(myFuncs.getBlocks(input), expected)
    })
  })
})
