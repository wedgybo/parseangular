
(function (angular) { 'use strict';

  angular.module('parseangular', [])
    .provider('Parseangular', function ParseangularProvider($httpProvider) {

      var $phttp;

      var apiUrl = 'https://api.parse.com/'

      var version = 1;

      // TODO: Make these configurable through the provider
      this.APP_ID = '',
      this.REST_API_KEY = '';

      var config = {};

      this.setBaseUrl = function (url) {
        apiUrl = url;
        return this;
      };

      this.getBaseUrl = function () {
        return apiUrl + version;
      };


      this.getHeaders = function () {
        return config.headers;
      };

      this.initialise = function (appId, apiKey) {
        config.appId = appId;
        config.apiKey = apiKey;
        config.headers = {
          'X-Parse-Application-Id': appId,
          'X-Parse-REST-API-Key': apiKey
        };
      };

      this.setDefaultHttpHeaders = function(headers) {
        angular.extend(config.headers, headers);
      };

      this.$get = ['$http', function ($http) {

        // Make a copy of the $http service so we can have our own defaults for this service
        $phttp = angular.copy($http);

        var classUrl = function (className, id) {
          return id ? apiUrl + version + '/classes/' + className + '/' + id : apiUrl + version + '/classes/' + className;
        };

        var find = function (className, params) {
          return $phttp.get(classUrl(className), params);
        };

        var get = function (className, id, params) {
          return $phttp.get(classUrl(className, id), params);
        };

        var create = function (className, data, params) {
          return $phttp.post(classUrl(className), data, params).then(function (result) {
            Object.defineProperty(result.data, 'id', Object.getOwnPropertyDescriptor(result.data, 'objectId'));
            delete(result.data['objectId']);
            angular.extend(data, result.data);
            return data;
          });
        };

        var update = function (className, id, data, params) {
          return $phttp.put(classUrl(className, id), data, params).then(function (result) {
            angular.extend(data, result.data);
            return data;
          });
        };

        var destroy = function (className, id, params) {
          if (angular.isObject(id)) {
            id = id.id;
          }
          return $phttp.delete(classUrl(className, id), params);
        };

        return {
          find: find,
          get: get,
          create: create,
          update: update,
          destroy: destroy
        };
      }];
    });

})(angular);
