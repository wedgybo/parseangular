
describe('Parseangular', function () {

  function classUrl(model, id) {
    return id ?
      'https://api.parse.com/1/classes/' + model + '/' + id :
      'https://api.parse.com/1/classes/' + model;
  }

  describe('config provider', function () {

    var parseangularProvider;

    beforeEach(function () {

      // Create a fake module so we can get the mallzee service provider to test the config methods
      var configModule = angular.module('test.parseangular', function () {});
      configModule.config(function(ParseangularProvider) {
        parseangularProvider = ParseangularProvider;
        parseangularProvider.initialise('appid', 'apikey');
      });

      module('parseangular', 'test.parseangular');

      inject(function () {});
    });

    it('should allow the configuration of the base url', function() {

      // Check we have the injected provider from our fake module
      expect(parseangularProvider).to.not.equal(null);

      // Check the default base URL.
      expect(parseangularProvider.getBaseUrl()).to.equal('https://api.parse.com/1');
      expect(parseangularProvider.getHeaders()['X-Parse-Application-Id']).to.equal('appid');
      expect(parseangularProvider.getHeaders()['X-Parse-REST-API-Key']).to.equal('apikey');

    });

    afterEach(function () {
      parseangularProvider.setBaseUrl('');
    });
  });

  describe('Objects', function () {

    var Parseangular, httpBackend, obj, createdAtDate = new Date();

    beforeEach(module('parseangular'));

    beforeEach(inject(function (_Parseangular_, _$httpBackend_) {
      Parseangular = _Parseangular_;
      httpBackend = _$httpBackend_;

      obj = { id: 1, className: 'Post', message: 'I am a post' };

      httpBackend.whenGET(classUrl(obj.className)).respond(200, { results: [obj] });
      httpBackend.whenGET(classUrl(obj.className, obj.id)).respond(200, obj);
      httpBackend.whenPOST(classUrl(obj.className)).respond(201, {
        createdAt: createdAtDate,
        objectId: 'abc'
      });
      httpBackend.whenPUT(classUrl(obj.className, obj.id)).respond(200, obj);
      httpBackend.whenDELETE(classUrl(obj.className, obj.id)).respond(200, obj);

    }));

    it('should get an object', function () {

      httpBackend.expectGET(classUrl(obj.className, obj.id));
      Parseangular.get('Post', obj.id).then(function (post) {
        expect(post.data.id).to.equal(1);
      });
      httpBackend.flush();
    });

    it('should create an object', function () {


      httpBackend.expectPOST(classUrl(obj.className), obj);
      Parseangular.create('Post', obj).then(function (result) {
        expect(result.id).to.equal('abc');
        expect(result.createdAt.toDateString()).to.equal(createdAtDate.toDateString());
      });
      httpBackend.flush();
    });

    it('should update an object', function () {

      var updatedAtDate = new Date();
      httpBackend.expectPUT(classUrl(obj.className, obj.id), obj).respond(200, {
        updatedAt: updatedAtDate
      });

      obj.message = 'Updated message';

      Parseangular.update('Post', obj.id, obj).then(function (result) {
        expect(result.message).to.equal(obj.message);
        expect(result.updatedAt.toDateString()).to.equal(updatedAtDate.toDateString());

      });

      httpBackend.flush();
    });

    it('should delete an object', function () {

      httpBackend.expectDELETE(classUrl(obj.className, obj.id));

      Parseangular.destroy('Post', obj.id).then(function (result) {
        expect(result.status).to.equal(200);
      });
      httpBackend.flush();
    });
  });

  // Write more tests here
});