import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service settings

  redirect(model, transition){
    if (transition.targetName === 'index') {
      this.transitionTo('goals');
    }
  }
}
