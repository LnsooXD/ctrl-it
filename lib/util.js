"use strict";
/*!
 * ctrl-it - test/util.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */

var isGeneratable = false;
var isGeneratableSetted = false;

module.exports = {
  isGeneratable: function () {
    if (isGeneratableSetted) {
      return isGeneratable;
    }
    try {
      eval('(function*(){})');
      isGeneratable = true;
    } catch (e) {
    }
    isGeneratableSetted = true;
    return isGeneratable;
  },
  isArray: function (arg) {
    if (Array.isArray) {
      return Array.isArray(arg);
    }
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
};