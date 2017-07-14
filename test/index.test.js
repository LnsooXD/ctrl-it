"use strict";
/*!
 * ctrl-it - test/index.test.js
 * Copyright(c) 2017 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */

var util = require('../lib/util');

// common functions
require('./any.test');
require('./each.test');

// generator functions
if (util.isGeneratable()) {
    require('./every.test');
    require('./some.test');
}

// async/await functions
if (util.isGeneratable()) {
    require('./all.test');
    require('./total.test');
}