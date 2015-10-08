import Ember from 'ember';

const { assert } = Ember;

function lookupMethodName(object, method) {
  let methodNameCache = object._methodNameCache;
  if (methodNameCache == null) {
    methodNameCache = object._methodNameCache = Ember.Map.create();
  }

  let methodName = methodNameCache.get(method);
  if (methodName == null) {
    for (var key in object) {
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

    assert('Attempting to lookup an injected method on an object without a container, ensure that the object was instantiated via a container.', this.container);

    let service = this.container.lookup('service:' + (name || methodName));
    return service.method.apply(service, args);
  };

  return method;
}
