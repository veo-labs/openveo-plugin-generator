'use strict';

var util = require('util');
var openVeoAPI = require('@openveo/api');

/**
 * Creates a BoilerProvider.
 */
function BoilerProvider(database) {

  // In BoilerProvider collection "boilers"
  openVeoAPI.EntityProvider.call(this, database, 'boiler_boilers');
}

// BoilerProvider must extend EntityProvider
module.exports = BoilerProvider;
util.inherits(BoilerProvider, openVeoAPI.EntityProvider);

BoilerProvider.prototype.get = function(filter, callback) {
  var boilers = {
    1: {
      content: 'Boiler content 1'
    },
    2: {
      content: 'Boiler content 2'
    },
    3: {
      content: 'Boiler content 3'
    }
  };

  callback(null, boilers);
};

