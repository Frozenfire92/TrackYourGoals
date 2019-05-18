import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import GoalsService from 'track-your-goals/services/goals';
import { GoalType } from 'track-your-goals/utils/enums';

export default class GoalsCreateController extends Controller {
  @service goals!: GoalsService;

  @action create(name: string, type: GoalType) {
    let goal = this.goals.create(name, type);
    this.transitionToRoute('goals.goal', goal.id);
  }
}
