# Introduction

Plugin's back end pages are written using AngularJS and SASS / Compass. SASS files need to be compiled to generate the CSS and JavaScript files can be minified and aggregated for better performance.

# Compiling SASS files

You can compile the back end SASS files using the following command:

    npm run build:scss

Or you can watch SASS files changes using the following command:

    npm run watch

# Compiling for production

You'll probably want to also compile AngularJS files along with SASS files, for production, for better performance. You can do it using:

    npm run build
