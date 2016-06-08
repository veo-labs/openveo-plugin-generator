'use strict';

var util = require('util');
var openVeoAPI = require('@openveo/api');

/**
 * Creates a <%= Entity %>Provider.
 */
function <%= Entity %>Provider(database) {

  // In <%= Entity %>Provider collection "<%= entity %>s"
  openVeoAPI.EntityProvider.call(this, database, '<%= plugin %>_<%= entity %>s');
}

// <%= Entity %>Provider must extend EntityProvider
module.exports = <%= Entity %>Provider;
util.inherits(<%= Entity %>Provider, openVeoAPI.EntityProvider);
