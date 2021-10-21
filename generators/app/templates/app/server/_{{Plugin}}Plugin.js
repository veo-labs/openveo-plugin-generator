'use strict';

/**
 * @module <%= plugin %>/<%= Plugin %>Plugin
 */

var util = require('util');
var express = require('express');
var openVeoApi = require('@openveo/api');
var <%= Plugin %>PluginApi = process.require<%= Plugin %>('app/server/<%= Plugin %>PluginApi.js');

/**
 * Defines the <%= Plugin %>Plugin that will be loaded by the core application.
 *
 * @class <%= Plugin %>Plugin
 * @extends Plugin
 * @constructor
 * @see {@link https://github.com/veo-labs/openveo-api|OpenVeo API documentation} for more information about Plugin
 */
function <%= Plugin %>Plugin() {
  <%= Plugin %>Plugin.super_.call();

  Object.defineProperties(this,

    /** @lends module:<%= plugin %>/<%= Plugin %>Plugin~<%= Plugin %>Plugin */
    {

      /**
       * Creates an HTTP public router.
       *
       * It will be automatically mounted on /<%= plugin %>/ by the core.
       *
       * <%= Plugin %>'s public router.
       *
       * @type {Router}
       * @instance
       * @readonly
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
       * @type {Router}
       * @instance
       * @readonly
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
       * @type {Router}
       * @instance
       * @readonly
       */
      webServiceRouter: {value: express.Router()},

      /**
       * <%= Plugin %>'s APIs.
       *
       * @type {module:<%= plugin %>/<%= Plugin %>PluginApi~<%= Plugin %>PluginApi}
       * @instance
       * @readonly
       */
      api: {value: new <%= Plugin %>PluginApi()}

    }

  );

  // Define routes directly here or in the configuration file

}

module.exports = <%= Plugin %>Plugin;
util.inherits(<%= Plugin %>Plugin, openVeoApi.plugin.Plugin);

/**
 * Optional "init" method automatically called by core application
 * after plugin is loaded and before it is started.
 *
 * @param {callback} callback Function to call when it's done
 */
<%= Plugin %>Plugin.prototype.init = function(callback) {
  process.logger.debug('<%= plugin %> plugin initializing');
  callback();
};

/**
 * Optional "start" method automatically called by core application
 * after plugin is loaded and initialized.
 *
 * @param {callback} callback Function to call when it's done
 */
<%= Plugin %>Plugin.prototype.start = function(callback) {
  process.logger.debug('<%= plugin %> plugin starting');
  callback();
};
