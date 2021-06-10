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
      dev: [],
      prod: []
    },
    scriptFiles: {
      dev: [
        'ov<%= Plugin %>/<%= Plugin %>App.js',
        'ov<%= Plugin %>/<%= Plugin %>Controller.js'
      ],
      prod: [
        'be/js/openveo<%= Plugin %>.js'
      ]
    },
    cssFiles: [
      'be/css/<%= plugin %>.css'
    ]
  },
  libraries: []
};
