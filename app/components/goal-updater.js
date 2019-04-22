import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import moment from 'moment';

export default class GoalUpdaterComponent extends Component {
  constructor(){
    super(...arguments);
    this.date = (new moment()).format('YYYY-MM-DD');
  }

  @service modal;

  @tracked date = null;
  @tracked showDate = false;

  @computed('date')
  get today() {
    if (this.date === (new moment()).format('YYYY-MM-DD')) {
      this.showDate = false;
      return true;
    }
    return false;
  }

  @action showDateInput() {
    this.showDate = true;
  }

  @action submit(e) {
    e.preventDefault();

    let value;

    switch (this.args.model.type) {
      case 'boolean': value = e.target.complete.checked; break;
      case 'amount-integer':
      case 'amount-float': value = e.target.amount.value; break;
    }

    if (this.date && this.args.submit && typeof this.args.submit === 'function') {
      this.args.submit(
        this.args.options.startDate || this.date,
        value
      );
    }
  }
}
