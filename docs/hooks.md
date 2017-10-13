# Hooks

OpenVeo core and plugins may define hooks which you can use to execute an action when a hook is called. Hooks on OpenVeo are more like events waiting for all actions to be complete. Hook actions are executed in the order of registration.

## Register an action to an existing hook

To add an action to an existing hook do it in the **init step** of the [plugin's life cycle](plugin-life-cycle.md):

```js
MyPlugin.prototype.init = function() {

  // First get the plugin API defining the hook you want to listen to
  var coreApi = process.api.getCoreApi();

  // Get the list of hooks from the plugin
  var CORE_HOOKS = coreApi.getHooks();

  // Register an action on a hook
  // CORE_HOOKS.ROLES_DELETED hook gives the list of deleted role ids as parameter and the
  // function to call when action is done
  coreApi.registerAction(CORE_HOOKS.ROLES_DELETED, function(ids, callback) {
    console.log(ids);
    console.log('Do something');
    callback();
  });

};
```

## Create a hook for other plugins

To create a hook which could be handled by other plugins do as follow:

```js
// Get the API of your plugin
var api = process.api.getApi('my-plugin');

// Define data to send to actions
var data = {};

// Execute all actions registered to the hook
api.executeHook(api.getHooks().MY_CUSTOM_HOOK, data, function(error) {
  console.log('All actions of the hook done if no error');
});
```
