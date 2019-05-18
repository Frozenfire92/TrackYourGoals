import Service from '@ember/service';

import { inLocalStorage, setHtmlClass } from 'track-your-goals/utils/decorators';
import visualizationColorSchemes from 'track-your-goals/utils/visualization-color-schemes';

export default class SettingsService extends Service {
  @setHtmlClass
  // @ts-ignore
  @inLocalStorage
  appColorScheme: string = 'light';

  // @ts-ignore
  @inLocalStorage
  visualizationColorScheme: string = 'interpolateBlues';

  visualizationColorSchemes: object = visualizationColorSchemes;
}
