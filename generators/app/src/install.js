'use strict';

/* eslint node/no-sync: 0 */
var fs = require('fs');
var path = require('path');

var config = require('../config/files');

module.exports = function() {
  var self = this;

  config.folders.forEach(function(folder) {
    var basename = path.basename(folder);
    var renamed = folder.replace(basename, basename + self.properties.templated.Plugin);

    fs.renameSync(self.properties.url + '/' + folder, self.properties.url + '/' + renamed);
  });

  // Change folder to install dependencies
  process.chdir(this.properties.url);

  this.installDependencies({
    bower: false,
    npm: true
  });

  this.spawnCommand('npm', ['link', '@openveo/api', '@openveo/test']);
};
