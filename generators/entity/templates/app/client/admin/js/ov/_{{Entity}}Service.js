'use strict';

(function(app) {

  /**
   * Defines a <%= entity %> service example.
   *
   * @module ov.<%= entity %>
   * @class <%= Entity %>Service
   */
  function <%= Entity %>Service($http, $q) {
    var basePath = '/be/';
    var <%= entity %>s;

    /**
     * Loads the list of available <%= entity %>s from server. [exmaple]
     *
     * @return {Promise} The promise used to retrieve <%= entity %>s from server
     * @method load<%= Entity %>s
     */
    function load<%= Entity %>s() {
      if (!<%= entity %>s) {
        return $http.get(basePath + '<%= entity %>/get<%= Entity %>s').success(function(results) {
          <%= entity %>s = results;
        });
      }

      return $q.when({
        data: {
          <%= entity %>s: <%= entity %>s
        }
      });
    }

    return {
      load<%= Entity %>s: load<%= Entity %>s
    };

  }

  app.factory('<%= entity %>Service', <%= Entity %>Service);
  <%= Entity %>Service.$inject = ['$http', '$q'];

})(angular.module('ov.<%= entity %>'));
