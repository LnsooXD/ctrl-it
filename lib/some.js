"use strict";
/*!
 * ctrl-it - lib/some.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
const filter = require('./util').filterCo;

module.exports = function *(obj, it, f) {
  var count = 0;
  var v;
  for (var k in obj) {
    if (yield filter(f, k, v = obj[k])) {
      count++;
      if ((yield it(k, v)) === true) {
        break;
      }
    }
  }
  return count;
};

