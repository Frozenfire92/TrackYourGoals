import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModalService extends Service {
  @tracked title = null;
  @tracked message = null;
  @tracked cancelAction = null;
  @tracked isOpen = false;
  @tracked component = null;
  @tracked model = null;
  @tracked options = null;
  @tracked successText = null;

  @action open({
    title = null,
    message = null,
    successAction = null,
    successText = null,
    cancelAction = null,
    component = null,
    model = null,
    options = null
  } = {}) {
    if (
      title === null &&
      message === null &&
      successAction === null &&
      successText === null &&
      cancelAction === null &&
      component === null &&
      model === null &&
      options === null
    ) {
      this.isOpen = false;
      return;
    }
    else {
      this.title = title;
      this.message = message;
      this.successAction = successAction;
      this.successText = successText;
      this.cancelAction = cancelAction;
      this.component = component;
      this.model = model;
      this.options = options;
      this.isOpen = true;
    }
  }

  @action async ok() {
    if (this.successAction && typeof this.successAction === 'function') {
      await this.successAction(arguments);
    }
    this.close();
  }

  @action async cancel() {
    if (this.cancelAction && typeof this.cancelAction === 'function') {
      await this.cancelAction();
    }
    this.close();
  }

  @action close() {
    this.isOpen = false;
  }
}
