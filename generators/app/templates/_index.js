'use strict';

require('./processRequire.js');

// Expose the plugin
module.exports = process.require<%= Plugin %>('app/server/<%= Plugin %>Plugin.js');
