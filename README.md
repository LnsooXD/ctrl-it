![build-status](https://travis-ci.org/LnsooXD/ctrl-it.svg)
#ctrl-it
====
A control-flow iterator. This is a extra of each. You Can break or continue when in iterating.
 
##Installation

```shell
$ npm install ctrl-it
```

##Example

```js
var it = require('ctrl-it');

var obj = {
    a: 'A',
    b: 'B',
    c: 'C'
}

obj.__proto__ = {
    'd': 'D',
    'e': 'E'
};

// itrate all prop of obj and array:
// common one:

var result = '';
it.any(obj, function(k, v){
    result += k;
    result += v;
});
// beacuse it has  __proto__ so result is:
// result == aAbBcCdDeE''

// generator one is: 
var result = '';
yield it.some(obj, function *(k, v){
    result += k;
    result += v;
    // run some generator codes
});
// beacuse it has  __proto__ so result is:
// result == aAbBcCdDeE''

// flow control, you can 'break' by return true
// common one:
var arr = [1, 2, 3, 4, 5, 6];

var result = '';
var count = 0;
it.each(arr, function(i, v){
    result += v;
    count ++;
    if (count >= 3) {
        return true; // 'return true' makes this iterator break;
    }
});
// beacuse of 'return true' breaking the iterator, resule is '123'


// generator one:
var result = '';
var count = 0;
yield it.every(arr, function* (i, v){
     result += v;
     count ++;
     if (count >= 3) {
         return true; // 'return true' makes this iterator break;
     }
 });
 // beacuse of 'return true' breaking the iterator, resule is '123
 
 // filter support
 // if 'filter' function not defined or return true, the 'iterator' function will receiver k, v pair.
 
 var obj = {
     a: 'A',
     b: 'B',
     c: 'C',
     e: 'E',
     f: 'F'
 }
 
 var result = '';
 it.each(obj, function iterator(k, v){
    result += k;
    result += v;
 }, function filter(k, v) {
    return 'k' === 'a' || 'k' === 'c'
 })
 
 // result === 'AC'
 
 var arr = [1,2,3,4,5,6,7]
 
 var result = '';
 yield it.every(arr, function* iterator(k, v) {
     result += k;
     result += v;
 }, function* filter(k, v) {
     return (v % 2) === 0;
});

// result === '123456'

// The filter all supported by it.any and it.some

```

##API

- it.any(obj, function it(key, value){...}) 

    >iterate all values of a object/array, even the hasOwnProperty function returns false
- it.some(obj, function* it(key, value){...})

    >the generator type function of it.any
- it.each(obj, function it(key, value){...})

    >just iterate the values of a object/array the hasOwnProperty function returns true 
- it.every(obj, function* it(key, value){...})

    >the generator type function of it.each
- flow control

    >if the iterator-callback function return true, the iterator will be breaked.

##Authors

- [LnsooXD](https://github.com/LnsooXD)

## License

- [MIT](http://spdx.org/licenses/MIT)
