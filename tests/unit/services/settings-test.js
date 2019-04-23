import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import visualizationColorSchemes from 'track-your-goals/utils/visualization-color-schemes';

module('Unit | Service | settings', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(() => {
    localStorage.clear();
  });

  test('you can set appColorScheme', function(assert) {
    let service = this.owner.lookup('service:settings');
    assert.equal(service.appColorScheme, 'light');
    service.appColorScheme = 'dark';
    assert.equal(service.appColorScheme, 'dark');
    assert.deepEqual(JSON.parse(localStorage.getItem('SettingsService-appColorScheme')), {
      value: 'dark'
    });
    assert.ok(document.documentElement.classList.contains('dark'));
    assert.ok(!document.documentElement.classList.contains('light'));

    service.appColorScheme = 'light';
    assert.equal(service.appColorScheme, 'light');
    assert.deepEqual(JSON.parse(localStorage.getItem('SettingsService-appColorScheme')), {
      value: 'light'
    });
    assert.ok(document.documentElement.classList.contains('light'));
    assert.ok(!document.documentElement.classList.contains('dark'));
  });

  test('you can set visualizationColorScheme', function(assert) {
    let service = this.owner.lookup('service:settings');
    assert.equal(service.visualizationColorScheme, 'interpolateBlues');
    service.visualizationColorScheme = 'interpolateGnBu';
    assert.equal(service.visualizationColorScheme, 'interpolateGnBu');
    assert.deepEqual(JSON.parse(localStorage.getItem('SettingsService-visualizationColorScheme')), {
      value: 'interpolateGnBu'
    });
  });

  test('it has static color scheme', function(assert) {
    let service = this.owner.lookup('service:settings');
    assert.deepEqual(service.visualizationColorSchemes, visualizationColorSchemes);
  });
});
