/* putil-merge
 ------------------------
 (c) 2017-present Panates
 This file may be freely distributed under the MIT license.
 For details and documentation:
 https://github.com/panates/putil-merge
 */

function merge(target, ...sources) {
  return _merge({}, target, ...sources);
}

function _merge(options, target, ...sources) {

  if (!isObjectKind(target))
    throw new TypeError('Property "target" requires object type');

  const visited = new Map();
  if (options.clone) {
    sources.unshift(target);
    target = {};
  }

  const mergeValue = (target, source, clone, deep) => {
    if (source && typeof source === 'object') {
      // Circular reference detection
      let o;
      if ((o = visited.get(source)))
        return o;
      visited.set(source, target || 1);

      // If array
      if (Array.isArray(source)) {
        if (clone)
          target = cloneArray(source, clone, deep);
        else target = source;
      }
      // If object
      else if (isObject(source)) {
        if (clone || deep) {
          target = mergeObject((isObject(target) && deep ? target : {}),
              source, clone, deep);
        } else target =
            options.defaults && target !== undefined ? target : source;
      }

      // Add to map for circular reference detection
      visited.set(source, target);
      return target;
    }
    return options.defaults && target !== undefined ? target : source;
  };

  const mergeObject = (target, source, clone, deep) => {
    if (source === target) return target;
    for (const key of Object.getOwnPropertyNames(source)) {
      const src = Object.getOwnPropertyDescriptor(source, key);
      const trg = Object.getOwnPropertyDescriptor(target, key);
      if (options.filter && !options.filter(source, key, src.value))
        continue;
      const val = mergeValue(trg && trg.value, src.value, clone, deep);
      if (options.descriptor) {
        src.val = val;
        Object.defineProperty(target, key, src);
      } else target[key] = val;
    }
    return target;
  };

  const cloneArray = (source, cloneObjects, deep) => {
    if (cloneObjects) {
      // Clone object items
      const target = new Array(source.length);
      for (const [i, v] of source.entries()) {
        target[i] = mergeValue(null, v, true, deep);
      }
      return target;
    }
    return source.slice();
  };

  if (sources)
    for (const [idx, source] of sources.entries()) {
      if (!isObject(source))
        throw new TypeError('Invalid source object at (' + idx +
            '). Can`t merge different types');
      target = mergeObject(target, source, options.clone, options.deep);
    }

  return target;
}

function makeSequence(m) {
  const bindFn = function(fn) {
    if (!fn.options) {
      const options = {};
      fn = (target, ...sources) => {
        return _merge(options, target, ...sources);
      };
      fn.options = options;
      makeSequence(fn);
    }
    return fn;
  };
  Object.defineProperties(m, {
    clone: {
      get: function() {
        const fn = bindFn(this);
        fn.options.clone = true;
        return fn;
      }
    },
    deep: {
      get: function() {
        const fn = bindFn(this);
        fn.options.deep = true;
        return fn;
      }
    },
    descriptor: {
      get: function() {
        const fn = bindFn(this);
        fn.options.descriptor = true;
        return fn;
      }
    },
    defaults: {
      get: function() {
        const fn = bindFn(this);
        fn.options.defaults = true;
        return fn;
      }
    },
    filter: {
      value: function(filterFn) {
        const fn = bindFn(this);
        fn.options.filter = filterFn;
        return fn;
      }
    }
  });
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function isObjectKind(item) {
  return (item && (typeof item === 'object' || typeof item === 'function'));
}

makeSequence(merge);

module.exports = merge;
