'use strict';

(function(app) {

  /**
   * Defines the <%= entity %> controller
   */
  function <%= Entity %>Controller($scope, <%= entity %>s) {
    $scope.<%= entity %>s = <%= entity %>s.data || {};
  }

  app.controller('<%= Entity %>Controller', <%= Entity %>Controller);
  <%= Entity %>Controller.$inject = ['$scope', '<%= entity %>s'];

})(angular.module('ov.<%= entity %>'));
