'use strict';

var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var paths = require('../config/paths');

/**
 * Validates the given plugin name.
 *
 *  Plugin name should :
 *  - Not start or end with a dash
 *  - Start by openveo
 *  - Contains other characters than latin letters and dashes
 *
 * @param {String} name Plugin name
 * @return {Boolean} true if valid, false otherwise
 */
function isValidPluginName(name) {
  return /^(?!openveo|-)[A-Za-z-]+[^-]$/.test(name);
}

module.exports = function() {
  var self = this;
  var prompts = [];

  // Have Yeoman greet the user.
  this.log(yosay(
    chalk.red('Welcome!') + '\n' +
    chalk.yellow('You\'re using OpenVeo Plugin Generator !')
  ));

  // Define all questions asked to the user

  // Ask for plugin name if not specified
  if (!this.options.pluginName) {
    prompts.push({
      type: 'input',
      name: 'plugin',
      message: 'What name do you want to give to your OpenVeo plugin ?',
      validate: function(answer) {
        if (!isValidPluginName(answer))
          return 'Plugin name should not use special characters except dashes and should not start by "openveo".';
        else
          return true;
      }
    });
  }

  return this.prompt(prompts).then(function(answers) {
    self.options.pluginName = answers.plugin || self.options.pluginName;

    if (!self.options.pluginName || !isValidPluginName(self.options.pluginName))
      this.env.error(chalk.red('Invalid plugin name !'));

    this.properties.answers = answers;

    this.properties.templated.pluginName = 'openveo-' + self.options.pluginName;
    this.properties.templated.originalPluginName = self.options.pluginName;
    this.properties.templated.plugin = _.camelCase(_.lowerCase(self.options.pluginName));
    this.properties.templated.Plugin = _.upperFirst(_.camelCase(self.options.pluginName));
    this.properties.templated.PLUGIN = _.toUpper(_.snakeCase(self.options.pluginName));

    this.properties.templated.project = paths.project;
    this.properties.templated.pkg = paths.pkg;

  }.bind(this));
};
