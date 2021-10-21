'use strict';

module.exports = function() {

  // Create plugin's directory and set destination root to it
  this.destinationRoot(this.destinationPath(`openveo-${this.options.pluginName}/`));

};
