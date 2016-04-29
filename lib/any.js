"use strict";
/*!
 * ctrl-it - lib/any.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
var filter = require('./util').filter;

module.exports = function (obj, it, f) {
  var count = 0;
  var v;
  for (var k in obj) {
    if (filter(f, k, v = obj[k])) {
      count++;
      if (it(k, v) === true) {
        break;
      }
    }
  }
  return count;
};

