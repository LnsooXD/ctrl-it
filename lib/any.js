"use strict";
/*!
 * ctrl-it - lib/any.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
var util = require('./util');
var isMap = util.isMap;
var filter = util.filter;

module.exports = function (obj, it, f) {
  var count = 0;
  var breaked = false;
  var k, v;
  if (isMap(obj)) {
    for (var item of obj) {
      if (filter(f, k = item[0], v = item[1])) {
        count++;
        if (it(k, v) === true) {
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
    if (filter(f, k, v = obj[k])) {
      count++;
      if (it(k, v) === true) {
        break;
      }
    }
  }
  return count;
};