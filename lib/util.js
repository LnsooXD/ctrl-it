"use strict";
/*!
 * ctrl-it - test/util.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */

var isGeneratableState = false;
var isGeneratableSetted = false;

var isAsyncableState = false;
var isAsyncableSetted = false;

module.exports = {
  isGeneratable: isGeneratable,
  isAsyncable: isAsyncable,
  isArray: isArray,
  isMap: isMap,
  filter: filter
};

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return Object.prototype.toString.call(arg) === '[object Array]';
}

function isMap(arg) {
  return Object.prototype.toString.call(arg) === '[object Map]';
}

function isGeneratable() {
  if (isGeneratableSetted) {
    return isGeneratableState;
  }
  try {
    eval('(function*(){})');
    isGeneratableState = true;
  } catch (e) {}
  isGeneratableSetted = true;
  return isGeneratableState;
}

function isAsyncable() {
  if (isAsyncableSetted) {
    return isAsyncableState;
  }
  try {
    eval('(async function x(){}; await x();)');
    isAsyncableState = true;
  } catch (e) {}
  isAsyncableSetted = true;
  return isAsyncableState;
}

function filter(f, k, v) {
  return !f || f(k, v);
}

if (isGeneratable()) {
  require('./co-util')(module.exports);
}

if (isAsyncable()) {
  require('./async-util')(module.exports);
}