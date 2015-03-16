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

      function defaultConvertRequestConfigToMetricName (config) {
        var metricName;

        if (config && config.url) {
          metricName = extractHostFromUrl(config.url);

          if (config.method) {
            metricName = metricName + '-' + config.method;
          }
        }

        return metricName;
      }

      function resolveRequestConfigToMetricNameConverter(logger){
        return logger.options.convertRequestConfigToMetricName ?
          logger.options.convertRequestConfigToMetricName :
          defaultConvertRequestConfigToMetricName;
      }

      function calculateScope() {
        if ($window.location && $window.location.origin) {
          return $window.location.origin;
        }
        return undefined;
      }

      function extractHostFromUrl(url) {
        var anchor = $window.document.createElement('a');
        anchor.href = url;
        return anchor.host;
      }

      return {
        'extractHostFromUrl': extractHostFromUrl,
        'convertRequestConfigToMetricName': defaultConvertRequestConfigToMetricName,

        'request': function (config) {

          config.timer = new $window.weblogng.Timer();
          config.timer.start();

          return config || $q.when(config);
        },

        'response': function (response) {
          var logger = $injector.get('$weblogng');

          var convertRequestConfigToMetricName = resolveRequestConfigToMetricNameConverter(logger);
          var metricName = convertRequestConfigToMetricName(response.config);

          if(response.config.timer){
            response.config.timer.finish();

            var timestamp = $window.weblogng.epochTimeInMilliseconds();
            var scope = calculateScope(response.config);
            logger.sendMetric(metricName, response.config.timer.getElapsedTime(), timestamp, scope, 'http request');
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

            var convertRequestConfigToMetricName = resolveRequestConfigToMetricNameConverter(logger);
            var metricName = convertRequestConfigToMetricName(rejection.config);

            rejection.config.timer.finish();
            var timestamp = $window.weblogng.epochTimeInMilliseconds();
            var scope = calculateScope(rejection.config);
            logger.sendMetric(metricName, rejection.config.timer.getElapsedTime(), timestamp, scope, 'http request');
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
  }).run(function ($rootScope, $injector) {
      $rootScope.$on('$routeChangeSuccess', function (event, next) {
        var logger = $injector.get('$weblogng');
        logger.recordEvent('routeChangeSuccess-' + next.loadedTemplateUrl);
      });
    }
  )

  ;

})(angular);
