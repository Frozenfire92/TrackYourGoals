import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GoalCreatorComponent extends Component {
  @action submit(e) {
    e.preventDefault();
    if (this.args.submit && typeof this.args.submit === 'function') {
      this.args.submit(e.target.name.value, e.target.type.value);
    }
  }
}
