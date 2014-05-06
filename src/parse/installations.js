
(function (angular) { 'use strict';


  var ParseInstallation = function (Parseangular) {
    this.parse = Parseangular;
  };

  /**
   * @ngdoc service
   * @name ParseInstallation
   *
   * @description The base model for all data objects held in Parse
   *
   */
  angular.module('parseangular').service('ParseInstallation', ['Parseangular', ParseInstallation]);

})(angular);