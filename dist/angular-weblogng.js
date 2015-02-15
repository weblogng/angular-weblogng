/* angular-weblogng main */

(function (angular) {
  'use strict';

  var weblogngModule = angular.module('weblogng', []);

  weblogngModule.provider('$weblogng', function () {
    return {
      $get: ['$window', 'weblogngConfig',
        function ($window, weblogngConfig) {
        return new $window.weblogng.Logger('api.weblogng.com' , weblogngConfig.apiKey, weblogngConfig.options);
      }
      ]
    };
  })
    .run()
  ;

})(angular);
