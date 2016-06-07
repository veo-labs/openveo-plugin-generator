'use strict';

var util = require('util');
var openVeoAPI = require('@openveo/api');
var <%= Entity %>Model = process.require<%= Entity %>('app/server/models/<%= Entity %>Model.js');
var EntityController = openVeoAPI.controllers.EntityController;
var errors = process.require<%= Entity %>('app/server/httpErrors.js');

/**
 * Creates a <%= Entity %>Controller
 */
function <%= Entity %>Controller() {
  EntityController.call(this, <%= Entity %>Model);
}

module.exports = <%= Entity %>Controller;
util.inherits(<%= Entity %>Controller, EntityController);

/**
 * Gets all entities. [example]
 *
 * @method getBoilersAction
 */
<%= Entity %>Controller.prototype.get<%= Entity %>sAction = function(request, response, next) {
  var model = new this.Entity(request.user);
  var filters = null;

  model.get(filters, function(error, boilers) {
    if (error) {
      process.logger.error(error.message, {error: error, method: 'get<%= Entity %>sAction'});
      next(errors.UNKNOWN_ERROR);
    } else {
      response.send({
        <%= entity %>s: <%= entity %>s || []
      });
    }
  });
};
