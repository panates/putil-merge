/* putil-merge
 ------------------------
 (c) 2017-present Panates
 SQB may be freely distributed under the MIT license.
 For details and documentation:
 https://panates.github.io/putil-merge/
 */

function merge(target, ...sources) {
  return _merge({}, target, ...sources);
}

merge.init = function(cfg) {
  return function(target, ...sources) {
    return _merge(cfg, target, ...sources);
  };
};

merge.deep = function(target, ...sources) {
  return _merge({deep: true}, target, ...sources);
};

merge.deepClone = function(target, ...sources) {
  return _merge({deep: true, clone: true}, target, ...sources);
};

merge.clone = function(target, ...sources) {
  return _merge({clone: true}, target, ...sources);
};

function _merge(cfg, target, ...sources) {

  if (!isObject(target)) return target;

  if (cfg.clone)
    target = JSON.parse(JSON.stringify(target));

  sources.forEach(source => {
    if (isObject(source)) {
      const keys = Object.getOwnPropertyNames(source);
      for (const key of keys) {
        const src = source[key];
        if (isObject(src)) {
          if (!isObject(target[key]))
            target[key] = {};
          if (cfg.deep)
            target[key] = _merge(cfg, target[key], src);
          else if (cfg.clone)
            target[key] = JSON.parse(JSON.stringify(src));
          else target[key] = src;
        } else if (Array.isArray() && cfg.clone)
          target[key] = JSON.parse(JSON.stringify(src));
        else
          target[key] = src;
      }
    }
  });
  return target;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

module.exports = merge;
