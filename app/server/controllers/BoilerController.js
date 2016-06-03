'use strict';

var util = require('util');
var openVeoAPI = require('@openveo/api');
var BoilerModel = process.requireBoiler('app/server/models/BoilerModel.js');
var EntityController = openVeoAPI.controllers.EntityController;
var errors = process.requireBoiler('app/server/httpErrors.js');

/**
 * Creates a BoilerController
 */
function BoilerController() {
  EntityController.call(this, BoilerModel);
}

module.exports = BoilerController;
util.inherits(BoilerController, EntityController);

/**
 * Gets all boilers. [example]
 *
 * @method getBoilersAction
 */
BoilerController.prototype.getBoilersAction = function(request, response, next) {
  var model = new this.Entity(request.user);
  var filters = null;

  model.get(filters, function(error, boilers) {
    if (error) {
      process.logger.error(error.message, {error: error, method: 'getBoilersAction'});
      next(errors.UNKNOWN_ERROR);
    } else {
      response.send({
        boilers: boilers || []
      });
    }
  });
};
