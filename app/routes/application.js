import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service settings

  beforeModel(){
    // Call this initially to set the class on the html element
    this.settings.appColorScheme;
  }

  redirect(model, transition){
    if (transition.targetName === 'index') {
      this.transitionTo('goals');
    }
  }
}
