# What's OpenVeo Plugin Generator ?

OpenVeo Plugin Generator is a [Yeoman](http://yeoman.io/) plugin generator for [OpenVeo](http://veo-labs.github.io/openveo-core) used to improve OpenVeo plugin development.

# Plugin
The generated plugin provides many features:

  - Many Grunt tasks to manage (compile, minify, generate documention) your code - Ready to production
  - Angular.js to manage back-end and front-end
  - A Node.js server with Express.js ready to start
  - No JQuery dependency
  - Responsive Design
  - The Sass preprocessor
  - Use of Bootstrap inherited from OpenVeo Core
  - Unit tests and e2e tests using [Protractor](http://www.protractortest.org/)
  - All the features of the OpenVeo Core are available in your plugin like i18n translation, alerts, CRUD controllers to manage your entities, a logger ...
  - The possibility to override all functions inherited from OpenVeo Core
  - A full documentation to get into the OpenVeo solution

# Structure

There is the general structure of a plugin

```
.
├── app
│   ├── client          
│   │   └── admin
│   │       ├── compass
│   │       └── js 
│   │           └── ovPluginName 
│   └── server
│       ├── controllers
│       ├── models
│       ├── providers
│       ├── Plugin.js
│       └── httpErrors.js
├── assets
│   ├── be
│   │   ├── css
│   │   ├── js
│   │   └── views
│   └── lib 
├── build
│   └── uglify
│       └── ovPluginName    
├── docs
├── i18n
├── migrations
├── tasks
├── tests
│   ├── client
│   └── server
├── .bowerrc
├── .eslintrc
├── .gitattributes
├── .npmignore
├── CHANGELOG.md
├── Gruntfile.js
├── README.md       
├── bower.json        
├── conf.js
├── index.js
├── install.js
├── mkdocs.yml
└── package.json
```
