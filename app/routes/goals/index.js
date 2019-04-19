import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GoalsIndexRoute extends Route {
  @service goals;

  model() {
    return this.goals.goals;
  }
}
