"use strict";
/*!
 * ctrl-it - test/total.test.js
 * Copyright(c) 2017 LnsooXD <LnsooXD@gmail.com>
 * MIT Licensed
 */

var total = require('../lib/total');
var should = require('should');

describe('total', function () {
  describe('array', function () {

    it('common test for array', async() => {
      var arr = [1, 2, 3, 4, 5, 6, 7];
      var result = '';
      await total(arr, async(k, v) => {
        result += k;
        result += v;
      });
      should(result).equal('01122334455667');
    });

    it('break test for array', async() => {
      var arr = [1, 2, 3, 4, 5, 6, 7];
      var result = '';
      await total(arr, async(k, v) => {
        result += k;
        result += v;
        if (k == 4) {
          return true;
        }
      });
      should(result).equal('0112233445');
    });

    it('array result should contains prototype', async() => {
      var arr = [1, 2, 3, 4, 5, 6, 7];
      arr.prototype = ['a', 'b', 'c'];
      var result = '';
      await total(arr, async(k, v) => {
        result += k;
        if (k === 'prototype') {
          result += v.join('');
        } else {
          result += v;
        }
      });
      should(result).equal('01122334455667prototypeabc');
    });

    it('array result should not contains __proto__', async() => {
      var arr = [1, 2, 3, 4, 5, 6, 7];
      arr.__proto__ = ['a', 'b', 'c'];
      var result = '';
      await total(arr, async(k, v) => {
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
    it('object result should contains prototype', async() => {
      var obj = {
        'a': 'A',
        'b': 'B',
        'c': 'C',
        'd': 'D'
      };
      obj.prototype = ['E', 'F'];

      var result = '';
      await total(obj, async(k, v) => {
        result += k;
        if (k === 'prototype') {
          result += v.join('');
        } else {
          result += v;
        }
      });
      should(result).equal('aAbBcCdDprototypeEF');
    });

    it('object result should contains __proto__', async() => {
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
      await total(obj, async(k, v) => {
        result += k;
        result += v;
      });
      should(result).equal('aAbBcCdDeEfF');
    });
  });

  describe('map', function () {
    it('map result should contains prototype', async() => {
      var map = new Map();
      map.set('a', 'A');
      map.set('b', 'B');
      map.set('c', 'C');
      map.set('d', 'D');

      map.prototype = ['E', 'F'];

      var result = '';
      await total(map, async(k, v) => {
        result += k;
        if (k === 'prototype') {
          result += v.join('');
        } else {
          result += v;
        }
      });
      'aAbBcCdDprototypeEF'.should.equal(result);
    });

    it('map result should contains __proto__', async() => {
      var map = new Map();
      map.set('a', 'A');
      map.set('b', 'B');
      map.set('c', 'C');
      map.set('d', 'D');

      map.__proto__['e'] = 'E';
      map.__proto__['f'] = 'F';

      var result = '';
      await total(map, async(k, v) => {
        result += k;
        result += v;
      });

      delete map.__proto__['e'];
      delete map.__proto__['f'];

      'aAbBcCdDeEfF'.should.equal(result);
    });
  });

  describe('filter', function () {
    it('test for array', async() => {
      var arr = [1, 2, 3, 4, 5, 6, 7];
      var result = '';
      await total(arr, async(k, v) => {
        result += k;
        result += v;
      }, function (k, v) { // filter
        return (v % 2) === 0;
      });
      should(result).equal('123456');
    });

    it('test for object', async() => {
      var obj = {
        'a': 'A',
        'b': 'B',
        'c': 'C',
        'd': 'D',
        'e': 'E',
        'f': 'F'
      };
      var result = '';
      await total(obj, async(k, v) => {
        result += k;
        result += v;
      }, async(k, v) => {
        return k === 'a' || k === 'd'
      });
      should(result).equal('aAdD');
    });
  });

});