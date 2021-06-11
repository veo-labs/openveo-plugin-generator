'use strict';

// Generate yuidoc
// For more information about Grunt yuidoc, have a look at https://www.npmjs.com/package/grunt-contrib-yuidoc
module.exports = {

  // Client side back office client documentation
  'back-office': {
    name: 'OpenVeo <%= Plugin %> AngularJS back end',
    description: 'AngularJS OpenVeo <%= Plugin %> plugin back end documentation',
    version: '<%- pkg.version %>',
    options: {
      paths: 'app/client/admin/js',
      outdir: './site/version/api/client-back-end',
      linkNatives: true,
      themedir: 'node_modules/yuidoc-theme-blue'
    }
  },

  // Server side documentation
  server: {
    name: 'OpenVeo <%= Plugin %> server',
    description: 'Node.js OpenVeo <%= Plugin %> plugin documentation',
    version: '<%- pkg.version %>',
    options: {
      paths: 'app/server/',
      outdir: './site/version/api/server',
      linkNatives: true,
      themedir: 'node_modules/yuidoc-theme-blue'
    }
  }

};
