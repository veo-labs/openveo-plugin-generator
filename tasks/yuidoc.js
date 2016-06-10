'use strict';

module.exports = {

  // Back end doc
  backEnd: {
    name: 'OpenVeo Plugin AngularJS back end',
    description: 'AngularJS OpenVeo Plugin back end documentation',
    version: '<%= pkg.version %>',
    options: {
      paths: 'app/client/admin/js',
      outdir: './site/version/api/back-end',
      linkNatives: true,
      themedir: 'node_modules/yuidoc-theme-blue'
    }
  }

};
