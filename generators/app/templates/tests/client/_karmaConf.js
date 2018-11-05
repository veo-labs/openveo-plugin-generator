'use strict';

// Karma configuration
module.exports = function(config) {

  config.set({

    // Base path that will be used to resolve all patterns
    // (eg. files, exclude)
    basePath: '../../',

    // List of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'tests/client/unitTests/i18n/I18nApp.js',
      'app/client/admin/js/ov<%= Plugin %>/<%= Plugin %>App.js',
      'app/client/admin/js/ov<%= Plugin %>/**/*.js',
      'tests/client/unitTests/**/*.js'
    ]

  });

};
