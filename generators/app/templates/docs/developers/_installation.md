# Installation

To install OpenVeo <%= Plugin %> you first need to install OpenVeo Core if not already done.


# OpenVeo Core

## Install @openveo/core package

    # Move to your workspace directory
    cd /WORKSPACE_PATH

    # Create directory for OpenVeo core
    mkdir openveo-core

    # Install OpenVeo core in this directory
    cd /WORKSPACE_PATH/openveo-core
    npm install @openveo/core

Your workspace should look like this :

```
.
├── openveo-core
```

## Create NPM links for openveo-api and openveo-test

In a classical NPM project <%= pluginName %> package should be installed in /WORKSPACE_PATH/openveo-core/node_modules/@openveo/core/node_modules/<%= pluginName %>. For development, the first thing which comes to mind is to create a clone of the OpenVeo <%= Plugin %> project inside this repository. But doing this will prevent npm install from working and will create a complicated development architecture with the risk to erase the repository at any time.

We use [NPM links](https://docs.npmjs.com/cli/link) to deal with this problem and store OpenVeo <%= Plugin %> inside /WORKSPACE_PATH/<%= pluginName %>. But there is a catch. OpenVeo <%= Plugin %> needs both @openveo/api and @openveo/test of the core. As packages <%= pluginName %> and @openveo/core are installed in two different locations, package <%= pluginName %> won't find @openveo/api nor @openveo/test in its Node.JS path. That's why we have to create NPM links for both @openveo/api and @openveo/test and refer to it inside <%= pluginName %>.

    # Create a link for @openveo/api
    cd /WORKSPACE_PATH/openveo-core/node_modules/@openveo/core/node_modules/@openveo/api
    npm link

    # Create a link for @openveo/test
    cd /WORKSPACE_PATH/openveo-core/node_modules/@openveo/core/node_modules/@openveo/test
    npm link

# OpenVeo <%= Plugin %>

## Clone project from git

    # Clone project into workspace
    cd /WORKSPACE_PATH/
    git clone PROPJECT_URL <%= pluginName %>

Your workspace should look like this :

```
.
├── openveo-core
├── <%= pluginName %>
```

## Link openveo-api and openveo-test

When installing OpenVeo Core we created NPM links for @openveo/api and @openveo/test. We can now refer to this links.

    # Install dependencies @openveo/api and @openveo/test using NPM links
    cd /WORKSPACE_PATH/<%= pluginName %>
    npm link @openveo/api
    npm link @openveo/test

## Install project's dependencies

    cd /WORKSPACE_PATH/openveo-<%= originalPluginName %>
    npm install

# Install plugin

To be able to install <%= pluginName %> in @openveo/core we create an NPM link of <%= pluginName %> and refer to it in the core.

## Create an NPM link

    # Create a link for <%= pluginName %>
    cd /WORKSPACE_PATH/<%= pluginName %>
    npm link

## Link project to the core

    # Install dependency <%= pluginName %> using NPM links
    cd /WORKSPACE_PATH/openveo-core
    npm link <%= pluginName %>
