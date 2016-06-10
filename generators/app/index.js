'use strict';

var yeoman = require('yeoman-generator');

var prompting = require('./src/prompting');
var writing = require('./src/writing');
var configuring = require('./src/configuring');
var install = require('./src/install');
var end = require('./src/end');

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

  end: end
});
