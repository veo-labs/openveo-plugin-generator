'use strict';

var yeoman = require('yeoman-generator');

var prompting = require('./src/prompting');
var writing = require('./src/writing');

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.properties = {
      templated: {
        entities: []
      }
    };
  },

  prompting: prompting,

  writing: writing,

  install: function() {
  },

  end: function() {
    this.log('\n');
    process.abort();
  }
});
