# Introduction

OpenVeo back office is written using AngularJS and SASS / Compass. SASS files need to be compiled to generate the CSS and JavaScript files can be minified and aggregated for better performance.

OpenVeo does not automatically compile SASS and JavaScript files for its plugins. Thus each OpenVeo Plugin have to compile its own SASS and JavaScript files.

# Compiling OpenVeo <%= Plugin %> plugin for production

To compile OpenVeo <%= Plugin %> back office for production use:

    npm run build

# Compiling OpenVeo <%= Plugin %> plugin for development

To compile OpenVeo <%= Plugin %> back office for development use:

    npm run build:development

To compile OpenVeo <%= Plugin %> back office when a file is modified use:

    npm run watch
