
(function (angular) { 'use strict';


  var ParseObject = function (Parseangular) {
    this.parse = Parseangular;
  };

  /**
   * @ngdoc method
   * @name ParseObject#new
   *
   * @description Create a new instance of this service. Allows you to create multiple services quickly
   * for each object you need to access.
   *
   * @param className
   * @returns {ParseObject}
   */
  ParseObject.prototype.new = function (className) {
    var obj = new ParseObject(this.parse);
    obj.className = className
    return obj;
  };

  /**
   * @ngdoc method
   * @name ParseObject#getUrl
   *
   * @description Returns the url path to access this parse data object on the REST API
   *
   * @param {string} `Optional` - Specify the ID to get the URL to that specific object
   * @returns {string} The url to the object on parse
   */
  ParseObject.prototype.getUrl = function () {
    var id = arguments[0] || null;
    return id ?
      this.parse.getBaseUrl() + '/classes/' + this.className + '/' + id :
      this.parse.getBaseUrl() + '/classes/' + this.className;
  };

  /**
   * @ngdoc method
   * @name ParseObject#get
   *
   * @description
   *
   * @param id
   * @param params
   * @returns {*}
   */
  ParseObject.prototype.get = function (id, params) {
    return this.parse.request('GET', this.getUrl(id), null, params).then(function (result) {
      return result.data;
    });
  };

  /**
   * @ngdoc method
   * @name ParseObject#find
   *
   * @description
   *
   * @param params
   * @returns {*}
   */
  ParseObject.prototype.find = function (params) {
    return this.parse.request('GET', this.getUrl(), null, params).then(function (result) {
      return result.data;
    });
  };

  /**
   * @ngdoc method
   * @name ParseObject#create
   *
   * @description
   *
   * @param data
   * @param params
   * @returns {*}
   */
  ParseObject.prototype.create = function (data, params) {
    return this.parse.request('POST', this.getUrl(), data, params).then(function (result) {
      return angular.extend(data, result.data);
    });
  };

  /**
   *
   * @ngdoc method
   * @name ParseObject#update
   *
   * @description
   *
   * @param id
   * @param data
   * @param params
   * @returns {*}
   */
  ParseObject.prototype.update = function (id, data, params) {
    return this.parse.request('PUT', this.getUrl(id), data, params).then(function (result) {
      return angular.extend(data, result.data);
    });
  };

  /**
   * @ngdoc method
   * @name ParseObject#destroy
   *
   * @description
   *
   * @param id
   * @param params
   * @returns {*}
   */
  ParseObject.prototype.destroy = function (id, params) {
    return this.parse.request('DELETE', this.getUrl(id), null, params);
  };

  /**
   * @ngdoc service
   * @name ParseObject
   *
   * @description The base model for all data objects held in Parse
   *
   */
  angular.module('parseangular').service('ParseObject', ['Parseangular', ParseObject]);

})(angular);
