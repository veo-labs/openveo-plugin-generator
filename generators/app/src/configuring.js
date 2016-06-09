'use strict';

var chalk = require('chalk');
var fs = require('fs');
var paths = require('../config/paths');

module.exports = function() {

  var self = this;

  // Define url for the OpenVeo plugin
  this.properties.url = this.destinationPath(paths.openveo + this.properties.templated.plugin + '/');

  // Create plugin folder
  fs.mkdir(this.properties.url, function(err) {
    if (err) {
      self.env.error(chalk.red(err));
    }
  });

};
