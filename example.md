__SET UP EXAMPLE:__

__day_1.test.js__
```
var assert = require('assert');
var myFunctions = require('../lib/day_1');

describe('Checks if this stuff works', function() {
  it('returns "YUP!"', function() {
    assert.equal(myFunctions.testFunc(), "YUP!")
    })
  })

```

__day_1.js__
```
function testFunc() {
  return "YUP!"
}

module.exports = {
  testFunc: testFunc
}

```

__DAY 1 EXAMPLE TESTS:__
```
var assert = require('assert');
var myFuncs = require('../1');

describe('Advent of Code Day 1', function () {
  describe('#getFloor', function () {
    it('determines what floor the instructions take santa to', function () {
      var input = '))(((((';
      var expected = 3;
      assert.equal(myFuncs.getFloor(input), expected);
    })
  })
  describe('#firstInstanceInBasement', function () {
    it('finds the position of the first character to take santa to the basement', function () {
      var input = '()())';
      var expected = 5;
      assert.equal(myFuncs.firstInstanceInBasement(input), expected);
    })
  })
})
```
__DAY 1 EXAMPLE SOLUTIONS:__

```
function getFloor(instructions) {
  var up = 0, down = 0;
  instructions.split('').forEach(function (char) {
    char === '(' ? up++ : down++
  })
  return up - down;
}

function firstInstanceInBasement(instructions) {
  var up = 0, down = 0;
  instructions = instructions.split('')
  for (var i = 0; i < instructions.length; i++) {
    instructions[i] === '(' ? up++ : down++;
    if(down > up){ return i+1 }
  }
}

module.exports = {
  getFloor: getFloor,
  firstInstanceInBasement: firstInstanceInBasement
}

```

__GET THE ANSWER USING ADVENT OF CODE INPUT (in `day_1.js`)__

The input is huge, so I would put that in an external file and
import it like this:
```
var input = require('./input');
```
THEN just log out the answers by calling your functions and passing in the input:
```
console.log(firstInstanceInBasement(input));
console.log(getFloor(input));
```
