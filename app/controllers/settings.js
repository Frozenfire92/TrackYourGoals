import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SettingsController extends Controller {
  @service settings;

  @action updateVisualizationColorScheme(e) {
    this.settings.model.set('visualizationColorScheme', e.target.value);
    this.settings.model.save();
  }

  @action updateAppColorScheme(e) {
    this.settings.model.set('appColorScheme', e.target.value);
    this.settings.model.save();
  }
}
