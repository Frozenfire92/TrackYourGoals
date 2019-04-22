import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class GoalsGoalController extends Controller {
  @service goals;
  @service settings;
  @service modal;

  @tracked editName = false;
  @tracked trigger = false;

  @computed('model.records.@each.value')
  get streak() {
    return this.goals.computeStreak(this.model);
  }

  @computed('model.records.@each.value')
  get dataHash() {
    let data = {};
    this.model.records.forEach(record =>
      data[record.date] = record.value
    );
    return data;
  }

  @action openGoalUpdaterModal(goal, date) {
    let startValue = date
      ? (goal.records.findBy('date', date) || { value: null }).value
      : null;
    this.modal.open({
      title: date ? 'Update Record' : 'New Record',
      successAction: ([nudate, nuvalue]) => {
        this.goals.saveRecord(this.model, nudate, nuvalue);
      },
      component: 'goal-updater',
      model: goal,
      options: {
        startDate: date,
        startValue
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
