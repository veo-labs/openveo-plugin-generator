'use strict';

var path = require('path');
var openVeoApi = require('@openveo/api');

process.root<%= Plugin %> = path.join(__dirname, '../../');
process.require<%= Plugin %> = function(filePath) {
  return require(path.join(process.root<%= Plugin %>, filePath));
};


var plugins = [];

// Mock logger
process.logger = openVeoApi.logger.add('openveo');

// Mock APIs
process.api = {
  addPlugin: function(plugin) {
    plugins.push(plugin);
  },
  removePlugins: function(name) {
    plugins = [];
  },
  getPlugin: function(name) {
    if (name) {
      for (var i = 0; i < plugins.length; i++) {
        if (plugins[i].name === name)
          return plugins[i];
      }
    }

    return null;
  },
  getPlugins: function() {
    return plugins;
  },
  getApi: function(name) {
    var plugin = process.api.getPlugin(name);
    return plugin ? plugin.api : null;
  },
  getCoreApi: function() {
    var plugin = process.api.getPlugin('core');
    return plugin ? plugin.api : null;
  }
};
