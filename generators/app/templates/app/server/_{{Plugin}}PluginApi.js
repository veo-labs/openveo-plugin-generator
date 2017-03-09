'use strict';

/**
 * @module <%= plugin %>
 */

var util = require('util');
var openVeoApi = require('@openveo/api');

/**
 * Defines a <%= Plugin %>PluginApi holding plugin's APIs.
 *
 *     // Get API
 *     var api = process.api.getApi('<%= originalPluginName %>');
 *
 * @class <%= Plugin %>PluginApi
 * @constructor
 * @extends PluginApi
 */
function <%= Plugin %>PluginApi() {
  <%= Plugin %>PluginApi.super_.call(this);
}

module.exports = <%= Plugin %>PluginApi;
util.inherits(<%= Plugin %>PluginApi, openVeoApi.plugin.PluginApi);
