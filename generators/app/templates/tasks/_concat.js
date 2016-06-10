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
    minifiedFiles.push('<%- project.uglify %>/' + path.replace('.js', '.min.js').replace('/<%= plugin %>/', ''));
  });
  return minifiedFiles;
}

module.exports = {
  lib: {

    // Concatenate back office JavaScript library files
    src: getMinifiedJSFiles(applicationConf['backOffice']['scriptLibFiles']['dev']),

    // Concatenate all files into libOpenveo<%= Plugin %>.js
    dest: '<%- project.beJSAssets %>/libOpenveo<%= Plugin %>.js'

  },
  js: {

    // Concatenate all back office JavaScript files
    src: getMinifiedJSFiles(applicationConf['backOffice']['scriptFiles']['dev']),

    // Concatenate all files into openveo<%= Plugin %>.js
    dest: '<%- project.beJSAssets %>/openveo<%= Plugin %>.js'

  }
};
