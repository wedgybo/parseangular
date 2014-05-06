
(function (angular) { 'use strict';


  var module = angular.module('parseangular', []);

  module.provider('Parseangular', function () {

    var config = {
      baseUrl: 'https://api.parse.com/',
      version: '1',
      appId: '',
      apiKey: ''
    };

    return {
      initialize: function(appId, apiKey) {

        config.appId = appId;
        config.apiKey = apiKey;

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
      $get: ['$http', '$window', function ($http, $window) {
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
          store: {
            get: function () {
              $window.localStorage.getItem('Parse/' + config.appId + '/' + key, data);
            },
            set: function (key, data) {
              $window.localStorage.setItem('Parse/' + config.appId + '/' + key, data);
            },
            removeAll: function () {
              Object.keys($window.localStorage).forEach(function (key) {
                if (/Parse\/ + config.appId + /.test(key)) {
                  $window.localStorage.removeItem(key);
                }
              });
            },
            remove: function (key) {
              $window.localStorage.removeItem('Parse/' + config.appId + '/' + key);
            }
          },
          getBaseUrl: function () {
            return config.baseUrl + config.version;
          },
          setAppId: function (appId) {

          },
          setApiKey: function (apiKey) {
            //config.headers
          }
        }
      }]
    }
  })
})(angular);