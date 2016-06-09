# Generator OpenVeo Plugin
A [Yeoman](http://yeoman.io/) plugin generator for [OpenVeo](http://veo-labs.github.io/openveo-core) used to improve OpenVeo plugin development

# Getting Started
You need to install Yeoman and OpenVeo plugin generator and then you can create your OpenVeo plugin:

```
# Install Yeoman and OpenVeo Plugin
npm install -g yo generator-openveo-plugin
# You must run the generator from the Openveo core folder
# Run openveo-plugin and follow the instructions
yo openveo-plugin
```

# Available generators
OpenVeo plugins provide some generators:

  - [openveo-plugin](#app) (default: openveo-plugin:app)
  - [openveo-plugin:entity](#entity)


## App
Sets up a new Openveo plugin, generating all the boilerplate you need to get started.

This plugin provide many grunt tasks to generate and publish documentation, to minify and compile your code, to start tests ...

After that, you can start you OpenVeo server and see your plugin in your menu with an access to a TODO page

## Entity
Generates a new entity for the plugin with all files you need and the associated configuration (model, controller, provider)

# Documentation
There is a documentation to help you to write your plugin.
See the OpvenVeo Core documentation to have more informations to [write a plugin](http://veo-labs.github.io/openveo-core/2.0.0/developers/write-plugin).