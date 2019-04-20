import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class GoalsGoalController extends Controller {
  @service goals;
  @service settings;

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
