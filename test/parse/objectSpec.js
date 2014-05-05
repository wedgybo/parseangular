
describe('Parseangular', function () {

  function classUrl(model, id) {
    return id ?
      'https://api.parse.com/1/classes/' + model + '/' + id :
      'https://api.parse.com/1/classes/' + model;
  }

  describe('Objects', function () {

    var PostService, CommentService, ParseObject, httpBackend, obj, createdAtDate = new Date();

    beforeEach(module('parseangular'));

    beforeEach(inject(function (_ParseObject_, _$httpBackend_) {
      ParseObject = _ParseObject_;
      httpBackend = _$httpBackend_;

      PostService = ParseObject.new('Post');
      CommentService = ParseObject.new('Comment');

      obj = { id: 1, className: 'Post', message: 'I am a post' };

      httpBackend.whenGET(PostService.getUrl()).respond(200, { results: [obj] });
      httpBackend.whenGET(PostService.getUrl(obj.id)).respond(200, obj);
      httpBackend.whenGET(CommentService.getUrl(obj.id)).respond(200, obj);
      httpBackend.whenPOST(PostService.getUrl()).respond(201, {
        createdAt: createdAtDate,
        objectId: 'abc'
      });
      httpBackend.whenPUT(PostService.getUrl(obj.id)).respond(200, obj);
      httpBackend.whenDELETE(PostService.getUrl(obj.id)).respond(200, obj);

    }));

    it('should get an object', function () {

      httpBackend.expectGET(PostService.getUrl(obj.id));
      httpBackend.expectGET(CommentService.getUrl(obj.id));

      PostService.get(obj.id).then(function (result) {
        // Tinkering with the should interface. Reads better than expect.
        result.should.be.a('object');
        result.id.should.equal(1);
      });

      CommentService.get(obj.id).then(function (result) {
        result.should.be.a('object');
        result.id.should.equal(1);
      });

      httpBackend.flush();
    });

    it('should create an object', function () {

      httpBackend.expectPOST(PostService.getUrl(), obj);

      PostService.create(obj).then(function (result) {
        expect(result.objectId).to.equal('abc');
        expect(result.createdAt.toDateString()).to.equal(createdAtDate.toDateString());
      });
      httpBackend.flush();
    });

    it('should update an object', function () {

      var updatedAtDate = new Date();
      httpBackend.expectPUT(PostService.getUrl(obj.id), obj).respond(200, {
        updatedAt: updatedAtDate
      });

      obj.message = 'Updated message';

      PostService.update(obj.id, obj).then(function (result) {
        expect(result.message).to.equal(obj.message);
        expect(result.updatedAt.toDateString()).to.equal(updatedAtDate.toDateString());

      });

      httpBackend.flush();
    });

    it('should delete an object', function () {

      httpBackend.expectDELETE(PostService.getUrl(obj.id));

      PostService.destroy(obj.id).then(function (result) {
        expect(result.status).to.equal(200);
      });
      httpBackend.flush();
    });
  });

});