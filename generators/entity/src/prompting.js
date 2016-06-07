'use strict';

var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = function() {

  // Have Yeoman greet the user.
  this.log(yosay(
    chalk.red('Welcome!') + '\n' +
    chalk.yellow('You\'re using OpenVeo Plugin Generator!') + '\n' +
    chalk.green('Your plugin is : ' + path.basename(process.cwd()))
  ));

  // Define all questions asked to the user
  var prompts = [{
    type: 'input',
    name: 'entity',
    message: 'What name do you want to give to your new entity? (Press Enter to exit)'
  }];

  return this.prompt(prompts).then(function(answers) {
    if (!answers.entity) {
      process.abort();
    }
    this.properties.answers = answers;

    this.properties.templated.entity = _.lowerCase(answers.entity);
    this.properties.templated.Entity = _.capitalize(answers.entity);
    this.properties.templated.ENTITY = _.upperCase(answers.entity);
    this.properties.templated.plugin = path.basename(process.cwd());
    this.properties.templated.Plugin = _.capitalize(path.basename(process.cwd()));

  }.bind(this));

};
