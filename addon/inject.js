import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';

function lookupMethodName(object, method) {
  let methodNameCache = object._methodNameCache;
  if (methodNameCache == null) {
    methodNameCache = object._methodNameCache = new WeakMap();
  }

  let methodName = methodNameCache.get(method);
  while ((object = Object.getPrototypeOf(object)) && methodName == null) {
    let keys = Object.getOwnPropertyNames(object);
    for (let key of keys) {
      let descriptor = Object.getOwnPropertyDescriptor(object, key);
      if (descriptor.value === method) {
        methodNameCache.set(method, key);
        methodName = key;
        break;
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
