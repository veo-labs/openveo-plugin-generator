OpenVeo uses [Mustache](https://github.com/janl/mustache.js) as the template engine. You have to declare a directory containing your template files before using a mustache template file. You can do it in [conf.js](conf.md#list-of-directories-containing-templates) file.

Then you can call the template using [render express function](http://expressjs.com/en/4x/api.html#app.render) in your controller's actions.
