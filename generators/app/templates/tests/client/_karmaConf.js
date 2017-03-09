'use strict';

// Karma configuration
module.exports = function(config) {

  config.set({

    // Base path that will be used to resolve all patterns
    // (eg. files, exclude)
    basePath: '../../',

    // List of files / patterns to load in the browser
    files: [
      'assets/lib/angular/angular.js',
      'assets/lib/angular-route/angular-route.js',
      'assets/lib/angular-mocks/angular-mocks.js',
      'tests/client/unitTests/i18n/I18nApp.js',
      'app/client/admin/js/ov<%= Plugin %>/<%= Plugin %>App.js',
      'app/client/admin/js/ov<%= Plugin %>/**/*.js',
      'tests/client/unitTests/**/*.js'
    ]

  });

};
