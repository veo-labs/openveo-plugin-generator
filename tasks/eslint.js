'use strict';

// Eslint validation
// For more information about Grunt ESLint, have a look at https://www.npmjs.com/package/grunt-eslint
module.exports = {

  // Validate the whole project
  validate: {
    src: [
      'generators/*/config/*.js',
      'generators/*/src/*.js',
      'generators/*/index.js',
      'Gruntfile.js',
      'tasks/*/*.js'
    ]
  }
};
