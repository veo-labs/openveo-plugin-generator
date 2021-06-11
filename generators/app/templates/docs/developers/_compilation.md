# Introduction

OpenVeo back end is written using AngularJS and SASS / Compass. SASS files need to be compiled to generate the CSS and JavaScript files can be minified and aggregated for better performance.

OpenVeo does not automatically compile SASS and JavaScript files for its plugins. Thus each OpenVeo Plugin have to compile its own SASS and JavaScript files.

In order to manage those compilations, we use [Grunt](http://gruntjs.com/) - A Javascript task runner. Many tasks are already written, but you can add your own.

# Compiling OpenVeo <%= Plugin %> back office client

You can compile OpenVeo <%= Plugin %> the back office client use:

    npm run build

To compile OpenVeo <%= Plugin %> back office when a file is modified use:

    npm run watch
