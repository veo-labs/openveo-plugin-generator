# Available generators
OpenVeo plugins provide some generators:

  - [openveo-plugin](#app) (default: openveo-plugin:app)
  - [openveo-plugin:entity](#entity)

## App
Sets up a new Openveo plugin, generating all the boilerplate you need to get started.

This plugin provide many grunt tasks to generate and publish documentation, to minify and compile your code, to start tests ...

After that, you can start you OpenVeo server and see your plugin in your menu with an access to a TODO page.

## Entity
Generates a new entity for the plugin with all files you need and the associated configuration (model, controller, provider)

# Yo options
yo openveo-plugin --help or yo openveo-plugin -h for help. If not provided, default values will be used.

  - `--skip-install` do not run `bower install` and `npm install` after generating the app, default is false (not skipping install)