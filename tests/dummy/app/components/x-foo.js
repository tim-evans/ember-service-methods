import Ember from 'ember';
import method from 'ember-service-methods/inject';

export default Ember.Component.extend({
  greet: method()
});
