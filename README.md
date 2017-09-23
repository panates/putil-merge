# putil-merge

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][devdependencies-image]][devdependencies-url]

A 'swiss army knife' solution for merging multiple objects into one. It supports deep merge, cloning objects, copying descriptors and filtering.

## Installation

`$ npm install putil-merge --save`


## Usage

`merge([config], target, [source])`

- config [`Object`]
    - deep [`Boolean`]: If true, it performs deep merge operation.
    - clone [`Boolean`]: If true, it clones objects except setting references
    - descriptor [`Boolean`]: If true, it copies descriptors
    - filter [`Function(obj, key, value)`]
- target [`Object`]
- source [`Object|Array<Object>`]

## Sequential calling

It supports sequential calling style.

`merge.(option).(option)...(target, source)`

Etc:

`merge(target, source)`

`merge.deep(target, source)`

`merge.deep.clone(target, source)`

`merge.clone.deep(target, source)`

`merge.descriptor(target, source)`

`merge.deep.descriptor(target, [source1, source2])`

`merge.clone.descriptor(target, source)`

`merge.deep.clone.descriptor(target, [source1, source2])`

`merge.deep.clone.descriptor(target, source)`

`merge.clone.deep.descriptor(target, source)`

`merge.descriptor.clone.deep(target, source)`

`merge.descriptor.filter(filterfn)(target, source)`

## Examples

Merge source object over target object:

```js
const a = {prm1: 1, prm2: 2};
const b = {prm1: 11, prm3: [1, 2, 3, 4]};
var merged = merge(a, b);
```

Clone any object:

```js
const a = {prm1: 1, prm2: { prm3: 3}};
var cloned = merge.clone(a);
var deepCloned = merge.deep.clone(a);
```

Merge source object over target object with custom filtering:
```js
var a = {id: 1};
var b = {name: 'John', surname: 'Wick'};
var merged = merge.deep.filter(function(o,k,v){
  return k === 'name';  
})(target, source);
```

## Node Compatibility

  - node `>= 0.10`;
  
### License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/putil-merge.svg
[npm-url]: https://npmjs.org/package/putil-merge
[travis-image]: https://img.shields.io/travis/panates/putil-merge/master.svg
[travis-url]: https://travis-ci.org/panates/putil-merge
[coveralls-image]: https://img.shields.io/coveralls/panates/putil-merge/master.svg
[coveralls-url]: https://coveralls.io/r/panates/putil-merge
[downloads-image]: https://img.shields.io/npm/dm/putil-merge.svg
[downloads-url]: https://npmjs.org/package/putil-merge
[gitter-image]: https://badges.gitter.im/panates/putil-merge.svg
[gitter-url]: https://gitter.im/panates/putil-merge?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[dependencies-image]: https://david-dm.org/panates/putil-merge/status.svg
[dependencies-url]:https://david-dm.org/panates/putil-merge
[devdependencies-image]: https://david-dm.org/panates/putil-merge/dev-status.svg
[devdependencies-url]:https://david-dm.org/panates/putil-merge?type=dev
[quality-image]: http://npm.packagequality.com/shield/putil-merge.png
[quality-url]: http://packagequality.com/#?package=putil-merge
