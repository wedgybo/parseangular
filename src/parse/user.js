
(function (angular) { 'use strict';


  var ParseUser = function (Parseangular) {
    this.className = 'users';
    this.parse = Parseangular;
  };

  /**
   * @ngdoc method
   * @name ParseUser#getUrl
   *
   * @description Returns the url path to access this parse data object on the REST API
   *
   * @param {string} `Optional` - Specify the ID to get the URL to that specific object
   * @returns {string} The url to the object on parse
   */
  ParseUser.prototype.getUrl = function () {
    var className = arguments[0] || this.className;
    var id = arguments[1] || null;

    return id ?
      this.parse.getBaseUrl() + '/' + className + '/' + id :
      this.parse.getBaseUrl() + '/' + className;
  };


  /**
   * @ngdoc method
   * @name ParseUser#signUp
   *
   * @description Registers a new user with the Parse service for your application
   *
   * @param user
   * @returns {*}
   */
  ParseUser.prototype.signUp = function (user) {
    if (!angular.isString(user.username)) {
      throw new ParseUserException('Field username is required');
    }

    if (!angular.isString(user.password)) {
      throw new ParseUserException('Field password is required');
    }

    return this.parse.request('POST', this.getUrl('users'), user).then(function (result) {
      return result.data;
    });
  };

  /**
   * @ngdoc method
   * @name ParseUser#login
   *
   * @description
   *
   * @param id
   * @param params
   * @returns {*}
   */
  ParseUser.prototype.login = function (username, password) {
    // TODO url encode these params
    var user = {
      username: username,
      password: password
    };
    return this.parse.request('GET', this.getUrl('login'), null, user).then(function (result) {
      return result.data;
    });
  };

  /**
   * @ngdoc method
   * @name ParseUser#requestPasswordReset
   *
   * @description Send out a parse password reset email to the specified email address
   *
   * @param {string} email
   * @returns {Object}
   */
  ParseUser.prototype.requestPasswordReset = function (email) {
    return this.parse.request('POST', this.getUrl('requestPasswordReset'), { email: email }).then(function (result) {
      return result.data;
    });
  };

  /**
   * @ngdoc method
   * @name ParseUser#find
   *
   * @description
   *
   * @param params
   * @returns {*}
   */
  ParseUser.prototype.find = function (params) {
    return this.parse.request('GET', this.getUrl(), null, params).then(function (result) {
      return result.data;
    });
  };

  /**
   *
   * @ngdoc method
   * @name ParseUser#update
   *
   * @description
   *
   * @param id
   * @param data
   * @param params
   * @returns {*}
   */
  ParseUser.prototype.update = function (id, data, params) {
    return this.parse.request('PUT', this.getUrl(id), data, params).then(function (result) {
      return angular.extend(data, result.data);
    });
  };

  /**
   * @ngdoc method
   * @name ParseUser#destroy
   *
   * @description
   *
   * @param id
   * @param params
   * @returns {*}
   */
  ParseUser.prototype.destroy = function (id, params) {
    return this.parse.request('DELETE', this.getUrl('users', id), null, params);
  };

  /**
   *
   * @param message
   * @constructor
   */
  function ParseUserException(message) {
    this.message = message;
    this.name = 'ParseUserException';
  }

  /**
   * @ngdoc service
   * @name ParseUser
   *
   * @description The base model for all data objects held in Parse
   *
   */
  angular.module('parseangular').service('ParseUser', ['Parseangular', ParseUser]);

})(angular);
