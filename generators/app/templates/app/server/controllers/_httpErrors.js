'use strict';

/**
 * @module <%= plugin %>/controllers/httpErrors
 */

/**
 * The list of HTTP errors with, for each error, its associated hexadecimal code and HTTP return code.
 * HTTP errors are sent by "controllers".
 *
 * @example
 * var HTTP_ERRORS = process.require<%= Plugin %>('app/server/httpErrors.js');
 * console.log(HTTP_ERRORS.UNKNOWN_ERROR);
 *
 * @namespace
 */
var HTTP_ERRORS = {

  /**
   * Unidentified error.
   *
   * @const
   * @type {Object}
   * @default
   * @inner
   */
  UNKNOWN_ERROR: {
    code: 0x001,
    httpCode: 500,
    module: '<%= originalPluginName %>'
  }

};

Object.freeze(HTTP_ERRORS);
module.exports = HTTP_ERRORS;
