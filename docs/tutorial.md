# Introduction

Let's pretend we want to create a plugin called **library** to manage a list of books.

# Create the plugin

Create the plugin using the Yeoman generator. Name it **library**.

    yo openveo-plugin library

# Restart server

Each time you modify a plugin **conf.js** or server sources, you need to restart your server to load your changes.
Best practice in developpement is to use a source watcher to reload automatically your server each time you save a file. 

You can use **[Nodemon](https://nodemon.io/)** or **[PM2](http://pm2.keymetrics.io/docs/usage/watch-and-restart/)**

---

# ENTITY

## Create an entity

Let's pretend we want to create an entity called **books**. An entity is a content with built-in CRUD (Create Read Update Delete) operations.

## Declare the entity

From the root of the **library** plugin locate the file [conf.js](conf.md#map-routes-on-actions) and defines a new entity **books** :

```js
entities: {
  books: 'app/server/controllers/BooksController'
}
```

That's all for the conf.js file. Note that no routes and no permissions need to be created. OpenVeo will create the following HTTP routes for you :

Private HTTP routes :

- **get /be/library/books/:id** - Get a particular book
- **get /be/library/books** - Get all books
- **post /be/library/books/:id** - Update a particular book
- **put /be/library/books** - Add a new book
- **delete /be/library/books/:id** - Delete a book

Web Service end points :

- **get /library/books/:id** - Get a particular book
- **get /library/books** - Get all books
- **post /library/books/:id** - Update a particular book
- **put /library/books** - Add a new book
- **delete /library/books/:id** - Delete a book

OpenVeo will also automatically create the following permissions :

- **LIBRARY.PERMISSIONS.GROUP_BOOKS**
  - **LIBRARY.PERMISSIONS.ADD_BOOKS_NAME**
  - **LIBRARY.PERMISSIONS.UPDATE_BOOKS_NAME**
  - **LIBRARY.PERMISSIONS.DELETE_BOOKS_NAME**

An entity must be associated to a controller, a model and a provider. Let's create them.

## Create entity controller

Create file **app/server/controllers/BooksController.js** :

```javascript
'use strict';

var util = require('util');
var openVeoApi = require('@openveo/api');
var BooksModel = process.requireLibrary('app/server/models/BooksModel.js');
var BooksProvider = process.requireLibrary('app/server/providers/BooksProvider.js');

/**
 * Creates a BooksController.
 */
function BooksController(database) {
  BooksController.super_.call(this);
}

module.exports = BooksController;
util.inherits(BooksController, openVeoApi.controllers.EntityController);

/**
 * Gets an instance of the BooksModel.
 *
 * @method getModel
 * @param {Object} request The HTTP request
 * @return {BooksModel} The BooksModel instance
 */
BooksController.prototype.getModel = function(request) {
  var database = process.api.getCoreApi().getDatabase();
  return new BooksModel(new BooksProvider(database));
};

// You should consider overriding the following methods from EntityController :
// BooksController.prototype.getEntitiesAction
// BooksController.prototype.getEntityAction
// BooksController.prototype.updateEntityAction
// BooksController.prototype.addEntityAction
// BooksController.prototype.removeEntityAction
```

A controller associated to an entity must inherits from **EntityController** and implements the **getModel** method. All routes actions are handled by the EntityController. However it is recommended to override these actions to control incoming request parameters.

## Create entity model

Create file **app/server/models/BooksModel.js** :

```javascript
'use strict';

var util = require('util');
var openVeoApi = require('@openveo/api');

/**
 * Creates a BooksModel.
 *
 * @param {BooksProvider} booksProvider The book provider to associate to the model
 */
function BooksModel(booksProvider) {
  BooksModel.super_.call(this, booksProvider);
}

module.exports = BooksModel;
util.inherits(BooksModel, openVeoApi.models.EntityModel);
```

A model associated to an entity must inherits from **EntityModel**. EntityModel provides methods to manipulate the entity (CRUD).

## Create entity provider

Create file **app/server/providers/BooksProvider.js** :

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

A provider associated to an entity must inherits from **EntityProvider**. EntityProvider provides methods to interact with the storage to manipulate the entity (CRUD). The EntityProvider expects the database instance as the first parameter. You can get the current database instance using :

```javascript
var database = process.api.getCoreApi().getDatabase();
```

EntityProvider expects, as second parameter, the name of the database collection to use for your entity. A best practice is to prefix the collection by the name of the plugin.

---

# PUBLIC PAGES

## Create a public page to display a book

Let's pretend we want to add a public page to display information about a book.

## Add the HTTP route to display the book

From the root of the **library** plugin locate the file [conf.js](conf.md#map-routes-on-actions).

```js
module.exports = {
  http: {
    routes: {
      public: {
        'get /books/:id/read': 'app/server/controllers/BooksController.displayBookAction'
      }
    }
  }
};
```

Requesting **/library/books/1/read** will call the **displayBookAction** method of the **BooksController**.

As a reminder :

- public HTTP routes will be mounted on **/library/**
- private HTTP routes will be mounted on **/be/library/**
- web service routes will be mounted on **/library/** (on Web Service's server)

## Create the route action

Public route **/library/books/:id/read** has been configured to call the  **displayBookAction** method of the **BooksController**. Let's create the **displayBookAction** method.

Open the **app/server/controllers/BooksController.js** and add the following code at the end of the file :

```javascript
/**
 * Displays a book.
 */
BooksController.prototype.displayBookAction = function(request, response, next) {
  var params = null;

  // Validate request parameters
  try {
    params = openVeoApi.util.shallowValidateObject(request.params, {
      id: {type: 'string', required: true}
    });
  } catch (error) {
    return next({
      code: 0x001,
      httpCode: 400,
      module: 'book'
    });
  }

  // Retrieve books
  var books = {
    '1': {
      title: 'Journey to the center of the earth',
      summary: 'The story begins in May 1863, in the Lidenbrock house in Hamburg, Germany, with Professor Lidenbrock rushing home to peruse his latest purchase, an original runic manuscript of an Icelandic saga written by Snorri Sturluson ("Heimskringla"; the chronicle of the Norwegian kings who ruled over Iceland).'
    }
  };

  // Display template book.html (created on the next step) using Mustache template
  response.render('book', books[params.id]);
};
```

For now our public route **/library/books/:id/read** isn't working because the **displayBookAction** method renders a template called **book.html** which is not created yet. Let's create it.

## Create the view

Create a file **app/client/front/views/book.html** :

```html
<!DOCTYPE html>
<html>
  <body>
    <div>
      <h1>{{title}}</h1>
      <p>{{summary}}</p>
    </div>
  </body>
</html>
```

For now our public route is still not working because Mustache template engine doesn't know where to find templates. Let's tell him.

## Set template's directory

Add the **app/client/front/views** directory to the list of directories handled by Mustache template engine (in [conf.js](conf.md#list-of-directories-containing-templates) file) :

```js
viewsFolders: [
  'app/client/front/views'
]
```

You can now restart OpenVeo and navigate to **/library/books/1/read** to display the book of id **1**.

---

# BACK END PAGES

## Create a back end page to display book information

Let's pretend we want to add a private page (back end page) to display information about a book.

## Configure back end menu

As described in [conf.js documentation](conf.md#define-back-end-menu-items) you can add a page to the back end.

Open **conf.js** file and add a new back end page.

```js
backOffice: {
  menu: [
    {
      weight: -50,
      label: 'LIBRARY.MENU.LIBRARY',
      subMenu: [
        {
          label: 'LIBRARY.MENU.BOOK',
          path: 'library/bookInfo',
          permission: 'library-access-book-page'
        }
      ]
    }
  ]
}
```

We defined a new menu entry for our plugin with label **LIBRARY.MENU.LIBRARY** (translation id) and a sub menu with one item named **LIBRARY.MENU.BOOK** (translation id) which requires **library-access-book-page** permission to see the page. For now there is nothing being the AngularJS route **library/bookInfo**. Let's create the route.

## Add an AngularJS back end route

As OpenVeo back end is written in AngularJS, each plugin has an AngularJS module to create its back end pages.

From the root of the **library** plugin locate the file **app/client/admin/js/ovLibrary/BookApp.js**. You can see the AngularJS module corresponding to the plugin. Add the new route :

```js
// Add route /library/bookInfo
$routeProvider.when('/library/bookInfo', {
  templateUrl: '/library/be/views/bookInfo.html',
  controller: 'LibraryBookController',
  title: 'LIBRARY.BOOK.PAGE_TITLE',
  access: 'library-access-book-page',
  resolve: {
    book: ['$q', function($q) {
      var p = $q.defer();
      p.resolve({
        title: 'Journey to the center of the earth',
        summary: 'The story begins in May 1863, in the Lidenbrock house in Hamburg, Germany, with Professor Lidenbrock rushing home to peruse his latest purchase, an original runic manuscript of an Icelandic saga written by Snorri Sturluson ("Heimskringla"; the chronicle of the Norwegian kings who ruled over Iceland).'
      });
      return p.promise;
    }]
  }
});
```

We defined a new route **/library/bookInfo** with a template, a controller, a page title and a permission to access the page. Let's create the controller, the template and the title translation.

## Add back end page controller

Create a file **app/client/admin/js/ovLibrary/BookController.js** :

```js
'use strict';

(function(app) {

  /**
   * Defines a book controller.
   */
  function BookController($scope, book) {
    $scope.title = book.title;
    $scope.summary = book.summary;
  }

  app.controller('LibraryBookController', BookController);
  BookController.$inject = ['$scope', 'book'];

})(angular.module('ov.library'));
```

Open [conf.js](conf.md#back-end-scripts) file and add the newly created file to the list of files to be loaded by OpenVeo :

```js
backOffice: {
  scriptFiles: {
    base: [],
    dev: [
      '/library/ovLibrary/BookController.js'
    ]
  }
}
```

## Add back end page template

Create a file **assert/be/views/bookInfo.html** :

```html
<h1 ng-bind="title"></h1>
<p ng-bind="summary"></p>
```

## Add back end translations

You can translate your back end pages using the back end dictionary called **admin-back-office**. Core will search for an **i18n** directory to look for dictionaries.

From the root of the **library** plugin locate the **i18n** directory. You can see french and english dictionaries for the back end (**i18n/admin-back-office-en.json** and **i18n/admin-back-office-fr.json**).

Add new translations in all languages (**i18n/admin-back-office-en.json**, **i18n/admin-back-office-fr.json** etc.) :

```json
{
  "MENU": {
    "LIBRARY": "Library",
    "BOOK": "Book"
  },
  "BOOK": {
    "PAGE_TITLE": "My book page"
  }
}
```

**Nb :** For more information on internationalization please refer to the [i18n documentation](i18n.md).
