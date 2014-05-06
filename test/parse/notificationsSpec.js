
describe('Parseangular', function () {

  describe('Notification', function () {

    var ParseRole, httpBackend, createdAtDate = new Date();

    beforeEach(module('parseangular'));

    beforeEach(inject(function (_ParseRole_, _$httpBackend_) {
      ParseRole = _ParseRole_;
      httpBackend = _$httpBackend_;
    }));

    it('should do stuff');

  });
});