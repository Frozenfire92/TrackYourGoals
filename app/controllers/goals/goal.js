import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class GoalsGoalController extends Controller {
  @service store;

  @tracked editName = false;
  @tracked trigger = false;

  @action save() {
    this.model.save();
    this.editName = false;
  }

  @action delete() {
    let confirm = window.confirm('delete goal');
    if (confirm) {
      this.model.destroyRecord();
      this.transitionToRoute('goals');
    }
  }

  @action saveRecord(date, value) {
    let existingRecord = this.model.records.findBy('date', date);
    if (existingRecord) {
      set(existingRecord, 'value', value);
    }
    else {
      this.model.records.pushObject({ date, value });
    }
    set(this.model, 'records', this.model.records.sortBy('date'));
    this.model.save();
    this.toggleProperty('trigger');
  }
}
