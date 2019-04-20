import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service settings

  constructor(){
    super(...arguments);
    // Ensure we set this initially or dark mode won't show up until called
    this.settings.appColorScheme;
  }

  redirect(model, transition){
    if (transition.targetName === 'index') {
      this.transitionTo('goals');
    }
  }
}
