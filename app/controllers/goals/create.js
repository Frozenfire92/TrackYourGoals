import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class GoalsCreateController extends Controller {
  @service goals;

  @action create() {
    let goal = this.goals.create(...arguments);
    this.transitionToRoute('goals.goal', goal.id);
  }
}
