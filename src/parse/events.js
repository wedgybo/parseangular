
(function (angular) { 'use strict';


  var ParseEvent = function (Parseangular) {
    this.parse = Parseangular;
  };

  /**
   * @ngdoc service
   * @name ParseEvent
   *
   * @description The base model for all data objects held in Parse
   *
   */
  angular.module('parseangular').service('ParseEvent', ['Parseangular', ParseEvent]);
  
})(angular);