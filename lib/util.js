"use strict";
/*!
 * ctrl-it - test/util.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */

var isGeneratableState = false;
var isGeneratableSetted = false;

module.exports = {
  isGeneratable: isGeneratable,
  isArray: isArray,
  filter: filter
};

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return Object.prototype.toString.call(arg) === '[object Array]';
}

function isGeneratable() {
  if (isGeneratableSetted) {
    return isGeneratableState;
  }
  try {
    eval('(function*(){})');
    isGeneratableState = true;
  } catch (e) {
  }
  isGeneratableSetted = true;
  return isGeneratableState;
}

function filter(f, k, v) {
  return !f || f(k, v);
}

if (isGeneratable()) {
  module.exports.filterCo = function* filterCo(f, k, v) {
    return !f || (yield f(k, v));
  }
}