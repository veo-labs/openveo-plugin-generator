'use strict';

var applicationConf = process.require<%= Plugin %>('conf.js');

/**
 * Gets the list of minified JavaScript files from the given list of files.
 *
 * It will just replace ".js" by ".min.js".
 *
 * @param Array files The list of files
 * @return Array The list of minified files
 */
function getMinifiedJSFiles(files) {
  var minifiedFiles = [];
  files.forEach(function(path) {
    minifiedFiles.push('<%- project.uglify %>/' + path.replace('.js', '.min.js').replace('/<%= originalPluginName %>/', ''));
  });
  return minifiedFiles;
}

module.exports = {

  // Concatenate back office JavaScript library files
  'back-office-libraries': {
    src: getMinifiedJSFiles(applicationConf['backOffice']['scriptLibFiles']['dev']),
    dest: '<%- project.beJSAssets %>/libOpenveo<%= Plugin %>.js'
  },
  js: {

    // Concatenate all back office JavaScript files
    src: getMinifiedJSFiles(applicationConf['backOffice']['scriptFiles']['dev']),

    // Concatenate all files into openveo<%= Plugin %>.js
    dest: '<%- project.beJSAssets %>/openveo<%= Plugin %>.js'

  }
};
