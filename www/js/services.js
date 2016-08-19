angular.module('app.services', [])

.factory('sync', ['$q', '$rootScope', '$fh', 'moment', function($q, $rootScope, $fh, moment) {
  var datasetId = "myShoppingList";
  function unwrapList(r) {
    var result = [];
    for(var i in r) {
      result.push(unwrap(r[i], i));
    }
    return result.reverse();
  }

  function unwrap(obj, id) {
      obj.id = id;
      obj.moment = moment(obj.data.created).fromNow();
      return obj;
  }

  function promiseWrap(block) {
      var deferred = $q.defer();
      var success = function(r) {
        deferred.resolve(r);
      };
      var fail = function(code, msg) {
        console.log("error msg" + msg);
        console.log("error code " + code);
        deferred.reject(msg);
      };

      block(success, fail);
      return deferred.promise;
  }

  return {
    init: function () {
      $fh.sync.init({
        "do_console_log" : true,
        "storage_strategy" : "dom"
      });
      var deferred = $q.defer();
      var success = function(r) {
        var result = unwrapList(r);
        $rootScope.$emit('sync', result);
        deferred.resolve(result);
      };
      var fail = function(error) {
        console.log("error " + error);
        console.log("error source " + error.source);
        console.log("error target " + error.target);
        deferred.reject(error);
      };

      $fh.sync.manage(datasetId);
      $fh.sync.notify(function(notification) {
        if( 'sync_complete' == notification.code ) {
          $fh.sync.doList(datasetId, success, fail);
        }
        else if( 'local_update_applied' === notification.code ) {
          $fh.sync.doList(datasetId, success, fail);
        }
        else if( 'remote_update_failed' === notification.code ) {
          var errorMsg = notification.message ? notification.message.msg ? notification.message.msg : undefined : undefined;
          fail(errorMsg);
        }
      });

      return deferred.promise;
    },
    deleteItem: function(item) {
      return promiseWrap(function(success, fail) {
        $fh.sync.doDelete(datasetId, item.id, success, fail);
      });
    },
    getItem: function(id) {
      return promiseWrap(function(success, fail) {
        $fh.sync.doRead(datasetId, id, function(r) {
          success(unwrap(r, id));
        }, fail);
      });
    },
    update: function(item) {
      return promiseWrap(function(success, fail) {
        $fh.sync.doUpdate(datasetId, item.id, item.data, success, fail);
      });
    },
    save: function(item) {
      item.data.created = new Date().getTime();
      return promiseWrap(function(success, fail) {
        $fh.sync.doCreate(datasetId, item.data, success, fail);
      });
    }
  };
}]);

