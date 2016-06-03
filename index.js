'use strict';

// Module dependencies
var path = require('path');

// Set module root directory
process.rootBoiler = __dirname;

// Define a new method on process object to be able to require
// a module with a path relative to plugin's root directory
process.requireBoiler = function(filePath) {
  return require(path.join(process.rootBoiler, filePath));
};

// Expose the BoilerPlugin
module.exports = process.requireBoiler('app/server/BoilerPlugin.js');
