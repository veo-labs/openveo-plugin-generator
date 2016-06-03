'use strict';

(function(angular) {

  var app = angular.module('ov.boiler', [
    'ov.i18n'
  ]);

  /*
   * Configures the ov.boiler application by adding new routes.
   */
  app.config(['$routeProvider', function($routeProvider) {

    // Add route /boiler/list with authentication.
    // Also retrieve the list of boilers
    $routeProvider.when('/boiler/list', {
      templateUrl: '/boiler/be/views/list.html',
      controller: 'BoilerController',
      title: 'BOILER.LIST.PAGE_TITLE',
      access: 'boiler-access-list',
      resolve: {
        boilers: ['boilerService', function(boilerService) {
          return boilerService.loadBoilers();
        }]
      }
    });
  }]);

})(angular);
