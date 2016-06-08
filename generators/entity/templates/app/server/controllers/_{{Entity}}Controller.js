'use strict';

var util = require('util');
var openVeoAPI = require('@openveo/api');
var <%= Entity %>Model = process.require<%= Plugin %>('app/server/models/<%= Entity %>Model.js');
var EntityController = openVeoAPI.controllers.EntityController;
var errors = process.require<%= Plugin %>('app/server/httpErrors.js');

/**
 * Creates a <%= Entity %>Controller
 */
function <%= Entity %>Controller() {
  EntityController.call(this, <%= Entity %>Model);
}

module.exports = <%= Entity %>Controller;
util.inherits(<%= Entity %>Controller, EntityController);
