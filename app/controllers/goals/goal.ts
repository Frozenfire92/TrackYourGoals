import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import GoalsService from 'track-your-goals/services/goals';
import SettingsService from 'track-your-goals/services/settings';
import ModalService from 'track-your-goals/services/modal';

export default class GoalsGoalController extends Controller {
  @service goals!: GoalsService;
  @service settings!: SettingsService;
  @service modal!: ModalService;

  @tracked editName = false;
  @tracked trigger = false;

  @computed('model.records.@each.value')
  get streak() {
    return this.goals.computeStreak(this.model);
  }

  @computed('model.records.@each.value')
  get dataHash() {
    let data: any = {};
    this.model.records.forEach((record: GoalRecord) =>
      data[record.date] = record.value
    );
    return data;
  }

  @action openGoalUpdaterModal(goal: Goal, date: string, allowSelection: boolean = false) {
    if (!date) {
      date = (new Date()).toISOString().slice(0,10);
    }
    let startValue = (goal.records.findBy('date', date) || { value: null }).value
    this.modal.open({
      title: date ? 'Update Record' : 'New Record',
      successAction: ([nudate, nuvalue]) => {
        this.goals.saveRecord(this.model, nudate, nuvalue);
      },
      component: 'goal-updater',
      model: goal,
      options: {
        startDate: date,
        startValue,
        allowSelection
      }
    });
  }

  @action save() {
    this.goals.save(this.model);
    this.editName = false;
  }

  @action delete() {
    let confirm = window.confirm('delete goal');
    if (confirm) {
      this.goals.delete(this.model);
      this.transitionToRoute('goals.index');
    }
  }
}
