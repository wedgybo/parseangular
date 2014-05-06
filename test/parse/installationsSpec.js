
describe('Parseangular', function () {

  describe('Installation', function () {

    var ParseInstallation, httpBackend, createdAtDate = new Date();

    beforeEach(module('parseangular'));

    beforeEach(inject(function (_ParseInstallation_, _$httpBackend_) {
      ParseInstallation = _ParseInstallation_;
      httpBackend = _$httpBackend_;
    }));

    it('should do stuff');

  });
});