'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/zonkyio/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "Track Your Goals",
    short_name: "Track Your Goals",
    description: "An app for tracking daily goals",
    start_url: "/TrackYourGoals/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: '/assets/images/icon-192.png',
        sizes: '192x192'
      },
      {
        src: '/assets/images/icon-512.png',
        sizes: '512x512'
      }
    ],
    ms: {
      tileColor: '#fff'
    }
  };
}
