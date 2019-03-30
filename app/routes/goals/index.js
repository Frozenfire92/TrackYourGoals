import Route from '@ember/routing/route';

export default class GoalsIndexRoute extends Route {
  model() {
    return this.store.findAll('goal');
  }
}
