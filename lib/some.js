"use strict";
/*!
 * ctrl-it - lib/some.js
 * Copyright(c) 2017 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
var util = require('./util');
var isMap = util.isMap;
const filter = util.filterCo;

module.exports = function* (obj, it, f) {
  var count = 0;
  var breaked = false;
  var k, v;
  if (isMap(obj)) {
    for (var item of obj) {
      if (yield filter(f, k = item[0], v = item[1])) {
        count++;
        if ((yield it(k, v)) === true) {
          breaked = true;
          break;
        }
      }
    }
    if (breaked) {
      return count;
    }
  }
  for (k in obj) {
    if (yield filter(f, k, v = obj[k])) {
      count++;
      if ((yield it(k, v)) === true) {
        break;
      }
    }
  }
  return count;
};