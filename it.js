"use strict";
/*!
 * ctrl-it - it.js
 * Copyright(c) 2017 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
var util = require('./lib/util');
var mod = module.exports;

mod.each = require('./lib/each');
mod.any = require('./lib/any');

if (util.isGeneratable()) {
  mod.every = require('./lib/every');
  mod.some = require('./lib/some');
}

if (util.isAsyncable()) {
  mod.all = require('./lib/all');
  mod.total = require('./lib/total');
}