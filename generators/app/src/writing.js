'use strict';

const path = require('path');

const config = require('../config/files');

const UNDERSCORE = '_';
const PATTERN_LOWERCASE = /\{\{plugin\}\}/;
const PATTERN_CAPITALIZE = /\{\{Plugin\}\}/;
const PATTERN_ORIGINAL = /\{\{originalPluginName\}\}/;

module.exports = async function() {
  const pluginLowercase = this.properties.templated.plugin;
  const pluginCapitalize = this.properties.templated.Plugin;
  const pluginOriginal = this.properties.templated.originalPluginName;

  const plugin = (dest) => {
    dest = dest.replace(PATTERN_LOWERCASE, pluginLowercase);
    dest = dest.replace(PATTERN_CAPITALIZE, pluginCapitalize);
    dest = dest.replace(PATTERN_ORIGINAL, pluginOriginal);
    return dest;
  };

  const copyFile = (source, destination) => {
    destination = ('string' === typeof destination) ? destination : source;
    return this.fs.copyAsync(
      this.templatePath(source),
      plugin(this.destinationPath(destination))
    );
  };

  const copyTemplatedFile = (file) => {
    const basename = path.basename(file);
    const prefixed = file.replace(basename, UNDERSCORE + basename);

    return this.fs.copyTplAsync(
      this.templatePath(prefixed),
      plugin(this.destinationPath(file)),
      this.properties.templated
    );
  };

  const copyDotFile = (file) => {
    const basename = path.basename(file);
    const prefixed = file.replace(basename, basename.substring(1));
    return copyFile(prefixed, file);
  };

  await Promise.all(config.src.map((src) => copyFile(src)));
  await Promise.all(config.templated.map((templatedFile) => copyTemplatedFile(templatedFile)));
  await Promise.all(config.dots.map((dotFile) => copyDotFile(dotFile)));
  return Promise.resolve();
};
