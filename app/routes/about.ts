import Route from '@ember/routing/route';
import ENV from 'track-your-goals/config/environment';

export default class AboutRoute extends Route {
  model() {
    return {
      version: ENV.APP.version
    }
  }
}
