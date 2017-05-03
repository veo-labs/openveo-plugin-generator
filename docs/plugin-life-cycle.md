# Plugin's life cycle

When starting the OpenVeo process, the core will automatically execute methods of plugins in the following order:

- **init** When called, core API is available, connection to database has been established, plugins are loaded and migrations scripts have been executed. This is a good place to create database indexes for all providers of the plugin and do some init stuff
- **start** When called, init steps has been performed on all plugins
