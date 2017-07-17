# putil-merge

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][devdependencies-image]][devdependencies-url]

Lightweight solution for merging multiple objects into one. Also it supports deep merge

## Installation

  - `npm install putil-merge --save`

## Usage

`merge(target, ...source)`

Combines source objects with the target object without deep operation. Also it copies references instead of cloning.


`merge.deep(target, ...source)`

Combines source objects with the target object with deep operation. Also it copies references instead of cloning.

`merge.clone(target, ...source)`

Combines source objects with the target object without deep operation. Also it clones values.

`merge.deepClone(target, ...source)`

Combines source objects with the target object with deep operation. Also it clones values.

 

```javascript
const a = {l1a: 1, l1b: '2', l1d: {l2a: 1}};
const b = {l1b: 'b', l1c: 3, l1d: {l2b: {l3a: '2'}}, l1e: [1, 2, 3, 4]};
let o = merge(a, b);
```

## Node Compatibility

  - node `>= 6.x`;
  
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
