'use strict';

module.exports = {
  http: {
    routes: {
      public: {
      },
      private: {
      },
      ws: {
      }
    }
  },
  socket: {
    namespaces: {
      public: {
      },
      private: {
      }
    }
  },
  entities: {
  },
  webServiceScopes: [
  ],
  permissions: [
    {
      id: '<%= originalPluginName %>-access-todo-page',
      name: '<%= PLUGIN %>.PERMISSIONS.ACCESS_TODO_PAGE_NAME'
    }
  ],
  backOffice: {
    menu: [
      {
        weight: -50,
        label: '<%= PLUGIN %>.MENU.<%= PLUGIN %>',
        subMenu: [
          {
            label: '<%= PLUGIN %>.MENU.TODO',
            path: '<%= originalPluginName %>/todo',
            permission: '<%= originalPluginName %>-access-todo-page'
          }
        ]
      }
    ],
    scriptLibFiles: {
      base: [],
      dev: [],
      prod: []
    },
    scriptFiles: {
      base: [],
      dev: [
        '/<%= originalPluginName %>/ov<%= Plugin %>/<%= Plugin %>App.js',
        '/<%= originalPluginName %>/ov<%= Plugin %>/<%= Plugin %>Controller.js'
      ],
      prod: [
        '/<%= originalPluginName %>/be/js/openveo<%= Plugin %>.js'
      ]
    },
    cssFiles: [
      '/<%= originalPluginName %>/be/css/<%= plugin %>.css'
    ]
  }
};
