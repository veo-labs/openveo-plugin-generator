'use strict';

(function(app) {

  /**
   * Defines a <%= plugin %> service.
   *
   * @module ov.<%= plugin %>
   * @class <%= Plugin %>Service
   */
  function <%= Plugin %>Service($http, $q) {
    var basePath = '/be/';
    var datas = 'TODO';

    /**
     * Loads datas from server example
     *
     * @return {Promise} The promise used to retrieve datas from server
     * @method loadDatas
     */
    function loadDatas() {
      if (!datas) {
        return $http.get(basePath + 'datas').success(function(results) {
          datas = results;
        });
      }

      return $q.when({
        data: {
          datas: datas
        }
      });
    }

    return {
      loadDatas: loadDatas
    };

  }

  app.factory('<%= plugin %>Service', <%= Plugin %>Service);
  <%= Plugin %>Service.$inject = ['$http', '$q'];

})(angular.module('ov.<%= plugin %>'));
