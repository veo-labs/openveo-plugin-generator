'use strict';

// Module dependencies
var path = require('path');

// Set module root directory
process.root<%= Plugin %> = __dirname;

// Define a new method on process object to be able to require
// a module with a path relative to plugin's root directory
process.require<%= Plugin %> = function(filePath) {
  return require(path.join(process.root<%= Plugin %>, filePath));
};

// Expose the BoilerPlugin
module.exports = process.require<%= Plugin %>('app/server/<%= Plugin %>Plugin.js');
