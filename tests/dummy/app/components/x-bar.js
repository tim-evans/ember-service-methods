import Component from '@ember/component';
import { inject as method } from 'ember-service-methods';

export default Component.extend({
  greet: method(),
  init() {
    this._super();
    this.oninit(this);
  }
});
