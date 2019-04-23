import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | modal', function(hooks) {
  setupTest(hooks);

  module('@action open', function() {
    test(`doesn't open without some required properties`, function(assert) {
      let service = this.owner.lookup('service:modal');
      service.open();
      assert.equal(service.title, null);
      assert.equal(service.message, null);
      assert.equal(service.cancelAction, null);
      assert.equal(service.component, null);
      assert.equal(service.model, null);
      assert.equal(service.options, null);
      assert.equal(service.successText, null);
      assert.equal(service.isOpen, false);
    });

    test('all properties can be set', function(assert) {
      let service = this.owner.lookup('service:modal');

      service.open({ title: 'wow' });
      assert.equal(service.title, 'wow');
      assert.equal(service.message, null);
      assert.equal(service.cancelAction, null);
      assert.equal(service.component, null);
      assert.equal(service.model, null);
      assert.equal(service.options, null);
      assert.equal(service.successText, null);
      assert.equal(service.isOpen, true);

      service.open({
        title: 'cool',
        message: 'nice',
        cancelAction: true,
        component: 'wow',
        model: { id: '123' },
        options: {},
        successText: 'Confirm',
      });
      assert.equal(service.title, 'cool');
      assert.equal(service.message, 'nice');
      assert.equal(service.cancelAction, true);
      assert.equal(service.component, 'wow');
      assert.deepEqual(service.model, { id: '123' });
      assert.deepEqual(service.options, {});
      assert.equal(service.successText, 'Confirm');
      assert.equal(service.isOpen, true);
    });
  });

  module('@action ok', function() {
    test('works without a successAction', async function(assert) {
      let service = this.owner.lookup('service:modal');
      service.open({ title: 'wow' });
      assert.equal(service.isOpen, true);
      await service.ok();
      assert.equal(service.isOpen, false);
    });

    test('works with a successAction', async function(assert) {
      assert.expect(6);
      let service = this.owner.lookup('service:modal');
      service.open({
        title: 'wow',
        successAction: () => assert.ok(true)
      });
      assert.equal(service.isOpen, true);
      await service.ok();
      assert.equal(service.isOpen, false);

      service.open({
        title: 'wow',
        successAction: ([value]) => assert.equal(value, 123)
      });
      assert.equal(service.isOpen, true);
      await service.ok(123);
      assert.equal(service.isOpen, false);
    });
  });

  module('@action cancel', function() {
    test('works without a cancelAction', async function(assert) {
      let service = this.owner.lookup('service:modal');
      service.open({ title: 'wow' });
      assert.equal(service.isOpen, true);
      await service.cancel();
      assert.equal(service.isOpen, false);
    });

    test('works with a cancelAction', async function(assert) {
      assert.expect(3);
      let service = this.owner.lookup('service:modal');
      service.open({
        title: 'wow',
        cancelAction: () => assert.ok(true)
      });
      assert.equal(service.isOpen, true);
      await service.cancel();
      assert.equal(service.isOpen, false);
    });
  });

  module('@action close', function() {
    test('works', function(assert) {
      let service = this.owner.lookup('service:modal');
      service.open({ title: 'wow' });
      assert.equal(service.isOpen, true);
      service.close();
      assert.equal(service.isOpen, false);
    });
  });
});
