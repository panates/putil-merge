/* putil-merge
 ------------------------
 (c) 2017-present Panates
 This file may be freely distributed under the MIT license.
 For details and documentation:
 https://github.com/panates/putil-merge
 */

function merge(options, target, sources) {

  if (!sources) {
    if (!target) {
      target = options;
      sources = null;
    } else {
      sources = target;
      target = options;
    }
    options = {};
  }
  if (sources && !Array.isArray(sources))
    sources = [sources];

  if (!isObjectKind(target))
    throw new TypeError('Property "target" requires object type');

  var visited = Map();

  const mergeValue = function(target, source, clone, deep) {
    if (source && typeof source === 'object') {
      // Circular reference detection
      var o;
      if ((o = visited.get(source)))
        return o;
      visited.put(source, target || 1);

      // If array
      if (Array.isArray(source)) {
        if (clone)
          target = cloneArray(source, clone);
        else target = source;
      }
      // If object
      else if (isObject(source)) {
        if (clone || deep) {
          target = mergeObject((isObject(target) && deep ? target : {}),
              source, clone, deep);
        } else target = source;
      }

      // Add to map for circular reference detection
      visited.put(source, target);
      return target;
    }
    return source;
  };

  const mergeObject = function mergeObject(target, source, clone, deep) {
    if (source === target) return target;
    Object.getOwnPropertyNames(source).forEach(function(key) {
      var src = Object.getOwnPropertyDescriptor(source, key);
      var trg = Object.getOwnPropertyDescriptor(target, key);
      if (options.filter && !options.filter(source, key, src))
        return;
      var val = mergeValue(trg && trg.value, src.value, clone, deep);
      if (options.descriptor) {
        src.val = val;
        Object.defineProperty(target, key, src);
      } else target[key] = val;
    });
    return target;
  };

  const cloneArray = function cloneArray(source, cloneObjects) {
    if (cloneObjects) {
      // Clone object items
      target = new Array(source.length);
      source.forEach(function(v, i) {
        target[i] = mergeValue(null, v, true);
      });
      return target;
    }
    return source.slice();
  };

  if (options.clone && typeof target === 'object')
    target = mergeObject({}, target, true, true);

  if (sources)
    sources.forEach(function(source, idx) {
      if (!isObject(source))
        throw new TypeError('Invalid source object at (' + idx +
            '). Can`t merge different types');
      target = mergeObject(target, source, options.clone, options.deep);
    });

  return target;
}

makeSequence(merge);

function makeSequence(m) {
  const bindFn = function(fn) {
    if (!fn.options) {
      var options = {};
      fn = function(target, sources) {
        return merge(options, target, sources);
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

function Map() {
  var keys = [], values = [];

  return {
    put: function(key, value) {
      var index = keys.indexOf(key);
      if (index < 0) {
        keys.push(key);
        values.push(value);
      } else {
        values[index] = value;
      }
    },
    get: function(key) {
      const i = keys.indexOf(key);
      return i >= 0 ? values[i] : undefined;
    }
  };
}

module.exports = merge;
