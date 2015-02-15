'use strict';

angular.module('test', ['weblogng'])
    .constant('weblogngConfig', {apiKey: '93c5a127-e2a4-42cc-9cc6-cf17fdac8a7f', options: {}})
    ;

describe('WeblogNG Module', function(){

  var scope;
  var logger;

  beforeEach(module('test'));

  beforeEach(inject(function ($rootScope, _logger_) {
    scope = $rootScope.$new();
    logger = _logger_;
  }));


  describe('logger', function(){
    it('should exist ', function () {
      expect(logger).toBeDefined();
      expect(logger.executeWithTiming).toBeDefined();
      expect(logger.recordStart).toBeDefined();
      expect(logger.recordFinishAndSendMetric).toBeDefined();
    });
  });

});
