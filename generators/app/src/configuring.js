'use strict';

var chalk = require('chalk');
var fs = require('fs');

module.exports = function() {
  var self = this;
  var done = this.async();

  // Define url for the OpenVeo plugin
  this.properties.url = this.destinationPath('openveo-' + this.options.pluginName + '/');

  // Create plugin folder
  fs.mkdir(this.properties.url, function(err) {
    if (err && err.errno === -17) {
      self.env.error(chalk.red('The "' + self.properties.templated.Plugin + '" plugin already exist. \n'));
    } else if (err) {
      self.env.error(chalk.red(err));
    } else
      done();
  });

};
