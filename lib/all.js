"use strict";
/*!
 * ctrl-it - lib/all.js
 * Copyright(c) 2017 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
const {
    isArray,
    isMap,
    filterAsync: filter
} = require('./util');

module.exports = async(obj, it, f) => {
    if (isArray(obj)) {
        return await eachArray(obj, it, f);
    } else if (isMap(obj)) {
        return await eachMap(obj, it, f);
    } else {
        return await eachObj(obj, it, f);
    }
};

const eachArray = async(obj, it, f) => {
    let count = 0;
    const len = obj.length;
    let v;
    for (var i = 0; i < len; i++) {
        if (await filter(f, i, v = obj[i])) {
            count++;
            if ((await it(i, v)) === true) {
                break;
            }
        }
    }
    return count;
}

const eachMap = async(obj, it, f) => {
    let count = 0;
    let k, v;
    for (let item of obj) {
        if (await filter(f, k = item[0], v = item[1])) {
            count++;
            if (await it(k, v) === true) {
                break;
            }
        }
    }
    return count;
}

const eachObj = async(obj, it, f) => {
    let count = 0;
    let v;
    for (let k in obj) {
        if (obj.hasOwnProperty(k) && await filter(f, k, v = obj[k])) {
            count++;
            if (await it(k, v) === true) {
                break;
            }
        }
    }
    return count;
}