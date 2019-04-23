import {
  maxBoolean,
  maxFloat,
  maxInt
} from 'track-your-goals/utils/reduce';

import { module, test } from 'qunit';

module('Unit | Utility | reduce', function() {
  module('max', function() {
    test('boolean works', function(assert) {
      let a = [true, false, true, false];
      assert.ok(a.reduce(maxBoolean, 0))
    });
    test('float works', function(assert) {
      let a = [0, 1, 1.2, 0.1, 0.5, 2.2, 'asd'];
      assert.equal(a.reduce(maxFloat, 0), 2.2);
    });
    test('int works', function(assert) {
      let a = [0, 1, 3, 2, 2, 8, 1, 0];
      assert.equal(a.reduce(maxInt, 0), 8);
    });
  })
});
