'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var TodoPage = process.require<%= Plugin %>('tests/client/e2eTests/pages/TodoPage.js');

// Load assertion library
var assert = chai.assert;
chai.use(chaiAsPromised);

describe('TODO page', function() {
  var page;

  // Prepare page
  before(function() {
    page = new TodoPage();
    page.logAsAdmin();
    page.load();
  });

  // Logout after tests
  after(function() {
    page.logout();
  });

  // Reload page after each test
  afterEach(function() {
    page.refresh();
  });

  it('should display page title', function() {
    assert.eventually.ok(page.pageTitleFinder.isPresent());
  });

});
