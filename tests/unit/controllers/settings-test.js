import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | settings', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it has a settings service', function(assert) {
    let controller = this.owner.lookup('controller:settings');
    let service = this.owner.lookup('service:settings');
    assert.equal(controller.settings, service);
  });
});
