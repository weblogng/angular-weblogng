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
  .config(function ($provide, $httpProvider) {
    $provide.factory('httpInterceptor', function ($window, $q, $injector, $log) {

      var PATTERN_LEADING_SLASH = /^\//;
      var PATTERN_TRAILING_SLASH = /\/$/;
      var PATTERN_SLASH = /\//g;

      function defaultQueryPathToMetricNameConverter(queryPath) {
        if (typeof queryPath === 'string' || queryPath instanceof String) {
          return queryPath
            .replace(PATTERN_LEADING_SLASH, '')
            .replace(PATTERN_TRAILING_SLASH, '')
            .replace(PATTERN_SLASH, '_');
        } else {
          return undefined;
        }
      }

      function resolveQueryPathToMetricNameConverter(logger){
        return logger.options.queryPathToMetricNameConverter ?
          logger.options.queryPathToMetricNameConverter :
          defaultQueryPathToMetricNameConverter;
      }

      return {
        'request': function (config) {

          config.timer = new $window.weblogng.Timer();
          config.timer.start();

          return config || $q.when(config);
        },

        'response': function (response) {
          var logger = $injector.get('$weblogng');

          var queryPathToMetricNameConverter = resolveQueryPathToMetricNameConverter(logger);
          var metricName = queryPathToMetricNameConverter(response.config.url);

          if(response.config.timer){
            response.config.timer.finish();
            logger.sendMetric(metricName, response.config.timer.getElapsedTime());
          }

          return response || $q.when(response);
        },

        'responseError': function (rejection) {

          var logError = function(rejection, message){
            var url, method = 'unknown';

            if(rejection.config){
              url = rejection.config.url;
              method = rejection.config.method;
            }

            var details = { 'status': rejection.status, 'method': method, 'url': url, 'message': message};
            $log.error('http request failed:', details);
          };

          if(rejection && rejection.config && rejection.config.timer){
            var logger = $injector.get('$weblogng');

            var queryPathToMetricNameConverter = resolveQueryPathToMetricNameConverter(logger);
            var metricName = queryPathToMetricNameConverter(rejection.config.url);

            rejection.config.timer.finish();
            logger.sendMetric(metricName, rejection.config.timer.getElapsedTime());
          }

          switch(rejection.status){
            case 400:
              logError(rejection, 'server indicates request was malformed');
              break;
            case 500:
              logError(rejection, 'server encountered error while processing request');
              break;
            default:
              logError(rejection, 'an http error occurred');
              break;
          }

          return $q.reject(rejection);
        }
      };
    });

    $httpProvider.interceptors.push('httpInterceptor');
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
