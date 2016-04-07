
module.exports = function bindAll (obj) {
  var i, length = arguments.length, key
  if (length === 1) {
    var args = Object.keys(obj).filter(function (key) {
      return typeof obj[key] === 'function'
    })

    args.unshift(obj)
    return bindAll.apply(null, args)
  }

  if (length <= 1) throw new Error('bindAll must be passed function names')

  for (i = 1; i < length; i++) {
    key = arguments[i]
    obj[key] = obj[key].bind(obj)
  }

  return obj
}
