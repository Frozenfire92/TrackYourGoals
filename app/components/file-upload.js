import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FileUploadComponent extends Component {
  @action
  change(event) {
    if (this.args.change && typeof this.args.change === 'function') {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        this.args.change(
          file.name,
          reader.result,
          file.type);
      };
      reader.readAsText(file);
    }
  }
}
