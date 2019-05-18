import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import GoalsService from 'track-your-goals/services/goals';

export default class GoalListComponent extends Component {
  @service goals!: GoalsService;
}
