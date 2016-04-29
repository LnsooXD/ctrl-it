"use strict";
/*!
 * ctrl-it - test/some.test.js
 * Copyright(c) 2016 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */
var util = require('../lib/util');

if (util.isGeneratable()) {

  require('mocha-generators').install();

  var some = require('../lib/some');
  var should = require('should');

  describe('some', function () {
    describe('array', function () {

      it('common test for array', function *() {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        var result = '';
        yield some(arr, function *(k, v) {
          result += k;
          result += v;
        });
        should(result).equal('01122334455667');
      });

      it('break test for array', function *() {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        var result = '';
        yield some(arr, function *(k, v) {
          result += k;
          result += v;
          if (k == 4) {
            return true;
          }
        });
        should(result).equal('0112233445');
      });

      it('array result should contains prototype', function *() {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        arr.prototype = ['a', 'b', 'c'];
        var result = '';
        yield some(arr, function* (k, v) {
          result += k;
          if (k === 'prototype') {
            result += v.join('');
          } else {
            result += v;
          }
        });
        should(result).equal('01122334455667prototypeabc');
      });


      it('array result should not contains __proto__', function *() {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        arr.__proto__ = ['a', 'b', 'c'];
        var result = '';
        yield some(arr, function *(k, v) {
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
      it('object result should contains prototype', function *() {
        var obj = {
          'a': 'A',
          'b': 'B',
          'c': 'C',
          'd': 'D'
        };
        obj.prototype = ['E', 'F'];

        var result = '';
        yield some(obj, function *(k, v) {
          result += k;
          if (k === 'prototype') {
            result += v.join('');
          } else {
            result += v;
          }
        });
        should(result).equal('aAbBcCdDprototypeEF');
      });

      it('object result should contains __proto__', function* () {
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
        yield some(obj, function *(k, v) {
          result += k;
          result += v;
        });
        should(result).equal('aAbBcCdDeEfF');
      });
    });

    describe('filter', function () {
      it('test for array', function* () {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        var result = '';
        yield some(arr, function* (k, v) {
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
        yield some(obj, function* (k, v) {
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
  describe('some is not suitable for this node ', function () {
  });
}
