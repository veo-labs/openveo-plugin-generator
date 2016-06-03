'use strict';

// Module dependencies
var util = require('util');
var openVeoAPI = require('@openveo/api');

var BoilerProvider = process.requireBoiler('app/server/providers/BoilerProvider.js');

/**
 * Creates a BoilerModel.
 */
function BoilerModel() {
  openVeoAPI.EntityModel.call(this, new BoilerProvider(openVeoAPI.applicationStorage.getDatabase()));
}

module.exports = BoilerModel;
util.inherits(BoilerModel, openVeoAPI.EntityModel);
