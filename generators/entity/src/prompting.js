'use strict';

var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');

module.exports = function() {

  var callback = this.async();
  var URL = 'node_modules/@openveo/';

  // Set plugin name from plugin generator
  if (this.options.plugin) {
    this.properties.templated.plugin = _.camelCase(this.options.plugin);
    this.properties.templated.Plugin = _.capitalize(_.camelCase(this.options.plugin));
    this.properties.url = this.destinationPath(URL + this.options.plugin + '/');
  }

  // Have Yeoman greet the user.
  this.log(yosay(
    chalk.red('Welcome!') + '\n' +
    chalk.yellow('You\'re using OpenVeo Plugin Entity Generator')
  ));

  /**
   * Check directory exists
   */
  function directoryExist(directory) {
    try {
      var stats = fs.statSync(directory);
      if (stats.isDirectory) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * Prompts question to generate a new entity
   */
  function generateEntity(callback) {
    var prompts = [{
      type: 'input',
      name: 'entity',
      message: 'What name do you want to give to your new entity? (Press Enter to exit)'
    }];

    if (!this.options.plugin && !this.properties.url) {
      prompts.unshift({
        type: 'input',
        name: 'plugin',
        message: 'Please select for which plugin you want add entities?'
      });
    }

    this.prompt(prompts).then(function(answers) {

      // Verify plugin exists
      if (!answers.plugin && !this.options.plugin && !this.properties.url) {
        this.env.error(chalk.red('You must provide a plugin name!'));
      } else if (!directoryExist(this.destinationPath(URL + answers.plugin + '/')) &&
       !this.options.plugin && !this.properties.url) {
        this.env.error(chalk.red('The plugin "' + answers.plugin + '" does not exists!'));
      }

      if (!this.properties.templated.plugin) {
        this.properties.templated.plugin = _.camelCase(_.lowerCase(answers.plugin));
        this.properties.templated.Plugin = _.capitalize(_.camelCase(answers.plugin));
      }

      if (!this.properties.url) {
        this.properties.url = this.destinationPath(URL + answers.plugin + '/');
      }

      if (!answers.entity) {
        callback();
      } else {
        this.properties.answers = answers;

        var entity = {
          entity: _.camelCase(_.lowerCase(answers.entity)),
          Entity: _.upperFirst(_.camelCase(answers.entity)),
          ENTITY: _.toUpper(_.snakeCase(answers.entity))
        };

        this.properties.templated.entities.push(entity);

        generateEntity.call(this, callback);
      }

    }.bind(this));
  }

  generateEntity.call(this, callback);

};
