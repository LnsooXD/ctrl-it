"use strict";
/*!
 * ctrl-it - lib/some.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
module.exports = function *(obj, it) {
  var count = 0;
  for (var k in obj) {
    count++;
    if ((yield it(k, obj[k])) === true) {
      break;
    }
  }
  return count;
};

