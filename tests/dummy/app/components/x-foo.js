import Component from '@ember/component';
import method from 'ember-service-methods/inject';

export default Component.extend({
  greet: method(),
  init() {
    this._super();
    this.oninit(this);
  }
});
