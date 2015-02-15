'use strict';

describe('Module: weblogng', function() {

  beforeEach(module('weblogng'));

  it('should be configurable', function () {
    var testKey = 'test-key';
    var testConfig = {some: 'config'};

    module(function (_$weblogngProvider_) {
      _$weblogngProvider_.configure(testKey, testConfig);
    });
    inject(function (_$weblogng_) {
      console.log('_$weblogng_: ' + _$weblogng_);
      expect(_$weblogng_.config).toBe(testConfig);
    });

  });

});
