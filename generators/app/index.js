'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

var prompting = require('./src/prompting');
var writing = require('./src/writing');
var configuring = require('./src/configuring');
var config = require('./config/files');

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.properties = {
      templated: {},
      url: ''
    };
  },

  prompting: prompting,

  configuring: configuring,

  writing: writing,

  install: function() {
    var pluginName = this.properties.templated.Plugin;
    var self = this;

    config.folders.forEach(function(folder) {
      var basename = path.basename(folder);
      var renamed = folder.replace(basename, basename + pluginName);

      fs.renameSync(self.properties.url + '/' + folder, self.properties.url + '/' + renamed);
    });

    // create folders
    fs.mkdirSync(this.properties.url + 'app/server/controllers');
    fs.mkdirSync(this.properties.url + 'app/server/models');
    fs.mkdirSync(this.properties.url + 'app/server/providers');

    // Call sub-generator
    if (this.properties.answers.entityGenerator) {
      this.composeWith('openveo-plugin:entity', {
        options: {
          plugin: this.properties.templated.plugin
        }
      });
    }

    // Change folder to install dependencies
    process.chdir(this.properties.url);

    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },

  end: function() {
    this.log(chalk.green('\n Your plugin has been successfully installed! \n'));
  }
});
