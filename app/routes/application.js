import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  redirect(model, transition){
    if (transition.targetName === 'index') {
      this.transitionTo('goals');
    }
  }
}
