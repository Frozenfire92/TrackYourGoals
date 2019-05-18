import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import ModalService from 'track-your-goals/services/modal';

export default class Modal extends Component {
  @service modal!: ModalService;
}
