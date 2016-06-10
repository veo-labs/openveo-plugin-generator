'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var prompting = require('./src/prompting');
var writing = require('./src/writing');

module.exports = yeoman.Base.extend({
  initializing: function() {
    if (!this.properties) {
      this.properties = {
        templated: {
          entities: []
        },
        url: ''
      };
    }
  },

  prompting: prompting,

  writing: writing,

  install: function() {
  },

  end: function() {
    this.log(chalk.green('\n Your entities has been successfully created! \n'));
  }
});
