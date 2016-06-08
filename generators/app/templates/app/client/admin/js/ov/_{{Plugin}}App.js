'use strict';

(function(angular) {

  var app = angular.module('ov.<%= plugin %>', [
    'ov.i18n'
  ]);

  /*
   * Configures the ov.<%= plugin %> application by adding new routes.
   */
  app.config(['$routeProvider', function($routeProvider) {

  	// route example
  	$routeProvider.when('/<%= plugin %>/todo', {
      templateUrl: '/<%= plugin %>/be/views/<%= plugin %>.html',
      controller: '<%= Plugin %>Controller',
      title: '<%= PLUGIN %>.TODO.PAGE_TITLE',
      access: '<%= plugin %>-access-todo-page',
      resolve: {
        datas: ['<%= plugin %>Service', function(<%= plugin %>Service) {
          return <%= plugin %>Service.loadDatas();
        }]
      }
    });

  }]);

})(angular);
