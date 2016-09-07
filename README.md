## Overview

Practicing test-driven development can be overwhelming to many new developers. This
lesson aims to introduce new developers to the practice through a combination of
step by step set up instructions, the anatomy of a test, and a beginning
understanding of "why". This lesson uses [Advent of Code](http://adventofcode.com/) as a
starting point for finding code challenges to practice writing tests for.

This lesson assumes a basic knowledge of Node.js and using `module.exports.`

## Objectives

* Be able to practice a Test Driven Development (TDD) workflow to solve problems
* Be able to break problems down into small, testable steps
* Be able to wire up Mocha
* Be able to write tests using Mocha
* Be able to run tests using Mocha

## Be able to practice a Test Driven Development (TDD) workflow to solve problems

#### Why testing is awesome.

* Helps you break down a problem (know where you're going before you write the code)
* Write cleaner code (because you've already worked out what you need to do)
* Tests serve as additional documentation for your app
* Sleep at night ('cause you know your sh@# ain't broken!)
* Be a more competative developer candidate because you practice TDD

## Getting Wired Up!

__1.__ If you don't have Mocha installed globally already:

```
npm install --global mocha
```
__2.__ Add a `package.json` file to our project

```
npm init
```

__3.__ Set up our files

When testing, you should always give your `test` file the same name as your `script`
file, but with a `.test` appended to it. See below example.

Let's get our basic structure set up.

```
mkdir lib test
touch lib/day_1.js
touch test/day_1.test.js
```

# Anatomy of a Mocha Test

* `describe`
* `it`
* `assert.equal()`

Mocha tests are basically comprised of 3 main parts, `describe` blocks, `it`
statements, and an expectation for what should happen using `assert.equal()`.

When I say "block" I basically mean a chunk of code. Think of a `describe` block
as the parent, and an `it` statement as a child. A `describe` block can have as
many `it` statements as you want, but the `it` statements should all belong to
the same "family". In other words, you should organize your `describe`s and `it`s
into chunks that belong together, or have some sort of relationship. For example,
a `describe` block might have 3 `it` statements nested inside of it that all test
the functionality of a specific function, or feature.

Lastly, inside the anonymous function passed to each `it` statement, should be an
"expectation", an `assert` statement. The `assert` statement tells Mocha what
success looks like by calling the function you want to test and comparing its
_actual_ results to the desired result. In this lesson, we'll be using `assert`
chained with `.equal`. There are other assertion libraries that can also be used
and you should explore those.

Let's look at an example:

```
describe('Checks if this stuff works', function() {
  it('returns "YUP!"', function() {
    assert.equal(myFuncs.testFunc(), "YUP!")
    })
  })
```

Now, take a closer look. What are `describe`, `it`, and `assert.equal` _actually_?
They're functions! They're _higher order_ functions. So what we're _really_ doing,
is invoking the `describe` function and passing in a title and an anonymous
function as arguments. That anonymous function then calls the `it` function,
which also takes a title and an anonymous function as arguments. We then invoke
yet _another_ function called `assert.equal`. In the above example, we're passing
our invoked function`myFuncs.testFunc()` to `assert.equal` and then passing
in a second argument which should be the value we _want_ our function to return.
In this case, the string `"YUP!""`.

__Phew! That's alot!__

# How to Run Tests

When practicing TDD, there are a few rules you should abide by. Three, actually.
And you can remember them like this: __RED, GREEN, REFACTOR__. Actually, I'm going
to add one more to that, __DIGEST__.

#### What is the "RED, GREEN, REFACTOR flow?

* Always watch the test fail before writing any source code to make it pass __(RED)__.
* After you have written the source code to make the test pass __(GREEN)__,
ask yourself if there is any __refactoring__ that can be done to make the code better
* What makes code better:
  * __Readability__ Would another developer (or future you!) be able to read your
  code and quickly understand what it does (variable naming, method naming)?
  * __Higer Order Functions__ Using `forEach` or `map` instead of a `for` loop
  * __Single Responsibility__ Do you have functions that are bloated? Are there
  jobs being done in your functinos that should be extracted out into their own function?

After any necessary refactoring, you should `add` and `commit` your work using
descriptive commit messages (__HINT:__ What does that specific code accomplish?
 __example:__ `git commit -m "finds the minimum in a given set"`)

__1. DIGEST__
Think the problem through. Take the time to really digest the problem at hand.
For starters, you need to understand what inputs you'll be given and what outputs
are expected.

__2. RED__
* _Always_ watch a test fail first - otherwise, how do you know you wrote a
good test? How do you know it doesn't just pass
all the time, no matter what happens? (Yes, that's a thing!)

__3. GREEN__
* Write the code to make the test pass

__4. REFACTOR__
* Readability
* Higher Order Functions where applicable
* Single Responsibility

__To run your tests, while in the root directory, simply type `mocha` from the
command line.__

```
mocha
```

### Ok, let's do this!

```
describe('Checks if this stuff works', function() {
  it('returns "YUP!"', function() {
    assert.equal(myFuncs.testFunc(), "YUP!")
    })
  })
```

Go ahead and add the above `describe` block to your `day_1.test.js` file and
then type `mocha` from the command line.

You should see the following:

```
Checks if this stuff works
  1) returns "YUP!"


0 passing (9ms)
1 failing

1) Checks if this stuff works returns "YUP!":
   ReferenceError: assert is not defined
    at Context.<anonymous> (test/day_1.test.js:3:5)
```

Checkout __ReferenceError: assert is not defined__. It turns out we want to
import a library to help us write our tests. It's a
[Chai Assertation Library](http://chaijs.com/api/assert/). Add
the following line to the top of `day_1.test.js`

```
var assert = require('assert');
```

__Now run the test again:__

```
mocha
```

__You should see:__

```
Checks if this stuff works
  1) returns "YUP!"


0 passing (10ms)
1 failing

1) Checks if this stuff works returns "YUP!":
   ReferenceError: myFuncs is not defined
    at Context.<anonymous> (test/day_1.test.js:5:18)
```

__Let's dissect the output:__

What part of this output tells you _why_ the test is failing?
Go look at our test and take a minute to disect what it's doing. Then consider
this part of our error message `ReferenceError: myFuncs is not defined`

## Ok, let's get these files talking to eachother

Basically, in order to test our functions we need to be able to invoke them inside
of our test file. So, we need to be able to import them.

__STEP ONE: Export the code in your `day_1.js` file__

We need to tell our file what to export to Mocha. We can do that by using
`module.exports`. Add the below code to your `day_1.js` file.

```
module.exports = {

}
```
Currently, we're just exporting an empty object, but later, we'll be exporting
an object with functions in it.

__STEP TWO: Our test file needs to ask for our functions__

In our `test` file we need to request the code from our `day_1.js` file. We do
that using `require`. Add the below code to your `day_1.test.js` file.

```
var myFuncs = require('../lib/day_1');
```

Ok, now we've got our two files talking to each other. Let's keep going.

Run the test again. You should now see the following:

```
Checks if this stuff works
  1) returns "YUP!"


0 passing (10ms)
1 failing

1) Checks if this stuff works returns "YUP!":
   TypeError: myFuncs.testFunc is not a function
    at Context.<anonymous> (test/day_1.test.js:6:30)
```

__What's our new error message?__ Ok, go write the code to get this test to pass.

Upon success, you should see:

```
Checks if this stuff works
  ✓ returns "YUP!"


1 passing (8ms)
```

__IF YOU'RE STUCK, GO LOOK AT `example.md`__

## Good Developer Habits - Initial Commit

We've just done a bit of work to get this project set up correctly, let's go
ahead and do our `initial commit`:

```
git add -A
git commit -m "initial commit"
git push origin master
```

__If you're asking yourself "When should I commit and push?", the answer is
"Early and often".__

# Let's up our game!

Ok, you've had an introduction to writing tests. Let's keep going and write some
real functions with some real tests. We'll need to know what inputs we need and
waht output should be expected.

Go ahead and delete `testFunc` from `day_1.js`. You should just have:

```
module.exports = {

}
```

## ADVENT OF CODE - DAY ONE

Let's modify our existing test to do something more interesting.

[Advent of Code](http://adventofcode.com/) is a great place to get daily coding
challenges. There are many others, but what I like about this one is that the
challenges give you expected input and output examples, which is great for
beginners practicing TDD.

Head over to [Advent of Code](http://adventofcode.com/) and click the `1` to
see what challenge we'll be starting with.

### OVERVIEW (don't write anything yet)

If we're doing this right, that means we write a test _first_. That's what
__TDD__ means. _Test Driven Development_. It means that the code you write in
your app is all in service of passing a written test. This helps us to only
write the code we need, and helps us to stay out of the "rat hole" that can
sometimes derail our focus.

__Here's a list of what we'll need to do in `day_1.test.js`:__

* Give our `describe` function a new title
* Give our `it` function a new title
* Create test input
* Pass the function we want to test to our `assert` function
* Call our function and pass in our test input
* Tell Mocha what success looks like (pass in what the expected output shold be)

### Let's take this one step at a time

__1. Give our `describe` function a new title:__

In this case, something like "Advent of Code Day 1", or "Apartment Building"
will do just fine.

__2. Give our `it` function a new title:__

While our `describe` title is a bit broad, this title should be more descriptive,
precise. In fact, I might even nest another `describe` block in here so we can
get really precise. EXAMPLE:

```
describe('Advent of Code Day 1', function() {
  describe('#getFloor', function () {
    it('determines what floor the instructions take Santa to', function () {

    })
  })
})
```
In the above example, by nesting another `describe` block I can describe the exact
function we're testing and then use my `it` statements to elaborate. Here's where
we're essentially providing documentation about our code.

__3. Create sample input to pass to our function:__

Really, so much of the hard work is in writing your test. Writing tests forces
us to think a problem all the way through before writing the code to solve that
problem. By the time we've decided upon, or determined, what our inputs and outputs
should be and we've finished writing our test, writing the code to pass that test
is a lot easier than it might have been.

One of the advantages of using Advent of Code to get started with testing, is
that it already gives us examples of what input should produce what output.
So, let's go grab one of their examples and use that as our `input` and `expected` output.

Add the below variables to your `it` statement:

```
var input = "(()(()("
var expected = 3
```
__4. Pass the function we want to test to our `assert` statement:__

We want to test a function called `getFloor` (or whatever you named yours).
How we do we call that function in our `test` file? Go ahead and add the following
line to your `it` statement, below your variable declarations:

`assert.equal(myFuncs.getFloor(input), expected)`

__5. Let's break that down a little:__

Our test arguments consist of two variables:

1. `input`
1. `expected` (if our functions is doing it's job what value should it return?)

We've already grabbed our two values from Advent of Code, and then we just
plugged them into the right place in our `assert` statement.
Remember, this is still in `day_1.test.js`. Your `day_1.js` file should still be
exporting just an empty object.

__1.__ What we've done is chained an `equal` function to our `assert` and then passed in
the function we want to test. In this case, `getFloor`. The `myFuncs` part is just
what I've named the entire object that we're importing from `day_1.js`. This object will
later export another function that we'll also test, so that's why it's useful to
import the whole object, rather than a single function in this case.

__2.__ The _second_ argument passed to our `equal` function is our `expected` output.
We're saying, when we've written the code to make this function do its job, I _expect_
it to return this value, given this input.

Ok, you should now have something that looks like this in your `day_1.test.js` file.

```
var assert = require('assert');
var myFuncs = require('../lib/day_1');

describe('Advent of Code Day 1', function() {
  describe('#getFloor', function () {
    it('determines what floor the instructions take Santa to', function () {
      var input = "(()(()("
      var expected = 3
      assert.equal(myFuncs.getFloor(input), expected)
    })
  })
})
```

__7. Run the test!__

Drumroll please ...

```
mocha
```

You should see something like this:

```
Advent of Code Day 1
  #getFloor
    1) determines what floor the instructions take Santa to


0 passing (9ms)
1 failing

1) Advent of Code Day 1 #getFloor determines what floor the instructions take Santa to:
   TypeError: myFuncs.getFloor is not a function
    at Context.<anonymous> (test/day_1.test.js:9:28)
```

Excellent! You're faiing your first _real_ test! I bet that's the first time
anyone high fived you for failing a test :D

## Keep Going

Ok, now you need to write the code to get the test passing. Once your test is passing,
you _should_ be able to run your function and pass the Advent of Code _actual_ input
into your function to get the answer they're looking for. Submit the answer and
see if you got it right!

If you're stuck, check `example.md` for help.

### RED

Ok, you should now have a failing test. That's the first rule in our __RED,
GREEN, REFACTOR__ workflow. Nice work.

Let's work toward green.

### GREEN

__Your workflow should look like this:__

1. Run the test.
2. Write the least amount of code necessary to get past the error message
3. Run the test and look for a new error message
4. Write the least amount of code necessary to get past the new error message
5. Rinse and repeat until your test goes green

### REFACTOR

Congratulations on your green test! Now, let's take a moment to ask ourselves if
we can do it better, cleaner, make it more readible.

### Add, Commit, Push

You've worked hard. It would be a shame to screw this up by losing your work,
or not sharing your work with your team so they have the most up to date version
of the project you are all working on.

```
git add -p
```

This command will walk you through all of your changes. This is your opportunity
to clean up any cruft you used to debug, or comments you wrote to help you along.
Those things thould be deleted before you commit this code to git. `git add -p`
will ask you if you want to stage hunks (chunks of code), simply type `y` or `n`
to stage your code. If you see something that shouldn't be there, select `n`.
After `git add -p` is done showing you all of your changes, you can go back to
files and delete any unnecessary cruft. Then, `git add -p` again just to be
sure you caught it all.

```
git commit -m "short but descriptive commit message goes here"
git push origin master
```

## Keep going!

Ok, if you've got a passing test right now, that means it's time to move on to
part two of the Advent of Code Day 1 challenge. Based on what we've done so far,
see if you can write a new test (or two! Depends on your function). Remember,
first determine what your inputs and outputs should be. Write the test and then
follow your error messages to a passing test.

## How to keep practicing

TDD is a _practice_. It helps you get better and problem break down and reasoning
about a problem from beginnning to end before writing the code to solve your problem.
A great way to practice TDD is to find problems to solve and practice solving them
using this discipline.

There are many places to find coding challenges, one such place is
[Advent of Code](http://adventofcode.com/). It has 25 days of coding challenges
just there for the taking! Disciplining yourself to solve these puzzles using
test driven development is a great start to learning how to unit test. It will
challenge you to break problems down into tiny, testable chunks and move
methodically through solving a problem.

Enjoy!
