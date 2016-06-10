'use strict';

// Module dependencies
var util = require('util');
var openVeoAPI = require('@openveo/api');

var <%= Entity %>Provider = process.require<%= Plugin %>('app/server/providers/<%= Entity %>Provider.js');

/**
 * Creates a <%= Entity %>Model.
 */
function <%= Entity %>Model() {
  openVeoAPI.EntityModel.call(this, new <%= Entity %>Provider(openVeoAPI.applicationStorage.getDatabase()));
}

module.exports = <%= Entity %>Model;
util.inherits(<%= Entity %>Model, openVeoAPI.EntityModel);
