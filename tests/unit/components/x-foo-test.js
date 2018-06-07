import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'ember-cli-htmlbars-inline-precompile';

import '@ember/test-helpers';

module('inject.method', function (hooks) {
  setupRenderingTest(hooks);

  test('inject-method', async function (assert) {
    this.set('oninit', (component) => {
      assert.equal(component.greet('Tom'), 'Hi Tom');
    });

    this.render(hbs`{{x-foo oninit=oninit}}`);
  });

  test('inject-method from root', async function (assert) {
    this.set('oninit', (component) => {
      assert.equal(component.greet('Zoey'), 'Hi Zoey');
    });

    this.render(hbs`{{x-bar oninit=oninit}}`);
  });
});
