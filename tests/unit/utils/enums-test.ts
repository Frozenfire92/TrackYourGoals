import { GoalType } from 'track-your-goals/utils/enums';
import { module, test } from 'qunit';

module('Unit | Utility | enums', function(/* hooks */) {

  // Replace this with your real tests.
  test('it works', function(assert) {
    assert.equal(GoalType.Boolean, 0);
    assert.equal(GoalType.Float, 1);
    assert.equal(GoalType.Integer, 2);
  });
});
