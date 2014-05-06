
(function (angular) { 'use strict';


  var ParseRole = function (Parseangular) {
    this.parse = Parseangular;
  };

  /**
   * @ngdoc service
   * @name ParseRole
   *
   * @description The base model for all data objects held in Parse
   *
   */
  angular.module('parseangular').service('ParseRole', ['Parseangular', ParseRole]);

})(angular);