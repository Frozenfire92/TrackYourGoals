import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class GoalsCreateController extends Controller {
  @service store;

  @action create(name, type) {
    if (name && type) {
      this.store
        .createRecord('goal', { name, type })
        .save()
        .then((goal) => this.transitionToRoute('goals.goal', goal.id));
    }
  }
}
