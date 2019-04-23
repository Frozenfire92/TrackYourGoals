import Service from '@ember/service';

import { inLocalStorage, setHtmlClass } from 'track-your-goals/utils/decorators';
import visualizationColorSchemes from 'track-your-goals/utils/visualization-color-schemes';

export default class SettingsService extends Service {
  constructor(){
    super(...arguments);
    // Call this initially to set the class on the html element
    this.appColorScheme;
  }

  @setHtmlClass
  @inLocalStorage
  appColorScheme = 'light';

  @inLocalStorage
  visualizationColorScheme = 'interpolateBlues';

  visualizationColorSchemes = visualizationColorSchemes;
}
