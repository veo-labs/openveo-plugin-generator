'use strict';

(function(app) {

  /**
   * Defines a <%= plugin %> controller example.
   */
  function <%= Plugin %>Controller($scope) {}

  app.controller('<%= Plugin %>Controller', <%= Plugin %>Controller);
  <%= Plugin %>Controller.$inject = ['$scope'];

})(angular.module('ov.<%= plugin %>'));
