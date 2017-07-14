"use strict";
/*!
 * ctrl-it - test/every.test.js
 * Copyright(c) 2017 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
var util = require('../lib/util');

if (util.isGeneratable()) {
  var every = require('../lib/every');
  var should = require('should');

  describe('every', function () {
    describe('array', function () {

      it('common test for array', function* () {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        var result = '';
        yield every(arr, function* (k, v) {
          result += k;
          result += v;
        });
        should(result).equal('01122334455667');
      });

      it('break test for array', function* () {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        var result = '';
        yield every(arr, function* (k, v) {
          result += k;
          result += v;
          if (k == 4) {
            return true;
          }
        });
        should(result).equal('0112233445');
      });

      it('array result should not contains prototype', function* () {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        arr.prototype = ['a', 'b', 'c'];
        var result = '';
        yield every(arr, function* (k, v) {
          result += k;
          if (k === 'prototype') {
            result += v.join('');
          } else {
            result += v;
          }
        });
        should(result).equal('01122334455667');
      });

      it('array result should not contains __proto__', function* () {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        arr.__proto__ = ['a', 'b', 'c'];
        var result = '';
        yield every(arr, function* (k, v) {
          result += k;
          if (k === '__proto__') {
            result += v.join('');
          } else {
            result += v;
          }
        });
        should(result).equal('01122334455667');
      });
    });

    describe('object', function () {
      it('object result should contains prototype', function* () {
        var obj = {
          'a': 'A',
          'b': 'B',
          'c': 'C',
          'd': 'D'
        };
        obj.prototype = ['E', 'F'];

        var result = '';
        yield every(obj, function* (k, v) {
          result += k;
          if (k === 'prototype') {
            result += v.join('');
          } else {
            result += v;
          }
        });
        should(result).equal('aAbBcCdDprototypeEF');
      });

      it('object result should not contains __proto__', function* () {
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
        yield every(obj, function* (k, v) {
          result += k;
          result += v;
        });
        should(result).equal('aAbBcCdD');
      });
    });

    describe('map', function () {
      it('map result should not contains prototype', function* () {
        var map = new Map();
        map.set('a', 'A');
        map.set('b', 'B');
        map.set('c', 'C');
        map.set('d', 'D');

        map.prototype = ['E', 'F'];

        var result = '';
        yield every(map, function* (k, v) {
          result += k;
          if (k === 'prototype') {
            result += v.join('');
          } else {
            result += v;
          }
        });
        should('aAbBcCdD').equal(result);
      });

      it('map result should not contains __proto__', function* () {
        var map = new Map();
        map.set('a', 'A');
        map.set('b', 'B');
        map.set('c', 'C');
        map.set('d', 'D');

        map.__proto__['e'] = 'E';
        map.__proto__['f'] = 'F';

        var result = '';
        yield every(map, function* (k, v) {
          result += k;
          result += v;
        });

        delete map.__proto__['e'];
        delete map.__proto__['f'];

        should(result).equal('aAbBcCdD');
      });
    });

    describe('filter', function () {
      it('test for array', function* () {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        var result = '';
        yield every(arr, function* (k, v) {
          result += k;
          result += v;
        }, function* (k, v) { // filter
          return (v % 2) === 0;
        });
        should(result).equal('123456');
      });

      it('test for object', function* () {
        var obj = {
          'a': 'A',
          'b': 'B',
          'c': 'C',
          'd': 'D',
          'e': 'E',
          'f': 'F'
        };
        var result = '';
        yield every(obj, function* (k, v) {
          result += k;
          result += v;
        }, function* (k, v) {
          return k === 'a' || k === 'd'
        });
        should(result).equal('aAdD');
      });
    });

  });
} else {
  describe('every is not suitable for this node ', function () {});
}