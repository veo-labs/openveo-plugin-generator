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
    {
      id: '<%= plugin %>-access-todo-page',
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
            path: '<%= plugin %>/todo',
            permission: '<%= plugin %>-access-todo-page'
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
        '/<%= plugin %>/ov<%= Plugin %>/<%= Plugin %>App.js',
        '/<%= plugin %>/ov<%= Plugin %>/<%= Plugin %>Controller.js',
        '/<%= plugin %>/ov<%= Plugin %>/<%= Plugin %>Service.js'
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
