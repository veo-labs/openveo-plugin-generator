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
module.exports = BoilerProvider;
util.inherits(BoilerProvider, openVeoAPI.EntityProvider);

<%= Entity %>Provider.prototype.get = function(filter, callback) {
  var <%= entity %>s = {
    1: {
      content: '<%= Entity %> content 1'
    },
    2: {
      content: '<%= Entity %> content 2'
    },
    3: {
      content: '<%= Entity %> content 3'
    }
  };

  callback(null, <%= entity %>s);
};

