import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | goals/goal', function(hooks) {
  setupTest(hooks);

  module('model', function() {
    test('returns demo', function(assert) {
      let route = this.owner.lookup('route:goals/goal');
      let model = route.model({ id: 'demo' });
      assert.equal(model.id, 'demo');
      assert.equal(model.name, 'demo');
      assert.equal(model.type, 'amount-integer');
      assert.equal(model.records.length, 365);
    });

    test('returns by id', function(assert) {
      let route = this.owner.lookup('route:goals/goal');
      let service = this.owner.lookup('service:goals');
      service.goals = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ];

      let model = route.model({ id: '1' });
      assert.equal(model.id, '1');

      model = route.model({ id: '4' });
      assert.equal(model, undefined);
    });
  });
});
