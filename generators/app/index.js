'use strict';

var Generator = require('yeoman-generator');

var prompting = require('./src/prompting');
var writing = require('./src/writing');
var configuring = require('./src/configuring');
var install = require('./src/install');
var end = require('./src/end');

module.exports = Generator.extend({
  constructor: function(args, opts) {
    Generator.call(this, args, opts);

    // Arguments
    this.argument('pluginName', {
      type: String,
      desc: 'Optional plugin name to avoid being prompted',
      required: false
    });

  },

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
