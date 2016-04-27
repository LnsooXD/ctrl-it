"use strict";
/*!
 * ctrl-it - test/each.test.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */

var each = require('../lib/each');
var should = require('should');

describe('each', function () {
  describe('array', function () {

    it('common test for array', function () {
      var arr = [1, 2, 3, 4, 5, 6, 7];
      var result = '';
      each(arr, function (k, v) {
        result += k;
        result += v;
      });
      should(result).equal('01122334455667');
    });

    it('break test for array', function () {
      var arr = [1, 2, 3, 4, 5, 6, 7];
      var result = '';
      each(arr, function (k, v) {
        result += k;
        result += v;
        if (k == 4) {
          return true;
        }
      });
      should(result).equal('0112233445');
    });

    it('array result should not contains prototype', function () {
      var arr = [1, 2, 3, 4, 5, 6, 7];
      arr.prototype = ['a', 'b', 'c'];
      var result = '';
      each(arr, function (k, v) {
        result += k;
        if (k === 'prototype') {
          result += v.join('');
        } else {
          result += v;
        }
      });
      should(result).equal('01122334455667');
    });
  });

  it('array result should not contains __proto__', function () {
    var arr = [1, 2, 3, 4, 5, 6, 7];
    arr.__proto__ = ['a', 'b', 'c'];
    var result = '';
    each(arr, function (k, v) {
      result += k;
      if (k === '__proto__') {
        result += v.join('');
      } else {
        result += v;
      }
    });
    should(result).equal('01122334455667');
  });

  describe('object', function () {
    it('object result should contains prototype', function () {
      var obj = {
        'a': 'A',
        'b': 'B',
        'c': 'C',
        'd': 'D'
      };
      obj.prototype = ['E', 'F'];

      var result = '';
      each(obj, function (k, v) {
        result += k;
        if (k === 'prototype') {
          result += v.join('');
        } else {
          result += v;
        }
      });
      should(result).equal('aAbBcCdDprototypeEF');
    });
  });

  describe('object', function () {
    it('object result should not contains __proto__', function () {
      var obj = {
        'a': 'A',
        'b': 'B',
        'c': 'C',
        'd': 'D'
      };
      obj.__proto__ = {
        'e': 'E',
        'f': 'F'
      };
      var result = '';
      each(obj, function (k, v) {
        result += k;
        result += v;
      });
      should(result).equal('aAbBcCdD');
    });
  });

});
