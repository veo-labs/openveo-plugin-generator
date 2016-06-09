'use strict';

var chalk = require('chalk');
var fs = require('fs');

var paths = require('../config/paths');

module.exports = function() {

  var rmdir = function(dirPath) {
    try { 
      var files = fs.readdirSync(dirPath);
    } catch (e) { 
      return;
    }
    if (files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + '/' + files[i];
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        } else {
          rmdir(filePath);
        }
      }
    }
    fs.rmdirSync(dirPath);
  };

  rmdir(paths.openveo);

  this.log(chalk.green('\n Your plugin has been successfully installed! \n'));

};
