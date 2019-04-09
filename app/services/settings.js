import Service, { inject as service } from '@ember/service';

import visualizationColorSchemes from 'track-your-goals/utils/visualization-color-schemes';

export default class SettingsService extends Service {
  @service store

  constructor() {
    super(...arguments);
    // For some reason findRecord doesn't work here
    // TODO file a bug with ember-local-storage
    this.store.queryRecord('setting', { id: 'app' })
      .then((model) => {
        if (!model) {
          model = this.store.createRecord('setting', { id: 'app' });
          model.save();
        }
        this.model = model;
      });
  }

  visualizationColorSchemes = visualizationColorSchemes;
}
