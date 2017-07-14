"use strict";
/*!
 * ctrl-it - lib/total.js
 * Copyright(c) 2017 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
const {
    isArray,
    isMap,
    filterAsync: filter
} = require('./util');

module.exports = async(obj, it, f) => {
    let count = 0;
    let breaked = false;
    let k, v;
    if (isMap(obj)) {
        for (let item of obj) {
            if (await filter(f, k = item[0], v = item[1])) {
                count++;
                if ((await it(k, v)) === true) {
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
        if (await filter(f, k, v = obj[k])) {
            count++;
            if ((await it(k, v)) === true) {
                break;
            }
        }
    }
    return count;
};