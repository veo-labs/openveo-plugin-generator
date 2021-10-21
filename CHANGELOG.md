# 6.0.0 / YYYY-MM-DD

## BREAKING CHANGES

- No longer tested on NodeJS &lt; 16.3.0 and NPM &lt; 7.15.1

## DEPENDENCIES

### GENERATOR

- **chalk** has been upgraded from 4.0.0 to **4.1.2**
- **eslint** has been upgraded from 22.0.0 to **23.0.0**
- **lodash** has been upgraded from 4.17.15 to **4.17.21**
- **grunt-eslint** has been removed
- **grunt-gh-pages** has been removed
- **grunt-mkdocs** has been removed
- **yeoman-generator** has been upgraded from 1.0.1 to **5.4.2**

### PLUGINS

- **angular** has been upgraded from 1.5.5 to **1.6.4**
- **chai** has been upgraded from 4.0.2 to **4.3.4**
- **grunt-karma** has been upgraded from 3.0.2 to **4.0.2**
- **karma** has been upgraded from 4.4.1 to **6.3.4**

# 5.0.0 / 2020-05-04

## BREAKING CHANGES

- Drop support for NodeJS &lt; 12.4.0 and NPM &lt; 6.9.0

## DEPENDENCIES

- **chalk** has been upgraded from 1.1.3 to **4.0.0**
- **lodash** has been upgraded from 4.17.4 to **4.17.15**
- **yeoman-assert** has been removed as it wasn't used
- **yeoman-test** has been removed as it wasn't used
- **yosay** has been upgraded from 1.2.1 to **2.0.2**
- **grunt** has been upgraded from 1.0.1 to **1.1.0**
- **grunt-cli** has been upgraded from 1.2.0 to **1.3.2**
- **grunt-eslint** has been upgraded from 19.0.0 to **22.0.0**
- **grunt-gh-pages** has been upgraded from 2.0.0 to **3.1.0**
- **grunt-mkdocs** has been upgraded from 0.2.0 to **1.0.1**

# 4.0.0 / 2019-03-26

## BREAKING CHANGES

- Drop support for OpenVeo &lt;8.0.0

## BUG FIXES

- Fix "grunt remove:doc" which hasn't worked since version 2.0.0 for both project and generated plugin

# 3.0.0 / 2018-05-11

## BREAKING CHANGES

- Drop support for OpenVeo &lt;5.0.0
- Drop support for NodeJS &lt; 8.9.4 and NPM &lt; 5.6.0

## NEW FEATURES

- Add NPM package-lock.json file

## DEPENDENCIES

- **chai** has been upgraded from 3.5.0 to **4.0.2**
- **chai-as-promised** has been upgraded from 6.0.0 to **7.1.1**

# 2.0.0 / 2017-05-04

## BREAKING CHANGES

- Drop support for Node.js &lt;7.4.0
- Drop support for NPM &lt;4.0.5
- Drop support for OpenVeo &lt;4.0.0
- Entity generation has been removed. The generated entities weren't fully functional and the generation could lead to errors as it was based on JavaScript parsing.
- Generated plugins doesn't belong to the NPM scope @openveo but are prefixed by openveo-

## NEW FEATURES

- Fully functional examples have been added for client side unit tests, server side unit tests and end to end tests
- You can now generate your plugin without be prompt for plugin name using **yo openveo-plugin PLUGIN_NAME**
- Add plugin name validation when generating. Plugin name must only contains letters from the latin alphabet and dashes
- Add grunt task to plugin to generate the server side documentation : **grunt doc**

## BUG FIXES

- Fix warning when compiling SASS files on the generated plugin

## DEPENDENCIES

### GENERATOR

- **lodash** has been updated from 4.16.2 to **4.17.4**
- **yeoman-assert** has been updated from 2.2.1 to **2.2.2**
- **yeoman-generator** has been updated from 0.24.1 to **1.0.1**
- **yeoman-test** has been updated from 1.5.1 to **1.6.0**
- **yosay** has been updated from 1.2.0 to **1.2.1**
- **grunt** has been updated from 0.4.5 to **1.0.1**
- **grunt-eslint** has been updated from 18.1.0 to **19.0.0**
- **grunt-gh-pages** has been updated from 1.1.0 to **2.0.0**
- **grunt-mkdocs** has been updated from 0.1.3 to **0.2.0**
- **pre-commit** has been updated from 1.1.2 to **1.2.2**
- **glob** has been removed
- **grunt-remove** has been removed
- **grunt-rename** has been removed

### PLUGINS

- **grunt** has been updated from 0.4.5 to **1.0.1**
- **grunt-contrib-uglify** has been updated from 1.0.1 to **2.0.0**
- **grunt-eslint** has been updated from 18.1.0 to **19.0.0**
- **grunt-gh-pages** has been updated from 1.1.0 to **2.0.0**
- **grunt-karma** has been updated from 1.0.0 to **2.0.0**
- **grunt-mkdocs** has been updated from 0.1.3 to **0.2.0**
- **grunt-mocha-test** has been updated from 0.12.7 to **0.13.2**
- **karma** has been updated from 0.13.22 to **1.3.0**
- **karma-chrome-launcher** has been updated from 1.0.1 to **2.0.0**
- **karma-mocha** has been updated from 1.0.1 to **1.3.0**
- **karma-phantomjs-launcher** has been updated from 1.0.0 to **1.0.2**
- **mocha** has been updated from 2.4.5 to **3.2.0**
- **pre-commit** has been updated from 1.1.2 to **1.2.2**
- **glob** has been removed
- **grunt-remove** has been removed
- **grunt-extend-config** has been removed
- **grunt-init** has been removed
- **chai-as-promised** has been added to devDependencies
- **express** has been added to dependencies

# 1.0.0 / 2016-06-10

Firt version of [OpenVeo](https://github.com/veo-labs/openveo-core) plugin generator.

It provides a general structure for the development of an OpenVeo plugin.

- Initialization of an OpenVeo plugin generator with Yeoman
- Possibility to call the entity generator from the plugin generator
- Possibility to generate multiple entities from the entoty generator
- The plugin and entity generators must be used from the OpenVeo Core folder
- Generating a specific logger conf for the generated plugin
- Throw an error if user try to generate an existing pluging
- Display an error message to user if he try to generate an existing entity and ask again the question
