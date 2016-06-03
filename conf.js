'use strict';

module.exports = {
  routes: {
    public: {
    },
    private: {
      'get /getBoilers': 'app/server/controllers/BoilerController.getBoilersAction'
    },
    ws: {
    }
  },
  entities: {
    boilers: 'app/server/controllers/BoilerController'
  },
  permissions: [
    {
      id: 'boiler-access-list',
      name: 'BOILER.PERMISSIONS.ACCESS_LIST',
      paths: [
        'get /boiler/getBoilers'
      ]
    }
  ],
  backOffice: {
    menu: [
      {
        weight: -50,
        label: 'BOILER.MENU.BOILER',
        subMenu: [
          {
            label: 'BOILER.MENU.LIST',
            path: 'boiler/list',
            permission: 'boiler-access-list-page'
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
        '/boiler/ovBoiler/BoilerApp.js',
        '/boiler/ovBoiler/BoilerController.js',
        '/boiler/ovBoiler/BoilerService.js'
      ],
      prod: [
        '/boiler/be/js/openveoBoiler.js'
      ]
    },
    cssFiles: [
      '/boiler/be/css/boiler.css'
    ]
  }
};
