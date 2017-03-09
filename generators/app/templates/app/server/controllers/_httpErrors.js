'use strict';

/**
 * @module controllers
 */

/**
 * The list of HTTP errors with, for each error, its associated hexadecimal code and HTTP return code.
 * HTTP errors are sent by {{#crossLinkModule "controllers"}}{{/crossLinkModule}}.
 *
 * @example
 *     var HTTP_ERRORS = process.require<%= Plugin %>('app/server/httpErrors.js');
 *     console.log(HTTP_ERRORS.UNKNOWN_ERROR);
 *
 * @class HTTP_ERRORS
 * @static
 */
var HTTP_ERRORS = {

  /**
   * Unidentified error.
   *
   * @property UNKNOWN_ERROR
   * @type Object
   * @final
   */
  UNKNOWN_ERROR: {
    code: 0x001,
    httpCode: 500,
    module: '<%= originalPluginName %>'
  }

};

Object.freeze(HTTP_ERRORS);
module.exports = HTTP_ERRORS;
