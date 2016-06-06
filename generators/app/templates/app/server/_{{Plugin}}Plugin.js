'use strict';

// Module dependencies
var util = require('util');
var express = require('express');
var async = require('async');
var openVeoAPI = require('@openveo/api');
//var BoilerProvider = process.require<%= Plugin %>('app/server/providers/BoilerProvider.js');

/**
 * Creates a <%= Plugin %>Plugin.
 *
 * @class <%= Plugin %>Plugin
 * @constructor
 * @extends Plugin
 */
function <%= Plugin %>Plugin() {

  /**
   * Creates a public router
   * It will be automatically mounted on /<%= plugin %>/ by the core
   *
   * <%= Plugin %> public router.
   *
   * @property router
   * @type Router
   */
  this.router = express.Router();

  /**
   * Creates a private router
   * All routes associated to the private router require a back end authentication
   * It will be automatically mounted on /be/<%= plugin %>/ by the core
   *
   * <%= Plugin %> private router.
   *
   * @property router
   * @type Router
   */
  this.privateRouter = express.Router();

  /**
   * Creates a Web Service router
   * All routes associated to the Web Service router will be part of the Web Service
   * It will be automatically mounter on /<%= plugin %>/ by the core (but on another server)
   *
   * <%= Plugin %> web service router.
   *
   * @property router
   * @type Router
   */
  this.webServiceRouter = express.Router();

  // Define routes directly here or in the configuration file

}

// Expose <%= Plugin %>Plugin
module.exports = <%= Plugin %>Plugin;

// Extends Plugin
util.inherits(<%= Plugin %>Plugin, openVeoAPI.Plugin);

/**
 * Prepares plugin by creating required database indexes.
 *
 * Optional "init" method automatically called by core application
 * after plugin is loaded and before it is started.
 *
 * @method init
 * @async
 * @param {Function} callback Function to call when it's done with :
 *  - **Error** An error if something went wrong, null otherwise
 */
<%= Plugin %>Plugin.prototype.init = function(callback) {
  var database = openVeoAPI.applicationStorage.getDatabase();
  var asyncFunctions = [];
  var providers = [
    //new <%= Plugin %>Provider(database)
  ];

  providers.forEach(function(provider) {
    if (provider.createIndexes) {
      asyncFunctions.push(function(callback) {
        provider.createIndexes(callback);
      });
    }
  });

  async.parallel(asyncFunctions, function(error, results) {
    callback(error);
  });
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
