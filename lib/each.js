"use strict";
/*!
 * ctrl-it - lib/each.js
 * Copyright(c) 2017 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
var util = require('./util');
var isArray = util.isArray;
var isMap = util.isMap;
var filter = util.filter;

module.exports = function (obj, it, f) {
  if (isArray(obj)) {
    return eachArray(obj, it, f);
  } else if (isMap(obj)) {
    return eachMap(obj, it, f);
  } else {
    return eachObj(obj, it, f);
  }
};

function eachArray(obj, it, f) {
  var count = 0;
  var len = obj.length;
  var v;
  for (var i = 0; i < len; i++) {
    if (filter(f, i, v = obj[i])) {
      count++;
      if (it(i, v) === true) {
        break;
      }
    }
  }
  return count;
}

function eachMap(obj, it, f) {
  var count = 0;
  var k, v;
  for (var item of obj) {
    if (filter(f, k = item[0], v = item[1])) {
      count++;
      if (it(k, v) === true) {
        break;
      }
    }
  }
  return count;
}

function eachObj(obj, it, f) {
  var count = 0;
  var v;
  for (var k in obj) {
    if (obj.hasOwnProperty(k) && filter(f, k, v = obj[k])) {
      count++;
      if (it(k, v) === true) {
        break;
      }
    }
  }
  return count;
}