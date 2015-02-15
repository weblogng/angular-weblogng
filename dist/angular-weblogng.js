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
    .run(function ($rootScope, $injector) {
      $rootScope.$on('$routeChangeSuccess', function (event, next) {
        var logger = $injector.get('$weblogng');
        logger.recordEvent('routeChangeSuccess-' + next.loadedTemplateUrl);
      });
    }
  )

  ;

})(angular);
