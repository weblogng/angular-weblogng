'use strict';

var testKey = 'test-api-key';
var testOptions = {
  publishNavigationTimingMetrics: true,
  publishUserActive: true,
  application: 'ui'
};

var testConfig = {
  apiKey: testKey,
  options: testOptions
};

angular.module('test', ['weblogng'])
    .constant('weblogngConfig', testConfig)
    ;

describe('Module: weblogng', function() {

  beforeEach(module('test'));

  it('should exist', function () {
    inject(function (_$weblogng_) {
      expect(_$weblogng_).toBeDefined();
    });

  });

  it('should be configurable', function () {
    inject(function (_$weblogng_) {
      expect(_$weblogng_.apiKey).toEqual(testConfig.apiKey);
      expect(_$weblogng_.options).toEqual(testConfig.options);
    });
  });

  it('should record route changes', function () {
    inject(function (_$rootScope_, _$weblogng_) {
      spyOn(_$weblogng_, 'recordEvent');

      var loadedTemplateUrl = '/nextTemplateUrl';
      _$rootScope_.$emit('$routeChangeSuccess', {loadedTemplateUrl: loadedTemplateUrl});

      expect(_$weblogng_.recordEvent).toHaveBeenCalledWith('routeChangeSuccess-' + loadedTemplateUrl);
    });
  });

  describe('Interceptor: httpInterceptor', function () {

    beforeEach(module('test'));

    var httpInterceptor;
    var weblogng;

    beforeEach(inject(function (_$window_, _httpInterceptor_) {
      httpInterceptor = _httpInterceptor_;
      weblogng = _$window_.weblogng;
    }));

    it('should be defined', function (){
      expect(httpInterceptor).toBeDefined();
    });

    it('should start a Timer and add it to the request config', function () {
      var configIn = {};
      var configOut = httpInterceptor.request(configIn);

      expect(configOut).toBe(configIn);
      expect(configOut.timer).toBeDefined();
      expect(configOut.timer.tStart).toBeDefined();
      expect(configOut.timer.tFinish).toBeUndefined();
    });

    it('should stop Timer when response is received', function () {
      var config = {
        timer: new weblogng.Timer(),
        url: '/some/query/path'
      };
      var responseIn = {
        config: config
      };
      var responseOut = httpInterceptor.response(responseIn);

      expect(responseOut).toBe(responseIn);
      expect(responseOut.config).toBe(config);
      expect(responseOut.config.timer.tFinish).toBeDefined();
    });

    it('should stop Timer when response error occurs', function () {
      var config = {
        timer: new weblogng.Timer(),
        method: 'POST',
        url: '/some/query/path'
      };
      var rejectionIn = {
        config: config
      };

      expect(config.timer.tFinish).toBeUndefined();

      httpInterceptor.responseError(rejectionIn);

      expect(config.timer.tFinish).toBeDefined();
    });

  });

});
