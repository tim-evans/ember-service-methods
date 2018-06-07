import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';

function lookupMethodName(object, method) {
  let methodNameCache = object._methodNameCache;
  if (methodNameCache == null) {
    methodNameCache = object._methodNameCache = new WeakMap();
  }

  let methodName = methodNameCache.get(method);
  if (methodName == null) {
    for (let key in object) {
      if (object[key] === method) {
        methodNameCache.set(method, key);
        methodName = key;
      }
    }
  }

  return methodName;
}

export default function (name) {
  var method = function (...args) {
    let methodName = lookupMethodName(this, method);
    let owner = getOwner(this);

    assert('Attempting to lookup an injected method on an object without an owner, ensure that the object was instantiated properly with an owner.', owner);

    let service = owner.lookup('service:' + (name || methodName));
    return service.execute.apply(service, args);
  };

  return method;
}
