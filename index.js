
module.exports = function bindAll (obj) {
  var i, length = arguments.length, key
  if (length === 1) {
    // bind all functions of obj
    // duplication of code, but doesn't create extra array
    for (key in obj) {
      if (typeof obj[key] === 'function') {
        obj[key] = obj[key].bind(obj)
      }
    }

    return obj
  }

  if (length <= 1) throw new Error('bindAll must be passed function names')

  for (i = 1; i < length; i++) {
    key = arguments[i]
    obj[key] = obj[key].bind(obj)
  }

  return obj
}
