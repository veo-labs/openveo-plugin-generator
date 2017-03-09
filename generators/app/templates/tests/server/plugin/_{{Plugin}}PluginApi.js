'use strict';

var assert = require('chai').assert;
var openVeoApi = require('@openveo/api');
var <%= Plugin %>PluginApi = process.require<%= Plugin %>('app/server/<%= Plugin %>PluginApi.js');

// <%= Plugin %>PluginApi.js
describe('<%= Plugin %>PluginApi', function() {
  var pluginApi;

  // Prepare test
  beforeEach(function() {
    pluginApi = new <%= Plugin %>PluginApi();
  });

  // constructor
  describe('constructor', function() {

    it('should be an instance of PluginApi', function() {
      assert.instanceOf(pluginApi, openVeoApi.plugin.PluginApi);
    });

  });

});
