# Generate a plugin

OpenVeo Plugin Generator helps you creates a new [OpenVeo](https://github.com/veo-labs/openveo-core) plugin by generating the default plugin's structure. To generate a plugin, run the generator using:

    cd /WORKSPACE_PATH
    yo openveo-plugin

You will be prompted for information. Don't worry if you made a mistake, nothing is immutable. </br>
At the end of the installation a new directory has been created containing the sources of your plugin.

Your workspace should look like this:

```
.
├── openveo-core
├── openveo-PLUGIN_NAME
```

# Link your plugin

To easily install your plugin into OpenVeo core you need to make it a global NPM package using [NPM links](https://docs.npmjs.com/cli/link):

    cd /WORKSPACE_PATH/openveo-PLUGIN_NAME
    npm link

# Build your plugin

Plugin front end has to be built.

    cd /WORKSPACE_PATH/openveo-PLUGIN_NAME
    grunt prod

# Install your plugin

Once a link has been made on your plugin you can install it using:

    cd /WORKSPACE_PATH/openveo-core
    npm link openveo-PLUGIN_NAME

# Start / Restart OpenVeo

Your plugin is now created. You can start / restart OpenVeo:

    cd /WORKSPACE_PATH/openveo-core
    node server.js

# Verify that your plugin is working

You can now access OpenVeo back end. From back end menu you should see a new entry with the name of your plugin. It should lead you to a TODO page.

# What's next?

Now that you have a full operational plugin, you probably want to know more about it. The next pages will lead you to all you have to know about plugin's development.
