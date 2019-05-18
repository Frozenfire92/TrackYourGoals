import Component from '@glimmer/component';
import { action } from '@ember/object';

export type Args = {
  change: (name: string, result: string | ArrayBuffer | null, type: any) => void;
};

export default class FileUploadComponent extends Component<Args> {
  @action
  change(event: { target: { files: any[]; }; }) {
    if (this.args.change && typeof this.args.change === 'function') {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        //@ts-ignore
        this.args.change(
          file.name,
          reader.result,
          file.type);
      };
      reader.readAsText(file);
    }
  }
}
