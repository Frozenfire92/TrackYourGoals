import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import GoalsService from 'track-your-goals/services/goals';

export default class GoalsIndexRoute extends Route {
  @service goals!: GoalsService;

  model() {
    return this.goals.goals;
  }
}
