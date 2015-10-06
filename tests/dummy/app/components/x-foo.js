import Ember from 'ember';
import injectMethod from 'ember-service-methods/inject-method';

export default Ember.Component.extend({
  greet: injectMethod()
});
