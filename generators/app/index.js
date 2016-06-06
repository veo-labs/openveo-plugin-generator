'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');

var prompting = require('./src/prompting');
var writing = require('./src/writing');
var config = require('./config/files.json');

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.pkg = require('../../package.json');

    this.properties = {
      templated: {}
    };
  },

  prompting: prompting,

  writing: writing,

  install: function() {
    var pluginName = this.properties.templated.Plugin;
    var destinationPath = this.destinationPath('');

    config.folders.forEach(function(folder) {
      var basename = path.basename(folder);
      var renamed = folder.replace(basename, basename + pluginName);

      fs.renameSync(destinationPath + '/' + folder, destinationPath + '/' + renamed);
    });

    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
