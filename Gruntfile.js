'use strict';

// Module dependencies
var path = require('path');

process.rootBoiler = __dirname;
process.requireBoiler = function(filePath) {
  return require(path.normalize(process.rootBoiler + '/' + filePath));
};

/**
 * Loads a bunch of grunt configuration files from the given directory.
 *
 * Loaded configurations can be referenced using the configuration file name.
 * For example, if myConf.js describes a property "test", it will be accessible
 * using myConf.test.
 *
 * @param String path Path of the directory containing configuration files
 * @return Object The list of configurations indexed by filename without
 * the extension
 */
function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {
    cwd: path
  }).forEach(function(option) {
    key = option.replace(/\.js$/, '');
    object[key] = require(path + '/' + option);
  });

  return object;
}

module.exports = function(grunt) {

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };

  grunt.initConfig(config);
  grunt.config.merge(loadConfig('./tasks'));

  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mkdocs');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks('grunt-remove');

  // Generate documentation
  grunt.registerTask('doc', ['remove:doc', 'mkdocs', 'yuidoc', 'rename:doc']);

  // Deploy documentation to github pages
  grunt.registerTask('deploy-doc', ['doc', 'gh-pages:doc']);

};