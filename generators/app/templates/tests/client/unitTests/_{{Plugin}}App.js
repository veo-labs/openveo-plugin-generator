'use strict';

window.assert = chai.assert;

// <%= Plugin %>App.js
describe('<%= Plugin %>App', function() {
  var $httpBackend;
  var $route;

  // Load module <%= plugin %>
  beforeEach(function() {
    module('ov.<%= plugin %>');
  });

  // Dependencies injections
  beforeEach(inject(function(_$httpBackend_, _$route_) {
    $httpBackend = _$httpBackend_;
    $route = _$route_;
  }));

  // Initializes tests
  beforeEach(function() {
    $httpBackend.when('GET', /.*/).respond(200, '');
    $httpBackend.when('POST', /.*/).respond(200, '');
  });

  it('should register routes to todo page', function() {
    assert.isDefined($route.routes['/<%= originalPluginName %>/todo']);
  });

});
