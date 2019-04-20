import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  constructor(){
    super(...arguments);
    console.log(this.settings.appColorScheme);
  }

  @service settings

  @computed('target.currentPath')
  get pathClass() {
    return this.target.currentPath.replace(/\./g, '-');
  }
}
