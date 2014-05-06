
(function (angular) { 'use strict';


  var ParseNotification = function (Parseangular) {
    this.parse = Parseangular;
  };

  /**
   * @ngdoc service
   * @name ParseNotification
   *
   * @description The base model for all data objects held in Parse
   *
   */
  angular.module('parseangular').service('ParseNotification', ['Parseangular', ParseNotification]);

})(angular);