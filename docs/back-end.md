# Introduction

OpenVeo back end is an [AngularJS](https://angularjs.org/) single page application served on **/be**. That's why OpenVeo Plugins must write their back end pages using AngularJS whereas there is no restriction on front end pages implementation.

As you can see in the generated plugin, an AngularJS module is already written, thus all you have to do is to write new routes and implement your custom back end pages. OpenVeo core offers some features as factories, services, filters and directives that you can use to ease your plugin's development. See [OpenVeo core documentation](https://github.com/veo-labs/openveo-core) for more details.

# Add a back end page

Let's pretend we want to add a new back end page to a **library** plugin.

## Configure back end menu

As described in [conf.js documentation](conf.md#define-back-end-menu-items) you can add a page to the back end.

Open **conf.js** file and add a new back end page.

```js
backOffice: {
  menu: [
    {
      weight: -50,
      label: 'Library',
      subMenu: [
        {
          label: 'Book info',
          path: 'library/bookInfo',
          permission: 'library-access-book-page'
        }
      ]
    }
  ]
}
```

We defined a new menu entry for our plugin with **Library** as a label and a sub menu with one item named **Book info** which requires **library-access-book-page** permission to see the page. For now there is nothing being the AngularJS route **library/bookInfo**. Let's create the route.

## Add an AngularJS back end route

As OpenVeo back end is written in AngularJS, each plugin has an AngularJS module to create its back end pages.

Open file **app/client/admin/js/ovLibrary/BookApp.js**. You can see the AngularJS module corresponding to the plugin. Add the new route:

```js
// Add route /library/bookInfo
$routeProvider.when('/library/bookInfo', {
  templateUrl: '/library/be/views/bookInfo.html',
  controller: 'LibraryBookController',
  title: 'Book page title',
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

We defined a new route **/library/bookInfo** with a template, a controller, a page title and a permission to access the page. Let's create the controller and the template.

## Add back end page controller

Create a file **app/client/admin/js/ovLibrary/BookController.js**:

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

Open [conf.js](conf.md#back-end-scripts) file and add the newly created file to the list of files to be loaded by OpenVeo:

```js
backOffice: {
  scriptFiles: {
    base: [],
    dev: [
      'ovLibrary/BookController.js'
    ]
  }
}
```

## Add back end page template

Create a file **assert/be/views/bookInfo.html**:

```html
<h1 ng-bind="title"></h1>
<p ng-bind="summary"></p>
```
