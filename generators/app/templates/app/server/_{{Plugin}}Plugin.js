'use strict';

var util = require('util');
var express = require('express');
var openVeoApi = require('@openveo/api');
var <%= Plugin %>PluginApi = process.require<%= Plugin %>('app/server/<%= Plugin %>PluginApi.js');

/**
 * Defines the <%= Plugin %>Plugin that will be loaded by the core application.
 *
 * @module <%= plugin %>
 * @main <%= plugin %>
 * @class <%= Plugin %>Plugin
 * @extends Plugin
 * @constructor
 */
function <%= Plugin %>Plugin() {
  <%= Plugin %>Plugin.super_.call();

  Object.defineProperties(this, {

    /**
     * Creates an HTTP public router.
     *
     * It will be automatically mounted on /<%= plugin %>/ by the core.
     *
     * <%= Plugin %>'s public router.
     *
     * @property router
     * @type Router
     */
    router: {value: express.Router()},

    /**
     * Creates an HTTP private router.
     *
     * All routes associated to the private router require a back end authentication.
     * It will be automatically mounted on /be/<%= plugin %>/ by the core.
     *
     * <%= Plugin %>'s private router.
     *
     * @property router
     * @type Router
     */
    privateRouter: {value: express.Router()},

    /**
     * Creates a Web Service router.
     *
     * All routes associated to the Web Service router will be part of the Web Service and will
     * require a web service authentication.
     * It will be automatically mounted on /<%= plugin %>/ by the core (on web service's server).
     *
     * <%= Plugin %>'s web service router.
     *
     * @property router
     * @type Router
     */
    webServiceRouter: {value: express.Router()},

    /**
     * <%= Plugin %>'s APIs.
     *
     * @property api
     * @type PluginApi
     */
    api: {value: new <%= Plugin %>PluginApi()}

  });

  // Define routes directly here or in the configuration file

}

module.exports = <%= Plugin %>Plugin;
util.inherits(<%= Plugin %>Plugin, openVeoApi.plugin.Plugin);

/**
 * Optional "init" method automatically called by core application
 * after plugin is loaded and before it is started.
 *
 * @method init
 * @async
 * @param {Function} callback Function to call when it's done with :
 *  - **Error** An error if something went wrong, null otherwise
 */
<%= Plugin %>Plugin.prototype.init = function(callback) {
  process.logger.debug('<%= plugin %> plugin initializing');
  callback();
};

/**
 * Optional "start" method automatically called by core application
 * after plugin is loaded and initialized.
 *
 * @method start
 * @async
 * @param {Function} callback Function to call when it's done with :
 *  - **Error** An error if something went wrong, null otherwise
 */
<%= Plugin %>Plugin.prototype.start = function(callback) {
  process.logger.debug('<%= plugin %> plugin starting');
  callback();
};
