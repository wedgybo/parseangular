
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


(function (angular) { 'use strict';

  var ParseObject = function (Parseangular) {
    this.parse = Parseangular;
  };

  ParseObject.prototype.getUrl = function () {
    var id = arguments[0] || null;
    return id ?
      this.parse.getBaseUrl() + '/classes/' + this.className + '/' + id :
      this.parse.getBaseUrl() + '/classes/' + this.className;
  };

  ParseObject.prototype.get = function (id, params) {
    return this.parse.request('GET', this.getUrl(id), null, params).then(function (result) {
      return result.data;
    });
  };

  ParseObject.prototype.find = function (params) {
    return this.parse.request('GET', this.getUrl(), null, params).then(function (result) {
      return result.data;
    });
  };

  ParseObject.prototype.create = function (data, params) {
    return this.parse.request('POST', this.getUrl(), data, params).then(function (result) {
      // Switch the regular id field with the returned objectId field for continuity.
      Object.defineProperty(result.data, 'id', Object.getOwnPropertyDescriptor(result.data, 'objectId'));
      return angular.extend(data, result.data);
    });
  };

  ParseObject.prototype.update = function (id, data, params) {
    return this.parse.request('PUT', this.getUrl(id), data, params).then(function (result) {
      return angular.extend(data, result.data);
    });
  };

  ParseObject.prototype.destroy = function (id, params) {
    return this.parse.request('DELETE', this.getUrl(id), null, params);
  };

  ParseObject.prototype.new = function (className) {
    var obj = new ParseObject(this.parse);
    obj.className = className
    return obj;
  };

  angular.module('parseangular').service('ParseObject', ['Parseangular', ParseObject]);

})(angular);







