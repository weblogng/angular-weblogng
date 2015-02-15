/* angular-weblogng main */

(function (angular) {
  'use strict';

  var weblogngModule = angular.module('weblogng', []);

  weblogngModule.factory('logger', ['$window', 'weblogngConfig', function ($window, weblogngConfig) {
    return new $window.weblogng.Logger('api.weblogng.com',
                    weblogngConfig.apiKey,
                    weblogngConfig.options);
  }]);

})(angular);
