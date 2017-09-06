/* eslint-disable */
const assert = require('assert');
const merge = require('../');

describe('merge', function() {

  it('test merge()', function(done) {
    const a = {l1a: 1, l1b: '2', l1d: {l2a: 1}};
    const b = {l1b: 'b', l1c: 3, l1d: {l2b: {l3a: '2'}}, l1e: [1, 2, 3, 4]};
    let o = merge(a, b);
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

  it('test merge.deep()', function(done) {
    const a = {l1a: 1, l1b: '2', l1d: {l2a: 1}};
    const b = {l1b: 'b', l1c: 3, l1d: {l2b: {l3a: '2'}}, l1e: [1, 2, 3, 4]};
    let o = merge.deep(a, b);
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

  it('test merge.deepClone()', function(done) {
    const a = {l1a: 1, l1b: '2', l1d: {l2a: 1}};
    const b = {l1b: 'b', l1c: 3, l1d: {l2b: {l3a: '2'}}, l1e: [1, 2, 3, 4]};
    let o = merge.deepClone(a, b);
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

  it('test merge.clone()', function(done) {
    const a = {l1a: 1, l1b: '2', l1d: {l2a: 1}};
    const b = {l1b: 'b', l1c: 3, l1d: {l2b: {l3a: '2'}}, l1e: [1, 2, 3, 4]};
    let o = merge.clone(a, b);
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

  it('test merge.init({clone: true})', function(done) {
    const a = {l1a: 1, l1b: '2', l1d: {l2a: 1}};
    const b = {l1b: 'b', l1c: 3, l1d: {l2b: {l3a: '2'}}, l1e: [1, 2, 3, 4]};
    let o = merge.init({clone: true})(a, b);
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

  it('test merge.init({filter: fn})', function(done) {
    const a = {a: 1, b: 2, c: 3};
    const b = {a: 10, b: 3, c: 13};
    let o = merge.init({
      filter: (k, v) => {
        return v < 10;
      }
    })(a, b);
    assert.deepEqual(o, {a: 1, b: 3, c: 3});
    done();
  });

});