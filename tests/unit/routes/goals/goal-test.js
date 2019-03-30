import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | goals/goal', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:goals/goal');
    assert.ok(route);
  });
});
