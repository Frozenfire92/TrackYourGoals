import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GoalUpdaterComponent extends Component {
  constructor(){
    super(...arguments);
    this.date = (new Date()).toISOString().slice(0, 10);
  }

  @tracked date = null;
  @tracked showDate = false;

  get today() {
    if (this.date === (new Date()).toISOString().slice(0, 10)) {
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

    switch (this.args.goal.type) {
      case 'boolean': value = e.target.complete.checked; break;
      case 'amount': value = e.target.amount.value; break;
    }

    if (this.args.submit && typeof this.args.submit === 'function') {
      this.args.submit(
        this.date,
        value
      );
    }
  }
}
