'use strict';

var path = require('path');

var config = require('../config/files');

var UNDERSCORE = '_';
var PATTERN_LOWERCASE = /\{\{plugin\}\}/;
var PATTERN_CAPITALIZE = /\{\{Plugin\}\}/;

module.exports = function() {

  var pluginLowercase = this.properties.templated.plugin;
  var pluginCapitalize = this.properties.templated.Plugin;

  var plugin = function(dest) {
    dest = dest.replace(PATTERN_LOWERCASE, pluginLowercase);
    dest = dest.replace(PATTERN_CAPITALIZE, pluginCapitalize);

    return dest;
  };

  var copyFile = function(source, destination) {
    destination = ('string' === typeof destination) ? destination : source;
    this.fs.copy(
      this.templatePath(source),
      plugin(this.properties.url + destination)
    );
  }.bind(this);

  var copyTemplatedFile = function(file) {
    var basename = path.basename(file);
    var prefixed = file.replace(basename, UNDERSCORE + basename);

    this.fs.copyTpl(
      this.templatePath(prefixed),
      plugin(this.properties.url + file),
      this.properties.templated
    );
  }.bind(this);

  var copyDotFile = function(file) {
    var basename = path.basename(file);
    var prefixed = file.replace(basename, basename.substring(1));
    copyFile(prefixed, file);
  };

  config.src.forEach(copyFile);
  config.tasks.forEach(copyFile);
  config.templated.forEach(copyTemplatedFile);
  config.dots.forEach(copyDotFile);

};
