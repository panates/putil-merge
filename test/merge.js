/* eslint-disable */
const assert = require('assert');
const merge = require('../');

describe('merge', function() {

  it('test merge()', function(done) {
    const a = {l1a: 1, l1b: '2', l1d: {l2a: 1}};
    const b = {l1b: 'b', l1c: 3, l1d: {l2b: {l3a: '2'}}, l1e: [1, 2, 3, 4]};
    var o = merge(a, b);
    assert.deepEqual(o, {
          l1a: 1,
          l1b: 'b',
          l1d: {l2b: {l3a: '2'}},
          l1c: 3,
          l1e: [1, 2, 3, 4]
        }
    );
    a.l1d = 'override';
    assert.equal(o.l1d, 'override');
    done();
  });

  it('test deep', function(done) {
    const a = {l1a: 1, l1b: '2', l1d: {l2a: 1}};
    const b = {l1b: 'b', l1c: 3, l1d: {l2b: {l3a: '2'}}, l1e: [1, 2, 3, 4]};
    var o = merge.deep(a, b);
    assert.deepEqual(o, {
          l1a: 1,
          l1b: 'b',
          l1d: {l2a: 1, l2b: {l3a: '2'}},
          l1c: 3,
          l1e: [1, 2, 3, 4]
        }
    );
    a.l1d.l2b = 'override';
    assert.equal(o.l1d.l2b, 'override');
    done();
  });

  it('test clone', function(done) {
    const a = {l1a: 1, l1b: '2', l1d: {l2a: 1}};
    const b = {l1b: 'b', l1c: 3, l1d: {l2b: {l3a: '2'}}, l1e: [1, 2, 3, 4]};
    var o = merge.clone(a, b);
    assert.deepEqual(o, {
          l1a: 1,
          l1b: 'b',
          l1d: {l2b: {l3a: '2'}},
          l1c: 3,
          l1e: [1, 2, 3, 4]
        }
    );
    a.l1d = 'override';
    assert.notEqual(o.l1d, 'override');
    done();
  });

  it('test deep+clone', function(done) {
    const a = {l1a: 1, l1b: '2', l1d: {l2a: 1}};
    const b = {l1b: 'b', l1c: 3, l1d: {l2b: {l3a: '2'}}, l1e: [1, 2, 3, 4]};
    var o = merge.deep.clone(a, b);
    assert.deepEqual(o, {
          l1a: 1,
          l1b: 'b',
          l1d: {l2a: 1, l2b: {l3a: '2'}},
          l1c: 3,
          l1e: [1, 2, 3, 4]
        }
    );
    a.l1d.l2b = 'override';
    assert.notEqual(o.l1d.l2b, 'override');
    done();
  });

  it('test descriptor', function(done) {
    const a = {};
    const b = {};
    const d1 = {
      value: 'b1',
      writable: false,
      configurable: false,
      enumerable: true
    };
    Object.defineProperty(b, 'b1', d1);
    var o = merge.descriptor(a, b);
    var d2 = Object.getOwnPropertyDescriptor(a, 'b1');
    assert.deepEqual(d1, d2);
    done();
  });

  it('test filter', function(done) {
    const a = {
      a: 1,
      b: 2
    };
    const b = {
      c: 3,
      d: 4
    };

    var o = merge.filter(function(o, k, v) {
      return k === 'd';
    })(a, b);
    assert.deepEqual(o, {a: 1, b: 2, d: 4});
    done();
  });

  it('test merge to function object', function(done) {
    const a = function() {};
    const b = {a: 11};
    var o = merge(a, b);
    assert.equal(o.a, 11);
    done();
  });

});