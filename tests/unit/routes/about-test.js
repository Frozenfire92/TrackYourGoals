import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import ENV from 'track-your-goals/config/environment';

module('Unit | Route | about', function(hooks) {
  setupTest(hooks);

  test('model returns version', async function(assert) {
    let route = this.owner.lookup('route:about');
    let model = await route.model();
    assert.deepEqual(model, { version: ENV.APP.version }, 'has the version as the model');
  });
});
