import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class ApplicationController extends Controller {
  @computed('target.currentPath')
  get pathClass() {
    return this.target.currentPath.replace(/\./g, '-');
  }
}
