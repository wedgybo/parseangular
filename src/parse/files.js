
(function (angular) { 'use strict';


  var ParseFile = function (Parseangular) {
    this.parse = Parseangular;
  };

  /**
   * @ngdoc service
   * @name ParseFile
   *
   * @description The base model for all data objects held in Parse
   *
   */
  angular.module('parseangular').service('ParseFile', ['Parseangular', ParseFile]);

})(angular);