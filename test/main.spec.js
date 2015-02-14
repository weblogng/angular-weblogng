'use strict';

describe('WeblogNG Module', function(){

  var scope;
  var logger;

  beforeEach(module('weblogng'));

  beforeEach(inject(function ($rootScope, _logger_) {
    scope = $rootScope.$new();
    logger = _logger_;
  }));


  it('should exist ', function () {
    expect(logger).toBeDefined();
    logger();
  });

});
