'use strict';

var chalk = require('chalk');
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
      this.env.error(chalk.red('You must provide a plugin name!'));
    }
    this.properties.answers = answers;

    this.properties.templated.plugin = _.camelCase(_.lowerCase(answers.plugin));
    this.properties.templated.Plugin = _.upperFirst(_.camelCase(answers.plugin));
    this.properties.templated.PLUGIN = _.toUpper(_.snakeCase(answers.plugin));

    this.properties.templated.project = paths.project;
    this.properties.templated.pkg = paths.pkg;

  }.bind(this));
};
