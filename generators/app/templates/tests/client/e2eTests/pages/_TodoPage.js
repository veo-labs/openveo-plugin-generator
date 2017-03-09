'use strict';

var util = require('util');
var e2e = require('@openveo/test').e2e;
var BackEndPage = e2e.pages.BackEndPage;

/**
 * Creates a new TodoPage representing the back end home page.
 */
function TodoPage() {
  TodoPage.super_.call(this);

  // Page path
  this.path = 'be/<%= originalPluginName %>/todo';

  // Element finders specific to this page
  this.pageTitleFinder = element(by.binding('<%= PLUGIN %>.TODO.TITLE'));

}

module.exports = TodoPage;
util.inherits(TodoPage, BackEndPage);

/**
 * Checks if the TODO page is loaded.
 *
 * @return {Promise} Promise that the page is fully loaded
 */
TodoPage.prototype.onLoaded = function() {
  return browser.wait(this.EC.presenceOf(this.pageTitleFinder), 5000, 'Missing TODO page title');
};
