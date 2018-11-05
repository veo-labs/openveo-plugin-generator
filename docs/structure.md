# Structure
When generated, the plugin's structure should look like:

```
.
├── app // Project's sources
│   ├── client // Client side sources (executed in a browser)
│   │   ├── admin // Client side sources for the back end pages
│   │   │   ├── compass // SCSS files of the back end pages
│   │   │   └── js // JavaScript files of the back end pages
│   │   │       └── ovPluginName // All JavaScript files of the plugin's AngularJS module
│   │   └── front // Client side sources for front end pages
│   └── server // Server side sources (executed by Node.js)
│       ├── controllers // Controllers (extending Controller)
│       │   └── httpErrors.js // Holds the list of HTTP errors used by controllers
│       ├── providers // Providers (extending Provider)
│       ├── PLUGIN_NAMEPlugin.js // The plugin class (extending Plugin)
│       └── PLUGIN_NAMEPluginApi.js // The pluginApi class (extending PluginApi)
├── assets // Public directory for static files (mounted on /PLUGIN_NAME/)
│   └── be // Back end pages resources
│       ├── css // Generated CSS files for the back end pages
│       ├── js // Generated JavaScript files for the back end pages
│       └── views // AngularJS partials for the back end pages
├── docs // Markdown documentation of the project
├── i18n // Translation dictionaries
├── migrations // Migration scripts
├── tasks // Grunt tasks
├── tests // Tests
│   ├── client // Client side tests
│   │   ├── unitTests // Unit tests
│   │   └── e2eTests // End to end tests using protractor
│   └── server // Server side unit tests
├── .eslintrc // Eslint rules
├── .gitattributes // Git attributes configuration file
├── .npmignore // NPM ignore configuration file
├── CHANGELOG.md // Plugin's change logs
├── Gruntfile.js // Grunt configuration file
├── README.md // Plugin's README
├── conf.js // Plugin's configuration file
├── index.js // Plugin's main file
├── mkdocs.yml // MkDocs configuration file
└── package.json // NPM configuration file
```


# Dive into plugin's files

## Plugin's directory

After executing the plugin's generator a directory **openveo-PLUGIN_NAME** should be available in your workspace.

## Plugin's main files

**index.js** exposes:

- The Plugin class. If this class does not extend the Plugin class, defined in module [@openveo/api](https://github.com/veo-labs/openveo-api), the plugin won't be loaded by the core.

**processRequire.js** defines:

- A **process.rootPLUGIN_NAME** property holding the absolute path of the plugin's root directory which you can use everywhere in your plugin
- A **process.requirePLUGIN_NAME** property holding a function to require a Node.js module using a path relative to the plugin's root path. As the root of the application is the core directory using Node.js **require** function will load a module from the core root directory. Best practice is to use relative path to require a module in your plugin or use the function **process.requirePLUGIN_NAME** with a path relative to the root of your plugin.

## Plugin class

A plugin must have a class which extends **Plugin** class (defined in module [@openveo/api](https://github.com/veo-labs/openveo-api)).

Locate file **app/server/PLUGIN_NAMEPlugin.js**.

**PLUGIN_NAMEPlugin.js** extends **Plugin** class and has the following properties:

- **router** The express HTTP router holding all public routes of the plugin
- **privateRouter** The express HTTP router holding all private routes of the plugin (require a back end authentication)
- **webServiceRouter** The express HTTP router holding all Web Service routes of the plugin (require Web Service authentication)
- **api** The API exposed, by the plugin, to other plugins (must be an instance of **PluginApi**)
- **init** A method part of the [plugin's life cycle](plugin-life-cycle.md), automatically called by the core before starting the servers
- **start** A method part of the [plugin's life cycle](plugin-life-cycle.md), automatically called by the core after the init step

All these properties are optional.

## Plugin API

A plugin can expose APIs to other plugins by creating a class extending the PluginApi class.

Locate file **app/server/PLUGIN_NAMEPluginApi.js**.

**PLUGIN_NAMEPluginApi.js** extends **PluginApi**. All methods and properties will be exposed to other plugins through the **api** property of the Plugin.

## Resources

All files inside **assets** directory are served by the HTTP server as they are. You can put here images, front JavaScript files, CSS files and so on. The core will mount this directory on **/PLUGIN_NAME/**, thus to access image **assets/test.jpg** you have to call **/PLUGIN_NAME/test.jpg**.
