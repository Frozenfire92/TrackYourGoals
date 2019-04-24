import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { set } from '@ember/object';

module('Unit | Controller | goals/create', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(() =>
    localStorage.clear()
  )

  // Replace this with your real tests.
  test('@action create', function(assert) {
    let controller = this.owner.lookup('controller:goals/create');
    let goals = this.owner.lookup('service:goals');
    console.log('controller', controller, goals);
    assert.equal(goals.goals.length, 0);
    controller.send('create', 'wow', 'boolean');
    // assert.equal(goals.goals.length, 1);
    // assert.equal(goals.goals[1].type, 'boolean');
    // assert.equal(goals.goals[0].name, 'wow');
  });
});
