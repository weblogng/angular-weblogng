/* angular-weblogng main */

(function(angular) {
  'use strict';

  var weblogngModule = angular.module('weblogng', []);

  weblogngModule.factory('logger', function () {
    function logger(){ console.log('hello log'); }
    return logger;
  });

})(angular);
