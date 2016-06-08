'use strict';

(function(app) {

  /**
   * Defines a <%= plugin %> controller example
   */
  function <%= Plugin %>Controller($scope, datas) {
    $scope.todo = datas.data || {};
  }

  app.controller('<%= Plugin %>Controller', <%= Plugin %>Controller);
  <%= Plugin %>Controller.$inject = ['$scope', 'datas'];

})(angular.module('ov.<%= plugin %>'));
