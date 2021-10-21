'use strict';

const Generator = require('yeoman-generator');

const prompting = require('./src/prompting');
const writing = require('./src/writing');
const configuring = require('./src/configuring');
const install = require('./src/install');
const end = require('./src/end');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    // Arguments
    this.argument('pluginName', {
      type: String,
      description: 'Optional plugin name to avoid being prompted',
      required: false
    });

  }

  initializing() {
    this.properties = {
      templated: {},
      url: ''
    };
  }

  prompting() {
    return prompting.bind(this)();
  }

  configuring() {
    return configuring.bind(this)();
  }

  writing() {
    return writing.bind(this)();
  }

  install() {
    return install.bind(this)();
  }

  end() {
    return end.bind(this)();
  }
};
