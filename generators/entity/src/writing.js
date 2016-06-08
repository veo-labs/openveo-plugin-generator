'use strict';

var path = require('path');
var fs = require('fs');

var config = require('../config/files');

var UNDERSCORE = '_';
var PATTERN_LOWERCASE = /\{\{entity\}\}/;
var PATTERN_CAPITALIZE = /\{\{Entity\}\}/;
var PATTERN_URL = /app\/client\/admin\/js\/ov/;

module.exports = function() {

  var entities = this.properties.templated.entities;
  var pluginLowercase = this.properties.templated.plugin;
  var pluginCapitalize = this.properties.templated.Plugin;
  var URL_UPDATED = 'app/client/admin/js/ov' + pluginCapitalize;
  var conf = require(this.destinationPath('conf'));

  // Remove conf.js to avoid conflict
  fs.unlinkSync(this.destinationPath('conf.js'));

  for (var i = 0; i < entities.length; i++) {

    this.properties.templated.ENTITY = entities[i].ENTITY;
    var entityLowercase = this.properties.templated.entity = entities[i].entity;
    var entityCapitalize = this.properties.templated.Entity = entities[i].Entity;

    var entity = function(dest) {
      dest = dest.replace(PATTERN_LOWERCASE, entityLowercase);
      dest = dest.replace(PATTERN_CAPITALIZE, entityCapitalize);

      // Update Url
      dest = dest.replace(PATTERN_URL, URL_UPDATED);

      return dest;
    };

    var copyFile = function(source, destination) {
      destination = ('string' === typeof destination) ? destination : source;
      this.fs.copy(
        this.templatePath(source),
        this.destinationPath(entity(destination))
      );
    }.bind(this);

    var copyTemplatedFile = function(file) {
      var basename = path.basename(file);
      var prefixed = file.replace(basename, UNDERSCORE + basename);

      this.fs.copyTpl(
        this.templatePath(prefixed),
        this.destinationPath(entity(file)),
        this.properties.templated
      );
    }.bind(this);

    var updateConf = function() {

      conf.routes.private['get /get' + entityCapitalize + 's'] = 'app/server/controllers/' + entityCapitalize +
      'Controller.get' + entityCapitalize + 'sAction';
      conf.entities[entityLowercase + 's'] = 'app/server/controllers/' + entityCapitalize + 'Controller';
      conf.permissions.push({
        id: entityLowercase + '-access-list',
        name: this.properties.templated.ENTITY + '.PERMISSIONS.ACCESS_LIST',
        paths: [
          'get /' + entityLowercase + '/get' + entityCapitalize + 's'
        ]
      });
      conf.backOffice.scriptFiles.dev.push('/' + pluginLowercase + '/ov' + pluginCapitalize +
        '/' + entityCapitalize + 'Controller.js');
      conf.backOffice.scriptFiles.dev.push('/' + pluginLowercase + '/ov' + pluginCapitalize +
        '/' + entityCapitalize + 'Service.js');

      this.properties.templated.conf = JSON.stringify(conf, null, 2).replace(/\"([^(\"|\s)"]+)\":/g, '$1:')
      .replace(/"/g, '\'');

      copyTemplatedFile('conf.js');

    }.bind(this);

    config.src.forEach(copyFile);
    config.templated.forEach(copyTemplatedFile);
    updateConf();
  }

};
