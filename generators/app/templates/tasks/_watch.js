'use strict';

// Watch files for modifications
// For more information about Grunt watch, have a look at https://www.npmjs.com/package/grunt-contrib-watch
module.exports = {

  // Automatically rebuild back office when a file is modified
  'back-office': {
    files: [
      '<%- project.be %>/**/*',
      '<%- project.beViewsAssets %>/**/*',
      '<%- project.basePath %>/conf.js'
    ],
    tasks: ['build-back-office-client']
  }

};
