import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import moment from 'moment';
import ModalService from 'track-your-goals/services/modal';

export type Args = {
  model: any,
  options: any,
  submit: (name: string, value: any) => any
}

export default class GoalUpdaterComponent extends Component<Args> {
  constructor(owner: unknown, args: any){
    super(owner, args);
    //@ts-ignore
    this.date = (new moment()).format('YYYY-MM-DD');
  }

  @service modal!: ModalService;

  @tracked date: string | null = null;
  @tracked showDate: boolean = false;

  @computed('date')
  get today() {
    //@ts-ignore
    if (this.date === (new moment()).format('YYYY-MM-DD')) {
      this.showDate = false;
      return true;
    }
    return false;
  }

  @action showDateInput() {
    this.showDate = true;
  }

  @action submit(e: any) {
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

  @action focusInput(element: HTMLElement) {
    element.focus();
  }
}
