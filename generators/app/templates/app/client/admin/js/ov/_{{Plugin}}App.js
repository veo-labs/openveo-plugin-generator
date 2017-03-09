'use strict';

(function(angular) {

  // Define <%= Plugin %>'s back end module that will be loaded by the core
  var app = angular.module('ov.<%= plugin %>', [
    'ov.i18n',
    'ngRoute'
  ]);

  // Configures the ov.<%= plugin %> application by adding new routes
  app.config(['$routeProvider', function($routeProvider) {

    // Add route /<%= originalPluginName %>/todo
    $routeProvider.when('/<%= originalPluginName %>/todo', {

      // Path to the view for this route
      // By default views must be stored in directory assets/be/views
      templateUrl: '/<%= originalPluginName %>/be/views/<%= originalPluginName %>.html',

      // The controller to instanciate for this route
      // Make sure the controller is loaded in conf.js file
      controller: '<%= Plugin %>Controller',

      // Title of the page for this route (<title> tag)
      title: '<%= PLUGIN %>.TODO.PAGE_TITLE',

      // Permission required to access this route
      // This permission must be defined in conf.js file
      access: '<%= originalPluginName %>-access-todo-page'

    });

  }]);

})(angular);
