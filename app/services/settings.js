import Service from '@ember/service';

import { inLocalStorage } from 'track-your-goals/utils/decorators';
import visualizationColorSchemes from 'track-your-goals/utils/visualization-color-schemes';

export default class SettingsService extends Service {
  @inLocalStorage appColorScheme = 'light';
  @inLocalStorage visualizationColorScheme = 'interpolateBlues';

  visualizationColorSchemes = visualizationColorSchemes;
}
