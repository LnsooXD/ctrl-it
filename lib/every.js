"use strict";
/*!
 * ctrl-it - lib/every.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */

const isArray = require('./util').isArray;

module.exports = function *(obj, it) {
  if (isArray(obj)) {
    return yield everyArray(obj, it);
  } else {
    return yield everyObj(obj, it);
  }
};


function* everyArray(obj, it) {
  var count = 0;
  var len = obj.length;
  for (var i = 0; i < len; i++) {
    count++;
    if ((yield it(i, obj[i])) === true) {
      break;
    }
  }
  return count;
}

function* everyObj(obj, it) {
  var count = 0;
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      count++;
      if ((yield it(k, obj[k])) === true) {
        break;
      }
    }
  }
  return count;
}

