import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | goals/index', function(hooks) {
  setupTest(hooks);

  test('model returns goals service goals array', function(assert) {
    let route = this.owner.lookup('route:goals/index');
    let service = this.owner.lookup('service:goals');
    const goals = [{ id: 1, name: 'wow', type: 'amount-integer', records: [] }];
    service.goals = goals;
    assert.deepEqual(route.model(), goals);
  });
});
