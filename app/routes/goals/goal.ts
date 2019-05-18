import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';
import GoalsService from 'track-your-goals/services/goals';

export default class GoalsGoalRoute extends Route {
  @service goals!: GoalsService;

  model({ id }: { id: string }): Goal | undefined {
    if (id === 'demo') {
      return this.goals.demo;
    }
    else {
      return this.goals.goals.findBy('id', id);
    }
  }

  afterModel(model: Goal | undefined) {
    if (!model) {
      this.transitionTo('goals.index');
    }
  }
}
