'use strict';

/**
 * @module <%= plugin %>/<%= Plugin %>PluginApi
 */

var util = require('util');
var openVeoApi = require('@openveo/api');

/**
 * Defines a <%= Plugin %>PluginApi holding plugin's APIs.
 *
 * @example
 * // Get API
 * var api = process.api.getApi('<%= originalPluginName %>');
 *
 * @class <%= Plugin %>PluginApi
 * @constructor
 * @extends PluginApi
 * @see {@link https://github.com/veo-labs/openveo-api|OpenVeo API documentation} for more information about PluginApi
 */
function <%= Plugin %>PluginApi() {
  <%= Plugin %>PluginApi.super_.call(this);
}

module.exports = <%= Plugin %>PluginApi;
util.inherits(<%= Plugin %>PluginApi, openVeoApi.plugin.PluginApi);
