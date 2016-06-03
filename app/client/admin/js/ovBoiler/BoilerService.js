'use strict';

(function(app) {

  /**
   * Defines a boiler service example.
   *
   * @module ov.boiler
   * @class boilerService
   */
  function BoilerService($http, $q) {
    var basePath = '/be/';
    var boilers;

    /**
     * Loads the list of available boilers from server.
     *
     * @return {Promise} The promise used to retrieve boilers from server
     * @method loadBoilers
     */
    function loadBoilers() {
      if (!boilers) {
        return $http.get(basePath + 'boiler/getBoilers').success(function(results) {
          boilers = results;
        });
      }

      return $q.when({
        data: {
          boilers: boilers
        }
      });
    }

    return {
      loadBoilers: loadBoilers
    };

  }

  app.factory('boilerService', BoilerService);
  BoilerService.$inject = ['$http', '$q'];

})(angular.module('ov.boiler'));
