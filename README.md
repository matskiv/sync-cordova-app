# Cordova Sync Template
---------
Author: Erik Jan de Wit   
Level: Intermediate
Technologies: Javascript, Cordova, RHMAP  
Summary: A demonstration of how to synchronize a single collection with RHMAP.
Community Project : [Feed Henry](http://feedhenry.org)
Target Product: RHMAP
Product Versions: RHMAP 3.8.0+
Source: https://github.com/feedhenry-templates/sync-cordova-app  
Prerequisites: fh-js-sdk : 3.0.+, cordova 4.0+

## What is it?

This application manages items in a collection that is synchronized with a remote RHMAP cloud application.  The user can create, update, and delete collection items.  Refer to [fhconfig.json](www/fhconfig.json) and [services.js](www/js/services.js) for the delevant pieces of code and configuraiton.

If you do not have access to a RHMAP instance, you can sign up for a free instance at [https://openshift.feedhenry.com/](https://openshift.feedhenry.com/).

## How do I run it?  

### RHMAP Studio

This application and its cloud services are available as a project template in RHMAP as part of the "Sync Framework Project" template.

### Local Clone (ideal for Open Source Development)
If you wish to contribute to this template, the following information may be helpful; otherwise, RHMAP and its build facilities are the preferred solution.

###  Prerequisites  
 * fh-js-sdk : 3.0.+
 * cordova: 4.0+

## Build instructions

### configuration
Edit [fhconfig.json](www/fhconfig.json) to include the relevant information from RHMAP.  

### Grunt

This template uses [Grunt](http://gruntjs.com/), the Javascript Task Runner. To use Grunt with this Template App, do the following:

* Install grunt: ```npm install -g grunt-cli```
* In your App directory, run: ```npm install```. This installs Grunt plugins, etc for use with this App.
* Run ```grunt serve``` to preview this App locally


### Local development

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

## How does it work?

### Initialization

[service.js#init](www/js/services.js#L36) is the method which is responsible for configuring and setting up syncronization.  Further details are available in our [API documentation](http://docs.feedhenry.com/v3/api/api_sync.html).

### Creating and Editing Items

[service.js#save(item)](www/js/services.js#L86) is called by the UI when the a item is created, and [service.js#update(item)](www/js/services.js#L81) is called for updates.

### Removing Items

[service.js#deleteItem(item)](www/js/services.js#L69) is called by the UI when a user swipes to remove an item from the list.
