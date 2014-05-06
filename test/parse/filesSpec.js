
describe('Parseangular', function () {

  describe('Files', function () {

    var ParseFile, httpBackend, createdAtDate = new Date();

    beforeEach(module('parseangular'));

    beforeEach(inject(function (_ParseFile_, _$httpBackend_) {
      ParseFile = _ParseFile_;
      httpBackend = _$httpBackend_;
    }));

    it('should do stuff');

  });
});