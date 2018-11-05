# Introduction

A consequent part of the development of plugins is made in **conf.js** file at plugin's root. **conf.js** is used to:

- [Map HTTP routes on actions](#map-routes-on-actions)
- [Create entities](#create-entities)
- [Define back end permissions](#define-back-end-permissions)
- [Define back end menu items](#define-back-end-menu-items)
- [Load back end scripts](#back-end-scripts)
- [Load back end CSS](#back-end-css)
- [Set the list of directories containing templates](#list-of-directories-containing-templates)
- [Define image styles](#define-image-styles)
- [Define Web Service scopes](#define-web-service-scopes)
- [Define socket namespaces](#define-socket-namespaces)
- [Define custom configuration](#define-custom-configuration)

# Map HTTP routes on actions

HTTP routes are separated into three categories : public, private and Web Service routes.

```js
http: {
  routes: {
    public: {
      [...]
    },
    private: {
      [...]
    },
    ws: {
      [...]
    }
  }
}
```

## Route descriptor

A route maps an HTTP method and a path to an action (JavaScript function).

The route:

    'get /test' : 'app/server/controllers/TestController.testGetAction'

Can be interpreted as:

  > *A GET request on /test will call the function testGetAction exposed by module app/server/controllers/TestController.js*

The route:

    'post /test' : 'app/server/controllers/TestController.testPostAction'

Can be interpreted as:

  > *A POST request on /test will call the function testPostAction exposed by module app/server/controllers/TestController.js*

The route:

    '/test' : 'app/server/controllers/TestController.testAllAction'

Can be interpreted as:

  > *All requests on /test (GET, POST, DELETE, PUT) will call the function testAllAction exposed by module app/server/controllers/TestController.js*

Example of valid routes:

```js
http: {
  routes: {
    public: {
      'get /test': 'TestController.getTestAction',
      'post /test': 'TestController.postTestAction',
      'put /test': 'TestController.putTestAction',
      '/test': 'TestController.allTestAction'
    }
  }
}
```

## Group routes

You can group actions by routes:

```js
http: {
  routes: {
    public: {
      '*': [
        'TestController.allFirstAction',
        'TestController.allSecondAction'
      ]
    }
  }
}
```

## Route parameters

You can add parameters using colon character:

```js
http: {
  routes: {
    public: {
      'DELETE /test/:id': 'TestController.deleteTestAction'
    }
  }
}
```

## Create TestController

```javascript
'use strict';

var util = require('util');
var openVeoApi = require('@openveo/api');

/**
 * Creates a TestController.
 */
function TestController() {
  TestController.super_.call(this);
}

module.exports = TestController;
util.inherits(TestController, openVeoApi.controllers.Controller);

/**
 * Defines an example action.
 *
 * @param {Object} request Express HTTP request
 * @param {Object} response Express HTTP response
 * @param {Function} next Express next function to move on the next middleware
 */
TestController.prototype.exampleAction = function(request, response, next) {
  response.status(200).send('ok');
};

```

# Define socket namespaces

Socket namespaces are mounted on the OpenVeo Socket server to listen to Socket messages.

## Create a socket namespace

You can define new namespaces for the Socket server in **conf.js**.<br/>
Namespaces are separated into two categories: public and private namespaces.<br/>
Let's pretend we want to create a public and a private namespace for a **library** plugin.

```js
socket: {
  namespaces: {
    public: { // Public namespaces can be accessed by anyone
      'public-namespace': {
        [...] // Namespace messages descriptors
      }
    },
    private: { // Private namespaces require a back end authentication
      'private-namespace': {
        [...] // Namespace messages descriptors
      }
    }
  }
}
```

## Message descriptor

A socket message maps a message to an action (JavaScript function).

The message:

    'my.test.message' : 'app/server/controllers/TestController.testMessageAction'

Can be interpreted as:

  > *A socket message 'my.test.message' will call the function testMessageAction exposed by module app/server/controllers/TestSocketController.js*

The following messages are automatically sent by the socket server and does not need to be send by the socket client:

- **connection** Client is connected to the socket server
- **disconnect** Client has been disconnected from the socket server
- **error** An error occurred in client / server connection

Let's pretend we want to handle the default messages and custom messages in our **public-namespace** namespace:

```js
'public-namespace': {
  connection: 'app/server/controllers/TestSocketController.connectAction',
  disconnect: 'app/server/controllers/TestSocketController.disconnectAction',
  error: 'app/server/controllers/TestSocketController.errorAction',
  customMessage1: 'app/server/controllers/TestSocketController.customMessage1Action',
  customMessage2: 'app/server/controllers/TestSocketController.customMessage2Action'
}
```

## Create TestSocketController

Create a file **app/server/controllers/TestSocketController.js**:

```javascript
'use strict';

var util = require('util');
var openVeoApi = require('@openveo/api');
var coreApi = process.api.getCoreApi();

/**
 * Creates a TestSocketController.
 *
 * @param {SocketNamespace} The namespace associated to this socket controller.
 */
function TestSocketController(namespace) {
  TestSocketController.super_.call(this, namespace);
}

module.exports = TestSocketController;
util.inherits(TestSocketController, openVeoApi.controllers.SocketController);

/**
 * Handles socket's connection.
 *
 * Socket's connection has been established with a client.
 *
 * @method connectAction
 * @param {Socket} socket The socket
 */
TestSocketController.prototype.connectAction = function(socket) {
  console.log('Client connected');
};

/**
 * Handles socket's disconnection.
 *
 * Connection with client has been lost.
 *
 * @method disconnectAction
 * @param {Socket} socket The socket
 */
TestSocketController.prototype.disconnectAction = function(socket) {
  console.log('Client disconnected');
};

/**
 * Handles socket's connection errors.
 *
 * An error occurred on socket's communication.
 *
 * @method errorAction
 * @param {Error} error The error
 * @param {Socket} socket The socket
 */
TestSocketController.prototype.errorAction = function(error, socket) {
  console.log(error);
};

/**
 * Defines customMessage1 action.
 *
 * @param {Object} data Socket message's datas
 * @param {Socket} socket The opened socket
 * @param {Function} callback The callback to respond to the client
 */
TestSocketController.prototype.customMessage1Action = function(data, socket, callback) {

  // Send a response to the client
  callback({
    property1: 'value1'
  });

};

/**
 * Defines customMessage2 action.
 *
 * @param {Object} data Socket message's datas
 * @param {Socket} socket The opened socket
 * @param {Function} callback The callback to respond to the client
 */
TestSocketController.prototype.customMessage2Action = function(data, socket, callback) {

  // Send a message on all namespace's clients
  this.namespace.emit('test.response', {
    property2: 'value2'
  });

};

```

## Use socket namespace

We created a socket namespace **public-namespace** for the **library** plugin. Namespace is now available on the socket server and is mounted on **/library/public-namespace**. All socket messages sent to this namespace will be routed to actions defined in **conf.js** file.

# Create entities

Entities are elements subject to CRUD (**C**reate **R**ead **U**pdate **D**elete). For example, OpenVeo core defines 5 entities:

- applications - Web Service client applications
- users - Back end users
- roles - Back end roles
- groups - Groups
- taxonomies - Taxonomies with associated terms

Each entity will automatically have 3 associated back end permissions : add, update and delete.<br/>
To create a new entity you need to create an EntityController and an EntityProvider.<br/>
Let's say we want to create a new entity called **books** on a plugin named **library**.

## Create entity provider

Create a file **app/server/providers/BooksProvider.js**:

```javascript
'use strict';

var util = require('util');
var openVeoApi = require('@openveo/api');

/**
 * Creates a BooksProvider.
 */
function BooksProvider(database) {
  BooksProvider.super_.call(this, database, 'library_books');
}

// BookProvider must extend EntityProvider
module.exports = BooksProvider;
util.inherits(BooksProvider, openVeoApi.providers.EntityProvider);
```

## Create entity controller

Create a file **app/server/controllers/BooksController.js**:

```javascript
'use strict';

var util = require('util');
var openVeoApi = require('@openveo/api');
var BooksProvider = process.requireBook('app/server/providers/BooksProvider.js');

/**
 * Creates a BooksController.
 */
function BooksController(database) {
  BooksController.super_.call(this);
}

module.exports = BooksController;
util.inherits(BooksController, openVeoApi.controllers.EntityController);

/**
 * Gets an instance of the BooksProvider.
 *
 * @method getProvider
 * @return {BooksProvider} The BooksProvider instance
 */
BooksController.prototype.getProvider = function() {
  var database = process.api.getCoreApi().getDatabase();
  return new BooksProvider(database);
};
```

## Declare entity

You can now declare your entity in **conf.js**:

```js
entities: {
  books: 'app/server/controllers/BooksController'
}
```

## Use the entity

Now that your entity **books** is created you can see the 3 new permissions in the back end (add, update and delete). You can also perform CRUD operations on your entity using the following private routes (with a user connected to the back end):

- **get /be/library/books/:id** - Get a particular book
- **get /be/library/books** - Get all books
- **post /be/library/books/:id** - Update a particular book
- **put /be/library/books** - Add a new book
- **delete /be/library/books/:id** - Delete a book

Finally you can perform CRUD operations on your entity using the Web Service (with a user connected to the Web Service) using the following end points:

- **get /library/books/:id** - Get a particular book
- **get /library/books** - Get all books
- **post /library/books/:id** - Update a particular book
- **put /library/books** - Add a new book
- **delete /library/books/:id** - Delete a book

# Define back end permissions

Each role can have n associated permissions. Permissions are described in **conf.js**:

```js
permissions: [
  [...]
]
```

## Create a permission

Let's create new permissions "sell" and "buy" to sell / buy books.

```js
permissions: [
  {
    id: 'library-sell-books', // Permission id
    name: 'Sell', // Permission name
    description: 'Sell books', // Permission description
    paths: [ // List of rules associated to the permission
      'get /library/books/:id/sell'
    ]
  },
  {
    id: 'library-buy-books', // Permission id
    name: 'Buy', // Permission name
    description: 'Buy books', // Permission description
    paths: [ // List of rules associated to the permission
      'get /library/books/:id/buy'
    ]
  }
]
```

A permission is defined by:

  - an **id** which must be unique and prefix by the name of your plugin
  - a **name** displayed in OpenVeo administration interface when listing permissions (it could be a translation id)
  - a **description** not actually used (it could be a translation id)
  - a list of **rules** this permission authorizes. In the above example, a user with permission **Sell** can perform requests on route **get /library/books/25/sell**. It uses a parameter (**:id**) to match routes containing dynamic parts. It is also possible to use a wildcard at the end of the rule like **/library/books/***

## Group permissions

You can group permissions to organize the list of permissions in the back end.

**Nb**: Actually OpenVeo only supports one sub level

```js
permissions: [
  {
    label: 'Library', // Group label
    permissions: [ // List of permission in the group
      {
        id: 'library-sell-books',
        name: 'Sell',
        description: 'Sell books',
        paths: [
          'get /library/books/:id/sell'
        ]
      },
      {
        id: 'library-buy-books',
        name: 'Buy',
        description: 'Buy books',
        paths: [
          'get /library/books/:id/buy'
        ]
      }
    ]
  }
]
```

## Use permissions

You can assign your permission to a role through the back end or manipulate the permission using [back end client](back-end.md) (AngularJS application).


# Define back end menu items

Back end menu items are described in **conf.js**:

```js
backOffice: {
  menu: [
    [...]
  ]
}
```

## Add a menu item

Let's create two new back end menu items.

```js
backOffice: {
  menu: [
    {
      weight: -5,
      label: 'Sell books', // Menu item name
      path: 'library/books/sell-books', // Menu item path
      permission: 'library-sell-books' // Menu item associated permission
    },
    {
      weight: -6,
      label: 'Buy books', // Menu item name
      path: 'library/books/buy-books', // Menu item path
      permission: 'library-buy-books' // Menu item associated permission
    }
  ]
}
```

**weight** property helps order menu items, the larger the weight is, the better will be the item position.<br/>
**path** defines the AngularJS root path (see [back end client](back-end.md))<br/>
**permission** associates a permission to the menu item, if the connected user doesn't have that permission the item won't be displayed

## Group menu items

You can group menu items as sub menu items.

**Nb** : Actually OpenVeo only supports one sub level of menu items

```js
backOffice: {
  menu: [
    {
      weight: 100, // Position of the item in the menu
      label: 'Books', // Name of the menu item
      subMenu: [ // List of sub menu items
        {
          label: 'Sell books',
          path: 'library/books/sell-books',
          permission: 'library-sell-books'
        },
        {
          label: 'Buy books',
          path: 'library/books/buy-books',
          permission: 'book-buy-books'
        }
      ]
    }
  ]
}
```

# Libraries

The list of libraries to load are defined in **conf.js**:

```js
libraries: [
  {

    // The name of the library as defined in package.json file
    name: 'angular',

    // The mount path to use to access the library, it will be automatically prefixed by the plugin mount path
    mountPath: 'angular-custom-mount-path',

    // The list of files to automatically load in the back office with paths relative to the library directory
    // Library will still be mounted even if there is no files to automatically load in the back office
    files: ['angular.min.js', 'angular-csp.css']

  },
  [...]
]
```

**Nb:** library files are loaded before the back end scripts below

# Back end scripts

The list of JavaScript files to load for the AngularJS back end application are defined in **conf.js**:

```js
backOffice: {
  scriptLibFiles: { // List of back end JavaScript files to load first
    dev: [ // List of scripts to load on development environment
      [...]
    ],
    prod: [ // List of script to load on production environment
      [...]
    ]
  },
  scriptFiles: { // List of back end JavaScript files to load next
    dev: [ // List of scripts to load on development environment
      [...]
    ],
    prod: [ // List of script to load on production environment
      [...]
    ]
  }
}
```

# Back end CSS

The list of CSS files to load for the AngularJS back end application are defined in **conf.js**:

```js
backOffice: {
  cssFiles: [ // List of CSS to load
    [...]
  ]
}
```

# List of directories containing templates

OpenVeo uses [Mustache](https://github.com/janl/mustache.js) as the template engine. Mustache requires directories where to look for potential templates. The list of directories is defined in **conf.js**:

```js
viewsFolders: [ // List of directories holding mustache templates
  [...]
]
```

# Define image styles

You can define image styles in **conf.js**:

```js
imageProcessing: {
  folders: [ // List of folders which contain images to process on demand
    {
      imagesDirectory: 'example/images', // Path of the directory containing images to process relative to project root directory
      cacheDirectory: 'example/images/.cache' // Path of the directory containing processed images relative to project root directory (default to {imagesDirectory}/.cache)
    }
  ],
  styles: [ // The list of style definitions
    {
      id: 'book-style', // Id of the style to apply when requesting an image processing
      type: 'thumb', // The type of transformation to apply (only "thumb" is available right now)
      width: 200, // Expected width (in px) of the image (default to 10)
      quality: 50 // Expected quality from 0 to 100 (default to 90 with 100 the best)
    }
  }
}
```

Then you can call the image with your custom style **book-style**:

```html
<img src="book/example/images/image1.jpg?style=book-style"/>
```

Note that the original image is still available:

```html
<img src="book/example/images/image1.jpg"/>
```

# Define custom configuration

You can define a custom configuration object in **conf.js**:

```js
custom: {
  customProperty1: 'customValue1',
  customProperty2: 2
}
```

**Nb:** Custom configuration won't be interpreted but can be retrieved later using OpenVeo API. You can use it as you like.

# Define web service scopes

You can define web service scopes in **conf.js**:

```js
webServiceScopes: [
  {
    id: 'library-scopeId',
    name: 'Scope name',
    description: 'Scope description',
    paths: [
      'get /library/books/sell',
      'get /library/books/buy'
    ]
  }
]
```

A scope is defined by:

  - an **id** which must be unique and prefix by the name of your plugin
  - a **name** displayed in OpenVeo administration interface when listing scopes (it could be a translation id)
  - a **description** not actually used (it could be a translation id)
  - a list of **rules** this scope authorizes. In the above example, a client application with scope **Scope name** can perform requests on two endpoints: **get /library/books/sell** and **get /library/books/buy**. Both endpoints could have been grouped into one rule **get /library/books/***. It is also possible to deal with paths containing dynamic parts like **get /library/books/25/sell** using a rule with a parameter: **get /library/books/:id/sell**
