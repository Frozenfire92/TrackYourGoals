import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import SettingsService from 'track-your-goals/services/settings';
import Transition from '@ember/routing/-private/transition';

export default class ApplicationRoute extends Route {
  @service settings!: SettingsService;

  beforeModel(){
    // Call this initially to set the class on the html element
    this.settings.appColorScheme;
  }

  redirect(_model: any, transition: Transition){
    if (transition.to.name === 'index') {
      this.transitionTo('goals');
    }
  }
}
