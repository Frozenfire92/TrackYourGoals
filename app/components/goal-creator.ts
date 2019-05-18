import Component from '@glimmer/component';
import { action } from '@ember/object';

export type Args = {
  submit: (name: string, value: any) => void
}

export default class GoalCreatorComponent extends Component<Args> {
  @action submit(e: any) {
    e.preventDefault();
    if (this.args.submit && typeof this.args.submit === 'function') {
      this.args.submit(e.target.name.value, e.target.type.value);
    }
  }
}
