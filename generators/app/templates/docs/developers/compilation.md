# Introduction

OpenVeo back end is written using AngularJS and SASS / Compass. SASS files need to be compiled to generate the CSS and JavaScript files can be minified and aggregated for better performance.

OpenVeo does not automatically compile SASS and JavaScript files for its plugins. Thus each OpenVeo Plugin have to compile its own SASS and JavaScript files.

In order to manage those compilations, we use [Grunt](http://gruntjs.com/) - A Javascript task runner. Many tasks are already written, but you can add your own.

# Compiling SASS files

You can compile the plugin's back end SASS files using the following command (from plugin's root directory) :

    grunt compass:dist

Or you can watch SASS files changes using the following command (from plugin's root directory) :

    grunt

# Compiling JavaScript files

You'll probably want to compile AngularJS files for production. You can do it using (from plugin's root directory) :

    grunt prod
