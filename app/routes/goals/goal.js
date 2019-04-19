import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class GoalsGoalRoute extends Route {
  @service goals;

  model({ id }) {
    if (id === 'demo') {
      return this.goals.demo();
    }
    else {
      return this.goals.goals.findBy('id', id);
    }
  }

  afterModel(model) {
    if (!model) {
      this.transitionTo('goals.index');
    }
  }
}
