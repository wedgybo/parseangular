
describe('Parseangular', function () {

  describe('Cloud', function () {

    var ParseCloud, httpBackend, createdAtDate = new Date();

    beforeEach(module('parseangular'));

    beforeEach(inject(function (_ParseCloud_, _$httpBackend_) {
      ParseCloud = _ParseCloud_;
      httpBackend = _$httpBackend_;
    }));

    it('should do stuff');

  });
});