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

});
