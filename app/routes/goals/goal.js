import Route from '@ember/routing/route';

export default class GoalsGoalRoute extends Route {
  model({ id }) {
    return this.store.findRecord('goal', id);
  }
}
