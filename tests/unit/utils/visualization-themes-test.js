import visualizationColorSchemes from 'track-your-goals/utils/visualization-color-schemes';
import { module, test } from 'qunit';

module('Unit | Utility | visualization-color-schemes', function() {
  test('it works', function(assert) {
    Object.keys(visualizationColorSchemes).forEach(key => {
      assert.ok(visualizationColorSchemes[key].length);
    })
  });
});
