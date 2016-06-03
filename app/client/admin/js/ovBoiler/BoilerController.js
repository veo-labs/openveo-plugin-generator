'use strict';

(function(app) {

  /**
   * Defines the boiler controller
   */
  function BoilerController($scope, boilers) {
    $scope.boilers = boilers.data || {};
  }

  app.controller('BoilerController', BoilerController);
  BoilerController.$inject = ['$scope', 'boilers'];

})(angular.module('ov.boiler'));
