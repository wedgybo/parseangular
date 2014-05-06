
describe('Parseangular', function () {

  describe('Events', function () {

    var ParseEvent, httpBackend, createdAtDate = new Date();

    beforeEach(module('parseangular'));

    beforeEach(inject(function (_ParseEvent_, _$httpBackend_) {
      ParseEvent = _ParseEvent_;
      httpBackend = _$httpBackend_;
    }));

    it('should do stuff');

  });
});