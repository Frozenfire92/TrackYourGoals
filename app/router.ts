import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('goals', function() {
    this.route('goal', { path: '/:id' });
    this.route('create');
  });
  this.route('settings');
  this.route('data');
  this.route('about');
});

export default Router;
