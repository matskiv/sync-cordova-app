# sync-app 

```sync-app``` is a simple shopping list mobile web app that works with its server side companion app: [Sync Cloud App](https://github.com/feedhenry-templates/sync-cloud). This template demos the usage of the synchronization framework provided by [fh-js-sdk](https://github.com/feedhenry/fh-js-sdk).

|                 | Project Info  |
| --------------- | ------------- |
| License:        | Apache License, Version 2.0  |
| Build:          | Grunt |
| Documentation:  | http://docs.feedhenry.com/v3/dev_tools/sdks/basicweb.html|

## Build

### Build with Grunt

This template uses [Grunt](http://gruntjs.com/), the Javascript Task Runner. To use Grunt with this Template App, do the following:

* Install grunt: ```npm install -g grunt-cli```
* In your App directory, run: ```npm install```. This installs Grunt plugins, etc for use with this App.
* Run ```grunt serve``` to preview this App locally. 
  * Locally the app's url is: http://localhost:9002/?url=http://localhost:8001#/tabs/main
  * To point to a remote domain: http://localhost:9002/?url=CURRENT_HOST/#/tabs/main
  where CURRENT_HOST is displayed in you RHMAP cloud app details tab.

### FeedHenry local development

You can also use Grunt to point your App at a local developement server. To do this, use the ```grunt serve:local``` command. Some notes on using the serve:local task:

* by default, the local server development url is: http://localhost:8001
* you can change this directly in your local Gruntfile.js, in the app config:

```
  app: {
    // configurable paths
    app: 'www',
    url: '',
    default_local_server_url: 'http://localhost:8001'
  },
```

* you can also pass a 'url' optional flag to server:local, e.g. ```grunt serve:local --url=http://localhost:9000```

* You can also write your own tasks by extending the Gruntfile.js, e.g. add a 'serve:live' target that hits your server in your FeedHenry live enivronment.

## Example Usage

### Start synchronization

In ```www/js/service.js``` the synchronization loop is started.
```javascript
    init: function () {
      $fh.sync.init({   // [1]
        "do_console_log" : true,
        "storage_strategy" : "dom"
      });
      var deferred = $q.defer();
      var success = function(r) {
        // Process data
        deferred.resolve(result);
      };
      var fail = function(error) {
        // Log eror
        deferred.reject(error);
      };
      $fh.sync.manage(datasetId);   // [2]
      $fh.sync.notify(function(notification) { 
        if( 'sync_complete' == notification.code ) {  // [3]
          ...
        }
        else if( 'local_update_applied' === notification.code ) {
          ...
        }
        else if( 'remote_update_failed' === notification.code ) {
          ...
        }
      });
      return deferred.promise;
    }
```
[1] Initialize with sync configuration.

[2] Initialize a sync client for a given dataset.

[3] Register to listen to ```sync_complete, local_update_applied``` event. Trigger ```onSyncMessage:``` as a callback.




