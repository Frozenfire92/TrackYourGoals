import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModalService extends Service {
  @tracked isOpen: boolean = false;
  @tracked request: ModalRequest | null = null;

  @action open(request: ModalRequest): void {
    this.request = request;
    this.isOpen = true;
  }

  @action close(): void {
    this.isOpen = false;
    this.request = null;
  }

  @action async ok(): Promise<void> {
    if (this.request && this.request.successAction && typeof this.request.successAction === 'function') {
      await this.request.successAction(arguments);
    }
    this.close();
  }

  @action async cancel(): Promise<void> {
    if (this.request && this.request.cancelAction && typeof this.request.cancelAction === 'function') {
      await this.request.cancelAction();
    }
    this.close();
  }
}
