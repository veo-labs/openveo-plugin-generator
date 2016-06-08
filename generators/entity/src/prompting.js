'use strict';

var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = function() {

  var callback = this.async();

  // Have Yeoman greet the user.
  this.log(yosay(
    chalk.red('Welcome!') + '\n' +
    chalk.yellow('You\'re using OpenVeo Plugin Generator!') + '\n' +
    chalk.green('Your plugin is : ' + path.basename(process.cwd()))
  ));

  // Set aplication name
  this.properties.templated.plugin = path.basename(process.cwd());
  this.properties.templated.Plugin = _.capitalize(path.basename(process.cwd()));

  /**
   * Prompts question to generate a new entity
   */
  function generateEntity(callback) {
    // Define all questions asked to the user
    var prompts = [{
      type: 'input',
      name: 'entity',
      message: 'What name do you want to give to your new entity? (Press Enter to exit)'
    }];

    this.prompt(prompts).then(function(answers) {
      if (!answers.entity) {
        callback();
      } else {
        this.properties.answers = answers;

        var entity = {
          entity: _.lowerCase(answers.entity),
          Entity: _.capitalize(answers.entity),
          ENTITY: _.capitalize(answers.entity)
        };

        this.properties.templated.entities.push(entity);

        generateEntity.call(this, callback);
      }

    }.bind(this));
  }

  generateEntity.call(this, callback);

};
