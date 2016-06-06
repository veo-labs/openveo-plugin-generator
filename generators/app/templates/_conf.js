'use strict';

module.exports = {
  routes: {
    public: {
    },
    private: {
    },
    ws: {
    }
  },
  entities: {
  },
  permissions: [
  ],
  backOffice: {
    menu: [
    ],
    scriptLibFiles: {
      base: [],
      dev: [],
      prod: []
    },
    scriptFiles: {
      base: [],
      dev: [
        '/<%= plugin %>/ov<%= Plugin %>/<%= Plugin %>App.js'
      ],
      prod: [
        '/<%= plugin %>/be/js/openveo<%= Plugin %>.js'
      ]
    },
    cssFiles: [
      '/<%= plugin %>/be/css/<%= plugin %>.css'
    ]
  }
};
