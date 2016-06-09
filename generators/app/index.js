'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');

var prompting = require('./src/prompting');
var writing = require('./src/writing');
var configuring = require('./src/configuring');
var install = require('./src/install');
var paths = require('./config/paths');

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

  install: install,

  end: function() {
    // Remove @openveo folder
    fs.rmdir(paths.openveo, function(err) {
      if (!err) {
        this.log(chalk.green('\n Your plugin has been successfully installed! \n'));
      } else {
        this.log(chalk.red(err));
      }
    });
  }
});
