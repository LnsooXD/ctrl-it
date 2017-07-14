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
      should('01122334455667').equal(result);
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
      should('0112233445').equal(result);
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
      should('01122334455667').equal(result);
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
      should('01122334455667').equal(result);
    });
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
      should('aAbBcCdDprototypeEF').equal(result);
    });

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
      should('aAbBcCdD').equal(result);
    });
  });

  describe('map', function () {
    it('map result should not contains prototype', function () {
      var map = new Map();
      map.set('a', 'A');
      map.set('b', 'B');
      map.set('c', 'C');
      map.set('d', 'D');

      map.prototype = ['E', 'F'];

      var result = '';
      each(map, function (k, v) {
        result += k;
        if (k === 'prototype') {
          result += v.join('');
        } else {
          result += v;
        }
      });
      should('aAbBcCdD').equal(result);
    });

    it('map result should not contains __proto__', function () {
      var map = new Map();
      map.set('a', 'A');
      map.set('b', 'B');
      map.set('c', 'C');
      map.set('d', 'D');

      map.__proto__['e'] = 'E';
      map.__proto__['f'] = 'F';

      var result = '';
      each(map, function (k, v) {
        result += k;
        result += v;
      });

      delete map.__proto__['e'];
      delete map.__proto__['f'];

      should('aAbBcCdD').equal(result);
    });
  });


  describe('filter', function () {
    it('test for array', function () {
      var arr = [1, 2, 3, 4, 5, 6, 7];
      var result = '';
      each(arr, function (k, v) {
        result += k;
        result += v;
      }, function (k, v) { // filter
        return (v % 2) === 0;
      });
      should('123456').equal(result);
    });

    it('test for object', function () {
      var obj = {
        'a': 'A',
        'b': 'B',
        'c': 'C',
        'd': 'D',
        'e': 'E',
        'f': 'F'
      };
      var result = '';
      each(obj, function (k, v) {
        result += k;
        result += v;
      }, function (k, v) {
        return k === 'a' || k === 'd'
      });
      should('aAdD').equal(result);
    });
  });

});