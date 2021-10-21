'use strict';

// Karma configuration
module.exports = function(config) {

  config.set({

    // Base path that will be used to resolve all patterns
    // (eg. files, exclude)
    basePath: '../../',

    // Use mocha and chai for tests
    frameworks: ['mocha', 'chai'],

    // Web server port
    port: 9876,

    // Enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: OFF || ERROR || WARN || INFO || DEBUG
    logLevel: 'INFO',

    // Enable / disable watching file and executing tests whenever
    // any file changes
    autoWatch: false,

    // List of browsers to execute tests on
    browsers: ['ChromeHeadlessCI'],

    // Configure custom ChromHeadlessCI as an extension of ChromeHeadlessCI without sandbox
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

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
