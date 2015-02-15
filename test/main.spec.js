'use strict';

var testKey = 'test-key';
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
    .constant('weblogngApiKey', testKey)
    .constant('weblogngOptions', testOptions)
    .constant('weblogngConfig', testConfig)
    ;

describe('Module: weblogng', function() {

  beforeEach(module('test'));

  it('should be configurable', function () {
    inject(function (_$weblogng_) {
      expect(_$weblogng_.apiKey).toEqual(testConfig.apiKey);
      expect(_$weblogng_.options).toEqual(testConfig.options);
    });

  });

});
