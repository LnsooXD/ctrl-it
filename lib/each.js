"use strict";
/*!
 * ctrl-it - lib/each.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
var isArray = require('is-type-of').array;

module.exports = function (obj, it) {
  if (isArray(obj)) {
    return eachArray(obj, it);
  } else {
    return eachObj(obj, it);
  }
};

function eachArray(obj, it) {
  var count = 0;
  var len = obj.length;
  for (var i = 0; i < len; i++) {
    count++;
    if (it(i, obj[i]) === true) {
      break;
    }
  }
  return count;
}

function eachObj(obj, it) {
  var count = 0;
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      count++;
      if (it(k, obj[k]) === true) {
        break;
      }
    }
  }
  return count;
}
