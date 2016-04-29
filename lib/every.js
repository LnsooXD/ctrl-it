"use strict";
/*!
 * ctrl-it - lib/every.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */

const util = require('./util');
const isArray = util.isArray;
const filter = util.filterCo;

module.exports = function *(obj, it, f) {
  if (isArray(obj)) {
    return yield everyArray(obj, it, f);
  } else {
    return yield everyObj(obj, it, f);
  }
};


function* everyArray(obj, it, f) {
  var count = 0;
  var len = obj.length;
  var v;
  for (var i = 0; i < len; i++) {
    if (yield filter(f, i, v = obj[i])) {
      count++;
      if ((yield it(i, v)) === true) {
        break;
      }
    }
  }
  return count;
}

function* everyObj(obj, it, f) {
  var count = 0;
  var v;
  for (var k in obj) {
    if (obj.hasOwnProperty(k) && (yield filter(f, k, v = obj[k]))) {
      count++;
      if ((yield it(k, v)) === true) {
        break;
      }
    }
  }
  return count;
}

