/* angular-weblogng main */

(function (angular, weblogng) {
  'use strict';
  //may not need weblogng reference
  console.log('weblogng: ' + weblogng);

  //may not need angularWeblogng reference...
  var angularWeblogng = window.angularWeblogng || (window.angularWeblogng = {});
  console.log('angularWeblogng: ' + angularWeblogng);

  var weblogngModule = angular.module('weblogng', []);

  weblogngModule.provider('$weblogng', function () {
    var apiKey = null;
    var config = {};

    var logger = {
      config: config
    };
    return {
          $get: function() { return logger; },
          logger: logger,
          configure: function(key, cfg){
            this.logger.apiKey = key;
            this.logger.config = cfg;
          },
          apiKey: apiKey,
          config: config
        };
  })

    .run()
  ;

})(angular);
