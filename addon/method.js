import Ember from 'ember';

export default function (method) {
  return Ember.Service.extend({ method });
}
