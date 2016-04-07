var test = require('tape')
var bindAll = require('../')

test('bindAll', function(t) {
  t.plan(7)

  var curly = {name: 'curly'}, moe = {
    name: 'moe',
    getName: function() { return 'name: ' + this.name },
    sayHi: function() { return 'hi: ' + this.name }
  }
  curly.getName = moe.getName
  bindAll(moe, 'getName', 'sayHi')
  curly.sayHi = moe.sayHi
  t.equal(curly.getName(), 'name: curly', 'unbound function is bound to current object')
  t.equal(curly.sayHi(), 'hi: moe', 'bound function is still bound to original object')

  curly = {name: 'curly'}
  moe = {
    name: 'moe',
    getName: function() { return 'name: ' + this.name },
    sayHi: function() { return 'hi: ' + this.name },
    sayLast: function() { return this.sayHi([].slice.call(arguments).pop()) }
  }

  t.throws(function() { bindAll(moe, 'sayBye') }, TypeError, 'throws an error for bindAll if the given key is undefined')
  t.throws(function() { bindAll(moe, 'name') }, TypeError, 'throws an error for bindAll if the given key is not a function')

  bindAll(moe, 'sayHi', 'sayLast')
  curly.sayHi = moe.sayHi
  t.equal(curly.sayHi(), 'hi: moe')

  var sayLast = moe.sayLast
  t.equal(sayLast(1, 2, 3, 4, 5, 6, 7, 'Tom'), 'hi: moe', 'createCallback works with any number of arguments')

  bindAll(moe, ['getName'])
  var getName = moe.getName
  t.equal(getName(), 'name: moe', 'flattens arguments into a single list')
})

test('1 arg', function (t) {
  t.plan(2)
  var obj = {
    a: 1,
    b: function () {
      t.equal(this, obj)
    },
    c: function () {
      t.equal(this, obj)
    }
  }

  bindAll(obj)
  ;['b', 'c'].forEach(function (name) {
    var fn = obj[name]
    fn()
  })
})
