'use strict';

var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');
var paths = require('../config/paths');

module.exports = function() {

  // Have Yeoman greet the user.
  this.log(yosay(
    chalk.red('Welcome!') + '\n' +
    chalk.yellow('You\'re using OpenVeo Plugin Generator!')
  ));

  // Define all questions asked to the user
  var prompts = [{
    type: 'input',
    name: 'plugin',
    message: 'What name do you want to give to your OpenVeo plugin?'
  },
    {
      when: function(response) {
        return response.plugin;
      },
      type: 'confirm',
      name: 'entityGenerator',
      message: 'Would you like to generate an entity?',
      default: true
    }
  ];

  return this.prompt(prompts).then(function(answers) {
    if (!answers.plugin) {
      this.log(chalk.red('You must provide a plugin name!'));
      process.exit(1);
    }
    this.properties.answers = answers;

    this.properties.templated.plugin = _.lowerCase(answers.plugin);
    this.properties.templated.Plugin = _.capitalize(answers.plugin);
    this.properties.templated.PLUGIN = _.upperCase(answers.plugin);

    this.properties.templated.project = paths.project;
    this.properties.templated.pkg = paths.pkg;

  }.bind(this));
};
