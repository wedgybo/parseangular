
(function (angular) { 'use strict';


  var module = angular.module('parseangular', []);

  module.provider('Parseangular', function () {

    var config = {
      baseUrl: 'https://api.parse.com/',
      version: '1'
    };

    return {
      initialize: function(appId, apiKey) {
        config.headers = {
          'X-Parse-Application-Id': appId,
          'X-Parse-REST-API-Key': apiKey,
          'Content-Type': 'application/json'
        };
      },
      getBaseUrl: function () {
        return config.baseUrl + config.version;
      },
      getHeaders: function () {
        return config.headers;
      },
      $get: ['$http', function ($http) {
        return {
          request: function (method, url, data, params, type) {

            var headers = {};
            angular.copy(config.headers, headers);

            // Overriding the type of data we're requesting. JSON by default
            if (type) {
              headers['Content-Type'] = type
            }

            //console.log('Request', method, url, data, params, headers, config);
            return $http({
              method: method,
              url: url,
              data: data,
              params: params,
              headers: config.headers
            });
          },
          getBaseUrl: function () {
            return config.baseUrl + config.version;
          }
        }
      }]
    }
  })
})(angular);