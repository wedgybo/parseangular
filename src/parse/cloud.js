
(function (angular) { 'use strict';


  var ParseCloud = function (Parseangular) {
    this.parse = Parseangular;
  };

  /**
   * @ngdoc service
   * @name ParseCloud
   *
   * @description The base model for all data objects held in Parse
   *
   */
  angular.module('parseangular').service('ParseCloud', ['Parseangular', ParseCloud]);

})(angular);