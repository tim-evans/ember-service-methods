import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('x-foo', 'inject.method', {
  integration: false,
  needs: ['service:greet']
});

test('inject-method', function(assert) {
  let component = this.subject();
  assert.equal(component.greet('Tom'), 'Hi Tom');
});
