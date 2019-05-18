import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import SettingsService from 'track-your-goals/services/settings';

export default class SettingsController extends Controller {
  @service settings!: SettingsService;
}
